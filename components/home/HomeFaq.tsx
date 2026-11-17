import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Home FAQ preview:
 * Shows only 4 key questions inside an interactive accordion in an asymmetric 5/7 split,
 * with a clear link to the full FAQ page so we do not duplicate all 9 items.
 */
export function HomeFaq({ locale, dict }: Props) {
  const preview = dict.faqPage.items.slice(0, 4);

  return (
    <section className="border-t border-line-soft bg-mist-soft py-14 sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5">
            <p>
              <span className="eyebrow">
                <HelpCircle className="h-3.5 w-3.5 text-action" strokeWidth={1.75} aria-hidden="true" />
                <span>{dict.home.faq.eyebrow}</span>
              </span>
            </p>
            <h2 className="mt-4 text-3xl font-semibold text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {dict.home.faq.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-strong">
              {dict.faqPage.lead}
            </p>
            <Link
              href={pagePath(locale, "faq")}
              className="group mt-7 inline-flex items-center gap-1.5 text-sm font-semibold text-action transition-colors hover:text-action-hover"
            >
              <span className="underline decoration-brand-red/70 decoration-2 underline-offset-8">
                {dict.home.faq.more}
              </span>
              <ArrowRight
                className="flip-rtl h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <div className="lg:col-span-7">
            <FaqAccordion items={preview} defaultOpenIndex={0} />
          </div>
        </div>
      </div>
    </section>
  );
}
