"use client";
import { useCallback, useState } from "react";
import type { PropsWithChildren } from "react";
import { PiCaretRight } from "react-icons/pi";

import { Select, Options } from "../Select";
import { Window } from "../Window";
import * as css from "./Settings.css";

interface RowProps {
  label: string;
}

const Row = (props: PropsWithChildren<RowProps>) => {
  const { label, children } = props;
  return (
    <div className={css.row}>
      <p className={css.rowLabel}>{label}</p>
      <div>{children}</div>
    </div>
  );
};

const COLOR_MODE_OPTIONS: Options = [
  { key: "color-mode-option-light", label: "Light" },
  { key: "color-mode-option-dark", label: "Dark" },
];

const BLUR_EFFECT_OPTIONS: Options = [
  { key: "blur-on", label: "On" },
  { key: "blur-off", label: "Off" },
];

const LANGUAGE_OPTIONS: Options = [
  { key: "lang-en", label: "English" },
  { key: "lang-ko", label: "한국어" },
];

export const Settings = () => {
  const [colorMode, setColorMode] = useState("Dark");
  const [blurEnabled, setBlurEnabled] = useState("Off");
  const [language, setLanguage] = useState("English");

  const handleColorModeChange = useCallback((value: string) => {
    setColorMode(value);
  }, []);

  const handleLanguageChange = useCallback((value: string) => {
    setLanguage(value);
  }, []);

  return (
    <Window title="Settings" x="70%" y="40%" maximizeDisabled>
      <div className={css.container}>
        <div className={css.list}>
          <Row label="About">
            <PiCaretRight />
          </Row>
          <Row label="Color mode">
            <Select options={COLOR_MODE_OPTIONS} value={colorMode} onChange={handleColorModeChange} />
          </Row>
          <Row label="Enable Blur Effect">
            <Select options={BLUR_EFFECT_OPTIONS} value={blurEnabled} onChange={() => {}} />
          </Row>
          <Row label="Language">
            <Select options={LANGUAGE_OPTIONS} value={language} onChange={handleLanguageChange} />
          </Row>
        </div>
        <p className={css.infoText}>Some features have not been implemented yet.</p>
      </div>
    </Window>
  );
};
