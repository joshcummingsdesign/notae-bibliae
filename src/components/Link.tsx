"use client";
import Link, { LinkProps } from "next/link";
import { useLoading } from "./LoadingProvider";

interface Props extends LinkProps {
  children: React.ReactNode;
}

export default function LinkWithTransition({ onClick, ...props }: Props) {
  const { setIsLoading } = useLoading();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsLoading(true);
    onClick && onClick(e);
  };

  return <Link {...props} onClick={handleClick} />;
}
