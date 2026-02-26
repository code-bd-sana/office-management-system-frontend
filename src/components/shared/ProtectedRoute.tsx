"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

/** Routes that do NOT require authentication */
const PUBLIC_ROUTES = ["/login", "/signup", "/forgot-password", "/reset-password"];

/**
 * Wraps the app tree and redirects unauthenticated users to /login
 * for any route that isn't in PUBLIC_ROUTES.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, ready } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );

  useEffect(() => {
    if (!ready) return; // Wait until hydration is done

    if (!isAuthenticated && !isPublic) {
      router.replace("/login");
    }

    // If already logged in and visiting a public page, redirect to dashboard
    if (isAuthenticated && isPublic) {
      router.replace("/");
    }
  }, [isAuthenticated, ready, isPublic, router]);

  // While hydrating, show nothing (avoids flash of protected content)
  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#044192] border-t-transparent" />
      </div>
    );
  }

  // Not authenticated + protected route → show nothing (redirect in progress)
  if (!isAuthenticated && !isPublic) {
    return null;
  }

  // Authenticated + public route → show nothing (redirect in progress)
  if (isAuthenticated && isPublic) {
    return null;
  }

  return <>{children}</>;
}
