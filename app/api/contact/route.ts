import { NextResponse } from "next/server";
import { validateContact, type ContactFormInput } from "@/lib/validation/contact";

/**
 * First-enquiry endpoint.
 *
 * Privacy & security rules:
 * 1. Never logs personal or health-related fields to public system logs.
 * 2. Rejects automated bots via honeypot (`website`) and minimum fill time (`startedAt`).
 * 3. Separates UI/validation from delivery: if `CONTACT_RECEIVER_URL` is not configured,
 *    returns 503 so the UI clearly informs the visitor rather than faking a submission.
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
  if (!receiverUrl) {
    return NextResponse.json({ ok: false, reason: "not_configured" }, { status: 503 });
  }

  try {
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
  } catch {
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
