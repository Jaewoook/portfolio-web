import { createVar, keyframes, style } from "@vanilla-extract/css";

export const isVisible = createVar();

export const wrapper = style({
  position: "absolute",
  inset: 0,
  zIndex: 100,
  visibility: isVisible,
});

const unlock = keyframes({
  "0%": {
    opacity: 1,
  },
  "100%": {
    opacity: 0,
  }
});

const lock = keyframes({
  "0%": {
    opacity: 0,
  },
  "100%": {
    opacity: 1,
  },
});

export const unlockAnim = style([wrapper, {
  animationName: unlock,
  animationDuration: "0.25s",
  animationFillMode: "forwards",
}]);

export const lockAnim = style([wrapper, {
  animationName: lock,
  animationDuration: "0.25s",
  animationFillMode: "forwards",
}]);
