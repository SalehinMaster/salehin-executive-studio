import Link from "next/link";
import { Suspense } from "react";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { LoginForm } from "@/components/auth/login-form";
import { AUTH_ROUTES } from "@/lib/auth/paths";
import { signupHref } from "@/lib/routes";

export const metadata = {
  title: "Sign in | Salehin Executive Studio",
  description: "Access your AI personal branding operating system.",
};

export default function LoginPage() {
  return (
    <AuthPageShell
      title="Welcome back"
      subtitle="Sign in to your studio — generate authority content, track usage, and manage your personal brand OS."
      footer={
        <p>
          New here?{" "}
          <Link
            href={signupHref}
            className="text-primary underline-offset-2 hover:underline"
          >
            Create an account
          </Link>
        </p>
      }
    >
      <Suspense fallback={<p className="text-sm text-muted">Loading…</p>}>
        <LoginForm />
      </Suspense>
      <p className="text-center text-xs text-muted">
        <Link href={AUTH_ROUTES.verifyEmail} className="hover:text-foreground">
          Resend verification email
        </Link>
      </p>
    </AuthPageShell>
  );
}
