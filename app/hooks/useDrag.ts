import { useCallback, useEffect, useRef, useState } from "react";

export type DragEventHandler = (moveX: number, moveY: number) => void;

export interface DragEvent {
  onDragStart?: () => void;
  onDragMove: DragEventHandler;
  onDragEnd?: () => void;
}

export const useDrag = <T extends HTMLElement = HTMLElement>(
  initialXPos: number,
  initialYPos: number,
  { onDragStart, onDragMove, onDragEnd }: DragEvent
) => {
  const ref = useRef<T>(null);
  const [x, setX] = useState(initialXPos);
  const [y, setY] = useState(initialYPos);
  const [isDragging, setDragging] = useState(false);

  const dragStart = useCallback(
    (e: MouseEvent) => {
      setDragging(true);
      const boundingRect = (e.target as T).getBoundingClientRect();
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
    if (ref.current) {
      ref.current.onmousedown = dragStart;
    }
  }, [ref, dragStart]);

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

  return ref;
};
