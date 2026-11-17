import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import type { ServiceContent } from "@/lib/i18n/dictionaries";
import type { ServiceId } from "@/content/services";
import { servicePath } from "@/lib/i18n/routes";
import { serviceImage } from "@/lib/service-images";
import { ServiceIcon } from "@/components/ui/ServiceIcon";

type Props = {
  locale: Locale;
  id: ServiceId;
  content: ServiceContent;
  featured?: boolean;
  learnMoreLabel: string;
};

/**
 * Image-led specialty card (Design v2):
 * the anatomical render fills the top of the card on its soft light-blue
 * background; below it the navy title carries a short red underline accent,
 * followed by the summary and a learn-more affordance. Hover lifts the card
 * and gently zooms the render.
 */
export function ServiceCard({
  locale,
  id,
  content,
  featured = false,
  learnMoreLabel,
}: Props) {
  const href = servicePath(locale, id);
  const image = serviceImage(id);

  if (featured) {
    const previewPoints = content.coordination.slice(0, 3);

    return (
      <article className="group flex flex-col overflow-hidden rounded-[1.75rem] border border-line-soft bg-white shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative aspect-[16/8] overflow-hidden sm:aspect-[16/7]">
          <Image
            src={image}
            alt={content.name}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <div className="flex items-center gap-3.5">
            <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-ice/45 bg-mist text-action">
              <ServiceIcon id={id} className="h-5 w-5" />
            </span>
            <h3 className="display-type text-[1.5rem] font-semibold leading-tight text-navy sm:text-[1.7rem]">
              <Link href={href} className="transition-colors duration-300 hover:text-bright">
                {content.name}
              </Link>
            </h3>
          </div>

          <p className="mt-4 text-[15px] leading-relaxed text-slate-strong">
            {content.short}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-line-soft pt-5 text-[13px] leading-relaxed text-navy">
            {previewPoints.map((pt) => (
              <li key={pt} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-bright"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span>{pt}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-7">
            <Link href={href} className="btn-primary min-h-11 px-5 py-2.5 text-sm">
              <span>{learnMoreLabel}</span>
              <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[1.5rem] border border-line-soft bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={content.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-ice/40 bg-mist text-action transition-colors duration-300 group-hover:bg-navy group-hover:text-ice-soft">
            <ServiceIcon id={id} className="h-4 w-4" />
          </span>
          <h3 className="display-type text-[1.15rem] font-semibold leading-snug text-navy">
            <Link href={href} className="transition-colors duration-300 hover:text-bright">
              {content.name}
            </Link>
          </h3>
        </div>
        <p className="mt-3.5 flex-1 text-sm leading-relaxed text-slate">
          {content.short}
        </p>

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
      </div>
    </article>
  );
}
