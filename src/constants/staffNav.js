import {
  LayoutDashboard,
  ClipboardCheck,
  CalendarDays,
  ClipboardList,
  MessageSquare,
  UserCircle,
} from "lucide-react";

// Single source of truth for the staff sidebar's nav items.
// `end: true` makes NavLink match /staff exactly (not every /staff/* route).
export const STAFF_NAV_ITEMS = [
  { label: "Overview", path: "/staff", icon: LayoutDashboard, end: true },
  { label: "My Tasks", path: "/staff/tasks", icon: ClipboardCheck },
  { label: "Schedule", path: "/staff/schedule", icon: CalendarDays },
  { label: "Reports", path: "/staff/reports", icon: ClipboardList },
  { label: "Messages", path: "/staff/messages", icon: MessageSquare },
  { label: "Profile", path: "/staff/profile", icon: UserCircle },
];
