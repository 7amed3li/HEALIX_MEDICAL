"use client";

import Link from "next/link";
import { motion } from "motion/react";

type Variant = "primary" | "secondary" | "ghost-dark";

type BaseProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type LinkButtonProps = BaseProps & {
  href: string;
  onClick?: () => void;
};

type NativeButtonProps = BaseProps & {
  href?: never;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
};

type Props = LinkButtonProps | NativeButtonProps;

const SPRING = { type: "spring" as const, stiffness: 460, damping: 32, mass: 0.65 };

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-bright text-white border border-[#07589c] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_2px_6px_rgba(8,26,41,0.18),0_8px_18px_-8px_rgba(10,114,198,0.45)] hover:bg-bright-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.34),0_4px_10px_rgba(8,26,41,0.2),0_12px_24px_-8px_rgba(10,114,198,0.5)]",
  secondary:
    "bg-white text-navy border border-line shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_1px_2px_rgba(16,40,62,0.06)] hover:border-ice hover:bg-mist/60",
  "ghost-dark":
    "bg-white/10 text-white border border-white/25 backdrop-blur-sm shadow-[inset_0_1px_0_rgba(255,255,255,0.16)] hover:border-ice/70 hover:bg-white/16",
};

/**
 * Tactile + React Bits Shiny Button:
 * Combines Kitchen's inner highlight & spring press physics with a subtle
 * React Bits light sheen sweep on hover.
 */
export function TactileButton({
  children,
  variant = "primary",
  className = "",
  ...rest
}: Props) {
  const base = `group relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:pointer-events-none disabled:opacity-60 ${variantClasses[variant]} ${className}`;

  const sheen =
    variant === "primary" ? (
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
      />
    ) : null;

  if ("href" in rest && rest.href) {
    const isFull = className.includes("w-full");
    return (
      <motion.div
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.975, y: 0.5 }}
        transition={SPRING}
        className={isFull ? "flex w-full" : "inline-flex"}
      >
        <Link href={rest.href} onClick={rest.onClick} className={base}>
          {sheen}
          <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        </Link>
      </motion.div>
    );
  }

  const { type = "button", disabled, onClick } = rest as NativeButtonProps;
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileHover={disabled ? undefined : { y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.975, y: 0.5 }}
      transition={SPRING}
      className={base}
    >
      {sheen}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </motion.button>
  );
}
