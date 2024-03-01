"use client";
import Image from "next/image";
import { useContext } from "react";
import { PiArrowCircleRightThin } from "react-icons/pi";

import { LockContext } from "@/contexts/LockContext";
import * as css from "./LoginProfile.css";

export const LoginProfile = () => {
  const { unlock } = useContext(LockContext);

  return (
    <section className={css.userContainer}>
      <Image
        className={css.avatar}
        width={72}
        height={72}
        src="/images/profile.jpg"
        alt="profile image"
      />
      <div className={css.nameBox}>
        <p className={css.nameText}>Jaewook Ahn</p>
        <a className={css.unlockText} onClick={unlock}>
          Click to unlock <PiArrowCircleRightThin className={css.unlockIcon} />
        </a>
      </div>
    </section>
  );
};
