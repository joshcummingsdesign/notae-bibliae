"use client";
import LinkBase, { LinkProps } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLoading } from "./Providers";

interface Props extends LinkProps {
  children: React.ReactNode;
}

export const Link = ({ onClick, ...props }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  const href = props.href.toString().split("?")[0];
  const isExternal = href.startsWith("http");
  const isHash = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick && onClick(e);

    // If external, bail
    if (isExternal) return;

    // If hash, bail
    if (isHash) return;

    // If pathname is same, bail
    if (pathname === href) return;

    // If user is trying to open in a new tab, bail
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();

    setIsLoading(true);

    requestAnimationFrame(() => {
      router.push(href);
    });
  };

  if (isExternal) {
    return (
      <LinkBase
        target="_blank"
        rel="noopener noreferrer"
        {...props}
        onClick={handleClick}
      />
    );
  }

  return <LinkBase {...props} onClick={handleClick} />;
};
