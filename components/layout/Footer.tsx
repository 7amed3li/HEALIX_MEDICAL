import Link from "next/link";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { localeConfig, locales, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { siteConfig, isValidWhatsAppUrl } from "@/lib/config/site";
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
    <footer className="on-dark border-t border-navy-800 bg-navy text-white">
      <div className="container-page py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <BrandLogo
              href={pagePath(locale, "home")}
              ariaLabel={dict.a11y.homeLink}
              variant="dark"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/80">
              {dict.footer.tagline}
            </p>

            {/* Confirmed contact channels only — unconfirmed phone/email/WhatsApp stay hidden */}
            {(siteConfig.contact.phone || siteConfig.contact.email || hasWhatsApp) && (
              <div className="mt-4 space-y-1.5 text-sm text-white/85">
                {siteConfig.contact.phone && (
                  <p>
                    <a href={`tel:${siteConfig.contact.phone}`} dir="ltr" className="hover:text-ice">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                )}
                {siteConfig.contact.email && (
                  <p>
                    <a href={`mailto:${siteConfig.contact.email}`} dir="ltr" className="hover:text-ice">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                )}
                {hasWhatsApp && siteConfig.contact.whatsapp && (
                  <p>
                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-ice"
                    >
                      WhatsApp
                    </a>
                  </p>
                )}
              </div>
            )}

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-ice">
                {dict.footer.follow}
              </p>
              <div className="mt-2.5 flex items-center gap-3">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram (${dict.a11y.externalLink})`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-ice hover:text-ice"
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white transition-colors hover:border-ice hover:text-ice"
                  >
                    <FacebookIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <nav aria-label={dict.footer.pages} className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ice">
              {dict.footer.pages}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              {pageLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ice">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={dict.footer.legal} className="lg:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ice">
              {dict.footer.legal}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-ice">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-ice">
              {dict.footer.languages}
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-white/85">
              {locales.map((loc) => {
                const cfg = localeConfig[loc];
                return (
                  <li key={loc}>
                    <Link
                      href={`/${loc}`}
                      lang={cfg.htmlLang}
                      dir={cfg.dir}
                      className={`transition-colors hover:text-ice ${
                        loc === locale ? "font-semibold text-white" : ""
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

        <div className="mt-10 border-t border-white/15 pt-6 text-xs leading-relaxed text-white/75">
          <p>
            <BdiText text={dict.footer.disclaimerShort} />
          </p>
          <p className="mt-3 text-white/65">
            © {year} <bdi dir="ltr">{siteConfig.brand}</bdi>. {dict.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
