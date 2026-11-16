import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
    <section className="border-t border-line bg-mist/55 py-16 sm:py-20">
      <div className="container-page">
        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              {dict.home.faq.title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-slate-strong">
              {dict.faqPage.lead}
            </p>
            <Link
              href={pagePath(locale, "faq")}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-action hover:text-action-hover"
            >
              <span>{dict.home.faq.more}</span>
              <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
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
