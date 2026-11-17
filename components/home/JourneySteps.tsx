import Link from "next/link";
import { ArrowRight, Route } from "lucide-react";
import { formatNumber, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/** Extracts the first sentence so the Home timeline stays concise and does not duplicate the full Patient Journey page. */
function firstSentence(text: string): string {
  const match = text.match(/^[^.。؟!]+[.。؟!]?/);
  return match ? match[0].trim() : text;
}

/**
 * Patient Journey timeline (Design v2 – reference style):
 * - Large pale serif numerals (01–04) lead each step; a bright dot sits on a
 *   connecting hairline beneath them, with the step title and text below.
 * - Desktop: horizontal route across four columns. Mobile: the same elements
 *   stack into a vertical route on the start side.
 */
export function JourneySteps({ locale, dict }: Props) {
  return (
    <section className="border-y border-line-soft bg-mist-soft py-14 sm:py-20 lg:py-28">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p>
            <span className="eyebrow">
              <Route className="h-3.5 w-3.5 text-action" strokeWidth={1.75} aria-hidden="true" />
              <span>{dict.home.journey.eyebrow}</span>
            </span>
          </p>
          <div className="section-heading mt-5">
            <h2 className="text-3xl font-semibold text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
              {dict.home.journey.title}
            </h2>
          </div>
          <p className="mt-4 text-base leading-relaxed text-slate-strong">
            {dict.home.journey.lead}
          </p>
          <Link
            href={pagePath(locale, "journey")}
            className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-action transition-colors hover:text-action-hover"
          >
            <span className="underline decoration-brand-red/70 decoration-2 underline-offset-8">
              {dict.common.ctaSecondary}
            </span>
            <ArrowRight
              className="flip-rtl h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="relative mt-16">
          {/* Desktop connecting hairline – passes through the dots, fading at both ends */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-[81px] hidden h-px bg-gradient-to-r from-transparent via-ice/70 to-transparent lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {dict.journey.steps.map((step, index) => (
              <li
                key={step.title}
                data-gsap-item
                className="relative flex gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
              >
                {/* Numeral + dot rail (collapses into the column flow on desktop) */}
                <div className="flex flex-col items-center lg:contents">
                  <span
                    aria-hidden="true"
                    className="display-type text-[2.6rem] font-semibold leading-none text-navy/10 lg:text-6xl"
                  >
                    {formatNumber(index + 1, locale, 2)}
                  </span>
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-3.5 inline-block h-3.5 w-3.5 shrink-0 rounded-full bg-bright shadow-soft ring-4 ring-white"
                  />
                  {index < dict.journey.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="mt-3 w-px flex-1 bg-gradient-to-b from-ice/60 to-line-soft lg:hidden"
                    />
                  )}
                </div>

                <div className="flex-1 lg:mt-6 lg:flex-none">
                  <h3 className="display-type text-[1.3rem] font-semibold leading-snug text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-slate lg:mx-auto lg:max-w-[17rem]">
                    {firstSentence(step.text)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
