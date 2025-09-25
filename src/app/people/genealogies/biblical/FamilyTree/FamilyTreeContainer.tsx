"use client";
import { useEffect, useRef, useState } from "react";
import { FamilyTree } from "./FamilyTree";
import { FamilyTreeResponse } from "@/lib/types/FamilyTree";

export const FamilyTreeContainer = () => {
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<FamilyTreeResponse | null>(null);

  useEffect(() => {
    fetch("/api/family-tree")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Wait at least a second to prevent content flash
  useEffect(() => {
    timeout.current && clearTimeout(timeout.current);

    timeout.current = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => {
      timeout.current && clearTimeout(timeout.current);
    };
  }, [timeout.current]);

  return <FamilyTree isLoading={isLoading} data={data?.nodes} />;
};
