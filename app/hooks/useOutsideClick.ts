import { useCallback, useEffect, useRef } from "react";
import type { MouseEvent } from "react";

export const useOutsideClick = <T extends HTMLElement = HTMLElement> (callbackFn: () => void) => {
  const ref = useRef<T>(null);

  const handleClick = useCallback((e: globalThis.MouseEvent) => {
    if (!ref.current || ref.current.contains(e.target as Node)) {
      return;
    }

    callbackFn();
  }, [callbackFn]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, [handleClick]);

  return ref;
};
