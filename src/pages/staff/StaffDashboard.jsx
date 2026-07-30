import { useAuth } from "../../hooks/useAuth";

export default function StaffDashboard() {
  const { employee } = useAuth();

  return (
    <div>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
        Staff
      </p>
      <h1 className="font-display mt-1 text-3xl text-[#12202B]">
        Welcome, {employee?.name ?? "Staff"}
      </h1>
      <p className="mt-2 text-sm text-[#7C93A3]">
        This is your staff overview. Use the sidebar to navigate between
        sections.
      </p>
    </div>
  );
}
