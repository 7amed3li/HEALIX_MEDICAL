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
    <div className="rounded-2xl border border-line bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3.5 border-b border-line pb-4">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-ice/45 bg-mist text-action">
          <ServiceIcon id={id} className="h-6 w-6" />
        </span>
        {stepsTitle && (
          <h2 className="text-base font-bold text-navy">{stepsTitle}</h2>
        )}
      </div>

      {steps && steps.length > 0 && (
        <ol className="mt-4 grid gap-2.5 sm:grid-cols-2">
          {steps.map((step, idx) => (
            <li
              key={step.title}
              className="flex items-center gap-2.5 rounded-xl border border-line/80 bg-mist/50 px-3.5 py-2.5"
            >
              <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy text-xs font-bold text-white">
                {idx + 1}
              </span>
              <span className="text-xs font-semibold text-navy">
                {step.title}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
            );
}
