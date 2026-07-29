import { motion } from "framer-motion";
import { CloudSun, Users, Route as RouteIcon } from "lucide-react";
import RouteAnimation from "./RouteAnimation";
import TelemetryStat from "../../../components/ui/TelemetryStat";

export default function BrandPanel() {
  return (
    <div className="animate-drift relative hidden h-full flex-col justify-between overflow-hidden bg-[linear-gradient(135deg,#061627,#0A2540_45%,#0D9488_100%)] px-10 py-12 lg:flex">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#FF6B4A]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#FFB347]/10 blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
          Staff &amp; Admin Portal
        </p>
        <h1 className="font-display mt-2 text-4xl italic text-white">LakbAI</h1>
        <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
          Command center for weather-adaptive itinerary planning, tourism
          discovery, and crowd analytics across the Philippines.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative z-10 h-56"
      >
        <RouteAnimation />
      </motion.div>

      <div className="relative z-10 grid grid-cols-1 gap-3">
        <TelemetryStat
          icon={CloudSun}
          label="Weather · Manila"
          value="29°C · Partly cloudy"
          delay={0.5}
        />
        <TelemetryStat
          icon={Users}
          label="Crowd index"
          value="Moderate · 62%"
          delay={0.62}
        />
        <TelemetryStat
          icon={RouteIcon}
          label="Active itineraries"
          value="128 live routes"
          delay={0.74}
        />
      </div>
    </div>
  );
}
