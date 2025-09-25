"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export interface LayoutCtx {
  isFullWidth: boolean;
}

interface Props {
  children: React.ReactNode;
}

const LayoutContext = createContext<LayoutCtx>({
  isFullWidth: false,
});

export const LayoutProvider: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const [isFullWidth, setIsFullWidth] = useState(false);

  useEffect(() => {
    const fullWidthPaths = ["/people/genealogies/biblical"];

    if (fullWidthPaths.includes(pathname)) {
      setIsFullWidth(true);
    } else {
      setIsFullWidth(false);
    }
  }, [pathname]);

  return (
    <LayoutContext.Provider value={{ isFullWidth }}>
      {children}
    </LayoutContext.Provider>
  );
};

export const useLayout = () => useContext(LayoutContext);
