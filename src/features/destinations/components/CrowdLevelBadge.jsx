const STYLES = {
  high: "bg-[#FEE2E2] text-[#991B1B]",
  medium: "bg-[#FEF3C7] text-[#92400E]",
  low: "bg-[#DCFCE7] text-[#166534]",
};

export default function CrowdLevelBadge({ level }) {
  const normalized = (level || "medium").toLowerCase();
  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${STYLES[normalized] ?? STYLES.medium}`}
    >
      {normalized}
    </span>
  );
}
