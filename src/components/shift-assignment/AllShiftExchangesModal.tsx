"use client";

import { useState, useMemo } from "react";
import { format } from "date-fns";
import Image from "next/image";
import {
  Search,
  TriangleAlert,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { ShiftExchange } from "./ShiftChangeRequestedBanner";

/* ─── constants ─── */
type StatusFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

interface FilterTab {
  label: string;
  value: StatusFilter;
}

const SHIFT_LABELS: Record<string, string> = {
  MORNING: "Morning Shift",
  EVENING: "Evening Shift",
  NIGHT: "Night Shift",
};

const STATUS_BADGE: Record<
  string,
  { icon: React.ReactNode; className: string; label: string }
> = {
  PENDING: {
    icon: <TriangleAlert className="h-3.5 w-3.5" />,
    className: "bg-yellow-100 text-yellow-800",
    label: "Pending",
  },
  APPROVED: {
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
    className: "bg-green-100 text-green-800",
    label: "Approved",
  },
  REJECTED: {
    icon: <XCircle className="h-3.5 w-3.5" />,
    className: "bg-red-100 text-red-800",
    label: "Rejected",
  },
};

/* ─── props ─── */
interface AllShiftExchangesModalProps {
  open: boolean;
  onClose: () => void;
  exchanges: ShiftExchange[];
}

/* ─── component ─── */
export function AllShiftExchangesModal({
  open,
  onClose,
  exchanges,
}: AllShiftExchangesModalProps) {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  /* counts for filter tabs */
  const counts = useMemo(() => {
    const c = { ALL: exchanges.length, PENDING: 0, APPROVED: 0, REJECTED: 0 };
    exchanges.forEach((ex) => {
      if (ex.status === "PENDING") c.PENDING++;
      else if (ex.status === "APPROVED") c.APPROVED++;
      else if (ex.status === "REJECTED") c.REJECTED++;
    });
    return c;
  }, [exchanges]);

  const FILTER_TABS: FilterTab[] = [
    { label: "All", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
  ];

  /* filter + search */
  const filtered = useMemo(() => {
    return exchanges.filter((ex) => {
      const matchesFilter =
        activeFilter === "ALL" || ex.status === activeFilter;

      const query = searchQuery.toLowerCase();
      const matchesSearch =
        !query ||
        (SHIFT_LABELS[ex.originalShift] ?? ex.originalShift)
          .toLowerCase()
          .includes(query) ||
        (SHIFT_LABELS[ex.newShift] ?? ex.newShift)
          .toLowerCase()
          .includes(query) ||
        ex.exchangeDate.toLowerCase().includes(query) ||
        (ex.reason ?? "").toLowerCase().includes(query) ||
        ex.status.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [exchanges, activeFilter, searchQuery]);

  /* pagination */
  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /* reset page when filter/search changes */
  const handleFilterChange = (v: StatusFilter) => {
    setActiveFilter(v);
    setCurrentPage(1);
  };
  const handleSearchChange = (v: string) => {
    setSearchQuery(v);
    setCurrentPage(1);
  };

  /* date formatter */
  const fmtDate = (d: string) => {
    try {
      return format(new Date(d), "MMM d, yyyy");
    } catch {
      return d;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-2rem)] max-h-[90vh] overflow-hidden p-0 sm:max-w-4xl">
        <DialogTitle className="sr-only">
          All Shift Exchange Requests
        </DialogTitle>
        <DialogDescription className="sr-only">
          View all your shift exchange requests with filtering and search
        </DialogDescription>

        {/* Header */}
        <div className="px-4 pt-4 pb-2 sm:px-6 sm:pt-6">
          <h2 className="text-lg font-semibold text-foreground sm:text-xl">
            All Shift Exchange Requests
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            View and filter all your shift exchange requests
          </p>
        </div>

        {/* Filter Tabs + Search — same design as projects page */}
        <div className="px-4 pb-3 sm:px-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            {/* Search with Filter Icon */}
            <div className="flex flex-1 items-center gap-3">
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded-sm border-2 border-gray-300 bg-white transition-colors"
                aria-label="Filter"
              >
                <Image
                  src="/icons/filter-icons.png"
                  alt="Filter"
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </button>

              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by shift, date, reason…"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => handleFilterChange(tab.value)}
                  className={`rounded-sm px-2 py-1 text-xs font-medium transition-colors sm:px-4 sm:py-2 sm:text-sm ${
                    activeFilter === tab.value
                      ? "bg-[#044192] text-white"
                      : "bg-gray-100 text-foreground/70 hover:bg-gray-200"
                  }`}
                >
                  {tab.label} ({counts[tab.value]})
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="max-h-[55vh] overflow-y-auto px-4 sm:px-6">
          <div className="overflow-x-auto rounded-t-sm border border-b-0">
            <Table>
              <TableHeader>
                <TableRow className="border-b-0 bg-[#E7EFFF]">
                  <TableHead className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    #
                  </TableHead>
                  <TableHead className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Date
                  </TableHead>
                  <TableHead className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Original Shift
                  </TableHead>
                  <TableHead className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    New Shift
                  </TableHead>
                  <TableHead className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Reason
                  </TableHead>
                  <TableHead className="whitespace-nowrap py-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="py-10 text-center text-sm text-muted-foreground"
                    >
                      No shift exchange requests found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((ex, idx) => {
                    const badge =
                      STATUS_BADGE[ex.status] ?? STATUS_BADGE.PENDING;
                    return (
                      <TableRow
                        key={ex._id}
                        className="border-b last:border-b-0"
                      >
                        <TableCell className="py-3 text-sm text-foreground/70">
                          {(currentPage - 1) * rowsPerPage + idx + 1}
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-3 text-sm font-medium text-foreground">
                          {fmtDate(ex.exchangeDate)}
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-3 text-sm text-foreground">
                          {SHIFT_LABELS[ex.originalShift] ?? ex.originalShift}
                        </TableCell>
                        <TableCell className="whitespace-nowrap py-3 text-sm text-foreground">
                          {SHIFT_LABELS[ex.newShift] ?? ex.newShift}
                        </TableCell>
                        <TableCell className="max-w-50 truncate py-3 text-sm text-foreground/70">
                          {ex.reason || "—"}
                        </TableCell>
                        <TableCell className="py-3">
                          <span
                            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${badge.className}`}
                          >
                            {badge.icon}
                            {badge.label}
                          </span>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t px-4 py-3 sm:px-6">
          <p className="text-xs text-muted-foreground sm:text-sm">
            Showing{" "}
            {filtered.length === 0
              ? 0
              : (currentPage - 1) * rowsPerPage + 1}
            –{Math.min(currentPage * rowsPerPage, filtered.length)} of{" "}
            {filtered.length} requests
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage <= 1}
              className="rounded-sm px-2.5 py-1 text-xs font-medium text-foreground/70 transition-colors hover:bg-gray-100 disabled:opacity-40 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) =>
                  p === 1 ||
                  p === totalPages ||
                  Math.abs(p - currentPage) <= 1
              )
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1)
                  acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span
                    key={`dots-${i}`}
                    className="px-1 text-xs text-muted-foreground"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p as number)}
                    className={`rounded-sm px-2.5 py-1 text-xs font-medium transition-colors sm:px-3 sm:py-1.5 sm:text-sm ${
                      currentPage === p
                        ? "bg-[#044192] text-white"
                        : "text-foreground/70 hover:bg-gray-100"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage >= totalPages}
              className="rounded-sm px-2.5 py-1 text-xs font-medium text-foreground/70 transition-colors hover:bg-gray-100 disabled:opacity-40 sm:px-3 sm:py-1.5 sm:text-sm"
            >
              Next
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
