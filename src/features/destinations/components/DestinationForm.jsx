import { Pencil, Plus } from "lucide-react";
import FormField from "../../../components/ui/FormField";
import ImageUrlManager from "./ImageUrlManager";

const inputClass =
  "w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]";

export default function DestinationForm({
  form,
  setField,
  errors,
  touched,
  editingId,
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
          {editingId ? "Edit destination" : "Add new destination"}
        </h3>
        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-[#0D9488]"
          >
            Cancel
          </button>
        )}
      </div>

      <div className="mt-5 space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
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
          <FormField label="Region" error={fieldError("region")}>
            <input
              name="region"
              value={form.region}
              onChange={handleInput}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Category" error={fieldError("category")}>
            <input
              name="category"
              value={form.category}
              onChange={handleInput}
              className={inputClass}
            />
          </FormField>
          <FormField label="Crowd level">
            <select
              name="crowd_level"
              value={form.crowd_level}
              onChange={handleInput}
              className={inputClass}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Max capacity" error={fieldError("max_capacity")}>
            <input
              type="number"
              name="max_capacity"
              value={form.max_capacity}
              onChange={handleInput}
              className={inputClass}
            />
          </FormField>
          <FormField label="Latitude" error={fieldError("latitude")}>
            <input
              type="number"
              step="0.0001"
              name="latitude"
              value={form.latitude}
              onChange={handleInput}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Longitude" error={fieldError("longitude")}>
            <input
              type="number"
              step="0.0001"
              name="longitude"
              value={form.longitude}
              onChange={handleInput}
              className={inputClass}
            />
          </FormField>
          <div className="flex items-end pb-2.5">
            <label className="inline-flex items-center gap-2 text-sm text-[#12202B]">
              <input
                type="checkbox"
                name="immersive_support"
                checked={form.immersive_support}
                onChange={handleInput}
              />
              Immersive support enabled
            </label>
          </div>
        </div>

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

        <button
          type="submit"
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D9488] disabled:opacity-60"
        >
          {saving
            ? "Saving..."
            : editingId
              ? "Update destination"
              : "Create destination"}
          {editingId ? <Pencil size={16} /> : <Plus size={16} />}
        </button>
      </div>
    </form>
  );
}
