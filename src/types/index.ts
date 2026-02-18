import React from "react";

/** Navigation item for sidebar */
export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

/** Dashboard overview card data */
export interface DashboardCardData {
  id: string;
  title: string;
  count: number;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  cardColor: string;
  href: string;
}

/** User profile displayed in navbar */
export interface UserProfile {
  name: string;
  email: string;
  avatarUrl?: string;
}
