import { createContext } from "react";

type MenuItemType = "default" | "check" | "sub-menu" | "divider";
export interface MenuItem {
  id: string;
  name: string;
  type: MenuItemType;
  disabled: boolean;
  checked: boolean;
  onClick: () => void;
}

export interface IMenuBarContext {
  openedMenuId: string | null;
  openMenu: (menuId: string) => void;
  closeMenu: () => void;
}

export const menuBarContext = createContext<IMenuBarContext>({
  openedMenuId: null,
  openMenu: (_) => {},
  closeMenu: () => {},
});
