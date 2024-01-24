"use client";
import { useCallback, useState } from "react";

import { menuBarContext } from "../../contexts/MenuBarContext";
import type { IMenuBarContext } from "../../contexts/MenuBarContext";
import * as css from "./MenuBar.css";

interface Props {
  leftMenu: React.ReactNode;
  rightMenu: React.ReactNode;
}

export const MenuBar = (props: Props) => {
  const { leftMenu, rightMenu } = props;
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  const openMenu = useCallback((menuId: string) => setOpenedMenuId(menuId), []);
  const closeMenu = useCallback(() => setOpenedMenuId(null), []);
  const value: IMenuBarContext = { openedMenuId, openMenu, closeMenu };

  return (
    <menuBarContext.Provider value={value}>
      <nav className={css.container}>
        <div className={css.wrapper}>
          {leftMenu}
        </div>
        <div className={css.rightMenuWrapper}>
          {rightMenu}
        </div>
      </nav>
    </menuBarContext.Provider>
  );
};
