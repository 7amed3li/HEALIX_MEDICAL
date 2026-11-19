/**
 * HEALIX MEDICAL – single source of truth for contact data, social links and integrations.
 *
 * RULE: anything not confirmed by the project owner stays `null` / empty / disabled.
 * Components hide elements automatically when a value is missing. Never put placeholder data here.
 */
export const siteConfig = {
  brand: "HEALIX MEDICAL",

  /** Public site URL (used for canonical, hreflang, sitemap, Open Graph). Set NEXT_PUBLIC_SITE_URL in production. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://healixistanbul.com.tr").replace(/\/$/, ""),

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
    /** Confirmed official contact phone number (E.164). */
    phone: "+905521389721" as string | null,
    /** Confirmed official public email. */
    email: "healixtr@gmail.com" as string | null,
    /** Confirmed official WhatsApp direct link. */
    whatsapp: "https://wa.me/905521389721" as string | null,
  },

  /**
   * Confirmed contracted healthcare facilities (33 facilities across two agreements,
   * including 1 dental research & application center). No external logos are shown without
   * separate logo-usage assets; facilities are displayed by their official contract names.
   */
  partners: [
    { name: "MEDICAL PARK İSTANBUL ONKOLOJİ HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK GÖZTEPE HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK TEM HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK GEBZE VM HASTANESİ", group: "mlp" },
    { name: "VM MEDICAL PARK PENDİK HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK BAHÇELİEVLER HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK BURSA HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK ANTALYA HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK ORDU HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK TRABZON HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK KARADENİZ HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK ANKARA HASTANESİ", group: "mlp" },
    { name: "VM MEDICAL PARK MERSİN HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK ATAŞEHİR HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK İZMİR HASTANESİ", group: "mlp" },
    { name: "LIV HOSPITAL ANKARA HASTANESİ", group: "mlp" },
    { name: "LIV HOSPITAL GAZİANTEP HASTANESİ", group: "mlp" },
    { name: "VM MEDICAL PARK ANKARA HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK TOKAT HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK SAMSUN HASTANESİ", group: "mlp" },
    { name: "LIV HOSPITAL SAMSUN HASTANESİ", group: "mlp" },
    { name: "VM MEDICAL PARK MALTEPE HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK ADANA HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK SEYHAN HASTANESİ", group: "mlp" },
    { name: "MEDICAL PARK GEBZE HASTANESİ", group: "mlp" },
    { name: "VM MEDICAL PARK KOCAELİ HASTANESİ", group: "mlp" },
    { name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – ESENYURT EK BİNASI", group: "mlp" },
    { name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – TOPKAPI EK BİNASI", group: "mlp" },
    { name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – GAZİOSMANPAŞA EK BİNASI", group: "mlp" },
    { name: "İSTİNYE ÜNİVERSİTESİ AĞIZ VE DİŞ SAĞLIĞI ARAŞTIRMA VE UYGULAMA MERKEZİ", group: "mlp" },
    { name: "İSTANBUL AYDIN ÜNİVERSİTESİ SAĞLIK UYGULAMA VE ARAŞTIRMA MERKEZİ", group: "mlp" },
    { name: "LIV HOSPITAL ULUS", group: "liv" },
    { name: "LIV HOSPITAL VADİSTANBUL", group: "liv" },
  ] as { name: string; group: "mlp" | "liv"; logo?: string; url?: string }[],

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

/** Formats Turkish E.164 numbers (`+905521389721`) as `+90 552 138 97 21` for clean display. */
export function formatPhoneDisplay(phone: string): string {
  const m = phone.match(/^\+90(\d{3})(\d{3})(\d{2})(\d{2})$/);
  return m ? `+90 ${m[1]} ${m[2]} ${m[3]} ${m[4]}` : phone;
}
