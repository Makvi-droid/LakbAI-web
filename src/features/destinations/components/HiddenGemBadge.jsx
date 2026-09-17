import { Sparkles } from "lucide-react";

export default function HiddenGemBadge({ isHiddenGem }) {
  if (!isHiddenGem) return null;

  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] px-2.5 py-1 text-xs font-medium text-[#92400E]">
      <Sparkles size={12} />
      Hidden gem
    </span>
  );
}