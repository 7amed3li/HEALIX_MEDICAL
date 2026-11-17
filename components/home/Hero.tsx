import Image from "next/image";
import { ArrowRight, Compass, Globe2, Languages, Shield, Stethoscope } from "lucide-react";
import { getDir, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { BdiText } from "@/components/ui/BdiText";
import { TactileButton } from "@/components/ui/TactileButton";
import { BlurText } from "@/components/ui/BlurText";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

const stripIcons = [Languages, Compass, Stethoscope, Shield];

export function Hero({ locale, dict }: Props) {
  const isRtl = getDir(locale) === "rtl";

  return (
    <section className="on-dark grain relative overflow-hidden bg-ink text-white">
      {/* Global network backdrop – dotted world map, arcs converging on Türkiye */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-world-map.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-50 lg:opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-navy/65 to-ink/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-ink/25 lg:bg-ink/10" />
      </div>

      {/* Mobile full-bleed top consultation image melting seamlessly into the navy hero */}
      <div className="anim-hero-img hero-mobile-mask relative h-52 w-full sm:h-64 lg:hidden">
        <Image
          src="/images/hero-closeup.jpg"
          alt={dict.home.hero.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>

      {/* Desktop full-bleed consultation image at the inline-end, dissolved seamlessly via alpha mask */}
      <div className="anim-hero-img hero-photo-mask pointer-events-none absolute inset-y-0 end-0 hidden w-[58%] lg:block">
        <Image
          src={isRtl ? "/images/hero-coordination-rtl.jpg" : "/images/hero-coordination.jpg"}
          alt={dict.home.hero.imageAlt}
          fill
          priority
          sizes="58vw"
          className="object-cover object-center"
        />
        <div className="hero-shade-b absolute inset-0" aria-hidden="true" />
      </div>

      <div className="container-page relative">
        <div className="-mt-6 max-w-2xl pb-2 sm:-mt-4 lg:mt-0 lg:pt-24 lg:pb-0">
          <p className="anim-hero-1">
            <span className="eyebrow">
              <Globe2 className="h-3.5 w-3.5 text-ice" strokeWidth={1.75} aria-hidden="true" />
              <span>{dict.home.hero.eyebrow}</span>
            </span>
          </p>

          <h1 className="mt-3 text-[1.85rem] font-medium leading-[1.18] text-white sm:mt-5 sm:text-[clamp(2.4rem,5.2vw,4.3rem)] sm:leading-[1.08]">
            <BlurText text={dict.home.hero.title} delay={0.05} />
          </h1>

          <p className="anim-hero-3 mt-3.5 max-w-xl text-sm leading-relaxed text-white/85 sm:mt-6 sm:text-lg">
            <BdiText text={dict.home.hero.lead} />
          </p>

          <div className="anim-hero-4 mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5">
            <TactileButton
              href={pagePath(locale, "contact")}
              variant="primary"
              className="min-h-12 w-full px-7 py-3 text-base sm:w-auto"
            >
              <span>{dict.common.ctaPrimary}</span>
              <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </TactileButton>
            <TactileButton
              href={pagePath(locale, "journey")}
              variant="ghost-dark"
              className="min-h-11 w-full px-6 py-2.5 text-sm sm:min-h-12 sm:w-auto sm:py-3 sm:text-base"
            >
              {dict.common.ctaSecondary}
            </TactileButton>
          </div>

          <p className="anim-hero-4 mt-6 max-w-md border-s-2 border-ice/70 ps-3.5 text-xs leading-relaxed text-white/75 sm:mt-8 sm:ps-4 sm:text-[13px]">
            <BdiText text={dict.common.coordinationNotice} />
          </p>
        </div>

        {/* Trust strip – compact 1-col/2-col on mobile, 4-col on desktop */}
        <div className="anim-hero-5 mt-8 border-t border-white/12 sm:mt-12 lg:mt-20">
          <ul className="grid grid-cols-1 gap-x-6 gap-y-3.5 py-6 sm:grid-cols-2 sm:py-7 lg:grid-cols-4">
            {dict.home.strip.map((item, idx) => {
              const Icon = stripIcons[idx % stripIcons.length];
              return (
                <li key={item.title} className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ice/40 bg-white/5 text-ice-soft sm:h-10 sm:w-10">
                    <Icon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-xs font-semibold leading-snug text-white/90 sm:text-sm">
                    {item.title}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
