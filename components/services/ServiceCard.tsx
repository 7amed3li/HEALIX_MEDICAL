import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceContent } from "@/lib/i18n/dictionaries";
import type { ServiceId } from "@/content/services";
import { servicePath } from "@/lib/i18n/routes";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

type Props = {
  locale: Locale;
  id: ServiceId;
  content: ServiceContent;
  featured?: boolean;
  learnMoreLabel: string;
};

export function ServiceCard({
  locale,
  id,
  content,
  featured = false,
  learnMoreLabel,
}: Props) {
  const href = servicePath(locale, id);

  if (featured) {
    const previewPoints = content.coordination.slice(0, 3);
    const isLiver = id === "liver-transplantation";

    return (
      <article className="group flex flex-col justify-between rounded-2xl border border-line bg-mist p-6 transition-colors duration-200 hover:border-ice sm:p-7">
        <div>
          <div className="flex items-center justify-between gap-4 rounded-xl border border-line bg-white p-4">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-ice/45 bg-mist text-action">
                <ServiceIcon id={id} className="h-6 w-6" />
              </span>
              <h3 className="text-xl font-bold text-navy sm:text-2xl">
                <Link href={href} className="hover:text-action">
                  {content.name}
                </Link>
              </h3>
            </div>

            <div className="shrink-0" aria-hidden="true">
              {isLiver ? (
                <svg viewBox="0 0 96 60" className="h-12 w-20" fill="none">
                  <path
                    d="M14 24C14 13 27 7 46 7c19 0 36 6 36 17 0 10-9 16-21 19-10 2.5-19 7-27 12-9 2.5-20-2-20-11V24Z"
                    stroke="#10283E"
                    strokeWidth="1.75"
                    fill="#EFF5F7"
                  />
                  <path d="M48 9v34" stroke="#69B7D1" strokeWidth="1.5" />
                  <path d="M48 26c7 1.5 13 4.5 18 9" stroke="#10283E" strokeWidth="1.4" />
                </svg>
              ) : (
                <svg viewBox="0 0 96 60" className="h-12 w-20" fill="none">
                  <path
                    d="M30 8c-10 0-17 9-17 21 0 14 8 23 19 23 7 0 11-5 11-11 0-5-3-8-6-10-2.5-3-2.5-7 0-10 3-3 6-6 6-10 0-6-4-13-13-13Z"
                    stroke="#10283E"
                    strokeWidth="1.75"
                    fill="#EFF5F7"
                  />
                  <path
                    d="M66 8c10 0 17 9 17 21 0 14-8 23-19 23-7 0-11-5-11-11 0-5 3-8 6-10 2.5-3 2.5-7 0-10-3-3-6-6-6-10 0-6 4-13 13-13Z"
                    stroke="#69B7D1"
                    strokeWidth="1.75"
                    fill="#EFF5F7"
                  />
                  <path d="M40 30h16" stroke="#10283E" strokeWidth="1.5" />
                </svg>
              )}
            </div>
          </div>

          <p className="mt-4 text-sm leading-relaxed text-slate-strong">
            {content.short}
          </p>

          <ul className="mt-4 space-y-2 border-t border-line pt-4 text-xs leading-relaxed text-navy">
            {previewPoints.map((pt) => (
              <li key={pt} className="flex items-start gap-2">
                <Check
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 text-action"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 pt-2">
          <Link
            href={href}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-action px-4 py-2 text-xs font-semibold text-white transition-all duration-200 hover:bg-action-hover active:translate-y-px"
          >
            <span>{learnMoreLabel}</span>
            <ArrowRight className="flip-rtl h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col justify-between rounded-xl border border-line bg-white p-5 transition-colors duration-200 hover:border-ice hover:bg-mist/35">
      <div>
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ice/40 bg-mist text-action transition-colors duration-200 group-hover:bg-ice/25">
            <ServiceIcon id={id} className="h-5 w-5" />
          </span>
          <h3 className="text-base font-bold text-navy">
            <Link href={href} className="hover:text-action">
              {content.name}
            </Link>
          </h3>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-slate sm:text-sm">
          {content.short}
        </p>
      </div>

      <div className="mt-4 border-t border-line/60 pt-3">
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-action group-hover:text-action-hover"
        >
          <span>{learnMoreLabel}</span>
          <ArrowRight className="flip-rtl h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
