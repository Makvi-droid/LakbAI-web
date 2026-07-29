import { motion } from 'framer-motion';

/**
 * Small "live readout" card — icon + label + value.
 * Used on the auth brand panel to preview real dashboard data
 * (weather, crowd index, active itineraries) before the user logs in.
 */
export default function TelemetryStat({ icon: Icon, label, value, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: 'easeOut' }}
      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 text-[#FFB347]">
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/45">{label}</p>
        <p className="truncate text-sm font-medium text-white/90">{value}</p>
      </div>
    </motion.div>
  );
}
