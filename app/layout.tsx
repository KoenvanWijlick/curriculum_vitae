import type { Metadata } from "next";
import { mantineHtmlProps } from "@mantine/core";
import { Analytics } from "@vercel/analytics/next";
import "@mantine/core/styles.css";
import "./module.css";
import Providers from "./providers";
import Navbar from "../components/Navbar/Navbar";
import ScrollScene from "../components/ScrollScene/ScrollScene";

export const metadata: Metadata = {
  metadataBase: new URL("https://koenvanwijlick.com"),
  title: {
    default: "Koen van Wijlick | Mechatronics & AI Engineer",
    template: "%s | Koen van Wijlick",
  },
  description:
    "Explore Koen van Wijlick’s experience, projects, and skills in mechatronics, robotics, and artificial intelligence.",
  icons: { icon: "/Icon.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" {...mantineHtmlProps} data-mantine-color-scheme="dark">
      <body>
        <Providers>
          <ScrollScene />
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          {process.env.VERCEL && <Analytics />}
        </Providers>
      </body>
    </html>
  );
}
