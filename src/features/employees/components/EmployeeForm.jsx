import { useState } from "react";
import { Plus } from "lucide-react";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { useToast } from "../../../hooks/useToast";
import { validateEmployeeForm } from "../../../utils/validators";

const emptyEmployee = {
  name: "",
  email: "",
  password: "",
  address: "",
  role: "staff",
};

const ROLE_OPTIONS = [
  { value: "admin", label: "Admin" },
  { value: "trip_coordinator", label: "Trip coordinator" },
  { value: "content_reviewer", label: "Content reviewer" },
  { value: "staff", label: "Staff" },
];

export default function EmployeeForm({ onAdd, agencyId }) {
  const toast = useToast();
  const [form, setForm] = useState(emptyEmployee);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    // Clear that field's error the moment the user edits it again
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;
    const fieldErrors = validateEmployeeForm({ ...form, [name]: value });
    setErrors((current) => ({ ...current, [name]: fieldErrors[name] }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password.trim(),
      role: form.role.trim(),
      address: form.address.trim(),
    };

    const fieldErrors = validateEmployeeForm(trimmed);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    try {
      setSaving(true);
      await onAdd({ ...trimmed, agency_id: agencyId });
      setForm(emptyEmployee);
      setErrors({});
      toast.success("Staff account created successfully.");
    } catch (error) {
      toast.error(error.message || "Unable to save employee.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">Add new staff</h3>
        <span className="inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-3 py-2 text-sm font-medium text-white">
          <Plus size={16} /> New account
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <Input
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />

        <Input
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="At least 8 characters"
          error={errors.password}
        />

        <div className="w-full">
          <label
            htmlFor="role"
            className="mb-1.5 block text-xs font-medium tracking-wide text-[#12202B]/70"
          >
            Role
          </label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-[#12202B] outline-none transition-all duration-200 ${
              errors.role
                ? "border-red-400 ring-4 ring-red-100"
                : "border-black/10 focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/15"
            }`}
          >
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.role && (
            <p className="mt-1.5 text-xs text-red-500">{errors.role}</p>
          )}
        </div>

        <Input
          label="Address"
          name="address"
          value={form.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.address}
        />

        <Button type="submit" loading={saving}>
          {saving ? "Saving..." : "Invite staff member"}
        </Button>
      </div>
    </form>
  );
}
