"use client";

import { useState, useId } from "react";

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function AccordionItem({
  title,
  children,
  defaultOpen = false,
}: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();
  const contentId = `accordion-content-${id}`;
  const buttonId = `accordion-button-${id}`;

  return (
    <div className="hc-card overflow-hidden">
      <button
        id={buttonId}
        type="button"
        aria-expanded={open}
        aria-controls={contentId}
        onClick={() => setOpen(!open)}
        className="flex w-full min-h-[24px] min-w-[24px] items-center justify-between gap-4 px-4 py-4 text-left text-sm font-medium text-text transition-colors hover:bg-panel2 focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-bg"
      >
        {title}
        <span
          className="shrink-0 text-muted transition-transform"
          aria-hidden
        >
          {open ? "−" : "+"}
        </span>
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        hidden={!open}
        className={open ? "block" : "hidden"}
      >
        <div className="border-t border-border px-4 py-3 text-sm leading-relaxed text-muted">
          {children}
        </div>
      </div>
    </div>
  );
}
