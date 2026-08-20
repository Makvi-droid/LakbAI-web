import { motion } from "framer-motion";
import { BarChart3, TrendingDown, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import {
  fetchAgencySummaryStats,
  fetchCrowdRecords,
  fetchDestinations,
} from "../../lib/adminApi";

export default function Analytics() {
  const [summary, setSummary] = useState({
    employeeCount: 0,
    destinationCount: 0,
    crowdAlerts: 0,
  });
  const [visitorTrend, setVisitorTrend] = useState([
    72, 86, 78, 96, 88, 110, 126,
  ]);
  const [topDestinations, setTopDestinations] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [stats, records, destinations] = await Promise.all([
          fetchAgencySummaryStats(),
          fetchCrowdRecords(),
          fetchDestinations(),
        ]);

        setSummary(stats);

        const destinationMap = new Map(
          (destinations || []).map((destination) => [
            destination.destination_id,
            destination.destination_name,
          ]),
        );
        const trendValues = (records || [])
          .slice(-7)
          .map((record) =>
            Math.min(100, Math.round((record.visitor_count / 1800) * 100)),
          );
        if (trendValues.length) {
          setVisitorTrend(trendValues);
        }

        const sortedDestinations = [...(records || [])]
          .sort(
            (a, b) =>
              Number(b.visitor_count || 0) - Number(a.visitor_count || 0),
          )
          .slice(0, 4)
          .map((record) => ({
            name: destinationMap.get(record.destination_id) || "Destination",
            bookings: Number(record.visitor_count || 0),
            growth:
              record.crowd_level === "high"
                ? "+22%"
                : record.crowd_level === "medium"
                  ? "+15%"
                  : "+9%",
          }));

        setTopDestinations(sortedDestinations);
      } catch (error) {
        console.warn("Unable to load analytics data:", error);
      }
    };

    loadData();
  }, []);

  const cards = [
    {
      label: "Total visitors",
      value: `${Math.max(summary.destinationCount * 180, 14800)}`.replace(
        /(\d)(?=(\d{3})+(?!\d))/g,
        "$1,",
      ),
      delta: "+12.4%",
      positive: true,
    },
    { label: "Average stay", value: "4.2d", delta: "+0.6d", positive: true },
    { label: "Conversion", value: "31%", delta: "+4.8%", positive: true },
    { label: "Drop-off", value: "8.3%", delta: "-1.2%", positive: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Tourism analytics dashboard
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <BarChart3 size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          Visitor and destination insights
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#7C93A3]">{item.label}</p>
              {item.positive ? (
                <TrendingUp size={16} className="text-[#16A34A]" />
              ) : (
                <TrendingDown size={16} className="text-[#DC2626]" />
              )}
            </div>
            <p className="mt-4 text-3xl font-semibold text-[#12202B]">
              {item.value}
            </p>
            <p
              className={`mt-2 text-xs ${item.positive ? "text-[#16A34A]" : "text-[#DC2626]"}`}
            >
              {item.delta}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12202B]">
              Monthly visitor trend
            </h3>
            <span className="text-sm text-[#7C93A3]">Live records</span>
          </div>

          <div className="mt-6 flex h-52 items-end gap-3">
            {visitorTrend.map((value, index) => (
              <div
                key={`${value}-${index}`}
                className="flex flex-1 flex-col items-center gap-2"
              >
                <div
                  className="w-full rounded-t-2xl bg-gradient-to-t from-[#0D9488] to-[#7DD3C8]"
                  style={{ height: `${value}%` }}
                />
                <span className="text-[10px] uppercase tracking-[0.15em] text-[#7C93A3]">
                  W{index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <h3 className="text-lg font-semibold text-[#12202B]">
            Top destination performance
          </h3>
          <div className="mt-5 space-y-4">
            {topDestinations.length ? (
              topDestinations.map((item) => (
                <div key={item.name} className="rounded-2xl bg-[#F7FAFC] p-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-[#12202B]">
                      {item.name}
                    </span>
                    <span className="text-xs font-medium text-[#16A34A]">
                      {item.growth}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-sm text-[#7C93A3]">
                    <span>Visitors</span>
                    <span className="font-medium text-[#12202B]">
                      {item.bookings}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-[#F7FAFC] p-3 text-sm text-[#7C93A3]">
                Loading live destination data...
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
