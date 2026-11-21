import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales, type Locale } from "@/lib/i18n/config";

const CRAWLER_UA =
  /bot|crawl|spider|slurp|gpt|openai|chatgpt|claude|anthropic|perplexity|manus|applebot|yandex|bing|google|facebookexternalhit|twitterbot|whatsapp|telegram|curl|wget|python/i;

function detectLocale(request: NextRequest): Locale {
  const header = request.headers.get("accept-language");
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => part.split(";")[0]?.trim().toLowerCase().slice(0, 2))
    .filter(Boolean);

  for (const code of preferred) {
    if (code && isLocale(code)) return code;
  }
  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocalePrefix = locales.some(
    (loc) => pathname === `/${loc}` || pathname.startsWith(`/${loc}/`)
  );
  if (hasLocalePrefix) return;

  const userAgent = request.headers.get("user-agent") || "";
  const url = request.nextUrl.clone();

  // Serve full 200 OK SSR HTML directly for AI agents (Manus, ChatGPT, Perplexity)
  // and search crawlers on unprefixed paths so fetchers never stall on 307 redirects.
  if (CRAWLER_UA.test(userAgent)) {
    url.pathname = pathname === "/" ? `/${defaultLocale}` : `/${defaultLocale}${pathname}`;
    return NextResponse.rewrite(url);
  }

  const locale = detectLocale(request);
  url.pathname = pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|icons|favicon\\.ico|icon\\.png|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|llms\\.txt|llms-full\\.txt|google25a857f9c98e0560\\.html).*)",
  ],
};
