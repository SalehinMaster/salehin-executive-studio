import { NextResponse } from "next/server";
import { isNewsletterSource } from "@/lib/newsletter/config";
import { subscribeToNewsletter } from "@/lib/newsletter/subscribe";
import { validateEmail } from "@/lib/validate-email";

type SubscribeBody = {
  email?: string;
  source?: string;
};

export async function POST(request: Request) {
  let body: SubscribeBody;

  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body." },
      { status: 400 },
    );
  }

  const validation = validateEmail(body.email ?? "");

  if (!validation.valid) {
    return NextResponse.json(
      { ok: false, error: validation.error },
      { status: 400 },
    );
  }

  const source = body.source?.trim() ?? "inline";

  if (!isNewsletterSource(source)) {
    return NextResponse.json(
      { ok: false, error: "Invalid subscription source." },
      { status: 400 },
    );
  }

  const result = await subscribeToNewsletter({
    email: validation.normalized,
    source,
  });

  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({
    ok: true,
    provider: result.provider,
  });
}
