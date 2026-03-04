"use client";

import { AccordionItem } from "./accessible-accordion";

const faqItems = [
  {
    q: "Are these full book summaries?",
    a: "Yes. Each book page includes the full summary, key ideas, images, and structured metadata—all on the web.",
  },
  {
    q: "Do you include modern books?",
    a: "Only works that meet Canon standards for long-term influence and enduring relevance.",
  },
  {
    q: "How do you prevent low-quality entries?",
    a: "Every book must score strongly across the Canon Score dimensions; weak works are not published.",
  },
  {
    q: "Is this audio-first?",
    a: "No—reading-first, structured, and precise.",
  },
  {
    q: "How is this monetized?",
    a: "Free access for now. We may introduce optional paid features or support options in the future.",
  },
];

export function FaqAccordion() {
  return (
    <div className="grid gap-4">
      {faqItems.map((item) => (
        <AccordionItem key={item.q} title={item.q}>
          {item.a}
        </AccordionItem>
      ))}
    </div>
  );
}
