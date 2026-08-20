import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  Plus,
  Users as UsersIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { fetchEmployees, saveEmployee } from "../../lib/adminApi";
import { useAuth } from "../../hooks/useAuth";

const emptyEmployee = {
  name: "",
  email: "",
  password: "",
  address: "",
  role: "staff",
};

export default function Employees() {
  const { employee: currentEmployee } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState(emptyEmployee);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadEmployees = async () => {
      try {
        const rows = await fetchEmployees();
        if (!ignore) setEmployees(rows || []);
      } catch (error) {
        if (!ignore) setMessage(error.message || "Unable to load employees.");
      }
    };

    loadEmployees();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const name = String(form.name ?? "").trim();
    const email = String(form.email ?? "").trim();
    const password = String(form.password ?? "").trim();
    const role = String(form.role ?? "").trim();
    const address = String(form.address ?? "").trim();

    if (!name) {
      setMessage("Please provide the employee's full name.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 8) {
      setMessage(
        "Please enter a password with at least 8 characters for the new staff member.",
      );
      return;
    }

    if (!role) {
      setMessage("Please select a role for the employee.");
      return;
    }

    if (address && address.length < 3) {
      setMessage("Address must be at least 3 characters if provided.");
      return;
    }

    try {
      setSaving(true);
      const saved = await saveEmployee({
        ...form,
        name,
        email,
        password,
        role,
        address,
        agency_id: currentEmployee?.agency_id ?? undefined,
      });
      setEmployees((current) => [saved, ...current]);
      setForm(emptyEmployee);
      setMessage(
        "Staff account created successfully. The current admin session remains active.",
      );
    } catch (error) {
      setMessage(error.message || "Unable to save employee.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Account & staff management
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <UsersIcon size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          Staff access and roles
        </h1>
      </div>

      {message && (
        <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2 text-sm text-[#12202B]">
          {message}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "Total staff",
            value: String(employees.length || 0),
            detail: "Across agency teams",
            icon: UsersIcon,
          },
          {
            label: "Active",
            value: String(
              employees.filter((employee) => employee.role !== "pending")
                .length || 0,
            ),
            detail: "Available today",
            icon: CheckCircle2,
          },
          {
            label: "Pending invites",
            value: String(
              employees.filter((employee) => employee.role === "pending")
                .length || 0,
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
        ].map(({ label, value, detail, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#7C93A3]">{label}</p>
              <Icon size={16} className="text-[#0D9488]" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-[#12202B]">
              {value}
            </p>
            <p className="mt-2 text-xs text-[#7C93A3]">{detail}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12202B]">
              Add new staff
            </h3>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-3 py-2 text-sm font-medium text-white hover:bg-[#12202B]"
            >
              <Plus size={16} /> New account
            </button>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Full name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none transition focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Email address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none transition focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none transition focus:border-[#14B8A6]"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Role
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              >
                <option value="admin">Admin</option>
                <option value="trip_coordinator">Trip coordinator</option>
                <option value="content_reviewer">Content reviewer</option>
                <option value="staff">Staff</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Address
              </label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none transition focus:border-[#14B8A6]"
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D9488] disabled:opacity-60"
            >
              {saving ? "Saving..." : "Invite staff member"}
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12202B]">
              Agency team
            </h3>
            <button
              type="button"
              className="text-sm font-medium text-[#0D9488]"
            >
              Manage roles
            </button>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-black/5">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F7FAFC] text-[#7C93A3]">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Address</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((member) => (
                  <tr
                    key={member.employee_id || member.email}
                    className="border-t border-black/5"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="font-medium text-[#12202B]">
                          {member.name}
                        </p>
                        <p className="text-xs text-[#7C93A3]">{member.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#12202B]">{member.role}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                          member.role === "admin"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : "bg-[#E0F2FE] text-[#075985]"
                        }`}
                      >
                        {member.role === "admin" ? "Active" : "Assigned"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#12202B]">
                      {member.address || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
