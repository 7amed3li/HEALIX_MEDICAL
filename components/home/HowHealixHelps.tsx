import { Check, Stethoscope } from "lucide-react";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import { BdiText } from "@/components/ui/BdiText";

type Props = {
  dict: Dictionary;
};

export function HowHealixHelps({ dict }: Props) {
  return (
    <section className="bg-white py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p>
            <span className="eyebrow">{dict.home.help.eyebrow}</span>
          </p>
          <h2 className="mt-4 text-3xl font-semibold text-navy sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            <BdiText text={dict.home.help.title} />
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Column 1: What HEALIX MEDICAL coordinates – elevated white panel, gold crest */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-line-soft bg-white p-7 shadow-card sm:p-9">
            <span
              aria-hidden="true"
              className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-bright via-ice/70 to-transparent rtl:bg-gradient-to-l"
            />
            <div className="flex items-center gap-3.5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bright/40 bg-mist-soft text-action">
                <Check className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="display-type text-[1.35rem] font-semibold leading-snug text-navy">
                <BdiText text={dict.home.help.oursTitle} />
              </h3>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy">
              {dict.home.help.ours.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl bg-mist-soft px-4 py-3"
                >
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-bright"
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: What the licensed hospital and medical team decide – quiet mist panel */}
          <div className="rounded-[1.75rem] border border-line-soft bg-mist-soft p-7 sm:p-9">
            <div className="flex items-center gap-3.5">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy">
                <Stethoscope className="h-5 w-5 text-navy" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="display-type text-[1.35rem] font-semibold leading-snug text-navy">
                {dict.home.help.theirsTitle}
              </h3>
            </div>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-navy">
              {dict.home.help.theirs.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-xl border border-line-soft bg-white px-4 py-3"
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
