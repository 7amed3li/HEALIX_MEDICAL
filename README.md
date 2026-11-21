# HEALIX MEDICAL — International Patient Coordination Website

Marketing and informational website for **HEALIX MEDICAL** built with **Next.js (App Router, TypeScript, Tailwind CSS, `lucide-react`)** across **five launch languages**:

- **العربية** (`/ar`, RTL)
- **English** (`/en`, LTR)
- **Français** (`/fr`, LTR)
- **Русский** (`/ru`, LTR)
- **Türkçe** (`/tr`, LTR)

## Core Positioning & Compliance

- **Coordination role only:** The website states clearly across every language and service page that **HEALIX MEDICAL** coordinates communication and the patient journey in Türkiye, while diagnosis, medical eligibility, treatment decisions, and clinical care belong exclusively to the licensed hospital and medical team.
- **No medical promises:** No promised outcomes, success rates, case acceptance guarantees, fixed prices, or fixed treatment durations.
- **Strict visual policy:** All photographic visuals feature **adult men only** in professional consultation/coordination settings (zero women or girls in any photo, thumbnail, background, or icon). Extracted brand emblem (`public/images/brand/healix-emblem.png`) is paired with the clean `HEALIX MEDICAL` wordmark.
- **Privacy-first form & zero health tracking:** The first-enquiry contact form collects contact details and service area only (no file uploads, no diagnosis or medical history fields). Meta Pixel / Conversions API are disabled by default and no health data or service names are passed into URLs or advertising events.

## Central Configuration (`lib/config/site.ts`)

Update confirmed company details in a single file: [`lib/config/site.ts`](lib/config/site.ts):

- `url` (`NEXT_PUBLIC_SITE_URL`): Production domain used for canonical URLs, `hreflang`, Open Graph, `sitemap.xml`, and `robots.txt`.
- `social.instagram`: `https://www.instagram.com/healix.medical.tr/`
- `social.facebook`: Currently uses the temporary share link provided by the project owner; replace with the direct official Facebook page URL when ready.
- `contact.phone`, `contact.email`: Currently `null` (hidden automatically until confirmed).
- `contact.whatsapp`: Currently `null` (hidden until a confirmed `https://wa.me/<number>` link is provided; `@Dr.Abdulrahman.ja` is not used as a guessed phone number).
- `partners`: Empty array `[]` (the partner/hospital section stays completely hidden until confirmed hospital names and written logo permissions are provided).

## Enabling Form Delivery

The form UI and validation (`components/forms/ContactForm.tsx` and `lib/validation/contact.ts`) are separated from delivery (`app/api/contact/route.ts`). Until `CONTACT_RECEIVER_URL` is set in `.env.local`, the form does **not** fake a submission; it informs the visitor cleanly.

```env
NEXT_PUBLIC_SITE_URL=https://www.healixistanbul.com.tr
CONTACT_RECEIVER_URL=https://your-authorized-webhook-endpoint
CONTACT_RECEIVER_TOKEN=optional-bearer-token
```

## Development & Production Commands

```bash
npm run dev     # Start local development server
npm run build   # Production build & static route generation
npm run start   # Start production server
npm run lint    # Run ESLint
```

## Agreement & Scope Note

Per the project agreement (15,000 TRY), this deliverable includes the design and implementation of all 5 languages, the 12 individual service pages, and technical/on-page SEO setup. Domain registration, hosting, and any paid third-party form/email provider remain outside this fee.
