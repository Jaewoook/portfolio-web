"use client";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import type { MouseEventHandler, ReactNode } from "react";
import { useCallback, useState } from "react";

import { useCoordinateValues } from "../../hooks/useCoordinateValues";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import * as css from "./Shortcut.css";

interface Props {
  icon: ReactNode;
  label: string;
  initialX?: string;
  initialY?: string;
  onClick?: () => void;
}

export const Shortcut = (props: Props) => {
  const { icon, label, initialX = "0px", initialY = "0px", onClick } = props;
  const { x, y, setCoordinate } = useCoordinateValues(initialX, initialY);
  const [selected, setSelected] = useState(false);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>(
    (e) => {
      setSelected(true);

      if (e.detail === 2) {
        onClick?.();
      }
    },
    [onClick]
  );

  const handleOutsideClick = useCallback(() => {
    setSelected(false);
  }, []);

  const boundRef = useOutsideClick<HTMLDivElement>(handleOutsideClick);

  return (
    <div
      className={css.bound}
      style={assignInlineVars({
        [css.xPos]: x,
        [css.yPos]: y,
      })}
      ref={boundRef}
      onClick={handleClick}
    >
      <div className={css.container}>
        <div
          className={
            selected ? css.iconWrapper.selected : css.iconWrapper.default
          }
        >
          {icon}
        </div>
        <p className={selected ? css.label.selected : css.label.default}>
          {label}
        </p>
      </div>
    </div>
  );
};
