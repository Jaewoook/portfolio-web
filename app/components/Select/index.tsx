import { useCallback, useState } from "react";
import type { SelectHTMLAttributes } from "react";
import { PiCaretUpDown } from "react-icons/pi";

import * as css from "./Select.css";

export type Options = {
  label: string;
  key: string | number;
}[];

interface Props {
  options: Options;
  value: string;
  onChange: (value: string) => void;
}

export const Select = (props: Props) => {
  const { value, options, onChange } = props;
  const [optionOpened, setOptionsOpen] = useState(false);
  const handleOptionsClick = useCallback(() => {
    setOptionsOpen((prev) => !prev);
  }, []);

  return (
    <div className={css.container}>
      <select style={{ display: "none" }}>
        {options.map((option) => (
          <option key={option.key}>{option.label}</option>
        ))}
      </select>
      <p className={css.selected} onClick={handleOptionsClick}>
        {value}
        <PiCaretUpDown className={css.selectedExpandIndicator} />
      </p>
      <div className={optionOpened ? css.options.opened : css.options.closed}>
        {options.map((option) => (
          <p key={option.key} className={css.option}>
            {option.label}
          </p>
        ))}
      </div>
    </div>
  );
};
