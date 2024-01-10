"use client";
import type { MouseEventHandler, ReactNode } from "react";
import { useCallback, useState } from "react";

import { useOutsideClick } from "../../hooks/useOutsideClick";
import * as css from "./Shortcut.css";

interface Props {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export const Shortcut = (props: Props) => {
  const { icon, label, onClick } = props;
  const [selected, setSelected] = useState(false);

  const handleClick = useCallback<MouseEventHandler<HTMLDivElement>>((e) => {
    setSelected(true);

    if (e.detail === 2) {
      onClick?.();
    }
  }, [onClick]);

  const handleOutsideClick = useCallback(() => {
    setSelected(false);
  }, []);

  const boundRef = useOutsideClick<HTMLDivElement>(handleOutsideClick);

  return (
    <div className={css.bound} ref={boundRef} onClick={handleClick}>
      <div className={css.container}>
        <div className={selected ? css.iconWrapper.selected : css.iconWrapper.default}>
          {icon}
        </div>
        <p className={selected ? css.label.selected : css.label.default}>{label}</p>
      </div>
    </div>
  );
};
