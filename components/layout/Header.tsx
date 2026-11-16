import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { pagePath } from "@/lib/i18n/routes";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { NavLinks, type NavItem } from "./NavLinks";

type Props = {
  locale: Locale;
  dict: Dictionary;
};

export function Header({ locale, dict }: Props) {
  const navItems: NavItem[] = [
    { href: pagePath(locale, "home"), label: dict.nav.home, exact: true },
    { href: pagePath(locale, "services"), label: dict.nav.services },
    { href: pagePath(locale, "journey"), label: dict.nav.journey },
    { href: pagePath(locale, "about"), label: dict.nav.about },
    { href: pagePath(locale, "faq"), label: dict.nav.faq },
    { href: pagePath(locale, "contact"), label: dict.nav.contact },
  ];

  const ctaHref = pagePath(locale, "contact");

  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-white/90 shadow-[0_1px_0_rgb(105_183_209/0.22)] backdrop-blur-md">
      <div className="container-page relative flex h-20 items-center justify-between gap-4">
        <BrandLogo
          href={pagePath(locale, "home")}
          ariaLabel={dict.a11y.homeLink}
          variant="light"
        />

        <nav
          aria-label={dict.a11y.mainNav}
          className="hidden items-center gap-1 lg:flex"
        >
          <NavLinks items={navItems} />
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LocaleSwitcher
            currentLocale={locale}
            label={dict.a11y.languageSwitcher}
          />
          <Link href={ctaHref} className="btn-primary min-h-11 px-5 py-2.5 text-sm">
            {dict.common.ctaPrimary}
          </Link>
        </div>

        <MobileMenu
          currentLocale={locale}
          items={navItems}
          ctaLabel={dict.common.ctaPrimary}
          ctaHref={ctaHref}
          openLabel={dict.a11y.openMenu}
          closeLabel={dict.a11y.closeMenu}
          navLabel={dict.a11y.mainNav}
          langLabel={dict.a11y.languageSwitcher}
        />
      </div>
    </header>
  );
}
