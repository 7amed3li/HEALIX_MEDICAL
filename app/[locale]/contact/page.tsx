import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { InstagramIcon, FacebookIcon } from "@/components/ui/SocialIcons";
import { isLocale } from "@/lib/i18n/config";
import { getDictionary, getServiceDictionary } from "@/lib/i18n/dictionaries";
import { buildMetadata, samePathForAllLocales } from "@/lib/seo/metadata";
import { services } from "@/content/services";
import { siteConfig, isValidWhatsAppUrl } from "@/lib/config/site";
import { ContactForm } from "@/components/forms/ContactForm";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = await getDictionary(locale);
  return buildMetadata({
    locale,
    title: dict.contact.metaTitle,
    description: dict.contact.metaDescription,
    paths: samePathForAllLocales("/contact"),
    ogImageAlt: dict.meta.ogImageAlt,
  });
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const [dict, serviceDict] = await Promise.all([
    getDictionary(locale),
    getServiceDictionary(locale),
  ]);

  const serviceOptions = services.map((s) => ({
    id: s.id,
    name: serviceDict[s.id].name,
  }));

  const receiverConfigured = Boolean(process.env.CONTACT_RECEIVER_URL);
  const hasWhatsApp = isValidWhatsAppUrl(siteConfig.contact.whatsapp);

  return (
    <>
      <section className="border-b border-line bg-mist py-12 sm:py-16">
        <div className="container-page">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-navy sm:text-4xl">
              {dict.contact.title}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-slate sm:text-lg">
              {dict.contact.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-18">
        <div className="container-page grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm
              locale={locale}
              dict={dict}
              serviceOptions={serviceOptions}
              receiverConfigured={receiverConfigured}
            />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-line bg-mist/60 p-6">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-5 w-5 text-action" aria-hidden="true" />
                <h2 className="text-lg font-bold text-navy">
                  {dict.contact.beforeTitle}
                </h2>
              </div>
              <ul className="mt-4 space-y-2.5 text-sm leading-relaxed text-slate-strong">
                {dict.contact.before.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-action"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Confirmed direct channels appear only when configured */}
            {(siteConfig.contact.phone || siteConfig.contact.email || hasWhatsApp) && (
              <div className="rounded-2xl border border-line bg-white p-6 space-y-2 text-sm text-navy">
                {siteConfig.contact.phone && (
                  <p>
                    <a href={`tel:${siteConfig.contact.phone}`} dir="ltr" className="font-semibold text-action hover:underline">
                      {siteConfig.contact.phone}
                    </a>
                  </p>
                )}
                {siteConfig.contact.email && (
                  <p>
                    <a href={`mailto:${siteConfig.contact.email}`} dir="ltr" className="font-semibold text-action hover:underline">
                      {siteConfig.contact.email}
                    </a>
                  </p>
                )}
                {hasWhatsApp && siteConfig.contact.whatsapp && (
                  <p>
                    <a
                      href={siteConfig.contact.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-10 items-center rounded-lg bg-action px-4 py-2 text-xs font-semibold text-white hover:bg-action-hover"
                    >
                      WhatsApp
                    </a>
                  </p>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-line bg-white p-6">
              <h2 className="text-base font-bold text-navy">
                {dict.contact.socialTitle}
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {siteConfig.social.instagram && (
                  <a
                    href={siteConfig.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-mist/60 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-ice"
                  >
                    <InstagramIcon className="h-4 w-4 text-action" />
                    <span>Instagram</span>
                  </a>
                )}
                {siteConfig.social.facebook && (
                  <a
                    href={siteConfig.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-mist/60 px-4 py-2 text-sm font-medium text-navy transition-colors hover:border-ice"
                  >
                    <FacebookIcon className="h-4 w-4 text-action" />
                    <span>Facebook</span>
                  </a>
                )}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
