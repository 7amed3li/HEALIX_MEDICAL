"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Building2, MapPin } from "lucide-react";
import { formatNumber, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { facilities, type FacilityBrand } from "@/content/facilities";
import { FacilityBadge } from "@/components/ui/FacilityBadge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type FilterKey = "all" | "liv" | "mp" | "university";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

function matchesFilter(brand: FacilityBrand, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "liv") return brand === "liv-hospital";
  if (filter === "mp") return brand === "medical-park" || brand === "vm-medical-park";
  return brand === "istinye-university" || brand === "istanbul-aydin";
}

export function FacilitiesDirectory({ locale, dict }: Props) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const t = dict.facilitiesPage;

  const filterOptions: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: t.filters.all, count: facilities.length },
    {
      key: "liv",
      label: t.filters.liv,
      count: facilities.filter((f) => matchesFilter(f.brand, "liv")).length,
    },
    {
      key: "mp",
      label: t.filters.mp,
      count: facilities.filter((f) => matchesFilter(f.brand, "mp")).length,
    },
    {
      key: "university",
      label: t.filters.university,
      count: facilities.filter((f) => matchesFilter(f.brand, "university")).length,
    },
  ];

  const visible = facilities.filter((f) => matchesFilter(f.brand, filter));

  return (
    <div>
      {/* Interactive filter pills with Motion layoutId indicator */}
      <div
        role="tablist"
        aria-label={t.eyebrow}
        className="flex flex-wrap items-center gap-2.5"
      >
        {filterOptions.map((opt) => {
          const active = filter === opt.key;
          return (
            <button
              key={opt.key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setFilter(opt.key)}
              className={`relative inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                active
                  ? "border-navy bg-navy text-white shadow-soft"
                  : "border-line bg-white text-navy hover:border-ice hover:bg-mist/60"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="facility-filter-pill"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  className="absolute inset-0 -z-10 rounded-full bg-navy"
                  aria-hidden="true"
                />
              )}
              <span>{opt.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  active ? "bg-white/15 text-ice-soft" : "bg-mist text-action"
                }`}
              >
                {formatNumber(opt.count, locale)}
              </span>
            </button>
          );
        })}
      </div>

      {/* Facility cards grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((facility, idx) => (
          <SpotlightCard
            key={facility.id}
            className="flex flex-col justify-between rounded-2xl border border-line-soft bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-ice hover:shadow-card"
          >
            <div className="flex items-start gap-4">
              <FacilityBadge
                brand={facility.brand}
                name={facility.name}
                logo={facility.logo}
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-action">
                    <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                    <span>{facility.city}</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate">
                    {formatNumber(idx + 1, locale, 2)}
                  </span>
                </div>

                <h3
                  dir="ltr"
                  className="mt-1.5 text-sm font-bold leading-snug text-navy"
                >
                  {facility.name}
                </h3>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-line-soft pt-3 text-[11px] text-slate">
              <span className="inline-flex items-center gap-1.5 font-medium text-navy">
                <Building2 className="h-3.5 w-3.5 text-action" strokeWidth={1.75} aria-hidden="true" />
                <span>
                  {facility.type === "dental" ? t.badges.dental : t.badges.hospital}
                </span>
              </span>
              <span className="rounded-full bg-mist px-2.5 py-0.5 font-medium text-slate-strong">
                {facility.agreement === "liv"
                  ? t.badges.agreementLiv
                  : t.badges.agreementMlp}
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
}
