import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function ContactCta({ locale, dict }: Props) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="rounded-2xl border border-line bg-mist p-8 sm:p-10 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              {dict.home.cta.title}
            </h2>
            <p className="mt-2.5 text-base leading-relaxed text-slate">
              {dict.home.cta.text}
            </p>
            <p className="mt-3 text-xs text-slate">
              {dict.home.cta.privacyNote}{" "}
              <Link
                href={pagePath(locale, "privacy")}
                className="font-semibold text-action underline underline-offset-4 hover:text-action-hover"
              >
                {dict.common.readPrivacy}
              </Link>
              .
            </p>
          </div>

          <div className="mt-6 shrink-0 lg:mt-0">
            <Link
              href={pagePath(locale, "contact")}
              className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-action px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-action-hover active:translate-y-px"
            >
              <span>{dict.common.ctaPrimary}</span>
              <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
