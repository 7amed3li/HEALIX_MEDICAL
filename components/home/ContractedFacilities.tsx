import { ArrowRight, Building2, MapPin } from "lucide-react";
import { type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { facilities } from "@/content/facilities";
import { BdiText } from "@/components/ui/BdiText";
import { FacilityBadge } from "@/components/ui/FacilityBadge";
import { TactileButton } from "@/components/ui/TactileButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Home page preview of the 33 contracted healthcare facilities:
 * Showcases 6 flagship facilities across Liv Hospital, Medical Park, VM Medical Park,
 * and University Centers with architectural monogram badges, linking to the dedicated
 * `/[locale]/facilities` directory page.
 */
export function ContractedFacilities({ locale, dict }: Props) {
  if (!facilities.length) return null;

  const t = dict.home.partners;
  const preview = [
    facilities[0], // LIV HOSPITAL ULUS
    facilities[1], // LIV HOSPITAL VADİSTANBUL
    facilities[2], // MEDICAL PARK İSTANBUL ONKOLOJİ HASTANESİ
    facilities[3], // MEDICAL PARK GÖZTEPE HASTANESİ
    facilities[6], // VM MEDICAL PARK PENDİK HASTANESİ
    facilities[28], // İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ
  ].filter(Boolean);

  return (
    <section className="border-t border-line-soft bg-mist-soft py-14 sm:py-20 lg:py-24">
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

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((facility) => (
            <div
              key={facility.id}
              data-gsap-item
              className="flex items-center gap-3.5 rounded-2xl border border-line-soft bg-white p-4 shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-ice hover:shadow-card"
            >
              <FacilityBadge
                brand={facility.brand}
                name={facility.name}
                logo={facility.logo}
              />
              <div className="min-w-0 flex-1">
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-action">
                  <MapPin className="h-3 w-3 shrink-0" strokeWidth={1.75} aria-hidden="true" />
                  <span>{facility.city}</span>
                </span>
                <p dir="ltr" className="mt-1 text-xs font-bold leading-snug text-navy sm:text-[13px]">
                  {facility.name}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <TactileButton
            href={pagePath(locale, "facilities")}
            variant="primary"
            className="min-h-11 px-6 py-2.5 text-sm"
          >
            <span>{t.showAll}</span>
            <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
          </TactileButton>
        </div>
      </div>
    </section>
  );
}
