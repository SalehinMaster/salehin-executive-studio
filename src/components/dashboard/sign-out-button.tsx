"use client";

import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";

export function DashboardSignOutButton() {
  const { signOut } = useAuth();

  return (
    <Button variant="ghost" className="gap-2" onClick={() => signOut()}>
      <LogOut className="size-4" aria-hidden />
      Sign out
    </Button>
  );
}
