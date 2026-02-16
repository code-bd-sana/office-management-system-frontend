import type { LucideIcon } from "lucide-react";

/** Navigation item for sidebar */
export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

/** Dashboard overview card data */
export interface DashboardCardData {
  id: string;
  title: string;
  count: number;
  subtitle: string;
  iconPath: string;
  cardColor: string;
  href: string;
}

/** User profile displayed in navbar */
export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}
