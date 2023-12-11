import Image from "next/image";

import wallpaper_1 from "../../../public/images/wallpaper_1.jpg";
import * as css from "./Wallpaper.css";

export const Wallpaper = () => {
  return (
    <div className={css.container}>
      <Image className={css.image} fill src={wallpaper_1} alt="wallpaper" placeholder="blur" />
    </div>
  )
};
