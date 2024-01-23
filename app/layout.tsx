import "normalize.css";

import { Wallpaper } from "./components/Wallpaper";
import { main } from "./app.css";

import type { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <head>
        <title>Jaewook Ahn - Portfolio</title>
        <meta name="description" content="Jaewook Ahn's Portfolio Website" />
        <meta name="og:type" content="website" />
        <meta name="og:title" content="Jaewook Ahn - Portfolio" />
        <meta name="og:description" content="Jaewook Ahn's Portfolio Website" />
        <meta name="og:url" content="https://portfolio.jaewook.me" />
        <meta name="og:image" content="https://portfolio.jaewook.me/thumbnail.png" />
        <meta name="og:locale" content="en_US" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
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
