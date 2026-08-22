export default function FormField({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-[#B91C1C]">{error}</p>}
    </div>
  );
}
