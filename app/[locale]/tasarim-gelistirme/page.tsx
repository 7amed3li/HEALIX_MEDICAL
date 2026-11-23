import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  Globe2,
  Layers,
  Monitor,
  Smartphone,
  Sparkles,
} from "lucide-react";
import { formatNumber, isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { pagePath } from "@/lib/i18n/routes";
import { siteConfig } from "@/lib/config/site";
import { BdiText } from "@/components/ui/BdiText";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";

  return buildMetadata({
    locale,
    title: isAr
      ? "تصميم وبرمجة المنصة — HEALIX MEDICAL | Hamed Mohamed"
      : "Design & Development — HEALIX MEDICAL | Hamed Mohamed",
    description: isAr
      ? "تصميم وبرمجة منصة HEALIX MEDICAL بـ ٥ لغات (١٤٢ صفحة ثابتة، ٣٣ منشأة صحية متعاقدة، وتحسين SEO ووكلاء الذكاء الاصطناعي)."
      : "End-to-end design and full-stack development of HEALIX MEDICAL: 5 languages with native Arabic RTL, 142 static pages, 33 contracted facilities, and technical SEO + GEO.",
    paths: samePathForAllLocales("/tasarim-gelistirme"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

const DECISIONS = {
  ar: [
    {
      title: "١. معمارية RTL أصلية وخصائص CSS المنطقية (0.00 CLS)",
      body: "توليد اتجاه الصفحة (dir='rtl') والخطوط العربية من السيرفر مباشرة عبر React Server Components مع استخدام خصائص Tailwind v4 المنطقية (ms/me/ps/pe/start/end) والأرقام العربية المشرقية وعزل النصوص ثنائية الاتجاه (BdiText)، مما قضى تماماً على اهتزاز التخطيط.",
    },
    {
      title: "٢. بوابة فحص التعدد اللغوي وقت البناء (validate-i18n.mjs)",
      body: "سكربت فحص صارم يعمل قبل كل عملية بناء (prebuild) للتحقق من تطابق ٣٢١ مفتاح واجهة + ٣٧٢ مفتاح خدمة + ١٨٦ مفتاح دليل إرشادي عبر اللغات الخمس (٤٬٣٩٥ نصاً مترجماً) بدون أي حمل إضافي وقت التشغيل.",
    },
    {
      title: "٣. تحسين محركات البحث التقليدية ووكلاء الذكاء الاصطناعي (SEO + GEO)",
      body: "خريطة موقع ديناميكية شاملة للصور وروابط hreflang، مع proxy ذكي يقدّم استجابة 200 OK فورية لزواحف البحث ووكلاء الذكاء الاصطناعي (ChatGPT, Perplexity, Claude, Manus)، بالإضافة إلى ملفات llms.txt وllms-full.txt وبيانات JSON-LD المهيكلة.",
    },
    {
      title: "٤. الخصوصية الطبية الصارمة وتوصيل الاستفسارات الفوري",
      body: "تصميم نموذج الاستفسار الأولي بدون جمع أي ملفات أو تقارير طبية على الموقع، مع تعطيل بكسلات التتبع الإعلانية، وحماية مزدوجة ضد الروبوتات (Honeypot + الحد الأدنى لزمن التعبئة)، وربط مباشر عبر Resend API ببريد الشركة.",
    },
  ],
  en: [
    {
      title: "1. Server-First Native RTL & Logical CSS Architecture (0.00 CLS)",
      body: "Directionality (dir='rtl'), localized font pairing, and Arabic-Indic numeral formatting are resolved on the server via React Server Components alongside Tailwind v4 logical properties (ms/me/ps/pe/start/end) and <BdiText> isolation—eliminating client-side layout shift.",
    },
    {
      title: "2. Build-Time i18n Schema & Key-Parity Gate (validate-i18n.mjs)",
      body: "A zero-dependency prebuild verifier enforces 100% key and array-length parity across all 5 locales (321 UI keys + 372 service keys + 186 legal guide keys = 4,395 validated strings) before Next.js compiles a single route.",
    },
    {
      title: "3. Dual Technical SEO + Generative Engine Optimization (GEO)",
      body: "Combines a 135-URL multilingual XML image sitemap, self-referencing canonicals, and Service/ItemList/BreadcrumbList JSON-LD with an AI-crawler-aware Edge Proxy (200 OK SSR rewrite on root) plus /llms.txt and /llms-full.txt.",
    },
    {
      title: "4. Privacy-First Clinical Boundary & Resilient Enquiry Delivery",
      body: "Strictly separates patient coordination from clinical data: zero medical files collected on-site, no third-party ad pixels, honeypot + fill-duration anti-bot guards, and server-side Resend API delivery with instant mailto fallback.",
    },
  ],
};

const PLATFORM_SPECS = [
  {
    platform: "Open Graph / Link Preview (WhatsApp, LinkedIn URL, Slack)",
    size: "1200 × 630 px",
    ratio: "1.91 : 1",
    tipAr: "استخدم لقطة الديسكتوب العريضة مع إبقاء الشعار والعنوان الرئيسي في منطقة الأمان الوسطى (1080×560).",
    tipEn: "Use the wide desktop hero frame keeping the brand mark and headline centered within the 1080×560 safe zone.",
    asset: "/images/case-study/desktop-en.png",
  },
  {
    platform: "LinkedIn Feed Post / Carousel Slide",
    size: "1080 × 1350 px",
    ratio: "4 : 5 Portrait",
    tipAr: "أفضل مقاس لمنشورات لينكدإن؛ اعرض لقطة الموبايل (العربي RTL وبجانبه الإنجليزي LTR) داخل إطار هاتف.",
    tipEn: "Highest feed real-estate on LinkedIn; pair the English LTR and Arabic RTL mobile frames side-by-side.",
    asset: "/images/case-study/shot-3.jpg",
  },
  {
    platform: "Upwork Portfolio Cover & Project Gallery",
    size: "1200 × 900 px (Cover) · 1440 × 900 px (Gallery)",
    ratio: "4 : 3 & 16 : 10",
    tipAr: "لغلاف Upwork استخدم نسبة 4:3 متمركزة، ولصور المعرض الداخلية ارفع لقطات الديسكتوب الكاملة بدقة Retina 2x.",
    tipEn: "Use a centered 4:3 composition for the thumbnail grid and full 1440×900 Retina desktop captures inside the gallery.",
    asset: "/images/case-study/desktop-ar.png",
  },
  {
    platform: "X (Twitter) Summary Large Image & GitHub Social Card",
    size: "1200 × 675 px",
    ratio: "16 : 9",
    tipAr: "مقاس 16:9 قياسي يظهر بالكامل في بطاقات X ومعاينة مستودع GitHub بدون أي قص.",
    tipEn: "Native 16:9 widescreen card that renders uncropped across X timelines and GitHub repository social previews.",
    asset: "/images/case-study/desktop-service-ar.png",
  },
];

export default async function CaseStudyPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = await getDictionary(locale);
  const isAr = locale === "ar";
  const decisions = isAr ? DECISIONS.ar : DECISIONS.en;

  return (
    <div className="bg-mist-soft text-navy">
      {/* Top Engineer Attribution Bar */}
      <div className="border-b border-white/10 bg-[#0d1520] text-xs text-white/75">
        <div className="container-page flex h-12 items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-gold" aria-hidden="true" />
            <a
              href="https://hamedmohamed.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-gold-soft"
            >
              <strong className="font-semibold text-white">
                {isAr ? "حامد محمد (Hamed Mohamed)" : "Hamed Mohamed"}
              </strong>{" "}
              · {isAr ? "مهندس برمجيات متكامل (Full-Stack Engineer)" : "Full-Stack Engineer"}
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://hamedmohamed.dev/"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="hidden rounded-full border border-gold/40 bg-gold/10 px-2.5 py-0.5 text-[11px] font-semibold text-gold-soft transition-colors hover:bg-gold/20 sm:inline-block"
            >
              hamedmohamed.dev
            </a>
            <Link
              href={pagePath(locale as Locale, "home")}
              className="font-semibold text-ice-soft transition-colors hover:text-white"
            >
              {isAr ? "العودة للموقع ←" : "Back to Live Site →"}
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Section with Desktop + Mobile Device Composition */}
      <section className="surface-dark grain relative overflow-hidden pt-12 pb-0 text-white sm:pt-16">
        <div className="container-page relative z-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-gold-soft">
            {isAr
              ? "تصميم وبرمجة — HEALIX MEDICAL · إسطنبول"
              : "Design & Development — Healix Medical · Istanbul"}
          </p>

          <h1 className="display-type mt-3 max-w-3xl text-3xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]">
            {isAr ? (
              <>
                من غياب رقمي كامل إلى{" "}
                <span className="text-ice-soft">النتيجة الأولى في جوجل.</span>
              </>
            ) : (
              <>
                From invisible <em className="font-normal italic text-ice-soft">to first.</em>
              </>
            )}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            {isAr
              ? "منصة تنسيق طبي دولي لشركة HEALIX MEDICAL في إسطنبول — صُمّمت وبُنيت بالكامل من الصفر بخمس لغات، لتخاطب المرضى وعائلاتهم باللغة التي يبحثون ويفكرون بها."
              : "An international patient-coordination platform for HEALIX MEDICAL — designed and engineered end-to-end in the 5 languages its patients actually search and think in."}
          </p>

          {/* High-signal metadata chips */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="rounded-full border border-ice/40 bg-ice/10 px-3.5 py-1.5 text-xs font-semibold text-white">
              <strong className="text-gold-soft">{isAr ? "حي:" : "Live:"}</strong>{" "}
              <bdi dir="ltr">www.healixistanbul.com.tr</bdi>
            </span>
            <span className="rounded-full border border-ice/40 bg-ice/10 px-3.5 py-1.5 text-xs font-semibold text-white">
              <strong className="text-gold-soft">{formatNumber(5, locale as Locale)}</strong>{" "}
              {isAr ? "لغات (العربية RTL بالكامل)" : "languages (Arabic native RTL)"}
            </span>
            <span className="rounded-full border border-ice/40 bg-ice/10 px-3.5 py-1.5 text-xs font-semibold text-white">
              <strong className="text-gold-soft">{formatNumber(142, locale as Locale)}</strong>{" "}
              {isAr ? "صفحة ثابتة (SSG)" : "static SSG pages"}
            </span>
            <span className="rounded-full border border-ice/40 bg-ice/10 px-3.5 py-1.5 text-xs font-semibold text-white">
              <strong className="text-gold-soft">{isAr ? "الدور:" : "Role:"}</strong>{" "}
              {isAr ? "تصميم وهندسة كاملة منفرداً" : "Design + Full-Stack Build, Solo"}
            </span>
          </div>

          {/* Multi-Device Hero Stage: 16:10 Desktop Browser Window + Overlapping 9:16 Mobile Frame */}
          <div className="relative mt-10">
            <div className="overflow-hidden rounded-t-2xl border border-white/15 border-b-0 bg-white shadow-[0_-20px_60px_rgba(0,0,0,0.42)]">
              <div
                dir="ltr"
                className="flex items-center gap-2 border-b border-line bg-[#e9eff3] px-4 py-2.5"
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[#e08a7b]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#e6cf9a]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#9fd08a]" />
                <span className="ms-2 flex-1 truncate rounded-md bg-white px-3 py-1 text-[11px] font-medium text-slate">
                  https://www.healixistanbul.com.tr/{isAr ? "ar" : "en"} — Desktop (1440×900)
                </span>
              </div>
              <Image
                src={isAr ? "/images/case-study/desktop-ar.png" : "/images/case-study/desktop-en.png"}
                alt="HEALIX MEDICAL desktop platform preview"
                width={1440}
                height={900}
                priority
                className="block h-auto w-full object-cover object-top"
              />
            </div>

            {/* Floating Mobile Device Mockup (never stretched!) */}
            <div className="hidden lg:block lg:absolute lg:end-8 lg:-bottom-6 lg:w-[230px] xl:w-[260px]">
              <div className="overflow-hidden rounded-[2rem] border-[6px] border-[#0d1520] bg-white shadow-2xl ring-1 ring-white/20">
                <div className="bg-[#0d1520] py-1.5 text-center text-[9px] font-semibold tracking-wider text-white/70">
                  MOBILE · 390×844
                </div>
                <Image
                  src={isAr ? "/images/case-study/shot-3.jpg" : "/images/case-study/shot-1.jpg"}
                  alt="HEALIX MEDICAL mobile guide preview"
                  width={540}
                  height={960}
                  className="block h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Column Impact Metrics Bar */}
      <section className="border-b border-white/10 bg-navy py-8 text-white sm:py-10">
        <div className="container-page grid grid-cols-2 gap-6 lg:grid-cols-4">
          <div className="border-white/15 lg:border-e lg:pe-6">
            <p className="display-type text-3xl font-bold text-white sm:text-4xl">
              {formatNumber(5, locale as Locale)}
            </p>
            <p className="mt-1 text-xs font-medium text-ice-soft sm:text-sm">
              {isAr ? "لغات كاملة، والعربية RTL أصلية" : "Languages, Arabic 100% native RTL"}
            </p>
          </div>
          <div className="border-white/15 lg:border-e lg:pe-6">
            <p className="display-type text-3xl font-bold text-white sm:text-4xl">
              {formatNumber(12, locale as Locale)}{" "}
              <span className="text-gold">+ {formatNumber(3, locale as Locale)}</span>
            </p>
            <p className="mt-1 text-xs font-medium text-ice-soft sm:text-sm">
              {isAr
                ? "تخصصاً طبياً + ٣ أدلة قانونية لزراعة الأعضاء"
                : "Medical specialties + 3 legal transplant guides"}
            </p>
          </div>
          <div className="border-white/15 lg:border-e lg:pe-6">
            <p className="display-type text-3xl font-bold text-white sm:text-4xl">
              {formatNumber(33, locale as Locale)}
            </p>
            <p className="mt-1 text-xs font-medium text-ice-soft sm:text-sm">
              {isAr
                ? "منشأة صحية متعاقدة في دليل تفاعلي"
                : "Contracted healthcare facilities in interactive directory"}
            </p>
          </div>
          <div>
            <p className="display-type text-3xl font-bold text-white sm:text-4xl">
              #<span className="text-gold">{formatNumber(1, locale as Locale)}</span>
            </p>
            <p className="mt-1 text-xs font-medium text-ice-soft sm:text-sm">
              {isAr
                ? "في بحث جوجل عن “healix istanbul”"
                : "On Google for “healix istanbul”"}
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: Desktop & Mobile Visual Showcase */}
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <Monitor className="h-3.5 w-3.5 text-action" aria-hidden="true" />
              <span>{isAr ? "العرض البصري الحي" : "Live Visual Showcase"}</span>
            </p>
            <h2 className="display-type mt-3 text-2xl font-bold text-navy sm:text-4xl">
              {isAr ? "العمل من الموقع الحي مباشرة — بدون قوالب وهمية" : "The work, in pictures — real live screens"}
            </h2>
            <p className="mt-2 text-sm text-slate sm:text-base">
              {isAr
                ? "لقطات حقيقية لديسكتوب (16:10) وموبايل (9:16) توضح التناظر الكامل بين الإنجليزية LTR والعربية RTL."
                : "Properly framed 16:10 desktop captures and 9:16 mobile viewports showing true LTR / RTL architectural symmetry."}
            </p>
          </div>

          {/* 2-Column Desktop Comparison (English LTR vs Arabic RTL) */}
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div dir="ltr" className="flex items-center gap-1.5 border-b border-line bg-mist px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-[#e08a7b]" />
                <span className="h-2 w-2 rounded-full bg-[#e6cf9a]" />
                <span className="h-2 w-2 rounded-full bg-[#9fd08a]" />
                <span className="ms-2 text-[11px] font-medium text-slate">
                  www.healixistanbul.com.tr/en — Desktop LTR
                </span>
              </div>
              <Image
                src="/images/case-study/desktop-en.png"
                alt="English desktop homepage"
                width={1440}
                height={900}
                className="h-auto w-full object-cover"
              />
              <figcaption className="flex items-center justify-between border-t border-line-soft px-4 py-3 text-xs font-semibold text-navy">
                <span>{isAr ? "واجهة الديسكتوب — الإنجليزية" : "Desktop Homepage — English"}</span>
                <span className="rounded-full bg-mist px-2.5 py-0.5 text-action">EN · LTR</span>
              </figcaption>
            </figure>

            <figure className="overflow-hidden rounded-2xl border border-line bg-white shadow-soft">
              <div dir="ltr" className="flex items-center gap-1.5 border-b border-line bg-mist px-3.5 py-2">
                <span className="h-2 w-2 rounded-full bg-[#e08a7b]" />
                <span className="h-2 w-2 rounded-full bg-[#e6cf9a]" />
                <span className="h-2 w-2 rounded-full bg-[#9fd08a]" />
                <span className="ms-2 text-[11px] font-medium text-slate">
                  www.healixistanbul.com.tr/ar — Desktop RTL
                </span>
              </div>
              <Image
                src="/images/case-study/desktop-ar.png"
                alt="Arabic RTL desktop homepage"
                width={1440}
                height={900}
                className="h-auto w-full object-cover"
              />
              <figcaption className="flex items-center justify-between border-t border-line-soft px-4 py-3 text-xs font-semibold text-navy">
                <span>{isAr ? "واجهة الديسكتوب — العربية (RTL)" : "Desktop Homepage — Arabic"}</span>
                <span className="rounded-full bg-mist px-2.5 py-0.5 text-action">AR · RTL</span>
              </figcaption>
            </figure>
          </div>

          {/* 3-Column Mobile Viewport Showcase (Framed in realistic phone bezels, never stretched) */}
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              {
                src: "/images/case-study/shot-2.jpg",
                title: isAr ? "دليل لجنة الأخلاقيات — إنجليزي" : "Ethics Commission Guide — English",
                badge: "EN · Mobile",
              },
              {
                src: "/images/case-study/shot-3.jpg",
                title: isAr ? "نفس الدليل — عربي RTL" : "Same Guide — Arabic Native RTL",
                badge: "AR · RTL",
              },
              {
                src: "/images/case-study/shot-4.jpg",
                title: isAr ? "مكتبة أدلة المرضى — عربي" : "Patient Guides Library — Arabic",
                badge: "AR · Directory",
              },
            ].map((item) => (
              <figure
                key={item.title}
                className="flex flex-col items-center justify-between rounded-2xl border border-line bg-white p-5 shadow-soft"
              >
                <div className="w-full max-w-[260px] overflow-hidden rounded-[1.75rem] border-[5px] border-navy bg-white shadow-card">
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={540}
                    height={960}
                    className="block h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 flex w-full items-center justify-between border-t border-line-soft pt-3 text-xs font-semibold text-navy">
                  <span>{item.title}</span>
                  <span className="rounded-full bg-mist px-2.5 py-0.5 text-[11px] text-action">
                    {item.badge}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: Before -> After + Technical Benchmarks */}
      <section className="border-y border-line bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <Sparkles className="h-3.5 w-3.5 text-action" aria-hidden="true" />
              <span>{isAr ? "التحول الرقمي والأثر" : "Transformation & Impact"}</span>
            </p>
            <h2 className="display-type mt-3 text-2xl font-bold text-navy sm:text-4xl">
              {isAr ? "قبل ← بعد" : "Before → After"}
            </h2>
            <p className="mt-2 text-sm text-slate sm:text-base">
              {isAr
                ? "بناء هندسي واحد حوّل الشركة من غياب رقمي إلى منصة مرجعية متعددة اللغات."
                : "One cohesive engineering build. One owned multilingual digital asset."}
            </p>
          </div>

          <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-11">
            <div className="rounded-2xl border border-line bg-mist/60 p-6 lg:col-span-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate">
                {isAr ? "قبل بناء المنصة (Before)" : "Before"}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-strong">
                <li>• {isAr ? "لا يوجد موقع إلكتروني رسمي للشركة" : "No official company website"}</li>
                <li>
                  •{" "}
                  {isAr
                    ? "المرضى يصلون إلى وسطاء ومنصات عامة بدلاً من الشركة مباشرة"
                    : "International patients landed on third-party marketplaces instead"}
                </li>
                <li>
                  •{" "}
                  {isAr
                    ? "غياب المحتوى القانوني والتعريفي بلغات المرضى (العربية، الفرنسية، الروسية)"
                    : "Zero structured presence in Arabic, French, Russian, or Turkish"}
                </li>
                <li>
                  •{" "}
                  {isAr
                    ? "لا يوجد دليل موثّق للمنشآت الصحية الـ ٣٣ المتعاقد معها"
                    : "No searchable registry of the 33 contracted hospitals & university centers"}
                </li>
              </ul>
            </div>

            <div className="flex items-center justify-center text-2xl font-extrabold text-gold lg:col-span-1">
              <ArrowRight className="flip-rtl h-7 w-7" aria-hidden="true" />
            </div>

            <div className="rounded-2xl border-2 border-gold bg-[#fffdf6] p-6 shadow-soft lg:col-span-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gold-deep">
                {isAr ? "بعد الإطلاق — نوفمبر ٢٠٢٦ (After)" : "After — Nov 2026"}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-navy">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                  <span>
                    <strong>{isAr ? "١٤٢ صفحة ثابتة (SSG)" : "142 static pages"}</strong>{" "}
                    {isAr
                      ? "تعمل بسرعة فائقة عبر ٥ لغات مع دعم عربي RTL كامل"
                      : "pre-rendered across 5 languages with native Arabic RTL"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                  <span>
                    <strong>{isAr ? "النتيجة #١ في جوجل" : "#1 on Google"}</strong>{" "}
                    {isAr
                      ? "لاسم العلامة التجارية مع فهرسة أكثر من ١٢٥ رابط متعدد اللغات في Search Console"
                      : "for brand queries with 125+ localized URLs indexed in Search Console"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                  <span>
                    <strong>{isAr ? "دليل تفاعلي لـ ٣٣ منشأة متعاقدة" : "33-facility interactive directory"}</strong>{" "}
                    {isAr
                      ? "مع فلترة فورية حسب المجموعة الطبية والمدينة"
                      : "with instant filtering by hospital group and Turkish city"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-action" aria-hidden="true" />
                  <span>
                    <strong>{isAr ? "جاهزية كاملة لوكلاء الذكاء الاصطناعي" : "AI Search & GEO Ready"}</strong>{" "}
                    {isAr
                      ? "عبر ملفات llms.txt وllms-full.txt وبيانات JSON-LD المهيكلة"
                      : "via /llms.txt, /llms-full.txt, 200 OK bot rewrites, and rich JSON-LD"}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Core Engineering Decisions */}
      <section className="py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <Cpu className="h-3.5 w-3.5 text-action" aria-hidden="true" />
              <span>{isAr ? "القرارات الهندسية والمعمارية" : "Architecture & Engineering Decisions"}</span>
            </p>
            <h2 className="display-type mt-3 text-2xl font-bold text-navy sm:text-4xl">
              {isAr ? "لماذا بُنيت المنصة بهذه الطريقة؟" : "Key Technical Decisions & Trade-offs"}
            </h2>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {decisions.map((d) => (
              <div
                key={d.title}
                className="rounded-2xl border border-line bg-white p-6 shadow-soft"
              >
                <h3 className="text-base font-bold text-navy">
                  <BdiText text={d.title} />
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate-strong">
                  <BdiText text={d.body} />
                </p>
              </div>
            ))}
          </div>

          {/* Tech Stack Pills */}
          <div className="mt-8 flex flex-wrap gap-2.5">
            {[
              "Next.js 16.4 (App Router · Turbopack)",
              "React 19 Server Components",
              "TypeScript 5",
              "Tailwind CSS v4 (Logical RTL)",
              "Motion + GSAP + Lenis",
              "Build-Time i18n Validator",
              "Technical SEO + GEO (llms.txt)",
              "Resend API + Honeypot Guard",
            ].map((tech) => (
              <span
                key={tech}
                dir="ltr"
                className="rounded-full border border-line bg-white px-4 py-2 text-xs font-semibold text-navy shadow-soft"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Multi-Platform Screenshot & Social Sharing Guide */}
      <section className="border-t border-line bg-white py-14 sm:py-20">
        <div className="container-page">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <Layers className="h-3.5 w-3.5 text-action" aria-hidden="true" />
              <span>
                {isAr
                  ? "دليل مقاسات الصور لجميع المنصات"
                  : "Multi-Platform Screenshot & Share Kit"}
              </span>
            </p>
            <h2 className="display-type mt-3 text-2xl font-bold text-navy sm:text-4xl">
              {isAr
                ? "المقاسات القياسية لنشر دراسة الحالة بدون قص أو تشويه"
                : "Platform-Optimized Image Dimensions (2026 Spec)"}
            </h2>
            <p className="mt-2 text-sm text-slate sm:text-base">
              {isAr
                ? "تم فصل لقطات الديسكتوب العريضة (16:10) عن لقطات الموبايل الطولية (9:16) وتوفيرها في المسار /images/case-study/ لتناسب كل منصة احترافية."
                : "Desktop widescreen captures and portrait mobile frames are stored separately under /images/case-study/ so every platform gets its native aspect ratio."}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {PLATFORM_SPECS.map((item) => (
              <div
                key={item.platform}
                className="flex flex-col justify-between rounded-2xl border border-line bg-mist-soft p-5"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span dir="ltr" className="text-xs font-bold text-action">
                      {item.size}
                    </span>
                    <span
                      dir="ltr"
                      className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-navy"
                    >
                      {item.ratio}
                    </span>
                  </div>
                  <h3 dir="ltr" className="mt-2 text-sm font-bold text-navy">
                    {item.platform}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-strong">
                    {isAr ? item.tipAr : item.tipEn}
                  </p>
                </div>

                <div className="mt-4 border-t border-line pt-3">
                  <a
                    href={item.asset}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-action hover:text-bright"
                  >
                    <span>
                      {isAr ? "فتح الصورة الجاهزة بدقة عالية" : "Open high-res reference asset"}
                    </span>
                    <ArrowRight className="flip-rtl h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16">
        <div className="container-page">
          <div className="surface-dark grain rounded-3xl p-8 text-center text-white shadow-card sm:p-12">
            <h2 className="display-type text-2xl font-bold text-white sm:text-4xl">
              {isAr
                ? "عملاؤك يبحثون بلغتهم الأم — وموقعك يجب أن يخاطبهم بها."
                : "Your clients search in their language. So should your website."}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              {isAr
                ? "تم تصميم وتطوير منصة HEALIX MEDICAL بالكامل بواسطة المهندس حامد محمد."
                : "HEALIX MEDICAL was designed and engineered end-to-end by Hamed Mohamed."}
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
              <a
                href="https://hamedmohamed.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gold px-6 py-2.5 text-sm font-bold text-[#231a06] transition-transform hover:-translate-y-0.5"
              >
                <Globe2 className="h-4 w-4" aria-hidden="true" />
                <span>
                  {isAr ? "زيارة موقع المهندس: hamedmohamed.dev" : "Visit Engineer Portfolio: hamedmohamed.dev"}
                </span>
              </a>
              {siteConfig.contact.whatsapp && (
                <a
                  href={siteConfig.contact.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                >
                  <Smartphone className="h-4 w-4 text-ice-soft" aria-hidden="true" />
                  <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                </a>
              )}
              <Link
                href={pagePath(locale as Locale, "contact")}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/15"
              >
                <span>{dict.common.ctaPrimary}</span>
              </Link>
            </div>
            <p className="mt-6 text-xs text-white/55">
              Tasarım ve Geliştirme:{" "}
              <a
                href="https://hamedmohamed.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-gold-soft underline underline-offset-4 hover:text-white"
              >
                {isAr ? "حامد محمد (hamedmohamed.dev)" : "Hamed Mohamed (hamedmohamed.dev)"}
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
