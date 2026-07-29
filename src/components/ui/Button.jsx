import { motion } from 'framer-motion';

const VARIANTS = {
  primary: 'bg-[#0A2540] text-white hover:bg-[#0D9488]',
  ghost: 'bg-transparent text-[#12202B] hover:bg-black/5',
};

export default function Button({
  children,
  type = 'button',
  onClick,
  loading = false,
  variant = 'primary',
  className = '',
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={loading}
      whileHover={{ scale: loading ? 1 : 1.01 }}
      whileTap={{ scale: loading ? 1 : 0.98 }}
      className={`relative flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors duration-200 disabled:opacity-70 ${VARIANTS[variant]} ${className}`}
    >
      {loading ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
          className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
        />
      ) : (
        children
      )}
    </motion.button>
  );
}
