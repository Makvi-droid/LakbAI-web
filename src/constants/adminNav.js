import {
  Activity,
  BarChart3,
  Bot,
  Building2,
  ClipboardList,
  FileText,
  LayoutDashboard,
  MessageSquareText,
  //Settings,
  Users,
} from "lucide-react";

export const ADMIN_NAV_ITEMS = [
  { label: "Overview", path: "/admin", icon: LayoutDashboard, end: true },
  { label: "Staff Access", path: "/admin/employees", icon: Users },
  { label: "Destinations", path: "/admin/content", icon: FileText },
  { label: "Agency Profile", path: "/admin/settings", icon: Building2 },
  { label: "AI Tour Guide", path: "/admin/tour-guide", icon: Bot },
  { label: "Sentiment", path: "/admin/sentiment", icon: MessageSquareText },
  { label: "Crowd Density", path: "/admin/crowd-density", icon: Activity },
  { label: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { label: "Reports", path: "/admin/reports", icon: ClipboardList },
  { label: "AI Chat", path: "/admin/chat", icon: MessageSquareText },
  //{ label: "Settings", path: "/admin/settings", icon: Settings },
];
