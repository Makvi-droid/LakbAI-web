import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "lucide-react";
import StaffSidebar from "./StaffSidebar";

export default function StaffLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#FAF3E8]">
      <StaffSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Mobile top bar — hidden on desktop, sidebar handles that space */}
        <header className="flex items-center gap-3 border-b border-black/5 bg-[#FAF3E8]/90 px-4 py-3 backdrop-blur md:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-lg p-2 text-[#12202B] transition-colors hover:bg-black/5"
            aria-label="Open menu"
          >
            <Menu size={20} strokeWidth={1.75} />
          </button>
          <p className="font-display text-lg text-[#12202B]">LakbAI Staff</p>
        </header>

        <main className="flex-1 p-6 md:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
