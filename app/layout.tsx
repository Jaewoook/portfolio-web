import "normalize.css";

import { Wallpaper } from "./components/Wallpaper";
import { main } from "./app.css";

import type { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <head>
        <title>Jaewook Ahn</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <main className={main}>
          <Wallpaper />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
