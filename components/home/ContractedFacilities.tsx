"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Building2, ChevronDown } from "lucide-react";
import { formatNumber, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { siteConfig } from "@/lib/config/site";
import { BdiText } from "@/components/ui/BdiText";
import { TactileButton } from "@/components/ui/TactileButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Displays the 33 confirmed contracted healthcare facilities (31 MLP/Medical Park/University
 * facilities + 2 Liv Hospital Ulus & Vadistanbul facilities).
 * - Renders nothing if `siteConfig.partners` is empty.
 * - Shows a curated preview of 6 facilities by default with a smooth Motion expand/collapse
 *   to view all 33 facilities without overwhelming the page height.
 * - Uses official contract names only (no unverified logos or ratings).
 */
export function ContractedFacilities({ locale, dict }: Props) {
  const [expanded, setExpanded] = useState(false);

  if (!siteConfig.partners.length) return null;

  const t = dict.home.partners;
  const livFacilities = siteConfig.partners.filter((p) => p.group === "liv");
  const mlpFacilities = siteConfig.partners.filter((p) => p.group === "mlp");
  const preview = [...livFacilities, ...mlpFacilities.slice(0, 4)];

  return (
    <section className="border-t border-line-soft bg-mist-soft py-20 sm:py-24">
      <div className="container-page">
        <div className="mx-auto max-w-3xl text-center">
          <p>
            <span className="eyebrow">
              <Building2 className="h-3.5 w-3.5 text-action" strokeWidth={1.75} aria-hidden="true" />
              <span>{t.eyebrow}</span>
            </span>
          </p>
          <div className="section-heading mt-5">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl">
              {t.title}
            </h2>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate">
            <BdiText text={t.lead} />
          </p>
        </div>

        {/* Curated preview grid (6 facilities) */}
        {!expanded && (
          <div className="mt-10 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((facility, idx) => (
              <div
                key={facility.name}
                data-gsap-item
                className="flex items-center gap-3 rounded-2xl border border-line-soft bg-white px-4 py-3.5 shadow-soft transition-colors duration-200 hover:border-ice"
              >
                <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist text-xs font-bold text-action">
                  {formatNumber(idx + 1, locale, 2)}
                </span>
                <span dir="ltr" className="text-xs font-semibold leading-snug text-navy sm:text-[13px]">
                  {facility.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Full 33-facility list grouped by agreement */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-10 space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-action">
                    {t.groupLiv} ({formatNumber(livFacilities.length, locale)})
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    {livFacilities.map((facility, idx) => (
                      <div
                        key={facility.name}
                        className="flex items-center gap-3 rounded-xl border border-ice/50 bg-white px-4 py-3 shadow-soft"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist text-xs font-bold text-action">
                          {formatNumber(idx + 1, locale, 2)}
                        </span>
                        <span dir="ltr" className="text-xs font-semibold text-navy sm:text-[13px]">
                          {facility.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-action">
                    {t.groupMlp} ({formatNumber(mlpFacilities.length, locale)})
                  </h3>
                  <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {mlpFacilities.map((facility, idx) => (
                      <div
                        key={facility.name}
                        className="flex items-center gap-3 rounded-xl border border-line-soft bg-white px-4 py-3 shadow-soft"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist text-xs font-bold text-action">
                          {formatNumber(idx + 1, locale, 2)}
                        </span>
                        <span dir="ltr" className="text-xs font-semibold leading-snug text-navy sm:text-[13px]">
                          {facility.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex justify-center">
          <TactileButton
            variant="secondary"
            onClick={() => setExpanded((v) => !v)}
            className="min-h-11 px-6 py-2.5 text-sm"
          >
            <span>{expanded ? t.hideAll : t.showAll}</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expanded ? "rotate-180" : ""
              }`}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </TactileButton>
        </div>
      </div>
    </section>
  );
}
