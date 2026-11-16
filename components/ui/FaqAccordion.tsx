import { ChevronDown } from "lucide-react";
import { BdiText } from "./BdiText";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  defaultOpenIndex?: number;
};

export function FaqAccordion({ items, defaultOpenIndex = 0 }: Props) {
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, idx) => (
        <details
          key={item.q}
          open={idx === defaultOpenIndex}
          className="group p-5 sm:p-6"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-bold text-navy transition-colors duration-200 hover:text-action">
            <span>
              <BdiText text={item.q} />
            </span>
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-ice/45 bg-mist text-action transition-transform duration-200 group-open:rotate-180 group-open:bg-ice/25">
              <ChevronDown className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
          </summary>
          <p className="mt-3.5 border-t border-line/70 pt-3.5 text-sm leading-relaxed text-slate">
            <BdiText text={item.a} />
          </p>
        </details>
      ))}
    </div>
  );
}
