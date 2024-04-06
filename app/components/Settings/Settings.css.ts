import { style } from "@vanilla-extract/css";

export const container = style({
  padding: "14px 20px",
});

export const list = style({
  padding: "0 8px",
  borderRadius: 4,
  border: "1px solid #5c5c5c",
});

export const row = style({
  display: "flex",
  alignItems: "center",
  minHeight: 48,
  padding: "0 4px",
  fontSize: 14,
  selectors: {
    "&:nth-child(n+2)": {
      borderTop: "1px solid rgb(63, 58, 58)",
    },
  },
});

export const rowLabel = style({
  fontSize: 14,
  color: "#fff",
  marginRight: "auto",
});

export const infoText = style({
  marginTop: 16,
  fontSize: 12,
  color: "rgba(255, 255, 255, 0.6)"
});
