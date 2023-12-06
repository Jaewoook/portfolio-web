import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  fontFamily: `"Noto Sans KR", sans-serif`,
});

globalStyle("p", {
  margin: 0,
});

export const main = style({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#000",
  position: "relative",
});
