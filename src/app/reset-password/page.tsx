"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Eye, EyeOff, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthenticationService, ApiError } from "@/api";
import { getDeviceId } from "@/hooks/useDeviceId";

const RESET_EMAIL_KEY = "password_reset_email";
const RESET_TOKEN_KEY = "password_reset_token";

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [resetToken, setResetToken] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const queryToken = searchParams.get("token")?.trim() ?? "";
    const storedToken = sessionStorage.getItem(RESET_TOKEN_KEY) ?? "";
    const resolvedToken = storedToken || queryToken;

    if (queryToken && !storedToken) {
      sessionStorage.setItem(RESET_TOKEN_KEY, queryToken);
    }

    setResetToken(resolvedToken);
    setHydrated(true);
  }, [searchParams]);

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

  const handleApiError = (err: unknown) => {
    if (err instanceof ApiError) {
      const body = err.body as {
        message?: string;
        error?: string;
        errors?: { field: string; message: string }[];
      };

      if (body?.errors && Array.isArray(body.errors)) {
        const mapped: Record<string, string> = {};
        for (const fe of body.errors) {
          mapped[fe.field] = fe.message;
        }
        setFieldErrors(mapped);
        setErrorMessage(
          body.message || "Validation failed. Please fix the errors below.",
        );
      } else if (err.status === 429) {
        setErrorMessage(
          body?.message || "Too many requests. Please wait and try again.",
        );
      } else {
        setErrorMessage(
          body?.message || body?.error || "Something went wrong. Please try again.",
        );
      }
    } else {
      setErrorMessage("Network error. Please check your connection and try again.");
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const errors: Record<string, string> = {};

    if (!resetToken) {
      errors.resetToken = "Reset session has expired. Please verify OTP again.";
    }
    if (!newPassword) {
      errors.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }
    if (newPassword !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      if (errors.resetToken) {
        setErrorMessage(errors.resetToken);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await AuthenticationService.authControllerReset({
        xDeviceId: getDeviceId(),
        requestBody: {
          resetToken,
          newPassword,
        },
      });

      sessionStorage.removeItem(RESET_TOKEN_KEY);
      sessionStorage.removeItem(RESET_EMAIL_KEY);

      setSuccessMessage(result.message || "Password reset successful!");
      setTimeout(() => {
        router.push("/login");
      }, 1200);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "h-11 rounded-sm border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-[#044192]";

  if (!hydrated) {
    return (
      <div className="min-h-screen w-full bg-linear-to-br from-[#044192] via-[#0a5eb8] to-[#1976d2] flex items-center justify-center p-4">
        <Loader2 className="h-7 w-7 animate-spin text-white" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-[#044192] via-[#0a5eb8] to-[#1976d2] flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-6 sm:p-8 md:p-10 my-8">
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
            <h2 className="text-xl font-medium text-[#044192]">FB International BD</h2>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-[#044192] mb-2">
            Reset Password
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            Set your new password to complete account recovery.
          </p>
        </div>

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

        {!resetToken ? (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Your reset session is missing or expired. Please verify OTP again.
            </p>
            <div className="text-center">
              <Link
                href="/forgot-password"
                className="inline-flex items-center gap-1 text-sm text-[#044192] hover:underline font-medium"
              >
                <ArrowLeft className="h-3 w-3" />
                Start Again
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    clearFieldError("newPassword");
                  }}
                  className={`${inputClass} pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {fieldErrors.newPassword && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.newPassword}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    clearFieldError("confirmPassword");
                  }}
                  className={`${inputClass} pr-10`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {fieldErrors.confirmPassword && (
                <p className="mt-1 text-xs text-red-600">{fieldErrors.confirmPassword}</p>
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
                    Resetting Password...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm">
              <Link
                href="/otp-verify"
                className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium"
              >
                <ArrowLeft className="h-3 w-3" />
                Back to OTP
              </Link>
              <Link href="/login" className="text-[#044192] hover:underline font-medium">
                Back to Login
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
