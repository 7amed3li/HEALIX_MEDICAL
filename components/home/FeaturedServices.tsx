import Link from "next/link";
import { ArrowRight, Stethoscope } from "lucide-react";
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
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p>
            <span className="eyebrow">
              <Stethoscope className="h-3.5 w-3.5 text-action" strokeWidth={1.75} aria-hidden="true" />
              <span>{dict.home.services.eyebrow}</span>
            </span>
          </p>
          <div className="section-heading mt-5">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {dict.home.services.title}
            </h2>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate">
            {dict.home.services.lead}
          </p>
          <Link
            href={pagePath(locale, "services")}
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-action transition-colors hover:text-action-hover"
          >
            <span className="underline decoration-brand-red/70 decoration-2 underline-offset-8">
              {dict.common.allServices}
            </span>
            <ArrowRight
              className="flip-rtl h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {/* Two prominent showcase cards for Liver & Kidney Transplantation */}
        <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
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

        {/* Clean grid for the remaining 10 specialties */}
        <div className="mt-16 border-t border-line-soft pt-12">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-mist text-action">
              <Stethoscope className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
              {dict.home.services.othersTitle}
            </h3>
            <span className="h-px flex-1 bg-line-soft" aria-hidden="true" />
          </div>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
