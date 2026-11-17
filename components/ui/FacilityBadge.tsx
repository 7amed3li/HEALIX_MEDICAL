import Image from "next/image";
import type { FacilityBrand } from "@/content/facilities";

type Props = {
  brand: FacilityBrand;
  name: string;
  logo?: string;
};

const brandMarks: Record<
  FacilityBrand,
  { code: string; sub: string; bg: string; border: string; text: string; accent: string }
> = {
  "liv-hospital": {
    code: "LIV",
    sub: "HOSPITAL",
    bg: "bg-navy",
    border: "border-navy-700",
    text: "text-white",
    accent: "bg-brand-red",
  },
  "medical-park": {
    code: "MP",
    sub: "MEDICAL PARK",
    bg: "bg-mist",
    border: "border-ice/60",
    text: "text-navy",
    accent: "bg-bright",
  },
  "vm-medical-park": {
    code: "VM",
    sub: "MEDICAL PARK",
    bg: "bg-bright",
    border: "border-bright",
    text: "text-white",
    accent: "bg-ice-soft",
  },
  "istinye-university": {
    code: "İST",
    sub: "ÜNİVERSİTE",
    bg: "bg-white",
    border: "border-line",
    text: "text-navy",
    accent: "bg-action",
  },
  "istanbul-aydin": {
    code: "İAÜ",
    sub: "SAĞLIK",
    bg: "bg-white",
    border: "border-line",
    text: "text-action",
    accent: "bg-ice",
  },
};

/**
 * Renders the official facility logo image if provided, or a crisp architectural
 * group monogram badge (`LIV`, `MP`, `VM`, `İST`, `İAÜ`) without inventing
 * third-party trademark graphics.
 */
export function FacilityBadge({ brand, name, logo }: Props) {
  if (logo) {
    return (
      <div className="flex h-12 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-line bg-white p-1.5">
        <Image src={logo} alt={name} width={56} height={48} className="h-full w-full object-contain" />
      </div>
    );
  }

  const m = brandMarks[brand];
  return (
    <div
      dir="ltr"
      aria-hidden="true"
      className={`relative flex h-12 w-14 shrink-0 flex-col items-center justify-center overflow-hidden rounded-xl border ${m.bg} ${m.border} ${m.text} shadow-soft`}
    >
      <span className={`absolute inset-x-0 top-0 h-1 ${m.accent}`} />
      <span className="text-sm font-extrabold tracking-wider leading-none">{m.code}</span>
      <span className="mt-1 text-[7px] font-bold tracking-widest opacity-80 leading-none">
        {m.sub}
      </span>
    </div>
  );
}
