"use client";
import { useCallback, useState } from "react";

import { LockContext } from "./contexts/LockContext";
import type { ILockContext } from "./contexts/LockContext";
import { LockScreen } from "./components/lock-screen";
import { LayerManager } from "./components/Layer";
import { MenuBar } from "./components/MenuBar";
import * as Menus from "./components/Menus";
import * as Shortcut from "./components/Shortcuts";
import { Resume } from "./components/Resume";
import { Profile } from "./components/Profile";
import { Settings } from "./components/Settings";

const Index = () => {
  const [isLocked, setLock] = useState(true);
  const lock = useCallback(() => setLock(true), []);
  const unlock = useCallback(() => setLock(false), []);

  const lockContextValue: ILockContext = {
    isLocked,
    lock,
    unlock,
  };

  return (
    <LockContext.Provider value={lockContextValue}>
      <LayerManager>
        <MenuBar
          leftMenu={[<Menus.PortfolioMenu key="menu-portfolio" />]}
          rightMenu={[
            <Menus.ClockIndicator key="menu-clock-indicator" />,
            <Menus.BatteryIndicator key="menu-battery-indicator" />,
          ]}
        />
        <Shortcut.ResumeShortcut />
        <Shortcut.GitHubShortcut />
        <Shortcut.SettingsShortcut />
        <Shortcut.BlogShortcut />
        <Shortcut.ProfileShortcut />
        <Resume />
        <Settings />
        <Profile />
      </LayerManager>
      <LockScreen />
    </LockContext.Provider>
  );
};

export default Index;
