"use client";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { useContext, useEffect, useState } from "react";

import { LockContext } from "@/contexts/LockContext";
import { ClockIndicator } from "../ClockIndicator";
import { LoginProfile } from "../LoginProfile";
import { Wallpaper } from "../Wallpaper";
import * as css from "./lock-screen.css";

export const LockScreen = () => {
  const { isLocked } = useContext(LockContext);
  const [isVisible, setVisible] = useState(true);

  useEffect(() => {
    if (isLocked && !isVisible) {
      setVisible(true);
    }
  }, [isLocked, isVisible]);

  return (
    <div
      className={isLocked ? css.lockAnim : css.unlockAnim}
      style={assignInlineVars({ [css.isVisible]: isVisible ? "visible" : "hidden" })}
      onAnimationEnd={() => setVisible(false)}
    >
      <Wallpaper />
      <ClockIndicator />
      <LoginProfile />
    </div>
  );
};
