"use client";
import { format } from "date-fns";
import { useMemo } from "react";

import { useClock } from "../../hooks";
import * as css from "./MenuBar.css";

export const MenuBar = () => {
  const time = useClock();
  const clock = useMemo(() => format(time, "E MMM d") + "\u00A0\u00A0" + format(time, "h:mm a"), [time]);

  return (
    <nav className={css.container}>
      <div className={css.menuWrapper}>
      </div>
      <div className={css.rightMenuWrapper}>
        <p className={css.clock}>{clock}</p>
      </div>
    </nav>
  );
};
