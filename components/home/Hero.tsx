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

/**
 * Hero (Design v2 – "global healthcare" reference):
 * - Deep-navy scene built on the dotted world-map artwork: luminous arcs from
 *   every continent converge on Türkiye, veiled by navy gradients so the
 *   display headline stays perfectly legible.
 * - The consultation photograph keeps its curved composition at the inline-end
 *   and melts into the scene through gradient masks (mirrored in RTL).
 * - One vivid azure pill CTA; a quiet trust strip along the bottom reuses the
 *   overview facts verbatim.
 */
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
          className="object-cover object-center opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-navy/60 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent rtl:bg-gradient-to-l" />
        {/* Extra legibility veil where no photo covers the map (mobile / text side) */}
        <div className="absolute inset-0 bg-ink/25 lg:bg-ink/10" />
      </div>

      {/* Full-bleed consultation image at the inline-end, dissolved seamlessly via alpha mask */}
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
        <div className="max-w-2xl pt-16 sm:pt-20 lg:pt-24">
          <p className="anim-hero-1">
            <span className="eyebrow">
              <Globe2 className="h-3.5 w-3.5 text-ice" strokeWidth={1.75} aria-hidden="true" />
              <span>{dict.home.hero.eyebrow}</span>
            </span>
          </p>

          <h1 className="mt-6 text-[clamp(2.6rem,5.4vw,4.4rem)] font-medium leading-[1.08] text-white">
            <BlurText text={dict.home.hero.title} delay={0.05} />
          </h1>

          <p className="anim-hero-3 mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            <BdiText text={dict.home.hero.lead} />
          </p>

          <div className="anim-hero-4 mt-9 flex flex-wrap items-center gap-3.5">
            <TactileButton
              href={pagePath(locale, "contact")}
              variant="primary"
              className="min-h-12 px-7 py-3 text-base"
            >
              <span>{dict.common.ctaPrimary}</span>
              <ArrowRight className="flip-rtl h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            </TactileButton>
            <TactileButton
              href={pagePath(locale, "journey")}
              variant="ghost-dark"
              className="min-h-12 px-6 py-3 text-base"
            >
              {dict.common.ctaSecondary}
            </TactileButton>
          </div>

          <p className="anim-hero-4 mt-8 max-w-md border-s-2 border-ice/70 ps-4 text-[13px] leading-relaxed text-white/70">
            <BdiText text={dict.common.coordinationNotice} />
          </p>

          {/* Mobile consultation image */}
          <div className="anim-hero-img relative mt-10 overflow-hidden rounded-[1.75rem] border border-white/15 shadow-lift lg:hidden">
            <Image
              src="/images/hero-closeup.jpg"
              alt={dict.home.hero.imageAlt}
              width={1100}
              height={900}
              priority
              sizes="100vw"
              className="h-auto w-full object-cover"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent"
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Trust strip – the overview facts, set quietly along the hero's foot */}
        <div className="anim-hero-5 mt-14 border-t border-white/12 lg:mt-20">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-5 py-7 lg:grid-cols-4">
            {dict.home.strip.map((item, idx) => {
              const Icon = stripIcons[idx % stripIcons.length];
              return (
                <li key={item.title} className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ice/40 bg-white/5 text-ice-soft">
                    <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-white/90">
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
