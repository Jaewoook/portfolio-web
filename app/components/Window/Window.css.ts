import { style, styleVariants } from "@vanilla-extract/css";

export const frame = style({
  position: "absolute",
  top: 30,
  left: 50,
  minWidth: 300,
  minHeight: 30,
  boxShadow: "rgba(0, 0, 0, 0.55) 0px 20px 68px",
  color: "#fff",
});

export const wrapper = style({
  backgroundColor: "#333",
  border: "1px solid #5c5c5c",
  borderRadius: 6,
});

export const header = style({
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
  close: [baseHeaderButton, { backgroundColor: "rgb(237, 101, 90)" }],
  minimize: [baseHeaderButton, { backgroundColor: "rgb(225, 192, 76)" }],
  maximize: [baseHeaderButton, { backgroundColor: "rgb(102, 108, 116)" }],
});

export const content = style({
  overflowY: "scroll",
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
