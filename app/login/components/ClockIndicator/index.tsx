"use client";
import { useMemo, useState } from "react";
import { format } from "date-fns";

import { useClock } from "../../../hooks";
import * as css from "./ClockIndicator.css";

export const ClockIndicator = () => {
  const time = useClock();
  const dateIndicator = useMemo(() => format(time, "EEEE, MMMM d"), [time])
  const timeIndicator = useMemo(() => format(time, "h:mm"), [time])

  return (
    <section className={css.clockContainer}>
        <p className={css.dateIndicatorText}>{dateIndicator}</p>
        <p className={css.clockText}>{timeIndicator}</p>
      </section>
  );
};
