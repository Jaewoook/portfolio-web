import { style, styleVariants } from "@vanilla-extract/css";

export const container = style({
  position: "relative",
});

export const selected = style({
  display: "flex",
  alignItems: "center",
  fontSize: 14,
  padding: "4px 6px",
  borderRadius: 6,
  userSelect: "none",
  transition: "all .15s ease-in-out",
  ":hover": {
    backgroundColor: "rgba(104, 100, 100, 1)",
  },
  ":after": {
    backgroundColor: "rgb(104, 100, 100)",
  },
  selectors: {
    "&:hover::after": {
      backgroundColor: "rgb(22, 100, 220)",
    },
  },
});

export const selectedExpandIndicator = style({
  marginLeft: 4,
});

export const baseOptions = style({
  position: "absolute",
  top: "calc(100% + 4px)",
  left: 0,
  right: 0,
  selectors: {
    "&:nth-child(n+1)": {
      marginTop: 4,
    },
  },
});

export const options = styleVariants({
  closed: [baseOptions, { display: "none" }],
  opened: [baseOptions],
});

export const option = style({
  fontSize: 14,
});
