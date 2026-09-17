import { useEffect, useState } from "react";
import {
  fetchDestinations,
  updateDestinationContent,
} from "../../../lib/staffApi";
import { useStaffDestinationContent } from "../hooks/useStaffDestinationContent";
import StaffDestinationTable from "./StaffDestinationTable";
import StaffDestinationContentForm from "./StaffDestinationContentForm";

export default function StaffDestinationsPanel() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [banner, setBanner] = useState(null); // { type: "success" | "error", message }

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
  } = useStaffDestinationContent();

  useEffect(() => {
    let active = true;
    fetchDestinations()
      .then((rows) => {
        if (active) setDestinations(rows);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const editingDestination = destinations.find(
    (destination) => destination.destination_id === editingId,
  );

  const handleEdit = (destination) => {
    loadDestination(destination);
    setBanner(null);
  };

  const handleCancel = () => {
    reset();
    setBanner(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    touchAll();
    if (!isValid) return;

    setSaving(true);
    setBanner(null);
    try {
      const updated = await updateDestinationContent(editingId, form);
      setDestinations((current) =>
        current.map((destination) =>
          destination.destination_id === editingId
            ? {
                ...destination,
                ...updated,
                destination_photos: form.destination_photos,
              }
            : destination,
        ),
      );
      setBanner({ type: "success", message: "Destination content updated." });
      reset();
    } catch (error) {
      setBanner({
        type: "error",
        message: error.message || "Failed to save changes.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      {banner && (
        <div
          className={`rounded-xl px-4 py-3 text-sm ${
            banner.type === "success"
              ? "bg-[#DCFCE7] text-[#166534]"
              : "bg-[#FEE2E2] text-[#991B1B]"
          }`}
        >
          {banner.message}
        </div>
      )}

      {form && editingDestination && (
        <StaffDestinationContentForm
          destination={editingDestination}
          form={form}
          setField={setField}
          errors={errors}
          touched={touched}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <StaffDestinationTable
        destinations={destinations}
        loading={loading}
        onEdit={handleEdit}
      />
    </div>
  );
}