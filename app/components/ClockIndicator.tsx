"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

import * as css from "./ClockIndicator.css";

export const ClockIndicator = () => {
  const [time, setTime] = useState<Date>(new Date());
  const dateIndicator = useMemo(() => format(time, "EEEE, MMMM d"), [time])
  const timeIndicator = useMemo(() => format(time, "h:mm"), [time])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    }
  }, []);

  return (
    <section className={css.clockContainer}>
        <p className={css.dateIndicatorText}>{dateIndicator}</p>
        <p className={css.clockText}>{timeIndicator}</p>
      </section>
  );
};
