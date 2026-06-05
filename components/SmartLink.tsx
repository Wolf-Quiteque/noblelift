import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  download?: boolean;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

// Chooses next/link for in-app routes and a plain <a> for everything else
// (PDF/asset downloads, tel:, mailto:, #, and external http links).
export default function SmartLink({ href, children, download, ...rest }: Props) {
  const isInApp =
    href.startsWith("/") && !href.startsWith("/assets") && !download;

  if (isInApp) {
    return (
      <Link href={href} {...rest}>
        {children}
      </Link>
    );
  }

  const isExternal = /^https?:\/\//.test(href);
  const externalAttrs = isExternal ? { target: "_blank", rel: "noopener" } : {};

  return (
    <a href={href} download={download} {...externalAttrs} {...rest}>
      {children}
    </a>
  );
}
