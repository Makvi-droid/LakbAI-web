import { useAuth } from "../../hooks/useAuth";
import Button from "../../components/ui/Button";

export default function AdminDashboard() {
  const { employee, logout } = useAuth();

  return (
    <div className="min-h-screen bg-[#FAF3E8] p-8">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Admin
        </p>
        <h1 className="font-display mt-1 text-3xl text-[#12202B]">
          Welcome, {employee?.name ?? "Admin"}
        </h1>
        <p className="mt-2 text-sm text-[#7C93A3]">
          This is the admin dashboard placeholder. Build out your admin features
          here.
        </p>
        <div className="mt-8 max-w-xs">
          <Button variant="ghost" onClick={logout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
}
