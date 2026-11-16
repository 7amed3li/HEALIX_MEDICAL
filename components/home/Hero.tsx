import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDir, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { BdiText } from "@/components/ui/BdiText";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

/**
 * Hero ("International Precision"):
 * - Clean, flat #10283E (Deep Navy) canvas without artificial dot-grids or AI-style badges.
 * - Desktop asymmetric composition: Text block on the LEFT, Consultation image on the RIGHT
 *   integrated via a smooth curved ice-blue (#69B7D1) & mist (#EFF5F7) arc.
 */
export function Hero({ locale, dict }: Props) {
  const textDir = getDir(locale);

  return (
    <section className="on-dark relative overflow-hidden bg-navy text-white">
      {/* Desktop full-bleed consultation image on the RIGHT with curved ice-blue transition */}
      <div className="anim-hero-img hidden lg:pointer-events-none lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-[50%]">
        <Image
          src="/images/hero-seamless-ltr.jpg"
          alt={dict.home.hero.imageAlt}
          fill
          priority
          sizes="50vw"
          className="object-cover object-left"
        />
      </div>

      {/* Content container: LTR outer wrapper keeps text block on the LEFT on desktop */}
      <div
        dir="ltr"
        className="container-page relative z-10 flex min-h-[540px] items-center py-12 sm:py-16 lg:min-h-[580px] lg:py-20"
      >
        <div
          dir={textDir}
          className={`w-full lg:w-[50%] xl:w-[48%] ${
            textDir === "rtl" ? "text-right" : "text-left"
          }`}
        >
          <h1 className="anim-hero-1 text-3xl font-bold tracking-tight text-white sm:text-4xl xl:text-[2.65rem] xl:leading-[1.25]">
            {dict.home.hero.title}
          </h1>

          <p className="anim-hero-2 mt-5 text-base leading-relaxed text-white/85 sm:text-lg">
            <BdiText text={dict.home.hero.lead} />
          </p>

          <div className="anim-hero-3 mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              href={pagePath(locale, "contact")}
              className="inline-flex min-h-12 items-center gap-2.5 rounded-lg bg-action px-6 py-3 text-base font-semibold text-white transition-all duration-200 hover:bg-action-hover active:translate-y-px"
            >
              <span>{dict.common.ctaPrimary}</span>
              <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
            <Link
              href={pagePath(locale, "journey")}
              className="inline-flex min-h-12 items-center rounded-lg border border-ice/45 bg-white/5 px-5 py-3 text-base font-medium text-white transition-all duration-200 hover:border-ice hover:bg-white/10 active:translate-y-px"
            >
              {dict.common.ctaSecondary}
            </Link>
          </div>

          <p className="anim-hero-4 mt-7 border-s-2 border-ice/50 ps-3.5 text-xs leading-relaxed text-white/75">
            <BdiText text={dict.common.coordinationNotice} />
          </p>

          {/* Mobile consultation image */}
          <div className="anim-hero-img mt-8 overflow-hidden rounded-xl border border-ice/35 lg:hidden">
            <Image
              src="/images/hero-closeup.jpg"
              alt={dict.home.hero.imageAlt}
              width={1100}
              height={900}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
