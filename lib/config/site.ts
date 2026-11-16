/**
 * HEALIX MEDICAL – single source of truth for contact data, social links and integrations.
 *
 * RULE: anything not confirmed by the project owner stays `null` / empty / disabled.
 * Components hide elements automatically when a value is missing. Never put placeholder data here.
 */
export const siteConfig = {
  brand: "HEALIX MEDICAL",

  /** Public site URL (used for canonical, hreflang, sitemap, Open Graph). Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, ""),

  /**
   * Official extracted emblem from the HEALIX MEDICAL reference card (transparent PNG).
   * Combined with the clean "HEALIX MEDICAL" wordmark in Header and Footer.
   */
  logo: {
    src: "/images/brand/healix-emblem.png",
    width: 340,
    height: 321,
  },

  social: {
    instagram: "https://www.instagram.com/healix.medical.tr/",
    /** Temporary share link from the owner. REPLACE with the direct official page URL when available. */
    facebook: "https://www.facebook.com/share/1DyXtaGQcb/?mibextid=wwXIfr",
  },

  contact: {
    /** PENDING – confirmed phone number (E.164, e.g. "+90..."). Hidden while null. */
    phone: null as string | null,
    /** PENDING – confirmed public email. Hidden while null. */
    email: null as string | null,
    /**
     * PENDING – only a valid https://wa.me/<number> link is accepted.
     * The handle "@Dr.Abdulrahman.ja" is NOT a WhatsApp link, so the button stays hidden.
     */
    whatsapp: null as string | null,
  },

  /**
   * PENDING – hospitals / partner centres. The section is hidden while this list is empty.
   * Add an entry only after the owner confirms the relationship AND written permission to use the name/logo.
   */
  partners: [] as { name: string; logo?: string; url?: string }[],

  analytics: {
    /**
     * Meta Pixel / Conversions API are intentionally DISABLED and NOT implemented.
     * Enable only after consent management + privacy review, and never send service names,
     * form data or any health information to Meta.
     */
    metaPixelEnabled: false,
  },
} as const;

export function isValidWhatsAppUrl(url: string | null): url is string {
  return !!url && /^https:\/\/wa\.me\/\d{8,15}(\?.*)?$/.test(url);
}
