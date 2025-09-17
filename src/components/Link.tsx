"use client";
import Link, { LinkProps } from "next/link";
import { useLoading } from "./LoadingProvider";

interface Props extends LinkProps {
  children: React.ReactNode;
}

export default function LinkWithTransition({ onClick, ...props }: Props) {
  const { setIsLoading } = useLoading();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick && onClick(e);
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    setIsLoading(true);
  };

  return <Link {...props} onClick={handleClick} />;
}
