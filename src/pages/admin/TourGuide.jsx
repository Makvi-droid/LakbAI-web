import { motion } from "framer-motion";
import { Bot } from "lucide-react";
import { useTourGuideKnowledge } from "../../hooks/useTourGuideKnowledge";
import StatsOverview from "../../components/admin/tourGuide/StatsOverview";
import MessageBanner from "../../components/admin/tourGuide/MessageBanner";
import KnowledgeForm from "../../components/admin/tourGuide/KnowledgeForm";
import KnowledgeList from "../../components/admin/tourGuide/KnowledgeList";

export default function TourGuide() {
  const {
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
  } = useTourGuideKnowledge();

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

      <MessageBanner message={message} />
      <StatsOverview entries={entries} />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <KnowledgeForm
          form={form}
          editingId={editingId}
          saving={saving}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
        <KnowledgeList
          entries={entries}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </motion.div>
  );
}
