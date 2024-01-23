import { style } from "@vanilla-extract/css";

export const container = style({
  height: 32,
  backgroundColor: "rgba(33, 33, 33, 0.4)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1,
  paddingLeft: 16,
  paddingRight: 16,
  display: "flex",
});

export const menuWrapper = style({
  display: "inline-flex",
  flexFlow: "row",
  alignItems: "center",
  gap: 20,
  flex: 1,
});

export const rightMenuWrapper = style([menuWrapper, {
  flexFlow: "row-reverse",
  marginLeft: "auto",
}]);

export const menuIndicator = style({
  display: "flex",
  flexFlow: "row",
  gap: 4,
  color: "#fff",
  fontSize: 14,
  alignItems: "center",
});

export const batteryIndicator = style([menuIndicator, {
  fontSize: 12,
}]);
