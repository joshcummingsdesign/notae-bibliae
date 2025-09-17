"use client";
import Link, { LinkProps } from "next/link";
import { useLoading } from "./LoadingProvider";
import { usePathname } from "next/navigation";

interface Props extends LinkProps {
  children: React.ReactNode;
}

export default function LinkWithTransition({ onClick, ...props }: Props) {
  const { setIsLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick && onClick(e);

    // If pathname is same, bail
    if (pathname === props.href.toString().split("?")[0]) return;

    // If user is trying to open in a new tab, bail
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    setIsLoading(true);
  };

  return <Link {...props} onClick={handleClick} />;
}
