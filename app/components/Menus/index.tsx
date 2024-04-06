"use client";
import { format } from "date-fns";
import { useContext, useEffect, useMemo, useState } from "react";
import { IoBatteryCharging, IoBatteryFull, IoBatteryHalf, IoCodeSlash } from "react-icons/io5";

import { LockContext } from "@/contexts/LockContext";
import { useClock } from "@/hooks";

import { Menu } from "../Menu";
import { menuIndicator } from "../Menu/Menu.css";
import * as css from "./Menus.css";

export const PortfolioMenu = () => {
  const { lock } = useContext(LockContext);
  return (
    <Menu
      menuId="menu-portfolio"
      name={<IoCodeSlash size={24} />}
      menuItems={[
        {
          id: "about-this-site",
          name: "About This Site",
          type: "default",
          checked: false,
          disabled: false,
          onClick: () => {},
        },
        {
          id: "lock-screen",
          name: "Lock Screen",
          type: "default",
          checked: false,
          disabled: false,
          onClick: lock,
        }
      ]}
    />
  );
};

export const ClockIndicator = () => {
  const time = useClock();
  const clock = useMemo(() => format(time, "E MMM d") + "\u00A0\u00A0" + format(time, "h:mm a"), [time]);

  return <p className={menuIndicator}>{clock}</p>;
};

export const BatteryIndicator = () => {
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
