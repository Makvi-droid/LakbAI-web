import { motion } from "framer-motion";
import { Activity, AlertTriangle, Clock3, MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchCrowdRecords, fetchDestinations } from "../../lib/adminApi";

const formatTime = (value) => {
  if (!value) return "—";
  const date = new Date(`2000-01-01T${value}`);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
};

export default function CrowdDensity() {
  const [crowdZones, setCrowdZones] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [records, destinations] = await Promise.all([fetchCrowdRecords(), fetchDestinations()]);
        const destinationMap = new Map((destinations || []).map((destination) => [destination.destination_id, destination.destination_name]));

        const zones = (records || []).slice(0, 6).map((record) => ({
          zone: destinationMap.get(record.destination_id) || "Destination",
          level: record.crowd_level ? record.crowd_level.charAt(0).toUpperCase() + record.crowd_level.slice(1) : "Medium",
          visitors: Number(record.visitor_count || 0),
          peak: `${formatTime(record.peak_window_start)} - ${formatTime(record.peak_window_end)}`,
        }));

        setCrowdZones(zones);
      } catch (error) {
        console.warn("Unable to load crowd density data:", error);
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
          Crowd density monitoring module
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <Activity size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          Tourism activity and visitor trends
        </h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          { label: "Hot zones", value: String(crowdZones.length || 0), icon: MapPinned },
          { label: "Peak window", value: crowdZones[0]?.peak || "—", icon: Clock3 },
          { label: "Alerts", value: String(crowdZones.filter((zone) => zone.level === "High").length || 0), icon: AlertTriangle },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#7C93A3]">{label}</p>
              <Icon size={16} className="text-[#0D9488]" />
            </div>
            <p className="mt-4 text-3xl font-semibold text-[#12202B]">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
        <h3 className="text-lg font-semibold text-[#12202B]">Live crowd density by destination</h3>

        <div className="mt-5 overflow-hidden rounded-2xl border border-black/5">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#F7FAFC] text-[#7C93A3]">
              <tr>
                <th className="px-4 py-3 font-medium">Zone</th>
                <th className="px-4 py-3 font-medium">Crowd level</th>
                <th className="px-4 py-3 font-medium">Visitors</th>
                <th className="px-4 py-3 font-medium">Peak time</th>
              </tr>
            </thead>
            <tbody>
              {crowdZones.length ? crowdZones.map((zone) => (
                <tr key={`${zone.zone}-${zone.peak}`} className="border-t border-black/5">
                  <td className="px-4 py-3 text-[#12202B]">{zone.zone}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      zone.level === "High" ? "bg-[#FEE2E2] text-[#991B1B]" : zone.level === "Medium" ? "bg-[#FEF3C7] text-[#92400E]" : "bg-[#DCFCE7] text-[#166534]"
                    }`}>{zone.level}</span>
                  </td>
                  <td className="px-4 py-3 text-[#12202B]">{zone.visitors}</td>
                  <td className="px-4 py-3 text-[#12202B]">{zone.peak}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#7C93A3]">Loading crowd density records...</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
