import { style } from "@vanilla-extract/css";

export const userContainer = style({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "absolute",
  top: "80%",
});

export const avatar = style({
  width: 60,
  height: 60,
  objectFit: "cover",
  borderRadius: 36,
});

export const nameBox = style({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: 8,
  position: "relative",
  color: "#fff",
});

export const nameText = style({
  fontSize: 18,
  fontWeight: 600,
});

export const unlockText = style({
  display: "flex",
  flexFlow: "wrap",
  alignContent: "baseline",
  marginTop: 24,
  cursor: "pointer",
  fontSize: 12,
  fontWeight: 200,
  gap: 6,
  color: "#ededed",
  textDecoration: "none",
  ":hover": {
    color: "#fff",
  },
});

export const unlockIcon = style({
  selectors: {
    [`${unlockText} > &`]: {
      color: "inherit",
      fontSize: 16,
    },
  },
});
