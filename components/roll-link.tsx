"use client";

import Link from "next/link";

interface RollLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

/**
 * Roll-up link hover animation (Webflow style).
 * Two text layers; on hover both translate up so the clone replaces the original.
 */
export function RollLink({ href, children, className = "" }: RollLinkProps) {
  return (
    <Link href={href} className={`roll-link ${className}`.trim()}>
      <span className="roll-wrap">
        <span className="roll-text">{children}</span>
        <span className="roll-clone" aria-hidden>
          {children}
        </span>
      </span>
    </Link>
  );
}
