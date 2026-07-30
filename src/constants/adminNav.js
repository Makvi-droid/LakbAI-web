import {
  LayoutDashboard,
  Users,
  BarChart3,
  FileText,
  ClipboardList,
  Settings,
} from "lucide-react";

// Single source of truth for the admin sidebar's nav items.
// `end: true` makes NavLink match /admin exactly (not every /admin/* route).
export const ADMIN_NAV_ITEMS = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Employees", path: "/admin/employees", icon: Users },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Content", path: "/admin/content", icon: FileText },
  { label: "Reports", path: "/admin/reports", icon: ClipboardList },
  { label: "Settings", path: "/admin/settings", icon: Settings },
];
