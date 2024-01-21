import { useCallback, useState } from "react";

export const useCoordinateValues = (initialX: string = "0px", initialY: string = "0px") => {
  const [x, setX] = useState(initialX);
  const [y, setY] = useState(initialY);

  const setCoordinate = useCallback((x: string, y: string) => {
    setX(x);
    setY(y);
  }, []);

  return { x, y, setCoordinate };
};
