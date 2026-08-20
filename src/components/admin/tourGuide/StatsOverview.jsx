import { Database, Sparkles, MessageSquareText, Wand2 } from "lucide-react";

function StatCard({ label, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[#7C93A3]">{label}</p>
        <Icon size={16} className="text-[#0D9488]" />
      </div>
      <p className="mt-4 text-3xl font-semibold text-[#12202B]">{value}</p>
    </div>
  );
}

export default function StatsOverview({ entries }) {
  const stats = [
    {
      label: "Knowledge entries",
      value: String(entries.length || 0),
      icon: Database,
    },
    {
      label: "Verified facts",
      value: `${entries.filter((e) => e.status === "verified").length || 0}`,
      icon: Sparkles,
    },
    {
      label: "AI answers",
      value: `${entries.filter((e) => e.ai_guidance_text).length || 0}`,
      icon: MessageSquareText,
    },
    {
      label: "Pending review",
      value: `${entries.filter((e) => e.status === "review").length || 0}`,
      icon: Wand2,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </div>
  );
}
