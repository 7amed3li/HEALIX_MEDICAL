import { Check, Stethoscope } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { BdiText } from "@/components/ui/BdiText";

type Props = {
  dict: Dictionary;
};

export function HowHealixHelps({ dict }: Props) {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="container-page">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">
            <BdiText text={dict.home.help.title} />
          </h2>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Column 1: What HEALIX MEDICAL coordinates (#EFF5F7 mist background) */}
          <div className="rounded-2xl border border-line bg-mist p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-ice/50 bg-white text-action">
                <Check className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-navy sm:text-xl">
                <BdiText text={dict.home.help.oursTitle} />
              </h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-navy">
              {dict.home.help.ours.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-white px-4 py-3"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-action"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: What the licensed hospital and medical team decide (#FFFFFF background) */}
          <div className="rounded-2xl border border-line bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-mist text-navy">
                <Stethoscope className="h-5 w-5 text-navy" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="text-lg font-bold text-navy sm:text-xl">
                {dict.home.help.theirsTitle}
              </h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm leading-relaxed text-navy">
              {dict.home.help.theirs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line bg-mist/45 px-4 py-3"
                >
                  <Stethoscope
                    className="mt-0.5 h-4 w-4 shrink-0 text-slate"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
