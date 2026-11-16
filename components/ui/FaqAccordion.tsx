import { ChevronDown } from "lucide-react";
import { BdiText } from "./BdiText";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  defaultOpenIndex?: number;
};

/**
 * Refined editorial accordion: serif questions, hairline dividers,
 * and a medallion chevron that fills with navy when open.
 */
export function FaqAccordion({ items, defaultOpenIndex = 0 }: Props) {
  return (
    <div className="divide-y divide-line-soft overflow-hidden rounded-[1.5rem] border border-line-soft bg-white shadow-card">
      {items.map((item, idx) => (
        <details key={item.q} open={idx === defaultOpenIndex} className="group px-6 sm:px-8">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 [&::-webkit-details-marker]:hidden">
            <span className="display-type text-[1.08rem] font-medium leading-snug text-navy transition-colors duration-300 group-hover:text-action sm:text-[1.15rem]">
              <BdiText text={item.q} />
            </span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line bg-mist-soft text-action transition-all duration-300 group-open:rotate-180 group-open:border-navy group-open:bg-navy group-open:text-gold-soft">
              <ChevronDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </summary>
          <p className="border-t border-line-soft pb-6 pt-4 text-sm leading-[1.8] text-slate">
            <BdiText text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
