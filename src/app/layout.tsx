import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { EB_Garamond } from "next/font/google";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/theme";

const roboto = EB_Garamond({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

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

export const metadata: Metadata = {
  title: "Notae Bibliae",
  description: "A collection of biblical, liturgical, and historical notes.",
  robots: "noindex, nofollow",
};

export const viewport: Viewport = {
  initialScale: 1,
  width: "device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <html
          lang="en"
          className={`${rediviva.variable} ${canterbury.variable}`}
        >
          <body>
            <main>{children}</main>
          </body>
        </html>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
