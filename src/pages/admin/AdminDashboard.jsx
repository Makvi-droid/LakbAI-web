import { useAuth } from "../../hooks/useAuth";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Building2,
  ChartNoAxesCombined,
  MapPinned,
  MessageSquareText,
  ShieldCheck,
  Users,
} from "lucide-react";

const overviewCards = [
  { label: "Active staff", value: "18", change: "+3 this month", tone: "teal" },
  {
    label: "Approved destinations",
    value: "42",
    change: "+7 new listings",
    tone: "amber",
  },
  {
    label: "Visitor sentiment",
    value: "92%",
    change: "+8% vs last month",
    tone: "green",
  },
  {
    label: "Crowd alerts",
    value: "6",
    change: "2 high-priority",
    tone: "rose",
  },
];

const moduleCards = [
  {
    title: "Staff & Access",
    description: "Manage admin and staff roles, permissions, and onboarding.",
    path: "/admin/employees",
    icon: Users,
  },
  {
    title: "Destinations",
    description:
      "Review destination listings, categories, and tourism details.",
    path: "/admin/content",
    icon: MapPinned,
  },
  {
    title: "Agency Profile",
    description: "Maintain contact info, brand profile, and public FAQs.",
    path: "/admin/settings",
    icon: Building2,
  },
  {
    title: "AI Tour Guide",
    description: "Moderate destination knowledge, tips, and AI responses.",
    path: "/admin/tour-guide",
    icon: Bot,
  },
  {
    title: "Sentiment Analysis",
    description: "Track reviews, extract themes, and monitor guest feedback.",
    path: "/admin/sentiment",
    icon: MessageSquareText,
  },
  {
    title: "Crowd Density",
    description: "Monitor peak tourist flow and hotspot activity.",
    path: "/admin/crowd-density",
    icon: ChartNoAxesCombined,
  },
];

const approvals = [
  { name: "Banaue Rice Terraces", status: "Pending review", tag: "heritage" },
  { name: "Coron Island Hopping", status: "Approved", tag: "beach" },
  { name: "Sagada Homestay Guide", status: "Needs update", tag: "experience" },
];

export default function AdminDashboard() {
  const { employee } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Tourism agency admin
        </p>
        <h1 className="font-display mt-1 text-3xl text-[#12202B]">
          Welcome back, {employee?.name ?? "Admin"}
        </h1>
        <p className="mt-2 text-sm text-[#7C93A3]">
          Monitor staff access, destination quality, tourist sentiment, and live
          crowd insights across the agency.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {overviewCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.05)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#7C93A3]">{card.label}</p>
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  card.tone === "teal"
                    ? "bg-[#14B8A6]"
                    : card.tone === "amber"
                      ? "bg-[#FFB347]"
                      : card.tone === "green"
                        ? "bg-[#22C55E]"
                        : "bg-[#F97316]"
                }
              `}
              />
            </div>
            <p className="mt-4 text-3xl font-semibold text-[#12202B]">
              {card.value}
            </p>
            <p className="mt-2 text-xs text-[#7C93A3]">{card.change}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="rounded-3xl border border-black/5 bg-[#0A2540] p-6 text-white shadow-[0_18px_40px_rgba(10,37,64,0.2)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#7DD3C8]">
                Agency overview
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                Tourism operations dashboard
              </h2>
            </div>
            <button className="inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-3 py-2 text-sm font-medium text-white hover:bg-[#0D9488]">
              Open insights <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7DD3C8]">
                Peak flow
              </p>
              <p className="mt-3 text-2xl font-semibold">3,480</p>
              <p className="mt-2 text-xs text-white/70">
                Visitors expected today
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7DD3C8]">
                Booking uplift
              </p>
              <p className="mt-3 text-2xl font-semibold">+18.4%</p>
              <p className="mt-2 text-xs text-white/70">
                Compared to last week
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#7DD3C8]">
                AI accuracy
              </p>
              <p className="mt-3 text-2xl font-semibold">96%</p>
              <p className="mt-2 text-xs text-white/70">
                Knowledge answers validated
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_12px_35px_rgba(10,37,64,0.05)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#14B8A6]" size={18} />
            <h3 className="text-lg font-semibold text-[#12202B]">
              Compliance check
            </h3>
          </div>
          <ul className="mt-5 space-y-3 text-sm text-[#7C93A3]">
            <li className="flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2">
              <span>Destination approvals</span>
              <span className="font-semibold text-[#12202B]">96%</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2">
              <span>FAQ freshness</span>
              <span className="font-semibold text-[#12202B]">On track</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-[#F7FAFC] px-3 py-2">
              <span>AI content review</span>
              <span className="font-semibold text-[#12202B]">4 pending</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {moduleCards.map(({ title, description, path, icon: Icon }) => (
          <a
            key={title}
            href={path}
            className="group rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)] transition hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(10,37,64,0.08)]"
          >
            <div className="flex items-center justify-between">
              <span className="rounded-xl bg-[#E8FAF7] p-2 text-[#0D9488]">
                <Icon size={18} strokeWidth={1.8} />
              </span>
              <ArrowRight
                size={16}
                className="text-[#7C93A3] transition group-hover:text-[#0A2540]"
              />
            </div>
            <h3 className="mt-5 text-lg font-semibold text-[#12202B]">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[#7C93A3]">{description}</p>
          </a>
        ))}
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-[#12202B]">
            Approvals and moderation queue
          </h3>
          <button className="text-sm font-medium text-[#0D9488]">
            View all
          </button>
        </div>

        <div className="mt-6 space-y-3">
          {approvals.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-2xl border border-black/5 bg-[#FAF9F6] px-4 py-3"
            >
              <div>
                <p className="font-medium text-[#12202B]">{item.name}</p>
                <p className="text-sm text-[#7C93A3]">{item.tag}</p>
              </div>
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                  item.status === "Approved"
                    ? "bg-[#DCFCE7] text-[#166534]"
                    : item.status === "Pending review"
                      ? "bg-[#FEF3C7] text-[#92400E]"
                      : "bg-[#FEE2E2] text-[#991B1B]"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
