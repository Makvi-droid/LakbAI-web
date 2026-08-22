import { useState } from "react";
import { Pencil, Trash2, ImageOff, MapPin } from "lucide-react";
import CrowdLevelBadge from "./CrowdLevelBadge";

const DESCRIPTION_LIMIT = 70;

function formatCoordinate(value) {
  const num = Number(value);
  return Number.isNaN(num) ? "—" : num.toFixed(4);
}

function truncateDescription(text, limit = DESCRIPTION_LIMIT) {
  if (!text) return "";
  const trimmed = text.trim();
  return trimmed.length > limit
    ? `${trimmed.slice(0, limit).trimEnd()}......`
    : trimmed;
}

export default function DestinationCatalog({
  destinations,
  loading,
  onEdit,
  onDelete,
}) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">
          Destination catalog
        </h3>
        <span className="text-sm text-[#7C93A3]">
          {destinations.length} records
        </span>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-black/5">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F7FAFC] text-[#7C93A3]">
            <tr>
              <th className="px-4 py-3 font-medium">Photo</th>
              <th className="px-4 py-3 font-medium">Destination</th>
              <th className="px-4 py-3 font-medium">Region</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Crowd</th>
              <th className="px-4 py-3 font-medium">Coordinates</th>
              <th className="px-4 py-3 font-medium">Immersive</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-[#7C93A3]"
                >
                  Loading destinations...
                </td>
              </tr>
            ) : destinations.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-[#7C93A3]"
                >
                  No destinations yet.
                </td>
              </tr>
            ) : (
              destinations.map((destination) => (
                <DestinationRow
                  key={
                    destination.destination_id ?? destination.destination_name
                  }
                  destination={destination}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DestinationRow({ destination, onEdit, onDelete }) {
  const photos = Array.isArray(destination.destination_photos)
    ? destination.destination_photos
    : [];
  const cover = photos[0];

  return (
    <tr className="border-t border-black/5 align-top">
      <td className="px-4 py-3">
        <Thumbnail url={cover} extraCount={Math.max(photos.length - 1, 0)} />
      </td>
      <td className="max-w-[220px] px-4 py-3 text-[#12202B]">
        <div className="font-medium">{destination.destination_name}</div>
        <div className="text-xs text-[#7C93A3]">
          Cap: {destination.max_capacity ?? 100}
        </div>
        <div className="mt-1 text-xs text-[#7C93A3]">
          {truncateDescription(destination.description)}
        </div>
      </td>
      <td className="px-4 py-3 text-[#12202B]">{destination.region}</td>
      <td className="px-4 py-3 text-[#12202B]">{destination.category}</td>
      <td className="px-4 py-3">
        <CrowdLevelBadge level={destination.crowd_level} />
      </td>
      <td className="px-4 py-3 text-[#12202B]">
        <span className="inline-flex items-center gap-1 text-xs">
          <MapPin size={13} className="text-[#7C93A3]" />
          {formatCoordinate(destination.latitude)},{" "}
          {formatCoordinate(destination.longitude)}
        </span>
      </td>
      <td className="px-4 py-3 text-[#12202B]">
        {destination.immersive_support ? "Yes" : "No"}
      </td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onEdit(destination)}
            className="rounded-lg border border-[#D9E2EC] bg-white p-2 text-[#12202B] hover:bg-[#F8FAFC]"
            aria-label="Edit destination"
          >
            <Pencil size={14} />
          </button>
          <button
            type="button"
            onClick={() => onDelete(destination.destination_id)}
            className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-2 text-[#991B1B] hover:bg-[#FEE2E2]"
            aria-label="Delete destination"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </td>
    </tr>
  );
}

function Thumbnail({ url, extraCount }) {
  const [failed, setFailed] = useState(false);

  if (!url || failed) {
    return (
      <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-[#D9E2EC] bg-[#F8FAFC] text-[#7C93A3]">
        <ImageOff size={16} />
      </div>
    );
  }

  return (
    <div className="relative h-14 w-14 overflow-hidden rounded-lg border border-[#D9E2EC]">
      <img
        src={url}
        alt=""
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
      {extraCount > 0 && (
        <span className="absolute bottom-0 right-0 rounded-tl-md bg-black/60 px-1 text-[10px] font-medium text-white">
          +{extraCount}
        </span>
      )}
    </div>
  );
}
