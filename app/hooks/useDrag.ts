import { useCallback, useEffect, useState } from "react";
import type { MouseEventHandler } from "react";

export type DragEventHandler = (moveX: number, moveY: number) => void;

export interface DragEvent {
  onDragStart?: () => void;
  onDragMove: DragEventHandler;
  onDragEnd?: () => void;
}

export const useDrag = (
  initialXPos: number,
  initialYPos: number,
  { onDragStart, onDragMove, onDragEnd }: DragEvent
) => {
  const [x, setX] = useState(initialXPos);
  const [y, setY] = useState(initialYPos);
  const [isDragging, setDragging] = useState(false);

  const dragStart = useCallback<MouseEventHandler>(
    (e) => {
      setDragging(true);
      const boundingRect = (e.target as HTMLElement).getBoundingClientRect();
      setX(e.clientX - boundingRect.x);
      setY(e.clientY - boundingRect.y);
      onDragStart?.();
    },
    [onDragStart]
  );

  const dragMove = useCallback(
    (e: MouseEvent) => {
      const moveX = e.clientX - x;
      const moveY = e.clientY - y;
      onDragMove(moveX, moveY);
    },
    [x, y, onDragMove]
  );

  const dragEnd = useCallback(
    (e: MouseEvent) => {
      setDragging(false);
      onDragEnd?.();
    },
    [onDragEnd]
  );

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", dragMove);
      document.addEventListener("mouseup", dragEnd);
    }

    return () => {
      document.removeEventListener("mousemove", dragMove);
      document.removeEventListener("mouseup", dragEnd);
    };
  }, [isDragging, dragMove, dragEnd]);

  return dragStart;
};
