"use client";
import { calc } from "@vanilla-extract/css-utils";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { MouseEventHandler } from "react";
import { useCallback, useState } from "react";

import * as css from "./Window.css";

type DragEventHandler = (moveX: number, moveY: number) => void;

interface DragEvent {
  onDragStart?: () => void;
  onDragMove: DragEventHandler;
  onDragEnd?: () => void;
}

interface HeaderOptions {
  minimizeDisabled: boolean;
  maximizeDisabled: boolean;
}

interface HeaderProps extends HeaderOptions, DragEvent {
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

const Header = (props: React.PropsWithChildren<HeaderProps>) => {
  const {
    children,
    maximizeDisabled,
    minimizeDisabled,
    onClose,
    onMaximize,
    onMinimize,
    onDragStart,
    onDragMove,
    onDragEnd,
  } = props;
  const [isDragging, setDragging] =  useState(false);
  const [startX, setStartX] =  useState(0);
  const [startY, setStartY] =  useState(0);

  const dragStart = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if (isDragging) {
      return;
    }

    setDragging(true);
    setStartX(e.clientX);
    setStartY(e.clientY);
    onDragStart?.();
  }, [isDragging, onDragStart]);

  const dragMove = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if (!isDragging) {
      return;
    }

    const moveX = e.clientX - startX;
    const moveY = e.clientY - startY;
    onDragMove(moveX, moveY);
  }, [isDragging, startX, startY, onDragMove]);

  const dragEnd = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    if (!isDragging) {
      return;
    }

    setDragging(false);
    onDragEnd?.();
  }, [isDragging, onDragEnd]);

  return (
    <div
      className={css.header}
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={dragMove}
    >
      <div className={css.headerButtonGroup}>
        <button className={css.headerButton.close} onClick={onClose} />
        <button
          className={
            !minimizeDisabled
              ? css.headerButton.minimize
              : css.headerButton.disabled
          }
          disabled={minimizeDisabled}
          onClick={onMinimize}
        />
        <button
          className={
            !maximizeDisabled
              ? css.headerButton.maximize
              : css.headerButton.disabled
          }
          disabled={maximizeDisabled}
          onClick={onMaximize}
        />
      </div>
      {children}
    </div>
  );
};

/*
export const scrollbarStyle = css`
  ::-webkit-scrollbar {
    width: 8px;
    background: none;
  }
  ::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    background-clip: padding-box;
    border: 2px solid transparent;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background: none;
  }
`;
*/

interface Props extends Partial<HeaderOptions> {
  title?: string;
  hideStatusBar?: boolean;
  x: string;
  y: string;
}

export const Window = (props: React.PropsWithChildren<Props>) => {
  const {
    children,
    title,
    minimizeDisabled = false,
    maximizeDisabled = false,
    x,
    y,
  } = props;
  const [xPos, setXPos] = useState(x);
  const [yPos, setYPos] = useState(y);

  const handleDragMove = useCallback<DragEventHandler>((moveX, moveY) => {
    setXPos(calc.add(x, moveX + "px"));
    setYPos(calc.add(y, moveY + "px"));
  }, [x, y]);

  return (
    <section
      className={css.frame}
      style={assignInlineVars({
        [css.xPos]: xPos,
        [css.yPos]: yPos,
      })}
    >
      <div className={css.wrapper}>
        <Header
          minimizeDisabled={minimizeDisabled}
          maximizeDisabled={maximizeDisabled}
          onDragMove={handleDragMove}
        >
          {title}
        </Header>
        <div className={css.content}>{children}</div>
      </div>
    </section>
  );
};
