import { motion } from "framer-motion";
import {
  Bot,
  Database,
  MessageSquareText,
  Pencil,
  Sparkles,
  Trash2,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteTourGuideKnowledge,
  fetchTourGuideKnowledge,
  saveTourGuideKnowledge,
} from "../../lib/adminApi";

const emptyEntry = {
  topic: "",
  content_type: "destination_insight",
  summary: "",
  ai_guidance_text: "",
  status: "draft",
};

export default function TourGuide() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(emptyEntry);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadEntries = async () => {
      try {
        const rows = await fetchTourGuideKnowledge();
        if (!ignore) setEntries(rows || []);
      } catch (error) {
        if (!ignore)
          setMessage(error.message || "Unable to load AI knowledge entries.");
      }
    };

    loadEntries();

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
    const topic = String(form.topic ?? "").trim();
    const summary = String(form.summary ?? "").trim();
    const aiGuidanceText = String(form.ai_guidance_text ?? "").trim();
    const status = String(form.status ?? "draft").trim();

    if (!topic) {
      setMessage("Please provide a destination or topic name.");
      return;
    }

    if (!summary) {
      setMessage("Please add a summary before saving the knowledge entry.");
      return;
    }

    if (summary.length < 10) {
      setMessage("Summary must be at least 10 characters long.");
      return;
    }

    if (aiGuidanceText && aiGuidanceText.length < 20) {
      setMessage("AI guidance should be more detailed if provided.");
      return;
    }

    try {
      setSaving(true);
      const saved = await saveTourGuideKnowledge({
        ...form,
        knowledge_id: editingId ?? form.knowledge_id,
        topic,
        summary,
        status,
        ai_guidance_text: aiGuidanceText || summary,
      });

      setEntries((current) => {
        if (!editingId) {
          return [saved, ...current];
        }

        return current.map((entry) =>
          entry.knowledge_id === editingId ? saved : entry,
        );
      });

      setForm(emptyEntry);
      setEditingId(null);
      setMessage(
        editingId ? "Knowledge entry updated." : "Knowledge entry saved.",
      );
    } catch (error) {
      setMessage(error.message || "Unable to save knowledge entry.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (entry) => {
    setEditingId(entry.knowledge_id ?? null);
    setForm({
      knowledge_id: entry.knowledge_id ?? null,
      topic: entry.topic ?? "",
      content_type: entry.content_type ?? "destination_insight",
      summary: entry.summary ?? "",
      ai_guidance_text: entry.ai_guidance_text ?? "",
      status: entry.status ?? "draft",
    });
    setMessage("Editing selected knowledge item.");
  };

  const handleDelete = async (knowledgeId) => {
    if (!knowledgeId) return;

    try {
      const removed = await deleteTourGuideKnowledge(knowledgeId);
      if (!removed) {
        setMessage("Unable to delete the knowledge entry from Supabase.");
        return;
      }

      setEntries((current) =>
        current.filter(
          (entry) => (entry.knowledge_id ?? entry.topic) !== knowledgeId,
        ),
      );

      if (editingId === knowledgeId) {
        setForm(emptyEntry);
        setEditingId(null);
      }

      setMessage("Knowledge entry deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete knowledge entry.");
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
          AI virtual tour guide content management
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <Bot size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          AI knowledge base and moderation
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
            label: "Knowledge entries",
            value: String(entries.length || 0),
            icon: Database,
          },
          {
            label: "Verified facts",
            value: `${entries.filter((entry) => entry.status === "verified").length || 0}`,
            icon: Sparkles,
          },
          {
            label: "AI answers",
            value: `${entries.filter((entry) => entry.ai_guidance_text).length || 0}`,
            icon: MessageSquareText,
          },
          {
            label: "Pending review",
            value: `${entries.filter((entry) => entry.status === "review").length || 0}`,
            icon: Wand2,
          },
        ].map(({ label, value, icon: Icon }) => (
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
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
        >
          <h3 className="text-lg font-semibold text-[#12202B]">
            Add or update knowledge
          </h3>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Destination or topic
              </label>
              <input
                name="topic"
                value={form.topic}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Content type
              </label>
              <select
                name="content_type"
                value={form.content_type}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              >
                <option value="destination_insight">Destination insight</option>
                <option value="landmark_info">Landmark info</option>
                <option value="travel_tip">Travel tip</option>
                <option value="faq_answer">FAQ answer</option>
                <option value="tour_story">Tour story</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Moderation status
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              >
                <option value="draft">Draft</option>
                <option value="review">Review</option>
                <option value="approved">Approved</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Summary
              </label>
              <textarea
                name="summary"
                value={form.summary}
                onChange={handleChange}
                className="min-h-20 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                AI guidance text
              </label>
              <textarea
                name="ai_guidance_text"
                value={form.ai_guidance_text}
                onChange={handleChange}
                className="min-h-32 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
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
                  onClick={() => {
                    setForm(emptyEntry);
                    setEditingId(null);
                    setMessage("Knowledge form reset.");
                  }}
                  className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#12202B]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12202B]">
              Knowledge base
            </h3>
            <button
              type="button"
              className="text-sm font-medium text-[#0D9488]"
            >
              Review queue
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.knowledge_id ?? entry.topic}
                className="rounded-2xl border border-black/5 bg-[#F7FAFC] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-medium text-[#12202B]">
                        {entry.topic}
                      </p>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                          entry.status === "verified"
                            ? "bg-[#DCFCE7] text-[#166534]"
                            : entry.status === "approved"
                              ? "bg-[#E0F2FE] text-[#075985]"
                              : entry.status === "rejected"
                                ? "bg-[#FEE2E2] text-[#991B1B]"
                                : "bg-[#FEF3C7] text-[#92400E]"
                        }`}
                      >
                        {entry.status}
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#7C93A3]">
                      {entry.content_type}
                    </p>
                    <p className="mt-2 text-sm text-[#7C93A3]">
                      {entry.summary}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(entry)}
                      className="rounded-lg border border-[#D9E2EC] bg-white p-2 text-[#0D9488] hover:bg-[#F0FDFA]"
                      aria-label="Edit knowledge"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(entry.knowledge_id)}
                      className="rounded-lg border border-[#FECACA] bg-[#FFF1F2] p-2 text-[#B91C1C] hover:bg-[#FFE4E6]"
                      aria-label="Delete knowledge"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
