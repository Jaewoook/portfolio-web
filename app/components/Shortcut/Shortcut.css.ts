import { createVar, style, styleVariants } from "@vanilla-extract/css";

export const xPos = createVar();
export const yPos = createVar();

export const bound = style({
  position: "absolute",
  left: xPos,
  top: yPos,
});

export const container = style({
  display: "flex",
  flexFlow: "column wrap",
  alignItems: "center",
  gap: 2,
  padding: 8,
});

const baseIconWrapper = style({
  width: 80,
  height: 80,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 72,
  lineHeight: 1,
  color: "white",
});

export const iconWrapper = styleVariants({
  default: [baseIconWrapper],
  selected: [baseIconWrapper, {
    borderColor: "rgba(120, 120, 120, 0.8)",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 4,
    backgroundColor: "rgba(0, 0, 0, 0.3)"
  }],
});

const baseLabel = style({
  width: "fit-content",
  fontSize: 14,
  lineHeight: 1,
  fontWeight: 500,
  color: "#fff",
  userSelect: "none",
  padding: "4px 2px",
  textShadow: "0 2px 2px #545454",
});

export const label = styleVariants({
  default: [baseLabel],
  selected: [baseLabel, {
    backgroundColor: "rgba(0, 28, 209, 0.8)",
    textShadow: "none",
  }],
})
