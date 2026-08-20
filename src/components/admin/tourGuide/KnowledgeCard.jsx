import { Pencil, Trash2 } from "lucide-react";
import { STATUS_BADGE_STYLES } from "../../../constants/tourGuide";

export default function KnowledgeCard({ entry, onEdit, onDelete }) {
  const badgeClass =
    STATUS_BADGE_STYLES[entry.status] || STATUS_BADGE_STYLES.default;

  return (
    <div className="rounded-2xl border border-black/5 bg-[#F7FAFC] p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <p className="font-medium text-[#12202B]">{entry.topic}</p>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${badgeClass}`}
            >
              {entry.status}
            </span>
          </div>
          <p className="mt-2 text-xs uppercase tracking-[0.15em] text-[#7C93A3]">
            {entry.content_type}
          </p>
          <p className="mt-2 text-sm text-[#7C93A3]">{entry.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(entry)}
            className="rounded-lg border border-[#D9E2EC] bg-white p-2 text-[#0D9488] hover:bg-[#F0FDFA]"
            aria-label="Edit knowledge"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(entry.knowledge_id)}
            className="rounded-lg border border-[#FECACA] bg-[#FFF1F2] p-2 text-[#B91C1C] hover:bg-[#FFE4E6]"
            aria-label="Delete knowledge"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
