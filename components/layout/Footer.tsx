import Link from "next/link";
import { Phone, Mail, MessageCircle } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { formatNumber, localeConfig, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { siteConfig, isValidWhatsAppUrl, formatPhoneDisplay } from "@/lib/config/site";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { BdiText } from "@/components/ui/BdiText";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Footer({ locale, dict }: Props) {
  const year = new Date().getFullYear();

  const pageLinks = [
    { href: pagePath(locale, "home"), label: dict.nav.home },
    { href: pagePath(locale, "services"), label: dict.nav.services },
    { href: pagePath(locale, "guides"), label: dict.nav.guides },
    { href: pagePath(locale, "facilities"), label: dict.nav.facilities },
    { href: pagePath(locale, "journey"), label: dict.nav.journey },
    { href: pagePath(locale, "about"), label: dict.nav.about },
    { href: pagePath(locale, "faq"), label: dict.nav.faq },
    { href: pagePath(locale, "contact"), label: dict.nav.contact },
  ];

  const legalLinks = [
    { href: pagePath(locale, "privacy"), label: dict.legalNav.privacy },
    { href: pagePath(locale, "terms"), label: dict.legalNav.terms },
    { href: pagePath(locale, "disclaimer"), label: dict.legalNav.disclaimer },
  ];

  const hasWhatsApp = isValidWhatsAppUrl(siteConfig.contact.whatsapp);

  return (
    <footer className="on-dark surface-dark grain footer-scene relative overflow-hidden text-white">
      <div className="container-page pb-8 pt-12 sm:pb-10 sm:pt-20">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo
              href={pagePath(locale, "home")}
              ariaLabel={dict.a11y.homeLink}
              variant="dark"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/75">
              {dict.footer.tagline}
            </p>

            {/* Confirmed contact channels only — unconfirmed phone/email/WhatsApp stay hidden */}
            {(siteConfig.contact.phone || siteConfig.contact.email || hasWhatsApp) && (
              <div className="mt-5 space-y-2.5 text-sm text-white/85">
                {siteConfig.contact.phone && (
                  <a
                    href={`tel:${siteConfig.contact.phone}`}
                    className="group flex items-center gap-3 transition-colors duration-300 hover:text-ice-soft"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ice-soft transition-colors group-hover:border-ice/50 group-hover:bg-white/10">
                      <Phone className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span dir="ltr" className="font-medium tracking-wide">
                      {formatPhoneDisplay(siteConfig.contact.phone)}
                    </span>
                  </a>
                )}
                {siteConfig.contact.email && (
                  <a
                    href={`mailto:${siteConfig.contact.email}`}
                    className="group flex items-center gap-3 transition-colors duration-300 hover:text-ice-soft"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ice-soft transition-colors group-hover:border-ice/50 group-hover:bg-white/10">
                      <Mail className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span dir="ltr" className="font-medium">
                      {siteConfig.contact.email}
                    </span>
                  </a>
                )}
                {hasWhatsApp && siteConfig.contact.whatsapp && (
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 transition-colors duration-300 hover:text-ice-soft"
                  >
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-ice-soft transition-colors group-hover:border-ice/50 group-hover:bg-white/10">
                      <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-medium">WhatsApp</span>
                  </a>
                )}
              </div>
            )}

            <div className="mt-7">
              <p className="text-xs font-semibold uppercase tracking-wider text-ice-soft">
                {dict.footer.follow}
              </p>
              <div className="mt-3 flex items-center gap-3">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram (${dict.a11y.externalLink})`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-gold/60 hover:text-ice-soft"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Facebook (${dict.a11y.externalLink})`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-all duration-300 hover:border-gold/60 hover:text-ice-soft"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <nav aria-label={dict.footer.pages}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ice-soft">
                {dict.footer.pages}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                {pageLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors duration-300 hover:text-ice-soft">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label={dict.footer.legal}>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ice-soft">
                {dict.footer.legal}
              </h2>
              <ul className="mt-4 space-y-2.5 text-sm text-white/80">
                {legalLinks.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors duration-300 hover:text-ice-soft">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-ice-soft">
                {dict.footer.languages}
              </h2>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/80 sm:block sm:space-y-2.5">
                {locales.map((loc) => {
                  const cfg = localeConfig[loc];
                  return (
                    <li key={loc}>
                      <Link
                        href={`/${loc}`}
                        lang={cfg.htmlLang}
                        dir={cfg.dir}
                        className={`transition-colors duration-300 hover:text-ice-soft ${loc === locale ? "font-semibold text-white" : ""
                          }`}
                      >
                        {cfg.nativeName}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Oversized quiet wordmark – the footer's premium signature */}
        <div
          dir="ltr"
          aria-hidden="true"
          className="pointer-events-none mt-10 select-none text-center text-[clamp(3.2rem,14vw,11.5rem)] font-extrabold leading-[0.95] tracking-[0.08em] text-white/[0.045] sm:mt-16"
        >
          HEALIX
        </div>

        {/* Two-tier enterprise sub-footer:
            Tier 1 — Medical Coordination Disclaimer callout
            Tier 2 — Clean Copyright + Developer Attribution line */}
        <div id="site-footer-bottom" className="mt-6 space-y-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center text-xs leading-relaxed text-white/65 sm:text-start">
            <BdiText text={dict.footer.disclaimerShort} />
          </div>

          <div className="flex flex-col items-center justify-between gap-2.5 border-t border-white/10 pt-5 text-center text-xs text-white/55 sm:flex-row sm:text-start">
            <p>
              <span>© {formatNumber(year, locale)} </span>
              <bdi dir="ltr">{siteConfig.brand}</bdi>
              <span aria-hidden="true"> · </span>
              <span>{dict.footer.rights}</span>
            </p>
            <p className="text-[11px] font-medium uppercase tracking-wider text-white/60">
              <span>{dict.nav.caseStudy} </span>
              <Link
                href={pagePath(locale, "caseStudy")}
                className="font-bold text-gold-soft underline decoration-gold/60 underline-offset-4 transition-colors hover:text-white"
              >
                {locale === "ar" ? "حامد محمد" : "HAMED MOHAMED"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
