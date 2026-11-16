import { Languages, Compass, Stethoscope, Shield } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

const icons = [Languages, Compass, Stethoscope, Shield];

/**
 * Light overview band: four quiet editorial columns divided by hairlines,
 * each led by a champagne-ringed icon medallion.
 */
export function InfoStrip({ dict }: Props) {
  return (
    <section className="border-b border-line-soft bg-white">
      <div className="container-page py-12 sm:py-14">
        <div className="grid gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.strip.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                className="lg:border-s lg:border-line-soft lg:ps-8 lg:first:border-s-0 lg:first:ps-0"
              >
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bright/35 bg-mist-soft text-action">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h2 className="mt-4 text-[1.05rem] font-semibold leading-snug text-navy">
                  {item.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-slate">{item.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
