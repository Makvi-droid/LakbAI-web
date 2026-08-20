import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Users as UsersIcon,
} from "lucide-react";

export default function EmployeeStats({ employees }) {
  const stats = [
    {
      label: "Total staff",
      value: String(employees.length || 0),
      detail: "Across agency teams",
      icon: UsersIcon,
    },
    {
      label: "Active",
      value: String(
        employees.filter((employee) => employee.role !== "pending").length || 0,
      ),
      detail: "Available today",
      icon: CheckCircle2,
    },
    {
      label: "Pending invites",
      value: String(
        employees.filter((employee) => employee.role === "pending").length || 0,
      ),
      detail: "Awaiting activation",
      icon: Clock3,
    },
    {
      label: "Admin roles",
      value: String(
        employees.filter((employee) =>
          employee.role.toLowerCase().includes("admin"),
        ).length || 0,
      ),
      detail: "Full agency access",
      icon: BriefcaseBusiness,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, detail, icon: Icon }) => (
        <div
          key={label}
          className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
        >
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#7C93A3]">{label}</p>
            <Icon size={16} className="text-[#0D9488]" />
          </div>
          <p className="mt-4 text-3xl font-semibold text-[#12202B]">{value}</p>
          <p className="mt-2 text-xs text-[#7C93A3]">{detail}</p>
        </div>
      ))}
    </div>
  );
}
