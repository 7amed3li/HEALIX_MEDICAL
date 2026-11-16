import { Languages, Compass, Stethoscope, Shield } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Props = {
  dict: Dictionary;
};

const icons = [Languages, Compass, Stethoscope, Shield];

/**
 * Light Overview Strip (#FFFFFF background, #EFF5F7 icon badges, #69B7D1 accents, #D7E1E8 borders, #66768A secondary text).
 */
export function InfoStrip({ dict }: Props) {
  return (
    <section className="border-b border-line bg-white">
      <div className="container-page py-8 sm:py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dict.home.strip.map((item, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 rounded-xl border border-line bg-white p-4 transition-colors duration-200 hover:border-ice"
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-ice/50 bg-mist text-navy">
                  <Icon className="h-5 w-5 text-action" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="text-sm font-bold text-navy">{item.title}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-slate">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
