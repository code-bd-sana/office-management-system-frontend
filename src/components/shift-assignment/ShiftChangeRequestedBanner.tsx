"use client";

import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import {
  TriangleAlert,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAccessToken } from "@/hooks/useAccessToken";
import { SellsShiftManagementService } from "@/api";
import { AllShiftExchangesModal } from "./AllShiftExchangesModal";

/* ─── types ─── */
export interface ShiftExchange {
  _id: string;
  exchangeDate: string;
  originalShift: string;
  newShift: string;
  reason?: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface ShiftChangeRequestedBannerProps {
  /** Increment to trigger a refetch */
  refreshKey?: number;
}

/* helpers */
const SHIFT_LABELS: Record<string, string> = {
  MORNING: "Morning Shift",
  EVENING: "Evening Shift",
  NIGHT: "Night Shift",
};

const STATUS_CONFIG: Record<
  string,
  {
    icon: React.ReactNode;
    bg: string;
    border: string;
    badge: string;
    label: string;
  }
> = {
  PENDING: {
    icon: <TriangleAlert className="h-5 w-5 shrink-0 text-[#E8A317]" />,
    bg: "bg-[#FFF8E1]",
    border: "border-[#F0C36D]",
    badge: "bg-yellow-100 text-yellow-800",
    label: "Pending",
  },
  APPROVED: {
    icon: <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />,
    bg: "bg-green-50",
    border: "border-green-300",
    badge: "bg-green-100 text-green-800",
    label: "Approved",
  },
  REJECTED: {
    icon: <XCircle className="h-5 w-5 shrink-0 text-red-500" />,
    bg: "bg-red-50",
    border: "border-red-300",
    badge: "bg-red-100 text-red-800",
    label: "Rejected",
  },
};

/* ─── component ─── */
export function ShiftChangeRequestedBanner({
  refreshKey = 0,
}: ShiftChangeRequestedBannerProps) {
  const token = useAccessToken();
  const [exchanges, setExchanges] = useState<ShiftExchange[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchExchanges = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res =
        await SellsShiftManagementService.sellsShiftManagementControllerGetMyShiftExchanges(
          { authorization: token }
        );
      const data = (res as any)?.data;
      setExchanges(Array.isArray(data) ? data : []);
    } catch {
      /* silently fail – banner is optional */
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchExchanges();
  }, [fetchExchanges, refreshKey]);

  /* loading */
  if (loading) {
    return (
      <div className="mb-4 flex items-center justify-center rounded-sm border border-muted bg-muted/30 p-4">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
        <span className="ml-2 text-sm text-muted-foreground">
          Loading shift exchange requests…
        </span>
      </div>
    );
  }

  if (exchanges.length === 0) return null;

  /* Show only the most recent request */
  const latest = exchanges[0];
  const cfg = STATUS_CONFIG[latest.status] ?? STATUS_CONFIG.PENDING;
  const dateStr = (() => {
    try {
      return format(new Date(latest.exchangeDate), "MMMM d, yyyy");
    } catch {
      return latest.exchangeDate;
    }
  })();

  return (
    <>
      <div
        className={`mb-4 flex flex-col gap-3 rounded-sm border ${cfg.border} ${cfg.bg} px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4`}
      >
        {/* Left: icon + description */}
        <div className="flex items-start gap-3">
          <div>
            <h4 className="flex items-center gap-2 py-1 text-sm font-semibold text-foreground sm:py-2">
              {cfg.icon}
              Shift Change Request
              <span
                className={`ml-1 inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${cfg.badge}`}
              >
                {cfg.label}
              </span>
            </h4>
            <p className="mt-1 text-xs leading-relaxed text-foreground/70 sm:text-sm">
              Exchange your{" "}
              <span className="font-semibold text-foreground">
                {SHIFT_LABELS[latest.originalShift] ?? latest.originalShift}
              </span>{" "}
              on{" "}
              <span className="font-semibold text-foreground">{dateStr}</span>{" "}
              for{" "}
              <span className="font-semibold text-foreground">
                {SHIFT_LABELS[latest.newShift] ?? latest.newShift}
              </span>
              .
              {latest.status === "PENDING" && " Awaiting manager approval."}
            </p>
          </div>
        </div>

        {/* Right: See All button */}
        <Button
          onClick={() => setModalOpen(true)}
          className="w-50 shrink-0 rounded-sm bg-[#044192] px-5 py-2 text-sm font-semibold text-white hover:bg-[#044192]/80 sm:w-auto"
        >
          See All ({exchanges.length})
        </Button>
      </div>

      {/* All Shift Exchanges Modal */}
      <AllShiftExchangesModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        exchanges={exchanges}
      />
    </>
  );
}