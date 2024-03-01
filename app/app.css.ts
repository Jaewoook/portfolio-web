import { globalStyle, style } from "@vanilla-extract/css";

globalStyle("body", {
  fontFamily: `"Noto Sans KR", sans-serif`,
  boxSizing: "border-box",
});

globalStyle("*, *:before, *:after", {
  boxSizing: "border-box",
});

globalStyle("p, ul", {
  margin: 0,
});

export const main = style({
  width: "100vw",
  height: "100vh",
  backgroundColor: "#000",
  position: "relative",
});
