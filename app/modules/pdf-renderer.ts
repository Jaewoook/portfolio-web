import { FPDFBitmapFormat, FPDFPageOrientation, FPDFPageRenderingFlag, memory } from "pdfium.js";

const TRANSPARENT = 0x00000000;
const WHITE = 0xffffffff;

interface PDFFile {
  fileSize: number;
  byteArray: Uint8Array;
  allocatedMemoryPtr: number;
}

interface PDFDocument {
  opened: boolean;
  pageCount: number;
  instancePtr: number;
}

interface PDFPage {
  opened: boolean;
  rendered: boolean;
  width: number;
  height: number;
  renderWidth: number;
  renderHeight: number;
  bitmapBufferSize: number;
  instancePtr: number;
  bitmapBufferPtr: number;
  bitmapPtr: number;
}

export class PDFRenderer {
  static readonly BYTES_PER_PIXEL = 4;
  static readonly MEMORY_UNSET = -1;
  static readonly DEFAULT_PAGE_INSTASNCE: PDFPage = {
    opened: false,
    rendered: false,
    width: 0,
    height: 0,
    renderWidth: 0,
    renderHeight: 0,
    bitmapBufferSize: PDFRenderer.MEMORY_UNSET,
    instancePtr: PDFRenderer.MEMORY_UNSET,
    bitmapBufferPtr: PDFRenderer.MEMORY_UNSET,
    bitmapPtr: PDFRenderer.MEMORY_UNSET,
  };

  file: PDFFile;
  document: PDFDocument;
  pages: PDFPage[];

  constructor(byteArray: Uint8Array) {
    this.file = {
      allocatedMemoryPtr: PDFRenderer.MEMORY_UNSET,
      byteArray: byteArray,
      fileSize: byteArray.length,
    };
    this.document = {
      instancePtr: PDFRenderer.MEMORY_UNSET,
      opened: false,
      pageCount: 0,
    };
    this.pages = [];
  }

  openDocument() {
    if (this.document.opened) {
      console.warn("[PDF Renderer] openDocument: page already opened.");
      return;
    }

    this.file.allocatedMemoryPtr = window.FPDF.wasmExports.malloc(this.file.fileSize);
    window.FPDF.HEAPU8.set(this.file.byteArray, this.file.allocatedMemoryPtr);
    this.document.instancePtr = window.FPDF._FPDF_LoadMemDocument(this.file.allocatedMemoryPtr, this.file.fileSize, "");
    this.document.opened = true;

    this._getPageCount();
    this.pages = Array.from({ length: this.document.pageCount }).map(() => PDFRenderer.DEFAULT_PAGE_INSTASNCE);
  }

  closeDocument() {
    if (!this.document.opened) {
      console.warn("[PDF Renderer] closeDocument: page already closed.");
      return;
    }

    // close opened page instances before close document
    this.pages.forEach((page, index) => {
      if (page.opened) {
        this.closePage(index);
      }
    });

    window.FPDF._FPDF_CloseDocument(this.document.instancePtr);
    this.document.instancePtr = PDFRenderer.MEMORY_UNSET;
    window.FPDF.wasmExports.free(this.file.allocatedMemoryPtr);
    this.file.allocatedMemoryPtr = PDFRenderer.MEMORY_UNSET;
    this.document.opened = false;
  }

  openPage(pageIndex: number) {
    if (pageIndex < 0 || this.document.pageCount - 1 < pageIndex) {
      console.warn("[PDF Renderer] openPage: pageIndex out of bound.");
      return;
    }

    if (this.pages[pageIndex].opened) {
      return;
    }

    this.pages[pageIndex].instancePtr = window.FPDF._FPDF_LoadPage(this.document.instancePtr, pageIndex);
    this.pages[pageIndex].opened = true;
  }

  closePage(pageIndex: number) {
    if (pageIndex < 0 || this.document.pageCount - 1 < pageIndex) {
      console.warn("[PDF Renderer] closePage: pageIndex out of bound.");
      return;
    }

    if (!this.pages[pageIndex].opened) {
      return;
    }

    this._destroyPageBitmap(this.pages[pageIndex]);
    window.FPDF._FPDF_ClosePage(this.pages[pageIndex].instancePtr);
    this.pages[pageIndex].instancePtr = PDFRenderer.MEMORY_UNSET;
    this.pages[pageIndex].opened = false;
  }

  private _getPageCount() {
    if (!this.document.opened) {
      console.warn("[PDF Renderer] _getPageCount: Document not opened!");
    }

    if (this.document.pageCount === 0) {
      this.document.pageCount = window.FPDF._FPDF_GetPageCount(this.document.instancePtr);
    }
  }

  /**
   * Measure page width and height with render scale factor
   *
   * @param currentPage PDF page object
   * @param renderScale render scale factor
   * @returns measured width and height
   */
  private _measurePageSize(currentPage: PDFPage, renderScale: number) {
    const width = Math.floor(window.FPDF._FPDF_GetPageWidth(currentPage.instancePtr) * renderScale);
    const height = Math.floor(window.FPDF._FPDF_GetPageHeight(currentPage.instancePtr) * renderScale);

    return { width, height };
  }

  /**
   * Create page bitmap instance and allocate buffer memory
   *
   * @param page instance of PDF page
   */
  private _createPageBitmap(page: PDFPage) {
    // allocate bitmap buffer memory using calculated bitmap buffer size
    page.bitmapBufferSize = page.width * page.height * PDFRenderer.BYTES_PER_PIXEL;
    page.bitmapBufferPtr = memory.calloc(page.width * page.height, PDFRenderer.BYTES_PER_PIXEL);

    // number of bytes for each scan line
    const stride = page.width * 4;

    // create bitmap instance using bitmap buffer memory
    page.bitmapPtr = window.FPDF._FPDFBitmap_CreateEx(
      page.width,
      page.height,
      FPDFBitmapFormat.FPDFBitmap_BGRA,
      page.bitmapBufferPtr,
      stride
    );
  }

  /**
   * Destroy page bitmap instance and deallocate memory
   *
   * @param page instance of PDF page
   */
  private _destroyPageBitmap(page: PDFPage) {
    if (page.bitmapPtr !== PDFRenderer.MEMORY_UNSET) {
      window.FPDF._FPDFBitmap_Destroy(page.bitmapPtr);
      page.bitmapPtr = PDFRenderer.MEMORY_UNSET;
    }

    if (page.bitmapBufferPtr !== PDFRenderer.MEMORY_UNSET) {
      window.FPDF.wasmExports.free(page.bitmapBufferPtr);
      page.bitmapBufferPtr = PDFRenderer.MEMORY_UNSET;
    }
  }

  /**
   * Prepare step for page rendering.
   * This step perform following actions:
   * 1. measure page size
   * 2. (if render size changed) destroy page bitmap
   * 3. resize output canvas element size
   * 4. create page bitmap
   *
   * @param canvasEl output canvas element
   * @param pageIndex index of render requested page
   * @param renderScale render scale factor to perform rendering
   * @param outputScale output scale factor to apply rendered image to output canvas
   */
  private _prepareRender(canvasEl: HTMLCanvasElement | null, pageIndex: number, renderScale: number, outputScale: number) {
    if (pageIndex < 0 || this.document.pageCount - 1 < pageIndex) {
      console.warn("[PDF Renderer] _prepareRender: pageIndex out of bound.");
      return;
    }

    if (!canvasEl) {
      console.warn("[PDF Renderer] _prepareRender: canvasEl is null");
      return;
    }

    const currentPage = this.pages[pageIndex];

    if (!currentPage.opened) {
      return;
    }

    console.log("[PDF Renderer] _measurePageSize");
    const { width, height } = this._measurePageSize(currentPage, renderScale);

    // re-create bitmap buffer and bitmap instance if render size changed
    if (currentPage.width !== width || currentPage.height !== height) {
      console.log("[PDF Renderer] _destroyPageBitmap");
      this._destroyPageBitmap(currentPage);
      currentPage.width = width;
      currentPage.height = height;
    }

    console.log("[PDF Renderer] _createPageBitmap");
    this._createPageBitmap(currentPage);

    canvasEl.width = width * outputScale;
    canvasEl.height = height * outputScale;
  }

  /**
   * Render page content to bitmap data
   *
   * @param pageIndex index of render requested page
   */
  private _renderToBitmap(pageIndex: number) {
    const currentPage = this.pages[pageIndex];
    console.log(currentPage);

    const renderFlag =
      FPDFPageRenderingFlag.FPDF_REVERSE_BYTE_ORDER |
      FPDFPageRenderingFlag.FPDF_LCD_TEXT |
      FPDFPageRenderingFlag.FPDF_ANNOT;
    console.log("_FPDFBitmap_FillRect");
    window.FPDF._FPDFBitmap_FillRect(currentPage.bitmapPtr, 0, 0, currentPage.width, currentPage.height, TRANSPARENT);
    console.log("_FPDF_RenderPageBitmap");
    window.FPDF._FPDF_RenderPageBitmap(
      currentPage.bitmapPtr,
      currentPage.instancePtr,
      0,
      0,
      currentPage.width,
      currentPage.height,
      FPDFPageOrientation.NORMAL,
      renderFlag
    );

    currentPage.rendered = true;
  }

  /**
   * Draw rendered bitmap data to output canvas
   *
   * @param canvasEl output canvas element
   * @param pageIndex index of render requested page
   * @param outputScale output scale factor to apply rendered image to output canvas
   * @returns void type promise object
   */
  private async _drawBitmap(canvasEl: HTMLCanvasElement | null, pageIndex: number, outputScale = 1) {
    const context = canvasEl?.getContext("2d");

    if (!canvasEl || !context) {
      console.warn("[PDF Renderer] canvas element is null.");
      return;
    }

    const currentPage = this.pages[pageIndex];
    const width = currentPage.width;
    const height = currentPage.height;

    const renderedImageData = context.createImageData(width, height);
    renderedImageData.data.set(
      window.FPDF.HEAPU8.subarray(
        currentPage.bitmapBufferPtr,
        currentPage.bitmapBufferPtr + currentPage.bitmapBufferSize
      )
    );
    const renderedBitmap = await createImageBitmap(renderedImageData);
    context.drawImage(renderedBitmap, 0, 0, width, height, 0, 0, width / outputScale, height / outputScale);
  }

  /**
   * Render and draw requested page index
   *
   * @param targetCanvasEl render output canvas element
   * @param pageIndex index of render requested page
   * @param renderScale render scale factor (default: 1.0)
   * @param outputScale output scale factor (default: 1.0)
   */
  render(targetCanvasEl: HTMLCanvasElement | null, pageIndex: number, renderScale = 1.0, outputScale = 1.0) {
    console.log("[PDF Renderer] render triggered!");

    console.log("[PDF Renderer] _prepareRender");
    this._prepareRender(targetCanvasEl, pageIndex, renderScale, outputScale);
    console.log("[PDF Renderer] _renderToBitmap");
    this._renderToBitmap(pageIndex);
    console.log("[PDF Renderer] _drawBitmapp");
    this._drawBitmap(targetCanvasEl, pageIndex, renderScale);
  }
}
