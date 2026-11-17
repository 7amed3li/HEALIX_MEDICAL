"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Building2, MapPin, Search, ShieldCheck, X } from "lucide-react";
import { formatNumber, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import {
  facilities,
  formatFacilityName,
  type Facility,
  type FacilityBrand,
} from "@/content/facilities";
import { FacilityBadge } from "@/components/ui/FacilityBadge";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

type FilterKey = "all" | "liv" | "mp" | "university";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const brandTopBar: Record<FacilityBrand, string> = {
  "liv-hospital": "bg-brand-red",
  "medical-park": "bg-bright",
  "vm-medical-park": "bg-ice",
  "istinye-university": "bg-navy",
  "istanbul-aydin": "bg-action",
};

function matchesBrandFilter(brand: FacilityBrand, filter: FilterKey) {
  if (filter === "all") return true;
  if (filter === "liv") return brand === "liv-hospital";
  if (filter === "mp") return brand === "medical-park" || brand === "vm-medical-park";
  return brand === "istinye-university" || brand === "istanbul-aydin";
}

function FacilityCard({
  facility,
  dict,
  contactHref,
}: {
  facility: Facility;
  dict: Dictionary;
  contactHref: string;
}) {
  const t = dict.facilitiesPage;
  const displayName = formatFacilityName(facility.name);

  return (
    <SpotlightCard className="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-ice hover:shadow-card">
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 top-0 h-[3px] opacity-80 transition-opacity group-hover:opacity-100 ${brandTopBar[facility.brand]}`}
      />

      <div className="flex items-start gap-3.5 pt-0.5">
        <FacilityBadge brand={facility.brand} name={displayName} logo={facility.logo} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-[11px] font-semibold text-action">
              <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.75} aria-hidden="true" />
              <span>{facility.city}</span>
            </span>
            {facility.type === "dental" && (
              <span className="inline-flex items-center gap-1 rounded-full border border-ice/50 bg-mist-soft px-2.5 py-0.5 text-[11px] font-semibold text-navy">
                <Building2 className="h-3 w-3 text-action" strokeWidth={1.75} aria-hidden="true" />
                <span>{t.badges.dental}</span>
              </span>
            )}
          </div>

          <h3 dir="ltr" className="mt-2.5 text-[14.5px] font-semibold leading-snug text-navy">
            {displayName}
          </h3>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-line-soft pt-3 text-xs">
        <span className="font-medium text-slate">
          {facility.agreement === "liv" ? t.badges.agreementLiv : t.badges.hospital}
        </span>

        <Link
          href={contactHref}
          className="inline-flex items-center gap-1 font-semibold text-action transition-colors group-hover:text-bright"
        >
          <span>{t.enquireAction}</span>
          <ArrowRight
            className="flip-rtl h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={1.9}
            aria-hidden="true"
          />
        </Link>
      </div>
    </SpotlightCard>
  );
}

export function FacilitiesDirectory({ locale, dict }: Props) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [city, setCity] = useState<string>("all");
  const [query, setQuery] = useState<string>("");
  const t = dict.facilitiesPage;
  const contactHref = pagePath(locale, "contact");

  const cities = useMemo(() => {
    const counts = new Map<string, number>();
    for (const f of facilities) {
      counts.set(f.city, (counts.get(f.city) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  }, []);

  const filterOptions: { key: FilterKey; label: string; count: number }[] = [
    { key: "all", label: t.filters.all, count: facilities.length },
    {
      key: "liv",
      label: t.filters.liv,
      count: facilities.filter((f) => matchesBrandFilter(f.brand, "liv")).length,
    },
    {
      key: "mp",
      label: t.filters.mp,
      count: facilities.filter((f) => matchesBrandFilter(f.brand, "mp")).length,
    },
    {
      key: "university",
      label: t.filters.university,
      count: facilities.filter((f) => matchesBrandFilter(f.brand, "university")).length,
    },
  ];

  const isDefaultView = filter === "all" && city === "all" && query.trim() === "";

  const flagshipLiv = useMemo(
    () => facilities.filter((f) => f.agreement === "liv"),
    []
  );
  const otherLiv = useMemo(
    () => facilities.filter((f) => f.brand === "liv-hospital" && f.agreement !== "liv"),
    []
  );
  const medicalParkGroup = useMemo(
    () => facilities.filter((f) => f.brand === "medical-park"),
    []
  );
  const vmMedicalParkGroup = useMemo(
    () => facilities.filter((f) => f.brand === "vm-medical-park"),
    []
  );
  const universityGroup = useMemo(
    () =>
      facilities.filter(
        (f) => f.brand === "istinye-university" || f.brand === "istanbul-aydin"
      ),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return facilities.filter((f) => {
      if (!matchesBrandFilter(f.brand, filter)) return false;
      if (city !== "all" && f.city !== city) return false;
      if (q && !f.name.toLowerCase().includes(q) && !f.city.toLowerCase().includes(q)) {
        return false;
      }
      return true;
    });
  }, [filter, city, query]);

  const resetAll = () => {
    setFilter("all");
    setCity("all");
    setQuery("");
  };

  return (
    <div className="space-y-12">
      {/* Control Bar: Search + City + Brand Filter Tabs */}
      <div className="rounded-2xl border border-line bg-mist/60 p-4 sm:p-5">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="relative md:col-span-8">
            <Search
              className="pointer-events-none absolute start-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              aria-label={t.searchPlaceholder}
              className="h-11 w-full rounded-xl border border-line bg-white pe-10 ps-10 text-sm text-navy placeholder:text-slate/70 focus:border-bright focus:outline-none focus:ring-2 focus:ring-bright/20"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label={t.resetFilters}
                className="absolute end-2.5 top-1/2 -translate-y-1/2 rounded-full p-1 text-slate hover:bg-mist hover:text-navy"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            )}
          </div>

          <div className="md:col-span-4">
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              aria-label={t.allCities}
              className="h-11 w-full cursor-pointer rounded-xl border border-line bg-white px-3.5 text-sm font-medium text-navy focus:border-bright focus:outline-none focus:ring-2 focus:ring-bright/20"
            >
              <option value="all">
                {t.allCities} ({formatNumber(facilities.length, locale)})
              </option>
              {cities.map(([cityName, count]) => (
                <option key={cityName} value={cityName}>
                  {cityName} ({formatNumber(count, locale)})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Brand Filter Pills */}
        <div
          role="tablist"
          aria-label={t.eyebrow}
          className="mt-4 flex flex-wrap items-center gap-2"
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
                className={`relative inline-flex min-h-10 cursor-pointer items-center gap-2 overflow-hidden rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors duration-200 sm:text-sm ${
                  active
                    ? "border-navy text-white shadow-soft"
                    : "border-line bg-white text-navy hover:border-ice hover:bg-white/90"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="facility-filter-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 z-0 rounded-full bg-navy"
                    aria-hidden="true"
                  />
                )}
                <span className="relative z-10">{opt.label}</span>
                <span
                  className={`relative z-10 rounded-full px-2 py-0.5 text-[11px] ${
                    active ? "bg-white/15 text-ice-soft" : "bg-mist text-action"
                  }`}
                >
                  {formatNumber(opt.count, locale)}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {isDefaultView ? (
        <div className="space-y-12">
          {/* 1. Flagship Dedicated Liv Hospital Agreement + Other Liv Hospitals */}
          <section aria-labelledby="group-liv-heading">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-brand-red" strokeWidth={1.8} aria-hidden="true" />
                <h2 id="group-liv-heading" className="text-lg font-bold text-navy sm:text-xl">
                  {t.filters.liv}
                </h2>
              </div>
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-action">
                {formatNumber(flagshipLiv.length + otherLiv.length, locale)}
              </span>
            </div>

            {/* Dedicated 2-facility flagship row */}
            <div className="grid gap-4 md:grid-cols-2">
              {flagshipLiv.map((facility) => {
                const displayName = formatFacilityName(facility.name);
                return (
                  <div
                    key={facility.id}
                    className="surface-dark relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 p-6 text-white shadow-card"
                  >
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-brand-red/15 blur-2xl"
                    />
                    <div className="relative z-10 flex items-start gap-4">
                      <FacilityBadge
                        brand={facility.brand}
                        name={displayName}
                        logo={facility.logo}
                        size="lg"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-ice-soft">
                          <MapPin className="h-3 w-3" strokeWidth={1.75} aria-hidden="true" />
                          <span>{facility.city}</span>
                        </span>
                        <h3 dir="ltr" className="mt-2.5 text-base font-bold tracking-tight text-white sm:text-lg">
                          {displayName}
                        </h3>
                      </div>
                    </div>

                    <div className="relative z-10 mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 text-xs">
                      <span className="rounded-full bg-white/10 px-3 py-1 font-medium text-white/85">
                        {t.badges.agreementLiv}
                      </span>
                      <Link
                        href={contactHref}
                        className="inline-flex items-center gap-1.5 font-semibold text-ice-soft transition-colors hover:text-white"
                      >
                        <span>{t.enquireAction}</span>
                        <ArrowRight className="flip-rtl h-3.5 w-3.5" strokeWidth={1.8} aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Remaining 3 Liv Hospitals under MLP agreement */}
            <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {otherLiv.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  dict={dict}
                  contactHref={contactHref}
                />
              ))}
            </div>
          </section>

          {/* 2. Medical Park */}
          <section aria-labelledby="group-mp-heading">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-bright" aria-hidden="true" />
                <h2 id="group-mp-heading" className="text-lg font-bold text-navy sm:text-xl">
                  Medical Park
                </h2>
              </div>
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-action">
                {formatNumber(medicalParkGroup.length, locale)}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {medicalParkGroup.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  dict={dict}
                  contactHref={contactHref}
                />
              ))}
            </div>
          </section>

          {/* 3. VM Medical Park */}
          <section aria-labelledby="group-vm-heading">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-ice" aria-hidden="true" />
                <h2 id="group-vm-heading" className="text-lg font-bold text-navy sm:text-xl">
                  VM Medical Park
                </h2>
              </div>
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-action">
                {formatNumber(vmMedicalParkGroup.length, locale)}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {vmMedicalParkGroup.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  dict={dict}
                  contactHref={contactHref}
                />
              ))}
            </div>
          </section>

          {/* 4. University Medical & Dental Centers */}
          <section aria-labelledby="group-uni-heading">
            <div className="mb-5 flex items-center justify-between border-b border-line pb-3">
              <div className="flex items-center gap-2.5">
                <span className="h-2.5 w-2.5 rounded-full bg-navy" aria-hidden="true" />
                <h2 id="group-uni-heading" className="text-lg font-bold text-navy sm:text-xl">
                  {t.filters.university}
                </h2>
              </div>
              <span className="rounded-full bg-mist px-3 py-1 text-xs font-bold text-action">
                {formatNumber(universityGroup.length, locale)}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {universityGroup.map((facility) => (
                <FacilityCard
                  key={facility.id}
                  facility={facility}
                  dict={dict}
                  contactHref={contactHref}
                />
              ))}
            </div>
          </section>
        </div>
      ) : filtered.length === 0 ? (
        <div className="rounded-2xl border border-line bg-mist/40 px-6 py-12 text-center">
          <p className="text-sm font-medium text-slate-strong">{t.noResults}</p>
          <button
            type="button"
            onClick={resetAll}
            className="mt-4 inline-flex cursor-pointer items-center rounded-full bg-navy px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-action"
          >
            {t.resetFilters}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              dict={dict}
              contactHref={contactHref}
            />
          ))}
        </div>
      )}
    </div>
  );
}
