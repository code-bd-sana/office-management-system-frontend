"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AuthenticationService, ApiError } from "@/api";
import { getDeviceId } from "@/hooks/useDeviceId";

const RESET_EMAIL_KEY = "password_reset_email";
const RESET_TOKEN_KEY = "password_reset_token";

function extractResetToken(data: unknown): string | null {
  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (!data || typeof data !== "object") {
    return null;
  }

  const record = data as Record<string, unknown>;
  const candidates = [
    record.resetToken,
    record.reset_token,
    record.token,
    record.resetPasswordToken,
  ];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return null;
}

export default function OtpVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const queryEmail = searchParams.get("email")?.trim() ?? "";
    const storedEmail = sessionStorage.getItem(RESET_EMAIL_KEY) ?? "";
    const resolvedEmail = queryEmail || storedEmail;

    if (queryEmail) {
      sessionStorage.setItem(RESET_EMAIL_KEY, queryEmail);
    }

    setEmail(resolvedEmail);

    if (!resolvedEmail) {
      setErrorMessage("Email is missing. Please start from forgot password.");
    }
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

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    clearMessages();

    const normalizedEmail = email.trim();
    const normalizedOtp = otp.trim();

    const errors: Record<string, string> = {};
    if (!normalizedEmail) errors.email = "Email is required";
    if (!normalizedOtp) errors.otp = "OTP is required";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setIsSubmitting(true);
    try {
      sessionStorage.removeItem(RESET_TOKEN_KEY);

      const result = await AuthenticationService.authControllerVerifyOtp({
        xDeviceId: getDeviceId(),
        requestBody: {
          email: normalizedEmail,
          otp: normalizedOtp,
        },
      });

      if (!result.success) {
        setErrorMessage(result.message || "Invalid OTP. Please try again.");
        return;
      }

      const token = extractResetToken(result.data);
      if (!token) {
        setErrorMessage(
          "Unable to continue. Please request a new OTP and try again.",
        );
        return;
      }

      sessionStorage.setItem(RESET_EMAIL_KEY, normalizedEmail);
      sessionStorage.setItem(RESET_TOKEN_KEY, token);

      setSuccessMessage(result.message || "OTP verified successfully.");
      setTimeout(() => {
        router.push("/reset-password");
      }, 800);
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    clearMessages();

    const normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setFieldErrors({ email: "Email is required" });
      return;
    }

    setIsResending(true);
    try {
      const result = await AuthenticationService.authControllerForgot({
        xDeviceId: getDeviceId(),
        requestBody: { email: normalizedEmail },
      });
      setSuccessMessage(result.message || "OTP resent successfully.");
    } catch (err) {
      handleApiError(err);
    } finally {
      setIsResending(false);
    }
  };

  const inputClass =
    "h-11 rounded-sm border-border bg-background text-sm focus-visible:ring-1 focus-visible:ring-[#044192]";

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
            Verify OTP
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground text-center">
            Enter the OTP sent to your email to continue.
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

        <form onSubmit={handleVerifyOtp} className="space-y-4">
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

          <div>
            <Input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                clearFieldError("otp");
              }}
              className={inputClass}
              maxLength={6}
              required
            />
            {fieldErrors.otp && (
              <p className="mt-1 text-xs text-red-600">{fieldErrors.otp}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending || isSubmitting}
              className="text-xs sm:text-sm text-[#044192] hover:underline font-medium disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </button>
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
                  Verifying...
                </span>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between text-xs sm:text-sm">
            <Link
              href="/forgot-password"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground font-medium"
            >
              <ArrowLeft className="h-3 w-3" />
              Change Email
            </Link>
            <Link href="/login" className="text-[#044192] hover:underline font-medium">
              Back to Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
