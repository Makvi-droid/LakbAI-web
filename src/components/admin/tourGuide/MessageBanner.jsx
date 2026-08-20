export default function MessageBanner({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2 text-sm text-[#12202B]">
      {message}
    </div>
  );
}
