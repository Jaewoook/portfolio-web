import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "16px 12px",
});

export const list = style({
  padding: "12px 8px",
  borderRadius: 4,
  border: "1px solid #5c5c5c",
});

export const row = style({
  display: "flex",
});

export const rowLabel = style({
  fontSize: 14,
  color: "#fff",
});
