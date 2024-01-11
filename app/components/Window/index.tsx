"use client";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useCallback, useRef, useState } from "react";

import { useDrag } from "../../hooks";
import type { DragEvent, DragEventHandler } from "../../hooks/useDrag";
import { Layer } from "../Layer";
import * as css from "./Window.css";

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
  const dragStartTrigger = useDrag(0, 0, {
    onDragStart,
    onDragMove,
    onDragEnd,
  });

  return (
    <div className={css.header} onMouseDown={dragStartTrigger}>
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
  title: string;
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

  const handleDragMove = useCallback<DragEventHandler>((x, y) => {
    setXPos(x + "px");
    setYPos(y + "px");
  }, []);

  return (
    <Layer layerId={"window-" + title}>
      {({ zIndex, focus }) => (
        <section
          className={css.frame}
          onMouseDown={focus}
          style={assignInlineVars({
            [css.xPos]: xPos,
            [css.yPos]: yPos,
            [css.zIndex]: String(zIndex),
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
      )}
    </Layer>
  );
};
