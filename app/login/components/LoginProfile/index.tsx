import Image from "next/image";
import Link from "next/link";
import { PiArrowCircleRightThin } from "react-icons/pi";

import * as css from "./LoginProfile.css";


export const LoginProfile = () => {

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
        <Link className={css.unlockText} href="/home">
          Click to unlock <PiArrowCircleRightThin className={css.unlockIcon} />
        </Link>
      </div>
    </section>
  );
};
