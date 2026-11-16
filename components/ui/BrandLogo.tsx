import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/config/site";

type Props = {
  href: string;
  ariaLabel: string;
  variant?: "light" | "dark";
  size?: "sm" | "md";
};

/**
 * Official HEALIX MEDICAL brand mark.
 * Combines the extracted heart-and-person emblem from the official reference card
 * with the clean English "HEALIX MEDICAL" typography (with the champagne-gold 'X').
 * Always rendered LTR so the English brand name never flips in RTL layouts.
 */
export function BrandLogo({ href, ariaLabel, variant = "light", size = "md" }: Props) {
  const isDark = variant === "dark";
  const imgSize = size === "sm" ? 36 : 42;

  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      dir="ltr"
      className="group inline-flex items-center gap-2.5 text-left focus-visible:outline-offset-4"
    >
      {siteConfig.logo && (
        <Image
          src={siteConfig.logo.src}
          alt=""
          width={imgSize}
          height={Math.round((imgSize * siteConfig.logo.height) / siteConfig.logo.width)}
          className="shrink-0 object-contain transition-transform duration-200 group-hover:scale-[1.03]"
          priority
        />
      )}
      <span className="flex flex-col leading-none">
        <span
          className={`text-lg font-extrabold tracking-[0.16em] sm:text-xl ${
            isDark ? "text-white" : "text-navy"
          }`}
        >
          HEALI<span className={isDark ? "text-gold" : "text-gold-deep"}>X</span>
        </span>
        <span
          className={`mt-1 text-[10px] font-semibold tracking-[0.28em] ${
            isDark ? "text-gold-soft" : "text-slate"
          }`}
        >
          MEDICAL
        </span>
      </span>
    </Link>
  );
}
