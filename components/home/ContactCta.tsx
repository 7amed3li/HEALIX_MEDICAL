import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { TactileButton } from "@/components/ui/TactileButton";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Closing invitation: a dark, grain-textured ink-navy panel with a champagne
 * hairline crest and a gold primary action – the site's premium signature.
 */
export function ContactCta({ locale, dict }: Props) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="on-dark surface-dark grain relative overflow-hidden rounded-[2rem] px-7 py-12 shadow-lift sm:px-12 sm:py-14 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <span
            aria-hidden="true"
            className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-ice/70 to-transparent"
          />
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-white sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
              {dict.home.cta.title}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/75">
              {dict.home.cta.text}
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              {dict.home.cta.privacyNote}{" "}
              <Link
                href={pagePath(locale, "privacy")}
                className="font-semibold text-ice-soft underline decoration-ice/60 underline-offset-4 transition-colors hover:text-white"
              >
                {dict.common.readPrivacy}
              </Link>
              .
            </p>
          </div>

          <div className="mt-8 shrink-0 lg:mt-0">
            <TactileButton href={pagePath(locale, "contact")} variant="primary" className="min-h-12 px-7 py-3 text-base">
              <span>{dict.common.ctaPrimary}</span>
              <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </TactileButton>
          </div>
        </div>
      </div>
    </section>
  );
}
