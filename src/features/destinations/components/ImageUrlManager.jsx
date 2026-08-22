import { useState } from "react";
import { ImagePlus, ImageOff, Trash2 } from "lucide-react";
import { isValidImageUrl } from "../../../utils/validators";

export default function ImageUrlManager({ photos, onChange, error }) {
  const [draftUrl, setDraftUrl] = useState("");
  const [draftError, setDraftError] = useState("");

  const handleAdd = () => {
    const trimmed = draftUrl.trim();
    if (!trimmed) return;

    if (!isValidImageUrl(trimmed)) {
      setDraftError("Enter a valid http(s) image URL.");
      return;
    }
    if (photos.includes(trimmed)) {
      setDraftError("That image URL was already added.");
      return;
    }

    onChange([...photos, trimmed]);
    setDraftUrl("");
    setDraftError("");
  };

  const handleRemove = (url) => {
    onChange(photos.filter((photo) => photo !== url));
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
        Photos (image URLs)
      </label>

      <div className="flex gap-2">
        <input
          type="url"
          value={draftUrl}
          onChange={(event) => {
            setDraftUrl(event.target.value);
            if (draftError) setDraftError("");
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              handleAdd();
            }
          }}
          placeholder="https://example.com/photo.jpg"
          className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#0A2540] px-3 py-2.5 text-sm font-medium text-white hover:bg-[#12344D]"
        >
          <ImagePlus size={15} /> Add
        </button>
      </div>

      {(draftError || error) && (
        <p className="mt-1.5 text-xs text-[#B91C1C]">{draftError || error}</p>
      )}

      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {photos.map((url) => (
            <div
              key={url}
              className="group relative overflow-hidden rounded-xl border border-[#D9E2EC] bg-[#F8FAFC]"
            >
              <ImageThumb url={url} />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute right-1 top-1 rounded-lg bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove photo"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function ImageThumb({ url }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex h-20 w-full items-center justify-center text-[#7C93A3]">
        <ImageOff size={18} />
      </div>
    );
  }

  return (
    <img
      src={url}
      alt=""
      onError={() => setFailed(true)}
      className="h-20 w-full object-cover"
    />
  );
}
