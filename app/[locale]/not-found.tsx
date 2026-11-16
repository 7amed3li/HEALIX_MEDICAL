import Link from "next/link";
import { defaultLocale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function NotFound() {
  const dict = await getDictionary(defaultLocale);
  return (
    <div className="container-page flex flex-1 flex-col items-center justify-center py-24 text-center">
      <p className="text-sm font-semibold text-action">404</p>
      <h1 className="mt-2 text-3xl font-bold text-navy">{dict.notFound.title}</h1>
      <p className="mt-3 max-w-md text-sm text-slate">{dict.notFound.text}</p>
      <Link
        href={`/${defaultLocale}`}
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-action px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-action-hover active:translate-y-px"
      >
        {dict.notFound.back}
      </Link>
    </div>
  );
}
