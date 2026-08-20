import KnowledgeCard from "./KnowledgeCard";

export default function KnowledgeList({ entries, onEdit, onDelete }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">Knowledge base</h3>
        <button type="button" className="text-sm font-medium text-[#0D9488]">
          Review queue
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {entries.map((entry) => (
          <KnowledgeCard
            key={entry.knowledge_id ?? entry.topic}
            entry={entry}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
