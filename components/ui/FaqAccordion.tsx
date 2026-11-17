"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { BdiText } from "./BdiText";

export type FaqItem = { q: string; a: string };

type Props = {
  items: FaqItem[];
  defaultOpenIndex?: number;
};

/**
 * Smooth, accessible accordion powered by Motion (`AnimatePresence`):
 * - Uses native `<button>` with `aria-expanded` & `aria-controls` for full keyboard & screen-reader support.
 * - Smooth height & opacity transition (`240ms`, no abrupt jumps).
 */
export function FaqAccordion({ items, defaultOpenIndex = 0 }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(
    defaultOpenIndex >= 0 ? defaultOpenIndex : null
  );

  return (
    <div className="divide-y divide-line-soft rounded-[1.5rem] border border-line-soft bg-white shadow-soft">
      {items.map((item, idx) => {
        const isOpen = openIndex === idx;
        const panelId = `faq-panel-${idx}`;
        return (
          <div key={item.q} className="p-5 sm:p-6">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              className="flex w-full cursor-pointer items-center justify-between gap-4 text-start text-base font-bold text-navy transition-colors duration-200 hover:text-action"
            >
              <span>
                <BdiText text={item.q} />
              </span>
              <span
                className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                  isOpen
                    ? "border-ice bg-navy text-white"
                    : "border-ice/45 bg-mist text-action"
                }`}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="mt-3.5 border-t border-line-soft pt-3.5 text-sm leading-relaxed text-slate-strong">
                    <BdiText text={item.a} />
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
