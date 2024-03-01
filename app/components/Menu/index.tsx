"use client";
import { useCallback, useContext } from "react";

import type { MenuItem } from "../../contexts/MenuBarContext";
import { menuBarContext } from "../../contexts/MenuBarContext";
import { useOutsideClick } from "../../hooks";
import * as css from "./Menu.css";

interface Props {
  menuId: string;
  name: string | React.ReactNode;
  menuItems: MenuItem[];
}

export const Menu = (props: Props) => {
  const { menuId, name, menuItems } = props;
  const { openedMenuId, openMenu, closeMenu } = useContext(menuBarContext);
  const ref = useOutsideClick<HTMLDivElement>(() => closeMenu());

  const handleClick = useCallback(() => {
    if (openedMenuId !== menuId) {
      openMenu(menuId);
    } else {
      closeMenu();
    }
  }, [openedMenuId, menuId, closeMenu, openMenu]);

  return (
    <div className={css.menuIndicator} ref={ref}>
      <p onClick={handleClick}>{name}</p>
      <div className={css.itemFrame} style={{ visibility: openedMenuId === menuId ? "visible" : "hidden" }}>
        <ul className={css.itemWrapper}>
          {menuItems.map((menuItem) => (
            <li key={`${menuItem.type}-${menuItem.name}`} className={css.item} onClick={menuItem.onClick}>
              {menuItem.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
