import { style } from "@vanilla-extract/css";

const MENU_BORDER_RADIUS = 8;
const MENU_ITEM_BORDER_RADIUS = 6;

export const menuIndicator = style({
  display: "flex",
  flexFlow: "row",
  gap: 4,
  color: "#fff",
  fontSize: 14,
  alignItems: "center",
  position: "relative",
});

export const itemFrame = style({
  position: "absolute",
  top: "100%",
  left: -8,
  // TODO regularize z-index values
  zIndex: 20,
});

export const itemWrapper = style({
  color: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.55) 0px 10px 34px",
  backgroundColor: "#333",
  border: "1px solid #5c5c5c",
  borderRadius: MENU_BORDER_RADIUS,
  overflow: "hidden",
  padding: "6px",
  whiteSpace: "nowrap",
});

export const item = style({
  padding: "4px 8px",
  borderRadius: MENU_ITEM_BORDER_RADIUS,
  userSelect: "none",
  ":hover": {
    backgroundColor: "rgb(22 116 218)",
  },
});
