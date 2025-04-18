"use client";
import axios from "axios";
import { PDFium } from "pdfium.js";
import { useCallback, useEffect, useRef, useState } from "react";

import { Window } from "../Window";
import { PDFRenderer } from "../../modules/pdf-renderer";
import * as css from "./Resume.css";

const RESUME_PATH = "/resume.pdf";

export const Resume = () => {
  const pdfRenderer = useRef<PDFRenderer | null>(null);
  const pdfCanvasRef = useRef<HTMLCanvasElement>(null);

  const loadResumePDF = useCallback(async () => {
    try {
      const PDFiumModule = await PDFium();
      PDFiumModule._FPDF_InitLibrary();
      const resumePDFResponse = await axios.get<ArrayBuffer>(RESUME_PATH, {
        responseType: "arraybuffer",
      });
      const byteArray = new Uint8Array(resumePDFResponse.data);
      pdfRenderer.current = new PDFRenderer(byteArray);
      pdfRenderer.current.openDocument();
      pdfRenderer.current.openPage(0);
      pdfRenderer.current.render(pdfCanvasRef.current, 0, 1.5, 1 / 1.5);
      pdfCanvasRef.current?.getContext("2d");
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadResumePDF();
  }, [loadResumePDF]);

  return (
    <Window x="200px" y="100px" title="Resume">
      <canvas className={css.resumeCanvas} ref={pdfCanvasRef} />
    </Window>
  );
};
