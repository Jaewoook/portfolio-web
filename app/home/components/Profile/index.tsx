import Image from "next/image";
import Link from "next/link";
import { PiGithubLogo, PiLinkedinLogo } from "react-icons/pi";

import { Window } from "../../../components/Window";
import * as css from "./Profile.css";

export const Profile = () => {
  return (
    <Window x="40%" y="50px" maximizeDisabled minimizeDisabled>
      <div className={css.container}>
        <Image
        className={css.image}
          width={128}
          height={128}
          src="/images/profile.jpg"
          alt="profile image"
        />
        <h3 className={css.name}>Jaewook Ahn</h3>
        <h4 className={css.role}>Software Engineer</h4>
        <p className={css.feature}>Seoul, South Korea</p>
        <div className={css.links}>
          <Link
            className={css.link}
            href="https://github.com/Jaewoook"
            target="_blank"
          >
            <PiGithubLogo />
          </Link>
          <Link
            className={css.link}
            href="https://linkedin.com/in/ahnjaewook"
            target="_blank"
          >
            <PiLinkedinLogo />
          </Link>
        </div>
      </div>
    </Window>
  );
};
