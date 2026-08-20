import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

const VARIANTS = {
  success: {
    icon: CheckCircle2,
    border: "border-[#A7F3D0]",
    iconColor: "text-[#0D9488]",
    bar: "bg-[#14B8A6]",
  },
  error: {
    icon: XCircle,
    border: "border-[#FECACA]",
    iconColor: "text-[#B91C1C]",
    bar: "bg-[#EF4444]",
  },
  info: {
    icon: Info,
    border: "border-[#D9E2EC]",
    iconColor: "text-[#0A2540]",
    bar: "bg-[#0A2540]",
  },
};

export default function Toast({ type = "info", message, onDismiss }) {
  const variant = VARIANTS[type] || VARIANTS.info;
  const Icon = variant.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 40, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className={`relative flex w-80 items-start gap-3 overflow-hidden rounded-xl border ${variant.border} bg-white p-3.5 shadow-[0_12px_35px_rgba(10,37,64,0.12)]`}
    >
      <span className={`absolute inset-y-0 left-0 w-1 ${variant.bar}`} />
      <Icon
        size={18}
        strokeWidth={1.75}
        className={`mt-0.5 shrink-0 ${variant.iconColor}`}
      />
      <p className="flex-1 text-sm text-[#12202B]">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="shrink-0 rounded-md p-0.5 text-[#7C93A3] transition-colors hover:text-[#12202B]"
        aria-label="Dismiss notification"
      >
        <X size={15} strokeWidth={1.75} />
      </button>
    </motion.div>
  );
}
