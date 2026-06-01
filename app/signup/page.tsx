import Link from "next/link";
import { AuthPageShell } from "@/components/auth/auth-page-shell";
import { SignupForm } from "@/components/auth/signup-form";
import { loginHref } from "@/lib/routes";

export const metadata = {
  title: "Create account | Salehin Executive Studio",
  description: "Join the AI personal branding operating system.",
};

export default function SignupPage() {
  return (
    <AuthPageShell
      title="Create your studio"
      subtitle="Email verification keeps your workspace secure. Start building executive authority with AI in minutes."
      footer={
        <p>
          Already have an account?{" "}
          <Link href={loginHref} className="text-primary underline-offset-2 hover:underline">
            Sign in
          </Link>
        </p>
      }
    >
      <SignupForm />
    </AuthPageShell>
  );
}
