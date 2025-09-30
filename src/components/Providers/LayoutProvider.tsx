"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export interface LayoutCtx {
  layout: "full-width" | "wide" | "default";
}

interface Props {
  children: React.ReactNode;
}

const LayoutContext = createContext<LayoutCtx>({
  layout: "default",
});

export const LayoutProvider: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const [layout, setLayout] = useState<LayoutCtx["layout"]>("default");

  useEffect(() => {
    const fullWidthPaths = ["/people/genealogies/biblical"];
    const widePaths = ["/people/pagan-rulers"];

    if (fullWidthPaths.includes(pathname)) {
      setLayout("full-width");
    } else if (widePaths.includes(pathname)) {
      setLayout("wide");
    } else {
      setLayout("default");
    }
  }, [pathname]);

  return (
    <LayoutContext.Provider value={{ layout }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
