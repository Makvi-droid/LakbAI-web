import { Pencil, Trash2, Package as PackageIcon } from "lucide-react";

function truncate(text, limit = 90) {
  if (!text) return "";
  const trimmed = text.trim();
  return trimmed.length > limit
    ? `${trimmed.slice(0, limit).trimEnd()}......`
    : trimmed;
}

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return "—";
  return `₱${num.toLocaleString()}`;
}

export default function TourPackageTable({
  packages,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">
          Tour packages
        </h3>
        <span className="text-sm text-[#7C93A3]">
          {packages.length} records
        </span>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-black/5">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F7FAFC] text-[#7C93A3]">
            <tr>
              <th className="px-4 py-3 font-medium">Package</th>
              <th className="px-4 py-3 font-medium">Duration</th>
              <th className="px-4 py-3 font-medium">Price</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-[#7C93A3]"
                >
                  Loading tour packages...
                </td>
              </tr>
            ) : packages.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-8 text-center text-[#7C93A3]"
                >
                  No tour packages yet.
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr
                  key={pkg.package_id}
                  className="border-t border-black/5 align-top"
                >
                  <td className="max-w-75 px-4 py-3 text-[#12202B]">
                    <div className="flex items-center gap-2 font-medium">
                      <PackageIcon size={14} className="text-[#7C93A3]" />
                      {pkg.title}
                    </div>
                    <div className="mt-1 text-xs text-[#7C93A3]">
                      {truncate(pkg.description)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#12202B]">
                    {pkg.duration_days} day(s)
                  </td>
                  <td className="px-4 py-3 text-[#12202B]">
                    {formatPrice(pkg.price)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onEdit(pkg)}
                        className="rounded-lg border border-[#D9E2EC] bg-white p-2 text-[#12202B] hover:bg-[#F8FAFC]"
                        aria-label="Edit package"
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(pkg.package_id)}
                        className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-2 text-[#991B1B] hover:bg-[#FEE2E2]"
                        aria-label="Delete package"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}