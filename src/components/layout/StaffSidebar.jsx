import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsLeft, LogOut, X } from "lucide-react";
import { STAFF_NAV_ITEMS } from "../../constants/staffNav";
import { useAuth } from "../../hooks/useAuth";

const EXPANDED_WIDTH = 256;
const COLLAPSED_WIDTH = 84;

export default function StaffSidebar({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) {
  const { employee, logout } = useAuth();

  const initials = (employee?.name ?? "Staff")
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const renderContent = (isCollapsed) => (
    <div className="flex h-full flex-col bg-[#0A2540] text-white">
      {/* Brand + collapse toggle */}
      <div className="flex items-center justify-between px-5 py-6">
        <div
          className={`overflow-hidden transition-all duration-200 ${
            isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          }`}
        >
          <p className="font-display whitespace-nowrap text-xl text-white">
            LakbAI
          </p>
          <p className="font-mono whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-[#14B8A6]">
            Staff Panel
          </p>
        </div>

        {/* Desktop collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className="hidden shrink-0 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white md:block"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <motion.span
            animate={{ rotate: collapsed ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="block"
          >
            <ChevronsLeft size={18} strokeWidth={1.75} />
          </motion.span>
        </button>

        {/* Mobile close */}
        <button
          onClick={onCloseMobile}
          className="shrink-0 rounded-lg p-1.5 text-white/60 transition-colors hover:bg-white/10 hover:text-white md:hidden"
          aria-label="Close menu"
        >
          <X size={18} strokeWidth={1.75} />
        </button>
      </div>

      {/* Nav items */}
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {STAFF_NAV_ITEMS.map(({ label, path, icon: Icon, end }) => (
          <NavLink
            key={path}
            to={path}
            end={end}
            onClick={onCloseMobile}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-[#14B8A6] text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`
            }
          >
            <Icon size={19} strokeWidth={1.75} className="shrink-0" />
            <span
              className={`whitespace-nowrap transition-all duration-200 ${
                isCollapsed
                  ? "w-0 overflow-hidden opacity-0"
                  : "w-auto opacity-100"
              }`}
            >
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* User card + logout */}
      <div className="border-t border-white/10 px-3 py-4">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#14B8A6] text-xs font-semibold text-white">
            {initials}
          </div>
          <div
            className={`min-w-0 overflow-hidden transition-all duration-200 ${
              isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <p className="truncate text-sm font-semibold text-white">
              {employee?.name ?? "Staff"}
            </p>
            <p className="truncate text-xs text-white/50">
              {employee?.email ?? ""}
            </p>
          </div>
        </div>

        <button
          onClick={logout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <LogOut size={18} strokeWidth={1.75} className="shrink-0" />
          <span
            className={`whitespace-nowrap transition-all duration-200 ${
              isCollapsed
                ? "w-0 overflow-hidden opacity-0"
                : "w-auto opacity-100"
            }`}
          >
            Log out
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        className="sticky top-0 hidden h-screen shrink-0 overflow-hidden md:block"
      >
        {renderContent(collapsed)}
      </motion.aside>

      {/* Mobile overlay drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobile}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed inset-y-0 left-0 z-50 w-64 md:hidden"
            >
              {renderContent(false)}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
