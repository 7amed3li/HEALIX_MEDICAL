import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary, ServiceDictionary } from "@/lib/i18n/dictionaries";
import { services } from "@/content/services";
import { pagePath } from "@/lib/i18n/routes";
import { ServiceCard } from "@/components/services/ServiceCard";

type Props = {
  locale: Locale;
  dict: Dictionary;
  serviceDict: ServiceDictionary;
};

export function FeaturedServices({ locale, dict, serviceDict }: Props) {
  const featured = services.filter((s) => s.featured);
  const others = services.filter((s) => !s.featured);

  return (
    <section className="bg-white py-14 sm:py-18">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              {dict.home.services.title}
            </h2>
            <p className="mt-2.5 text-sm leading-relaxed text-slate sm:text-base">
              {dict.home.services.lead}
            </p>
          </div>
          <Link
            href={pagePath(locale, "services")}
            className="inline-flex items-center gap-1.5 self-start rounded-lg border border-line bg-white px-4 py-2 text-xs font-semibold text-action transition-colors hover:border-ice hover:bg-mist sm:self-auto"
          >
            <span>{dict.common.allServices}</span>
            <ArrowRight className="flip-rtl h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        {/* Two prominent #EFF5F7 (mist) showcase cards for Liver & Kidney Transplantation */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {featured.map((svc) => (
            <ServiceCard
              key={svc.id}
              locale={locale}
              id={svc.id}
              content={serviceDict[svc.id]}
              featured
              learnMoreLabel={dict.common.learnMore}
            />
          ))}
        </div>

        {/* Clean #FFFFFF grid for the remaining 10 specialties */}
        <div className="mt-12 border-t border-line pt-10">
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
              {dict.home.services.othersTitle}
            </h3>
            <span className="h-px flex-1 bg-line" aria-hidden="true" />
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((svc) => (
              <ServiceCard
                key={svc.id}
                locale={locale}
                id={svc.id}
                content={serviceDict[svc.id]}
                learnMoreLabel={dict.common.learnMore}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
