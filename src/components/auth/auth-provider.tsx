"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/client";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  openAuth: (options?: { redirectTo?: string }) => void;
  closeAuth: () => void;
  isAuthOpen: boolean;
  redirectTo: string;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useMemo(() => createClient(), []);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [redirectTo, setRedirectTo] = useState("/dashboard");

  const openAuth = useCallback((options?: { redirectTo?: string }) => {
    if (options?.redirectTo) {
      setRedirectTo(options.redirectTo);
    }
    setIsAuthOpen(true);
  }, []);

  const closeAuth = useCallback(() => {
    setIsAuthOpen(false);
  }, []);

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  }, [router, supabase]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setIsAuthOpen(false);
      }
    });

    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (searchParams.get("auth") === "signin") {
      const next = searchParams.get("next");
      openAuth({ redirectTo: next || "/dashboard" });

      const url = new URL(window.location.href);
      url.searchParams.delete("auth");
      url.searchParams.delete("next");
      window.history.replaceState({}, "", url.pathname + url.search);
    }
  }, [searchParams, openAuth]);

  const value = useMemo(
    () => ({
      user,
      loading,
      openAuth,
      closeAuth,
      isAuthOpen,
      redirectTo,
      signOut,
    }),
    [user, loading, openAuth, closeAuth, isAuthOpen, redirectTo, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
