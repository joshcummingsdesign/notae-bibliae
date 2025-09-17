import { useEffect, useState } from "react";

export const useHash = (): string => {
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash(); // set on mount
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return hash;
};
