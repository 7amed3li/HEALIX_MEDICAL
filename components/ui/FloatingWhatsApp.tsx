"use client";

import { motion } from "motion/react";
import { siteConfig, isValidWhatsAppUrl } from "@/lib/config/site";
import type { Locale } from "@/lib/i18n/config";

type Props = {
  locale: Locale;
};

const LABELS: Record<Locale, string> = {
  ar: "تواصل واتساب",
  en: "WhatsApp Us",
  fr: "WhatsApp",
  ru: "WhatsApp",
  tr: "WhatsApp",
};

/**
 * Floating WhatsApp action button anchored to bottom-end (`fixed bottom-5 end-5`).
 * Uses Motion (`motion/react`) for spring entrance, subtle ambient pulse ring,
 * and tactile hover/press feedback.
 */
export function FloatingWhatsApp({ locale }: Props) {
  const url = siteConfig.contact.whatsapp;
  if (!isValidWhatsAppUrl(url)) return null;

  const label = LABELS[locale];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.72, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 24, delay: 0.4 }}
      className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
    >
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        whileHover={{ scale: 1.06, y: -2 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 420, damping: 24 }}
        className="group relative inline-flex h-14 items-center gap-2.5 rounded-full bg-[#25D366] px-4 text-white shadow-[0_12px_30px_-6px_rgba(37,211,102,0.58)] ring-2 ring-white/80 transition-shadow duration-300 hover:shadow-[0_16px_36px_-6px_rgba(37,211,102,0.72)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/45 sm:px-4.5"
      >
        {/* Ambient pulse ring */}
        <motion.span
          aria-hidden="true"
          animate={{ scale: [1, 1.32, 1], opacity: [0.42, 0, 0.42] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[#25D366]"
        />

        {/* Crisp official WhatsApp mark */}
        <svg
          viewBox="0 0 32 32"
          fill="currentColor"
          className="h-6 w-6 shrink-0"
          aria-hidden="true"
        >
          <path d="M16.004 3.2c-7.06 0-12.8 5.74-12.8 12.8 0 2.256.592 4.46 1.716 6.404L3.1 28.9l6.652-1.744a12.75 12.75 0 006.252 1.644h.006c7.06 0 12.8-5.74 12.8-12.8 0-3.42-1.332-6.634-3.75-9.052A12.72 12.72 0 0016.004 3.2zm7.456 18.18c-.312.878-1.816 1.68-2.52 1.784-.644.096-1.456.136-2.348-.148-.54-.172-1.236-.4-2.128-.784-3.744-1.616-6.188-5.388-6.376-5.64-.188-.252-1.524-2.028-1.524-3.868 0-1.84.964-2.744 1.304-3.116.34-.372.744-.464.992-.464.248 0 .496.002.712.012.228.012.536-.088.836.636.312.744 1.056 2.572 1.148 2.76.092.188.156.408.032.66-.124.252-.188.408-.372.628-.188.22-.392.492-.56.66-.188.188-.384.392-.164.768.22.372.976 1.612 2.096 2.612 1.44 1.284 2.656 1.684 3.028 1.872.372.188.592.156.808-.096.22-.252.936-1.092 1.184-1.468.248-.372.496-.312.836-.188.34.124 2.168 1.024 2.54 1.208.372.188.62.28.712.436.092.156.092.9-.22 1.776z" />
        </svg>

        <span className="hidden text-xs font-bold tracking-wide sm:inline">
          {label}
        </span>
      </motion.a>
    </motion.div>
  );
}
