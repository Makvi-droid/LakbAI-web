import { motion } from "framer-motion";
import { ClipboardList, Download, FileText, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchReports } from "../../lib/adminApi";

export default function Reports() {
  const [reportTemplates, setReportTemplates] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const rows = await fetchReports();
        setReportTemplates(
          (rows || []).map((report) => ({
            title: report.title,
            type: report.format?.toUpperCase() || "CSV",
            updated: report.generated_at
              ? new Date(report.generated_at).toLocaleString()
              : "Recently updated",
          })),
        );
      } catch (error) {
        console.warn("Unable to load reports:", error);
      }
    };

    loadData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Destination report generation
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <ClipboardList
            size={26}
            strokeWidth={1.75}
            className="text-[#0A2540]"
          />
          Analytics and sentiment reporting
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            label: "CSV exports",
            value: String(
              reportTemplates.filter((item) => item.type.includes("CSV"))
                .length || 0,
            ),
            icon: Download,
          },
          {
            label: "Sentiment reports",
            value: String(
              reportTemplates.filter((item) =>
                item.title.toLowerCase().includes("sentiment"),
              ).length || 0,
            ),
            icon: FileText,
          },
          {
            label: "AI summaries",
            value: String(
              reportTemplates.filter((item) =>
                item.title.toLowerCase().includes("summary"),
              ).length || 0,
            ),
            icon: Sparkles,
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

      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[#12202B]">
            Available reports
          </h3>
          <button className="rounded-xl bg-[#14B8A6] px-4 py-2 text-sm font-medium text-white hover:bg-[#0D9488]">
            Create report
          </button>
        </div>

        <div className="mt-5 space-y-3">
          {reportTemplates.length ? (
            reportTemplates.map((report) => (
              <div
                key={`${report.title}-${report.updated}`}
                className="flex flex-col gap-3 rounded-2xl border border-black/5 bg-[#F7FAFC] p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-medium text-[#12202B]">{report.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.15em] text-[#7C93A3]">
                    {report.type}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-[#7C93A3]">
                    {report.updated}
                  </span>
                  <button className="rounded-xl border border-[#D9E2EC] bg-white px-3 py-2 text-sm font-medium text-[#12202B] hover:bg-[#F8FAFC]">
                    Export
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-black/5 bg-[#F7FAFC] p-4 text-sm text-[#7C93A3]">
              Loading report records...
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
