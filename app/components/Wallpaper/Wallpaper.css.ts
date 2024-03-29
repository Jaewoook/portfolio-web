import { style } from "@vanilla-extract/css";

export const container = style({
  width: "100%",
  height: "100%",
  position: "absolute",
  inset: 0,
});

export const image = style({
  objectFit: "cover",
  userSelect: "none",
});
