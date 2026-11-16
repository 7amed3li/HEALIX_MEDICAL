import type { ServiceId } from "@/content/services";
import { ServiceIcon } from "./ServiceIcon";

type StepItem = { title: string; text: string };

type Props = {
  id: ServiceId;
  title?: string;
  steps?: StepItem[];
  stepsTitle?: string;
};

/**
 * Clean, flat medical illustration panel:
 * No fake skeleton bars, no dot-grids, no decorative red dots.
 * Uses #FFFFFF surface, #D7E1E8 border, #10283E and #69B7D1 line art.
 * Structured Specialty Overview Card for service detail headers:
 * Displays the specialty icon and a concise 4-step coordination summary,
 * eliminating empty white space and duplicate icons.
 */
export function SpecialtyVisual({ id, steps, stepsTitle }: Props) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-line-soft bg-white shadow-card">
      <div className="flex items-center gap-4 border-b border-line-soft bg-gradient-to-r from-mist to-white px-6 py-5 rtl:bg-gradient-to-l">
        <span className="inline-flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-navy text-ice ring-1 ring-gold/40">
          <ServiceIcon id={id} className="h-6 w-6" />
        </span>
        {stepsTitle && (
          <h2 className="text-[1.05rem] font-semibold text-navy">{stepsTitle}</h2>
        )}
      </div>

      {steps && steps.length > 0 && (
        <ol className="grid gap-2.5 p-5 sm:grid-cols-2 sm:p-6">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="flex items-center gap-3 rounded-xl bg-mist-soft px-4 py-3"
            >
              <span className="display-type w-6 shrink-0 text-center text-[1.15rem] font-semibold text-gold-deep">
                {idx + 1}
              </span>
              <span className="text-[13px] font-semibold leading-snug text-navy">
                {step.title}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
