import {
  Activity,
  Brain,
  Bone,
  Droplets,
  Footprints,
  Gauge,
  Microscope,
  Network,
  Ribbon,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import type { ServiceId } from "@/content/services";

type Props = {
  id: ServiceId;
  className?: string;
};

/**
 * Unified SVG icon system for all 12 services:
 * - Single icon library (`lucide-react`) + custom anatomical line SVGs for liver & kidney.
 * - Every service has a distinct, non-duplicate icon with uniform `strokeWidth={1.75}`.
 * - Avoids hospital/heart-cross emblems that could imply HEALIX is a hospital.
 */
export function ServiceIcon({ id, className = "h-6 w-6" }: Props) {
  switch (id) {
    case "liver-transplantation":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M4 10.5C4 6.8 7.2 4.5 11.8 4.5c4.5 0 8.2 1.8 8.2 5.2 0 2.6-2.1 4.4-4.8 5.2-2.4.7-4.5 1.8-6.4 3.4C6.6 20 4 18.7 4 15.8v-5.3Z" />
          <path d="M12.2 5v9.8" />
          <path d="M12.2 11.5c1.6.4 3 1.2 4.1 2.4" />
        </svg>
      );
    case "kidney-transplantation":
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className={className}
        >
          <path d="M8.5 4.5C5.7 4.5 3.8 7 3.8 10.7c0 4.3 2.1 8.8 5.6 8.8 2 0 3.2-1.4 3.2-3.1 0-1.4-.9-2.2-1.7-3.1-.7-.8-.7-2 0-2.8.8-.9 1.7-1.7 1.7-3.1 0-1.7-1.2-2.9-4.1-2.9Z" />
          <path d="M12.5 12h4.2" />
          <path d="M15.2 9.5v5" />
        </svg>
      );
    case "parkinsons-disease":
      return <Network className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "orthopedic-surgery":
      return <Bone className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "neurosurgery":
      return <Brain className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "urology-prostate":
      return <ShieldCheck className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "endocrinology":
      return <Gauge className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "gastroenterology":
      return <Stethoscope className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "oncology":
      return <Ribbon className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "cardiology":
      return <Activity className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "rehabilitation-physiotherapy":
      return <Footprints className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "hematology":
      return <Droplets className={className} strokeWidth={1.75} aria-hidden="true" />;
    default:
      return <Microscope className={className} strokeWidth={1.75} aria-hidden="true" />;
  }
}
