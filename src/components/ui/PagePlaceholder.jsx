import { motion } from "framer-motion";

export default function PagePlaceholder({
  eyebrow,
  title,
  description,
  icon: Icon,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
        {eyebrow}
      </p>
      <h1 className="font-display mt-1.5 flex items-center gap-3 text-3xl text-[#12202B]">
        {Icon && (
          <Icon size={26} strokeWidth={1.75} className="text-[#0A2540]" />
        )}
        {title}
      </h1>
      <p className="mt-2 max-w-xl text-sm text-[#7C93A3]">{description}</p>

      <div className="mt-8 flex min-h-260px items-center justify-center rounded-2xl border border-dashed border-[#7C93A3]/30 bg-white/50 text-sm text-[#7C93A3]">
        Content for this section is coming soon.
      </div>
    </motion.div>
  );
}
