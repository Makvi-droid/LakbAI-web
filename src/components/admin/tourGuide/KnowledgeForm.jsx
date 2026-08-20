import {
  CONTENT_TYPE_OPTIONS,
  STATUS_OPTIONS,
} from "../../../constants/tourGuide";

const inputClass =
  "w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]";
const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]";

export default function KnowledgeForm({
  form,
  editingId,
  saving,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
    >
      <h3 className="text-lg font-semibold text-[#12202B]">
        Add or update knowledge
      </h3>

      <div className="mt-5 space-y-4">
        <div>
          <label className={labelClass}>Destination or topic</label>
          <input
            name="topic"
            value={form.topic}
            onChange={onChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Content type</label>
          <select
            name="content_type"
            value={form.content_type}
            onChange={onChange}
            className={inputClass}
          >
            {CONTENT_TYPE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Moderation status</label>
          <select
            name="status"
            value={form.status}
            onChange={onChange}
            className={inputClass}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Summary</label>
          <textarea
            name="summary"
            value={form.summary}
            onChange={onChange}
            className={`min-h-20 ${inputClass}`}
          />
        </div>

        <div>
          <label className={labelClass}>AI guidance text</label>
          <textarea
            name="ai_guidance_text"
            value={form.ai_guidance_text}
            onChange={onChange}
            className={`min-h-32 ${inputClass}`}
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={saving}
            className="flex-1 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D9488] disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingId
                ? "Update knowledge item"
                : "Save knowledge item"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#12202B]"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
