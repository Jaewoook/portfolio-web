import { style } from "@vanilla-extract/css";

export const container = style({
  display: "flex",
  width: "fit-content",
  padding: "16px 0",
  margin: "0 auto",
  flexFlow: "column",
  gap: 8,
});

export const image = style({
  margin: "auto",
  objectFit: "cover",
  borderRadius: "50%",
});

export const name = style({
  marginTop: 16,
  marginBottom: 0,
  textAlign: "center",
  fontSize: 20,
});

export const role = style({
  color: "#7f7f7f",
  marginTop: 0,
  marginBottom: 24,
  fontSize: 12,
  textAlign: "center",
});

export const feature = style({
  margin: "auto",
  fontWeight: 300,
  fontSize: 14,
});

export const links = style({
  marginTop: 24,
  display: "flex",
  flexFlow: "wrap",
  justifyContent: "center",
  gap: 8,
});

export const link = style({
  fontSize: 16,
  color: "#fff",
  transition: "color .25s",
  ":hover": {
    color: "#cdcdcd",
  },
});
