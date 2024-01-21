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
  alignItems: "center",
  flex: 1,
});

export const rightMenuWrapper = style([menuWrapper, {
  flexDirection: "row-reverse",
  marginLeft: "auto",
}]);

export const clock = style({
  color: "#fff",
  fontSize: 14,
});
