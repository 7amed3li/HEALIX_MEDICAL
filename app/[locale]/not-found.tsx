import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="display-type text-6xl font-semibold text-action">404</p>
      <h1 className="mt-4 text-3xl font-semibold text-navy sm:text-4xl">{dict.notFound.title}</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate">{dict.notFound.text}</p>
      <Link href={`/${defaultLocale}`} className="btn-primary mt-8 min-h-11 px-6 py-2.5 text-sm">
        {dict.notFound.back}
      </Link>
    </div>
  );
}
