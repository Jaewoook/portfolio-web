"use client";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { IoBatteryCharging, IoBatteryFull, IoBatteryHalf } from "react-icons/io5";

import { useClock } from "../../hooks";
import * as css from "./MenuBar.css";

const ClockIndicator = () => {
  const time = useClock();
  const clock = useMemo(() => format(time, "E MMM d") + "\u00A0\u00A0" + format(time, "h:mm a"), [time]);

  return <p className={css.menuIndicator}>{clock}</p>;
};

const BatteryIndicator = () => {
  const [battery, setBattery] = useState<Battery>({
    charging: false,
    chargingTime: 0,
    dischargingTime: 0,
    level: 1,
  });
  const batteryPercent = useMemo(() => (battery.level * 100).toString() + "%", [battery]);
  const batteryIcon = useMemo(() => {
    if (battery.charging) {
      return <IoBatteryCharging size={22} />;
    }

    if (battery.level !== 1) {
      return <IoBatteryHalf size={22} />;
    }

    return <IoBatteryFull size={22} />;
  }, [battery]);

  useEffect(() => {
    window.navigator.getBattery?.().then((battery) => setBattery(battery));
  }, []);

  return (
    <p className={css.batteryIndicator}>
      {batteryPercent}
      {batteryIcon}
    </p>
  );
};

export const MenuBar = () => {
  return (
    <nav className={css.container}>
      <div className={css.menuWrapper}></div>
      <div className={css.rightMenuWrapper}>
        <ClockIndicator />
        <BatteryIndicator />
      </div>
    </nav>
  );
};
