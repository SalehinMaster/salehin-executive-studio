import Link from "next/link";
import { Mail } from "lucide-react";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { ButtonLink } from "@/components/ui/button-link";
import { AUTH_ROUTES } from "@/lib/auth/paths";
import { loginHref } from "@/lib/routes";

export const metadata = {
  title: "Verify email | Salehin Executive Studio",
  description: "Confirm your email to access your studio.",
};

type VerifyEmailPageProps = {
  searchParams: Promise<{ email?: string }>;
};

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
  const params = await searchParams;
  const email = params.email?.trim();

  return (
    <AuthPageShell
      title="Verify your email"
      subtitle={
        email
          ? `We sent a confirmation link to ${email}. Open it on this device, then sign in.`
          : "Check your inbox for the confirmation link we sent when you signed up."
      }
    >
      <div className="flex flex-col items-center gap-4 rounded-lg border border-secondary/25 bg-secondary/5 px-6 py-8 text-center">
        <Mail className="size-10 text-secondary" aria-hidden />
        <p className="text-sm text-muted">
          Didn&apos;t receive it? Check spam or wait a few minutes, then try signing in
          again to resend.
        </p>
        <ButtonLink href={loginHref} variant="primary">
          Back to sign in
        </ButtonLink>
        <Link
          href={AUTH_ROUTES.signup}
          className="text-xs text-muted underline-offset-2 hover:text-foreground hover:underline"
        >
          Use a different email
        </Link>
      </div>
    </AuthPageShell>
  );
}
