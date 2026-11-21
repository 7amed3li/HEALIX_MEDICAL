import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { GuideContent } from "@/lib/i18n/dictionaries";
import type { GuideId } from "@/content/guides";
import { guidePath } from "@/lib/i18n/routes";
import { GuideIcon } from "./GuideIcon";

type Props = {
  locale: Locale;
  id: GuideId;
  content: GuideContent;
  learnMoreLabel: string;
};

/**
 * Editorial guide card (mirrors the ServiceCard layout language):
 * icon medallion, serif title with the red underline accent, summary,
 * and a learn-more affordance. Guides carry no imagery — they are
 * legal/process explainers, so the card stays typographic.
 */
export function GuideCard({ locale, id, content, learnMoreLabel }: Props) {
  const href = guidePath(locale, id);

  return (
    <article className="group flex flex-col rounded-[1.5rem] border border-line-soft bg-white p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-7">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-mist text-action transition-colors duration-300 group-hover:bg-navy group-hover:text-ice">
        <GuideIcon id={id} className="h-5 w-5" />
      </span>

      <h3 className="display-type mt-5 text-[1.25rem] font-semibold leading-snug text-navy">
        <Link href={href} className="transition-colors duration-300 hover:text-bright">
          {content.name}
        </Link>
      </h3>
      <span aria-hidden="true" className="mt-2.5 h-[3px] w-9 rounded-full bg-brand-red" />

      <p className="mt-3.5 flex-1 text-sm leading-relaxed text-slate">{content.short}</p>

      <div className="mt-5 border-t border-line-soft pt-4">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-bright transition-colors hover:text-bright-hover"
        >
          <span>{learnMoreLabel}</span>
          <ArrowRight
            className="flip-rtl h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
