import { useState } from "react";
import StaffDestinationsPanel from "../../features/destinations/components/StaffDestinationsPanel";
import StaffPackagesPanel from "../../features/packages/components/StaffPackagesPanel";

const TABS = [
  { key: "destinations", label: "Destinations" },
  { key: "packages", label: "Tour Packages" },
];

export default function Destinations() {
  const [tab, setTab] = useState("destinations");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl text-[#12202B]">
          Destinations &amp; Tour Packages
        </h1>
        <p className="mt-1 text-sm text-[#7C93A3]">
          Update tourism information and promotional content. Structural
          details (pricing, capacity, coordinates, crowd level) are managed
          by your agency admin.
        </p>
      </div>

      <div className="inline-flex rounded-xl border border-black/5 bg-white p-1">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            onClick={() => setTab(item.key)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              tab === item.key
                ? "bg-[#0A2540] text-white"
                : "text-[#7C93A3] hover:text-[#12202B]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "destinations" ? (
        <StaffDestinationsPanel />
      ) : (
        <StaffPackagesPanel />
      )}
    </div>
  );
}