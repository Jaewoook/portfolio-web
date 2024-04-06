import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const xPos = createVar();
export const yPos = createVar();
export const zIndex = createVar();

export const frame = style({
  position: "absolute",
  top: yPos,
  left: xPos,
  minWidth: 300,
  minHeight: 30,
  zIndex,
});

export const wrapper = style({
  color: "#fff",
  boxShadow: "rgba(0, 0, 0, 0.55) 0px 20px 68px",
  backgroundColor: "rgba(51, 51, 51, 0.85)",
  border: "1px solid #5c5c5c",
  borderRadius: 12,
  overflow: "hidden",
  backdropFilter: "blur(32px)",
});

export const header = style({
  height: 32,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "relative",
  padding: "8px 12px",
  fontSize: 14,
  userSelect: "none",
});

export const headerButtonGroup = style({
  display: "flex",
  flexFlow: "wrap",
  gap: 6,
  position: "absolute",
  left: 12,
});

const baseHeaderButton = style({
  width: 12,
  height: 12,
  border: "none",
  borderRadius: 6,
});

export const headerButton = styleVariants({
  close: [baseHeaderButton, { backgroundColor: "rgb(255, 95, 87)" }],
  minimize: [baseHeaderButton, { backgroundColor: "rgb(254, 188, 46)" }],
  maximize: [baseHeaderButton, { backgroundColor: "rgb(43, 200, 64)" }],
  disabled: [baseHeaderButton, { backgroundColor: "rgb(66, 65, 65)" }],
});

export const content = style({
  overflow: "scroll",
});

// const zoomIn = keyframes`
//     from {
//         transform: scale(0.4);
//         opacity: 0.6;
//     }
//     to {
//         transform: scale(1);
//         opacity: 1;
//     }
// `;
