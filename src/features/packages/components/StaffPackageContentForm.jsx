import { Pencil, Info } from "lucide-react";
import FormField from "../../../components/ui/FormField";

const inputClass =
  "w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]";

export default function StaffPackageContentForm({
  pkg,
  form,
  setField,
  errors,
  touched,
  saving,
  onSubmit,
  onCancel,
}) {
  const fieldError = (name) => (touched[name] ? errors[name] : undefined);

  const handleInput = (event) => {
    setField(event.target.name, event.target.value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">
          Edit content — {pkg?.title}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-[#0D9488]"
        >
          Cancel
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#7C93A3]">
        <Info size={13} />
        <span>{pkg?.duration_days} day(s)</span>
        <span>&middot;</span>
        <span>₱{Number(pkg?.price ?? 0).toLocaleString()}</span>
        <span className="w-full text-[11px] italic md:ml-auto md:w-auto">
          Price and duration are managed by your agency admin.
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <FormField label="Package title" error={fieldError("title")}>
          <input
            name="title"
            value={form.title}
            onChange={handleInput}
            className={inputClass}
          />
        </FormField>

        <FormField label="Description" error={fieldError("description")}>
          <textarea
            name="description"
            value={form.description}
            onChange={handleInput}
            className={`min-h-28 ${inputClass}`}
          />
        </FormField>

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D9488] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save content"}
          <Pencil size={16} />
        </button>
      </div>
    </form>
  );
}
