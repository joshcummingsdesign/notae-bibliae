"use client";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useTransition,
} from "react";

export interface LoadingCtx {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

interface Props {
  children: React.ReactNode;
}

const LoadingContext = createContext<LoadingCtx>({
  isLoading: true,
  setIsLoading: () => {},
});

export const LoadingProvider: React.FC<Props> = ({ children }) => {
  const pathname = usePathname();
  const [isPending] = useTransition();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  return (
    <LoadingContext.Provider
      value={{ isLoading: isLoading || isPending, setIsLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
