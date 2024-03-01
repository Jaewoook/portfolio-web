import { createContext } from "react";

export interface ILockContext {
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
}

export const LockContext = createContext<ILockContext>({
  isLocked: false,
  lock: () => {},
  unlock: () => {},
});
