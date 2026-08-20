import { motion } from "framer-motion";
import { MapPinned, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  deleteDestination,
  fetchDestinations,
  saveDestination,
} from "../../lib/adminApi";

const initialForm = {
  destination_name: "",
  region: "",
  category: "",
  crowd_level: "medium",
  description: "",
  latitude: 0,
  longitude: 0,
  max_capacity: 100,
  immersive_support: false,
  destination_photos: "[]",
};

export default function Content() {
  const [destinations, setDestinations] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const rows = await fetchDestinations();
      setDestinations(rows);
    } catch (error) {
      setMessage(error.message || "Unable to load destination records.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        setLoading(true);
        const rows = await fetchDestinations();
        if (!ignore) setDestinations(rows);
      } catch (error) {
        if (!ignore)
          setMessage(error.message || "Unable to load destination records.");
      } finally {
        if (!ignore) setLoading(false);
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const destinationName = String(form.destination_name ?? "").trim();
    const region = String(form.region ?? "").trim();
    const category = String(form.category ?? "").trim();
    const description = String(form.description ?? "").trim();
    const latitude = Number(form.latitude ?? 0);
    const longitude = Number(form.longitude ?? 0);
    const maxCapacity = Number(form.max_capacity ?? 100);

    if (!destinationName || !region || !category || !description) {
      setMessage(
        "Please complete the destination name, region, category, and description.",
      );
      return;
    }

    if (Number.isNaN(latitude) || Number.isNaN(longitude)) {
      setMessage("Latitude and longitude must be valid numbers.");
      return;
    }

    if (maxCapacity <= 0) {
      setMessage("Maximum capacity must be greater than zero.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...form,
        destination_id: editingId,
        latitude: Number(form.latitude || 0),
        longitude: Number(form.longitude || 0),
        max_capacity: Number(form.max_capacity || 100),
        destination_photos: Array.isArray(form.destination_photos)
          ? JSON.stringify(form.destination_photos)
          : form.destination_photos || "[]",
      };

      await saveDestination(payload);
      setMessage(editingId ? "Destination updated." : "Destination created.");
      resetForm();
      await loadDestinations();
    } catch (error) {
      setMessage(error.message || "Unable to save destination.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (destination) => {
    setEditingId(destination.destination_id);
    setForm({
      destination_name: destination.destination_name ?? "",
      region: destination.region ?? "",
      category: destination.category ?? "",
      crowd_level: destination.crowd_level ?? "medium",
      description: destination.description ?? "",
      latitude: destination.latitude ?? 0,
      longitude: destination.longitude ?? 0,
      max_capacity: destination.max_capacity ?? 100,
      immersive_support: Boolean(destination.immersive_support),
      destination_photos: Array.isArray(destination.destination_photos)
        ? JSON.stringify(destination.destination_photos)
        : (destination.destination_photos ?? "[]"),
    });
  };

  const handleDelete = async (destinationId) => {
    try {
      const deleted = await deleteDestination(destinationId);
      if (!deleted) {
        setMessage(
          "Delete failed. The destination may already be missing from the database.",
        );
        return;
      }
      setMessage("Destination deleted.");
      await loadDestinations();
    } catch (error) {
      setMessage(error.message || "Unable to delete destination.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Destination & tourism information
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <MapPinned size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          Destination records and tourism content
        </h1>
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12202B]">
              {editingId ? "Edit destination" : "Add new destination"}
            </h3>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-[#0D9488]"
              >
                Cancel
              </button>
            )}
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Destination name
              </label>
              <input
                name="destination_name"
                value={form.destination_name}
                onChange={handleChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                  Region
                </label>
                <input
                  name="region"
                  value={form.region}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                  Category
                </label>
                <input
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                  Crowd level
                </label>
                <select
                  name="crowd_level"
                  value={form.crowd_level}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                  Max capacity
                </label>
                <input
                  type="number"
                  name="max_capacity"
                  value={form.max_capacity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="min-h-28 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                  Latitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  name="latitude"
                  value={form.latitude}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                  Longitude
                </label>
                <input
                  type="number"
                  step="0.0001"
                  name="longitude"
                  value={form.longitude}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
                />
              </div>
            </div>

            <label className="inline-flex items-center gap-2 text-sm text-[#12202B]">
              <input
                type="checkbox"
                name="immersive_support"
                checked={form.immersive_support}
                onChange={handleChange}
              />
              Immersive support enabled
            </label>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D9488] disabled:opacity-60"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update destination"
                  : "Create destination"}
              {editingId ? <Pencil size={16} /> : <Plus size={16} />}
            </button>
          </div>
        </form>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[#12202B]">
              Destination catalog
            </h3>
            <span className="text-sm text-[#7C93A3]">
              {destinations.length} records
            </span>
          </div>

          {message && (
            <div className="mt-3 rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2 text-sm text-[#12202B]">
              {message}
            </div>
          )}

          <div className="mt-5 overflow-hidden rounded-2xl border border-black/5">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#F7FAFC] text-[#7C93A3]">
                <tr>
                  <th className="px-4 py-3 font-medium">Destination</th>
                  <th className="px-4 py-3 font-medium">Region</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Crowd</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-[#7C93A3]"
                    >
                      Loading destinations...
                    </td>
                  </tr>
                ) : destinations.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-[#7C93A3]"
                    >
                      No destinations yet.
                    </td>
                  </tr>
                ) : (
                  destinations.map((destination) => (
                    <tr
                      key={
                        destination.destination_id ??
                        destination.destination_name
                      }
                      className="border-t border-black/5"
                    >
                      <td className="px-4 py-3 text-[#12202B]">
                        <div className="font-medium">
                          {destination.destination_name}
                        </div>
                        <div className="text-xs text-[#7C93A3]">
                          Cap: {destination.max_capacity ?? 100}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#12202B]">
                        {destination.region}
                      </td>
                      <td className="px-4 py-3 text-[#12202B]">
                        {destination.category}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                            destination.crowd_level === "high"
                              ? "bg-[#FEE2E2] text-[#991B1B]"
                              : destination.crowd_level === "medium"
                                ? "bg-[#FEF3C7] text-[#92400E]"
                                : "bg-[#DCFCE7] text-[#166534]"
                          }`}
                        >
                          {destination.crowd_level || "medium"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(destination)}
                            className="rounded-lg border border-[#D9E2EC] bg-white p-2 text-[#12202B] hover:bg-[#F8FAFC]"
                            aria-label="Edit destination"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(destination.destination_id)
                            }
                            className="rounded-lg border border-[#FECACA] bg-[#FEF2F2] p-2 text-[#991B1B] hover:bg-[#FEE2E2]"
                            aria-label="Delete destination"
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
      </div>
    </motion.div>
  );
}
