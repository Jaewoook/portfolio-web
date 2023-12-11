import { style } from "@vanilla-extract/css";

export const clockContainer = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#fff",
  position: "absolute",
  top: "10%",
  left: 0,
  right: 0,
});

export const dateIndicatorText = style({
  fontWeight: 500,
  fontSize: 32,
});

export const clockText = style({
  fontWeight: 800,
  fontSize: 120,
});
