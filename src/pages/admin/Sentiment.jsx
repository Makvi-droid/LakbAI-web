import { motion } from "framer-motion";
import { MessageSquareText, Sparkles, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSentimentSummary } from "../../lib/adminApi";

export default function Sentiment() {
  const [sentimentSummary, setSentimentSummary] = useState([
    { label: "Positive", value: "0%", color: "bg-[#DCFCE7] text-[#166534]" },
    { label: "Neutral", value: "0%", color: "bg-[#E0F2FE] text-[#075985]" },
    { label: "Negative", value: "0%", color: "bg-[#FEE2E2] text-[#991B1B]" },
  ]);
  const [reviewThemes, setReviewThemes] = useState([
    { theme: "Scenic views", score: 0.91 },
    { theme: "Local hospitality", score: 0.88 },
    { theme: "Crowded hotspots", score: 0.64 },
    { theme: "Travel logistics", score: 0.59 },
  ]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const rows = await fetchSentimentSummary();
        if (!rows.length) return;

        const totalPositive = rows.reduce(
          (sum, row) => sum + Number(row.positive_score || 0),
          0,
        );
        const totalNeutral = rows.reduce(
          (sum, row) => sum + Number(row.neutral_score || 0),
          0,
        );
        const totalNegative = rows.reduce(
          (sum, row) => sum + Number(row.negative_score || 0),
          0,
        );
        const total = totalPositive + totalNeutral + totalNegative || 1;

        setSentimentSummary([
          {
            label: "Positive",
            value: `${Math.round((totalPositive / total) * 100)}%`,
            color: "bg-[#DCFCE7] text-[#166534]",
          },
          {
            label: "Neutral",
            value: `${Math.round((totalNeutral / total) * 100)}%`,
            color: "bg-[#E0F2FE] text-[#075985]",
          },
          {
            label: "Negative",
            value: `${Math.round((totalNegative / total) * 100)}%`,
            color: "bg-[#FEE2E2] text-[#991B1B]",
          },
        ]);

        const mergedThemes = rows.flatMap((row) =>
          Array.isArray(row.top_keywords)
            ? row.top_keywords.map((keyword) => ({
                theme: keyword,
                score: Number((row.positive_score || 0) / 100),
              }))
            : [],
        );

        const themeStats = mergedThemes.reduce((acc, item) => {
          acc[item.theme] = (acc[item.theme] || 0) + item.score;
          return acc;
        }, {});

        setReviewThemes(
          Object.entries(themeStats)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 4)
            .map(([theme, score]) => ({
              theme,
              score: Math.min(1, Number(score) || 0),
            })),
        );
      } catch (error) {
        console.warn("Unable to load sentiment data:", error);
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
          Sentiment analysis module
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <MessageSquareText
            size={26}
            strokeWidth={1.75}
            className="text-[#0A2540]"
          />
          Destination sentiment and feedback insights
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {sentimentSummary.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#7C93A3]">{item.label}</p>
              <Sparkles size={16} className="text-[#0D9488]" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-[#12202B]">
              {item.value}
            </p>
            <span
              className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${item.color}`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <h3 className="text-lg font-semibold text-[#12202B]">
            TF-IDF insight themes
          </h3>
          <div className="mt-5 space-y-4">
            {reviewThemes.map((item) => (
              <div key={item.theme}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-[#12202B]">{item.theme}</span>
                  <span className="font-medium text-[#7C93A3]">
                    {Math.min(0.99, item.score || 0).toFixed(2)}
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-[#E6EEF4]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#14B8A6] to-[#0A2540]"
                    style={{
                      width: `${Math.min(100, (item.score || 0) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-[#14B8A6]" size={18} />
            <h3 className="text-lg font-semibold text-[#12202B]">
              Top sentiment drivers
            </h3>
          </div>

          <ul className="mt-5 space-y-3 text-sm text-[#7C93A3]">
            {reviewThemes.map((item) => (
              <li
                key={item.theme}
                className="rounded-2xl bg-[#F7FAFC] px-3 py-2.5"
              >
                {item.theme}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}
