"use client";

import { AuthProvider } from "@/components/shared/AuthProvider";
import { ProtectedRoute } from "@/components/shared/ProtectedRoute";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>{children}</ProtectedRoute>
    </AuthProvider>
  );
}
