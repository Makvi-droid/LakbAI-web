import { useEffect, useState, useCallback } from "react";
import {
  deleteTourGuideKnowledge,
  fetchTourGuideKnowledge,
  saveTourGuideKnowledge,
} from "../lib/adminApi";
import { EMPTY_ENTRY } from "../constants/tourGuide";

export function useTourGuideKnowledge() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(EMPTY_ENTRY);
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

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }, []);

  const validate = ({ topic, summary, aiGuidanceText }) => {
    if (!topic) return "Please provide a destination or topic name.";
    if (!summary)
      return "Please add a summary before saving the knowledge entry.";
    if (summary.length < 10)
      return "Summary must be at least 10 characters long.";
    if (aiGuidanceText && aiGuidanceText.length < 20)
      return "AI guidance should be more detailed if provided.";
    return null;
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      const topic = String(form.topic ?? "").trim();
      const summary = String(form.summary ?? "").trim();
      const aiGuidanceText = String(form.ai_guidance_text ?? "").trim();
      const status = String(form.status ?? "draft").trim();

      const error = validate({ topic, summary, aiGuidanceText });
      if (error) {
        setMessage(error);
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

        setEntries((current) =>
          editingId
            ? current.map((entry) =>
                entry.knowledge_id === editingId ? saved : entry,
              )
            : [saved, ...current],
        );

        setForm(EMPTY_ENTRY);
        setEditingId(null);
        setMessage(
          editingId ? "Knowledge entry updated." : "Knowledge entry saved.",
        );
      } catch (err) {
        setMessage(err.message || "Unable to save knowledge entry.");
      } finally {
        setSaving(false);
      }
    },
    [form, editingId],
  );

  const handleEdit = useCallback((entry) => {
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
  }, []);

  const handleCancel = useCallback(() => {
    setForm(EMPTY_ENTRY);
    setEditingId(null);
    setMessage("Knowledge form reset.");
  }, []);

  const handleDelete = useCallback(
    async (knowledgeId) => {
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
          setForm(EMPTY_ENTRY);
          setEditingId(null);
        }

        setMessage("Knowledge entry deleted successfully.");
      } catch (err) {
        setMessage(err.message || "Unable to delete knowledge entry.");
      }
    },
    [editingId],
  );

  return {
    entries,
    form,
    editingId,
    saving,
    message,
    handleChange,
    handleSubmit,
    handleEdit,
    handleCancel,
    handleDelete,
  };
}
