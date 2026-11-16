import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
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
 * Connected 4-stage Patient Journey timeline:
 * - Desktop: horizontal connected route with ice-blue line and numbered nodes.
 * - Mobile: vertical connected route on the start side.
 */
export function JourneySteps({ locale, dict }: Props) {
  return (
    <section className="border-y border-line bg-mist py-16 sm:py-20">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-navy sm:text-3xl">
              {dict.home.journey.title}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-slate-strong">
              {dict.home.journey.lead}
            </p>
          </div>
          <Link
            href={pagePath(locale, "journey")}
            className="inline-flex items-center gap-1.5 self-start text-sm font-semibold text-action hover:text-action-hover sm:self-auto"
          >
            <span>{dict.common.ctaSecondary}</span>
            <ArrowRight className="flip-rtl h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="relative mt-12">
          {/* Desktop horizontal connecting line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-10 top-6 hidden h-0.5 bg-ice/60 lg:block"
          />

          <ol className="relative grid gap-6 lg:grid-cols-4">
            {dict.journey.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex gap-4 lg:flex-col lg:gap-0"
              >
                {/* Node + mobile vertical connector */}
                <div className="flex flex-col items-center lg:flex-row lg:items-center lg:gap-3">
                  <span className="relative z-10 inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ice bg-navy text-sm font-bold text-white shadow-soft">
                    {index + 1}
                  </span>
                  {index < dict.journey.steps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="my-1 w-0.5 flex-1 bg-ice/60 lg:hidden"
                    />
                  )}
                </div>

                <div className="flex-1 rounded-2xl border border-line bg-white p-5 lg:mt-4">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-action">
                    {dict.common.step} {index + 1}
                  </span>
                  <h3 className="mt-1 text-base font-bold text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
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
