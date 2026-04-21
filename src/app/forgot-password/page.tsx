"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthenticationService, ApiError } from "@/api";
import { getDeviceId } from "@/hooks/useDeviceId";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const clearMessages = () => {
    setErrorMessage(null);
    setFieldErrors({});
    setSuccessMessage(null);
  };

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // ── Helper: parse API error body ──────────────────────────────────────
  const handleApiError = (err: unknown) => {
    if (err instanceof ApiError) {
      const body = err.body as {
        message?: string;
        error?: string;
        errors?: { field: string; message: string }[];
      };

      // 400 – Validation errors (field-level)
      if (body?.errors && Array.isArray(body.errors)) {
        const mapped: Record<string, string> = {};
        for (const fe of body.errors) {
          mapped[fe.field] = fe.message;
        }
        setFieldErrors(mapped);
        setErrorMessage(body.message || "Validation failed. Please fix the errors below.");
      }
      // 429 – Too many requests
      else if (err.status === 429) {
        setErrorMessage(body?.message || "Too many requests. Please wait and try again.");
      }
      // Other API errors
      else {
        setErrorMessage(body?.message || body?.error || "Something went wrong. Please try again.");
      }
    } else {
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const normalizedEmail = email.trim();

    if (!normalizedEmail) {
      setFieldErrors({ email: "Email is required" });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await AuthenticationService.authControllerForgot({
        xDeviceId: getDeviceId(),
        requestBody: { email: normalizedEmail },
      });

      setSuccessMessage(result.message || "OTP sent successfully! Check your email.");
      sessionStorage.setItem("password_reset_email", normalizedEmail);

      setTimeout(() => {
        router.push(`/otp-verify?email=${encodeURIComponent(normalizedEmail)}`);
      }, 1000);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Shared styles ─────────────────────────────────────────────────────
  const inputClass =
    "h-11 rounded-sm border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-[#044192]";

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#044192] via-[#0a5eb8] to-[#1976d2] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 my-8">
        {/* Logo and Title Section */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full">
              <Image
                src="/logo2.png"
                alt="FB International BD"
                width={224}
                height={224}
                className="h-full w-full object-contain"
              />
            </div>
            <h2 className="text-xl font-medium text-[#044192]">
              FB International BD
            </h2>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#044192] mb-2">
            Forgot Password
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            Enter your email address and we&apos;ll send you an OTP to verify
            your account.
          </p>
        </div>

        {/* Messages */}
        {errorMessage && (
          <div className="mb-4 rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 rounded-sm border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSendOtp} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError("email");
              }}
              className={inputClass}
              required
            />
            {fieldErrors.email && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.email}</p>
            )}
          </div>

          <div className="max-w-sm mx-auto pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-11 rounded-sm bg-[#8FA3C1] hover:bg-[#044192] text-white font-medium text-sm transition-colors disabled:opacity-60"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending OTP...
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </div>

          <div className="text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1 text-xs sm:text-sm text-[#044192] hover:underline font-medium"
            >
              <ArrowLeft className="h-3 w-3" />
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
