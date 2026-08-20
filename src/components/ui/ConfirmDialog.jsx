import { AnimatePresence, motion } from "framer-motion";

/**
 * Generic Yes/No confirmation modal. Reusable for any destructive or
 * high-stakes action (logout, delete, etc.) — not tied to one feature.
 */
export default function ConfirmDialog({
  open,
  title = "Are you sure?",
  message,
  confirmLabel = "Yes",
  cancelLabel = "No",
  onConfirm,
  onCancel,
  danger = true,
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 z-[60] bg-black/50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.15 }}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            className="fixed left-1/2 top-1/2 z-[70] w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0_20px_60px_rgba(10,37,64,0.25)]"
          >
            <h2
              id="confirm-dialog-title"
              className="text-lg font-semibold text-[#12202B]"
            >
              {title}
            </h2>
            {message && (
              <p className="mt-2 text-sm text-[#7C93A3]">{message}</p>
            )}

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-[#12202B] transition-colors hover:bg-black/5"
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-semibold text-white transition-colors ${
                  danger
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-[#0A2540] hover:bg-[#0D9488]"
                }`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
