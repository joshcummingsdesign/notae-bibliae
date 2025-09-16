"use client";
import { Glossary } from "@/app/api/glossary/route";
import { createContext, useContext, useEffect, useState } from "react";

export interface DefinitionCtx {
  glossary: Glossary | null;
}

interface Props {
  children: React.ReactNode;
}

const DefinitionContext = createContext<DefinitionCtx | undefined>(undefined);

export const DefinitionProvider: React.FC<Props> = ({ children }) => {
  const [glossary, setGlossary] = useState<Glossary | null>(null);

  useEffect(() => {
    fetch("/api/glossary")
      .then((res) => res.json())
      .then((data) => setGlossary(data));
  }, []);

  return (
    <DefinitionContext.Provider value={{ glossary }}>
      {children}
    </DefinitionContext.Provider>
  );
};

export const useDefinition = () => useContext(DefinitionContext);
