import { ClockIndicator } from "../ClockIndicator";
import { LoginProfile } from "../LoginProfile";
import { Wallpaper } from "../Wallpaper";
import * as css from "./lock-screen.css";

export const LockScreen = () => {
  return (
    <div className={css.wrapper}>
      <Wallpaper />
      <ClockIndicator />
      <LoginProfile />
    </div>
  );
};
