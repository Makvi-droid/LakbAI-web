import { useState } from "react";
import { Pencil, ImageOff, MapPin } from "lucide-react";
import CrowdLevelBadge from "./CrowdLevelBadge";
import HiddenGemBadge from "./HiddenGemBadge";

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

export default function StaffDestinationTable({ destinations, loading, onEdit }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">Destinations</h3>
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
              <th className="px-4 py-3 font-medium">Crowd</th>
              <th className="px-4 py-3 font-medium">Coordinates</th>
              <th className="px-4 py-3 font-medium">Hidden Gem</th>
              <th className="px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-[#7C93A3]"
                >
                  Loading destinations...
                </td>
              </tr>
            ) : destinations.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-4 py-8 text-center text-[#7C93A3]"
                >
                  No destinations yet.
                </td>
              </tr>
            ) : (
              destinations.map((destination) => (
                <Row
                  key={destination.destination_id}
                  destination={destination}
                  onEdit={onEdit}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Row({ destination, onEdit }) {
  const photos = Array.isArray(destination.destination_photos)
    ? destination.destination_photos
    : [];
  const cover = photos[0];

  return (
    <tr className="border-t border-black/5 align-top">
      <td className="px-4 py-3">
        <Thumbnail url={cover} extraCount={Math.max(photos.length - 1, 0)} />
      </td>
      <td className="max-w-55 px-4 py-3 text-[#12202B]">
        <div className="font-medium">{destination.destination_name}</div>
        <div className="mt-1 text-xs text-[#7C93A3]">
          {truncateDescription(destination.description)}
        </div>
      </td>
      <td className="px-4 py-3 text-[#12202B]">{destination.region}</td>
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
      <td className="px-4 py-3">
        <HiddenGemBadge isHiddenGem={destination.is_hidden_gem} />
      </td>
      <td className="px-4 py-3">
        <button
          type="button"
          onClick={() => onEdit(destination)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#D9E2EC] bg-white px-3 py-2 text-xs font-medium text-[#12202B] hover:bg-[#F8FAFC]"
        >
          <Pencil size={13} /> Edit content
        </button>
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