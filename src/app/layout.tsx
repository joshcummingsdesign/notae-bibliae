import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Main } from "@/components/Main";
import { Navigation } from "@/components/Navigation";
import { BibleGatewayLoader } from "@/components/BibleGatewayLoader";
import { MermaidLoader } from "@/components/Mermaid";
import "@/assets/styles/global.scss";

interface Props {
  children: React.ReactNode;
}

const rediviva = localFont({
  src: "../assets/fonts/rediviva.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-rediviva",
  display: "swap",
});

const canterbury = localFont({
  src: "../assets/fonts/canterbury.ttf",
  weight: "400",
  style: "normal",
  variable: "--font-canterbury",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const metadata: Metadata = {
  title: "Notae Bibliae",
  description: "A collection of biblical, liturgical, and historical notes.",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

const fontVariables = `${rediviva.variable} ${canterbury.variable} ${ebGaramond.variable}`;

export default function RootLayout({ children }: Props) {
  return (
    <Providers>
      <html lang="en" className={fontVariables}>
        <body>
          <Navigation />
          <Main>{children}</Main>
          <BibleGatewayLoader />
          <MermaidLoader />
        </body>
      </html>
    </Providers>
  );
}
