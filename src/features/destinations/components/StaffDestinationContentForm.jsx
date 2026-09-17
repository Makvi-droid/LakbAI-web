import { Pencil, Info } from "lucide-react";
import FormField from "../../../components/ui/FormField";
import ImageUrlManager from "./ImageUrlManager";
import CrowdLevelBadge from "./CrowdLevelBadge";

const inputClass =
  "w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]";

export default function StaffDestinationContentForm({
  destination,
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
    const { name, value, type, checked } = event.target;
    setField(name, type === "checkbox" ? checked : value);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">
          Edit content — {destination?.destination_name}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="text-sm font-medium text-[#0D9488]"
        >
          Cancel
        </button>
      </div>

      {/* Read-only context. These fields belong to the admin's operational
          modules (crowd density, capacity planning) so staff can see them
          for reference but never edit them here. */}
      <div className="mt-4 flex flex-wrap items-center gap-2 rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-xs text-[#7C93A3]">
        <Info size={13} />
        <span>{destination?.region}</span>
        <span>&middot;</span>
        <span>{destination?.category}</span>
        <span>&middot;</span>
        <CrowdLevelBadge level={destination?.crowd_level} />
        <span>&middot;</span>
        <span>Capacity {destination?.max_capacity ?? 100}</span>
        <span className="w-full text-[11px] italic md:ml-auto md:w-auto">
          Managed by your agency admin.
        </span>
      </div>

      <div className="mt-5 space-y-4">
        <FormField
          label="Destination name"
          error={fieldError("destination_name")}
        >
          <input
            name="destination_name"
            value={form.destination_name}
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

        <ImageUrlManager
          photos={form.destination_photos}
          onChange={(photos) => setField("destination_photos", photos)}
          error={
            touched.destination_photos ? errors.destination_photos : undefined
          }
        />

        <div className="rounded-xl border border-[#FDE68A] bg-[#FFFBEB] px-3 py-2.5">
          <label className="inline-flex items-center gap-2 text-sm font-medium text-[#92400E]">
            <input
              type="checkbox"
              name="is_hidden_gem"
              checked={form.is_hidden_gem}
              onChange={handleInput}
            />
            Mark as Hidden Gem
          </label>
          <p className="mt-1 pl-6 text-xs text-[#92400E]/80">
            Featured as an under-visited, highly-rated destination in the
            mobile app's recommendations.
          </p>
        </div>

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