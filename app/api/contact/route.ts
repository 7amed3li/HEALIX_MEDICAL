import { NextResponse } from "next/server";
import { validateContact, type ContactFormInput } from "@/lib/validation/contact";
import { siteConfig } from "@/lib/config/site";

/**
 * First-enquiry endpoint.
 *
 * Privacy & security rules:
 * 1. Never logs personal or health-related fields to public system logs.
 * 2. Rejects automated bots via honeypot (`website`) and minimum fill time (`startedAt`).
 * 3. Supports `CONTACT_RECEIVER_URL` webhook or `RESEND_API_KEY` email delivery to
 *    `siteConfig.contact.email`; if neither is set, returns 503 so the client can
 *    hand off to the pre-filled `mailto:` composer rather than faking delivery.
 */
export async function POST(request: Request) {
  let body: Partial<ContactFormInput>;
  try {
    body = (await request.json()) as Partial<ContactFormInput>;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Bot protection: honeypot or unrealistically fast submission (< 1.5s)
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }
  if (typeof body.startedAt === "number" && Date.now() - body.startedAt < 1500) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  const result = validateContact(body);
  if (!result.ok) {
    return NextResponse.json({ ok: false, errors: result.errors }, { status: 400 });
  }

  const receiverUrl = process.env.CONTACT_RECEIVER_URL;
  const resendKey = process.env.RESEND_API_KEY;
  const targetEmail = process.env.RESEND_TO_EMAIL || siteConfig.contact.email;

  if (!receiverUrl && !(resendKey && targetEmail)) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
    if (receiverUrl) {
      const upstream = await fetch(receiverUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(process.env.CONTACT_RECEIVER_TOKEN
            ? { Authorization: `Bearer ${process.env.CONTACT_RECEIVER_TOKEN}` }
            : {}),
        },
        body: JSON.stringify({
          source: "HEALIX MEDICAL website",
          submittedAt: new Date().toISOString(),
          enquiry: result.data,
        }),
      });

      if (!upstream.ok) {
        return NextResponse.json({ ok: false }, { status: 502 });
      }
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const d = result.data;
    const textBody = [
      "New First Enquiry – HEALIX MEDICAL",
      `Name: ${d.name}`,
      `Country: ${d.country}`,
      `Preferred language: ${d.language}`,
      `Contact method: ${d.contactMethod}`,
      `Contact value: ${d.contactValue}`,
      `Service: ${d.service}`,
      `Submitted at: ${new Date().toISOString()}`,
    ].join("\n");

    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "HEALIX MEDICAL <onboarding@resend.dev>",
        to: [targetEmail],
        subject: `HEALIX MEDICAL – New Enquiry (${d.service})`,
        text: textBody,
      }),
    });

    if (!resendRes.ok) {
      return NextResponse.json({ ok: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
