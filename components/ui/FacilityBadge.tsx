import Image from "next/image";
import type { FacilityBrand } from "@/content/facilities";

type Props = {
  brand: FacilityBrand;
  name: string;
  logo?: string;
  size?: "md" | "lg";
};

const brandStyles: Record<
  FacilityBrand,
  {
    code: string;
    sub: string;
    container: string;
    ring: string;
    accentColor: string;
    motif: "shield" | "arch" | "pulse" | "columns" | "star";
  }
> = {
  "liv-hospital": {
    code: "LIV",
    sub: "HOSPITAL",
    container: "bg-gradient-to-br from-navy to-[#0c1e34] border-white/15 text-white",
    ring: "text-brand-red",
    accentColor: "bg-brand-red",
    motif: "shield",
  },
  "medical-park": {
    code: "MP",
    sub: "MEDICAL PARK",
    container: "bg-gradient-to-br from-mist to-white border-ice/70 text-navy",
    ring: "text-bright",
    accentColor: "bg-bright",
    motif: "pulse",
  },
  "vm-medical-park": {
    code: "VM",
    sub: "MEDICAL PARK",
    container: "bg-gradient-to-br from-bright to-action border-bright/80 text-white",
    ring: "text-ice-soft",
    accentColor: "bg-ice-soft",
    motif: "arch",
  },
  "istinye-university": {
    code: "İST",
    sub: "ÜNİVERSİTE",
    container: "bg-gradient-to-br from-white to-mist border-line text-navy",
    ring: "text-action",
    accentColor: "bg-navy",
    motif: "columns",
  },
  "istanbul-aydin": {
    code: "İAÜ",
    sub: "SAĞLIK",
    container: "bg-gradient-to-br from-white to-mist-soft border-line text-action",
    ring: "text-bright",
    accentColor: "bg-action",
    motif: "star",
  },
};

function CrestMotif({
  motif,
  className,
}: {
  motif: "shield" | "arch" | "pulse" | "columns" | "star";
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {motif === "shield" && (
        <path
          d="M12 3l7 3v5.5c0 4.5-3 8.2-7 9.5-4-1.3-7-5-7-9.5V6l7-3z"
          stroke="currentColor"
          strokeWidth="1.4"
          opacity="0.28"
        />
      )}
      {motif === "pulse" && (
        <path
          d="M3 12h4l2-4.5 3.5 9 2-4.5H21"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />
      )}
      {motif === "arch" && (
        <path
          d="M4 19V11a8 8 0 0116 0v8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity="0.25"
        />
      )}
      {motif === "columns" && (
        <path
          d="M4 19h16M6 16V9m6 7V9m6 7V9M4 7l8-3 8 3"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.22"
        />
      )}
      {motif === "star" && (
        <circle
          cx="12"
          cy="12"
          r="8.5"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeDasharray="2.5 2.5"
          opacity="0.28"
        />
      )}
    </svg>
  );
}

/**
 * Renders the official facility logo image if provided, or an architectural
 * group seal (`LIV`, `MP`, `VM`, `İST`, `İAÜ`) without inventing
 * third-party trademark graphics.
 */
export function FacilityBadge({ brand, name, logo, size = "md" }: Props) {
  const dims = size === "lg" ? "h-16 w-16 rounded-2xl" : "h-14 w-14 rounded-2xl";

  if (logo) {
    return (
      <div
        className={`flex ${dims} shrink-0 items-center justify-center overflow-hidden border border-line bg-white p-2 shadow-soft`}
      >
        <Image src={logo} alt={name} width={64} height={64} className="h-full w-full object-contain" />
      </div>
    );
  }

  const s = brandStyles[brand];
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className={`relative flex ${dims} shrink-0 flex-col items-center justify-center overflow-hidden border ${s.container} shadow-soft`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${s.accentColor}`} />
      <CrestMotif motif={s.motif} className={`pointer-events-none absolute inset-1.5 ${s.ring}`} />
      <span
        className={`relative z-10 font-extrabold tracking-wider leading-none ${
          size === "lg" ? "text-base" : "text-sm"
        }`}
      >
        {s.code}
      </span>
      <span className="relative z-10 mt-1 text-[6.5px] font-bold tracking-[0.14em] opacity-80 leading-none">
        {s.sub}
      </span>
    </div>
  );
}
