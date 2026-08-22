import { motion } from "framer-motion";
import { MapPinned } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  deleteDestination,
  fetchDestinations,
  saveDestination,
} from "../../lib/adminApi";
import DestinationForm from "../../features/destinations/components/DestinationForm";
import DestinationCatalog from "../../features/destinations/components/DestinationCatalog";
import { useDestinationForm } from "../../features/destinations/hooks/useDestinationForm";

export default function Content() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const {
    form,
    setField,
    errors,
    touched,
    touchAll,
    editingId,
    loadDestination,
    reset,
    isValid,
  } = useDestinationForm();

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    touchAll();

    if (!isValid) {
      setMessage("Please fix the highlighted fields before saving.");
      return;
    }

    try {
      setSaving(true);
      await saveDestination({ ...form, destination_id: editingId });
      setMessage(editingId ? "Destination updated." : "Destination created.");
      reset();
      await loadDestinations();
    } catch (error) {
      setMessage(error.message || "Unable to save destination.");
    } finally {
      setSaving(false);
    }
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

      {message && (
        <div className="rounded-xl border border-[#D9E2EC] bg-white px-4 py-2.5 text-sm text-[#12202B]">
          {message}
        </div>
      )}

      <div className="space-y-6">
        <DestinationForm
          form={form}
          setField={setField}
          errors={errors}
          touched={touched}
          editingId={editingId}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={reset}
        />
        <DestinationCatalog
          destinations={destinations}
          loading={loading}
          onEdit={loadDestination}
          onDelete={handleDelete}
        />
      </div>
    </motion.div>
  );
}
