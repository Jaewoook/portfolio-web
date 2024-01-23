import type { Metadata } from "next";
import "normalize.css";

import { Wallpaper } from "./components/Wallpaper";
import { main } from "./app.css";

import type { PropsWithChildren } from "react";

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="ko">
      <head>
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

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio.jaewook.me"),
  title: "Jaewook Ahn - Portfolio",
  description: "Jaewook Ahn's Portfolio Website",
  applicationName: "Jaewook Ahn | Portfolio",
  authors: {
    name: "Jaewook Ahn",
    url: "https://jaewook.me",
  },
  appleWebApp: {
    capable: true,
    title: "Jaewook Ahn | Portfolio",
  },
  category: "Portfolio",
  colorScheme: "dark",
  openGraph: {
    type: "website",
    description: "Jaewook Ahn's Portfolio Website",
    title: "Jaewook Ahn - Portfolio",
    url: "https://portfolio.jaewook.me",
    locale: "ko_KR",
    alternateLocale: "en_US",
  },
};

export default RootLayout;
