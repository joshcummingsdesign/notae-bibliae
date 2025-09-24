"use client";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export const BibleGatewayLoader = () => {
  const pathname = usePathname();

  const load = () => {
    if (window.BGLinks) {
      window.BGLinks.version = "ESV";
      window.BGLinks.linkVerses();
    }
  };

  useEffect(() => {
    load();
  }, [pathname]);

  return (
    <Script
      src="https://www.biblegateway.com/public/link-to-us/tooltips/bglinks.js"
      onLoad={() => load()}
    />
  );
};
