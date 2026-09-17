import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import {
  fetchTourPackages,
  saveTourPackage,
  deleteTourPackage,
} from "../../../lib/staffApi";
import { useTourPackageForm } from "../hooks/useStaffPackageContent";
import TourPackageTable from "./TourPackageTable";
import TourPackageForm from "./TourPackageForm";

export default function StaffPackagesPanel() {
  const [packages, setPackages] = useState([]);
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
    startCreate,
    loadPackage,
    reset,
    isValid,
  } = useTourPackageForm();

  useEffect(() => {
    let active = true;
    fetchTourPackages()
      .then((rows) => {
        if (active) setPackages(rows);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const handleAddNew = () => {
    startCreate();
    setBanner(null);
  };

  const handleEdit = (pkg) => {
    loadPackage(pkg);
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
      const saved = await saveTourPackage({
        ...form,
        package_id: editingId ?? undefined,
      });
      setPackages((current) => {
        if (editingId) {
          return current.map((pkg) =>
            pkg.package_id === editingId ? { ...pkg, ...saved } : pkg,
          );
        }
        return [...current, saved];
      });
      setBanner({
        type: "success",
        message: editingId ? "Tour package updated." : "Tour package created.",
      });
      reset();
    } catch (error) {
      setBanner({
        type: "error",
        message: error.message || "Failed to save tour package.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (packageId) => {
    if (!window.confirm("Delete this tour package? This cannot be undone.")) {
      return;
    }

    const ok = await deleteTourPackage(packageId);
    if (ok) {
      setPackages((current) =>
        current.filter((pkg) => pkg.package_id !== packageId),
      );
      setBanner({ type: "success", message: "Tour package deleted." });
      if (editingId === packageId) reset();
    } else {
      setBanner({
        type: "error",
        message: "Failed to delete tour package.",
      });
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

      {!form && (
        <button
          type="button"
          onClick={handleAddNew}
          className="inline-flex items-center gap-2 rounded-xl bg-[#0A2540] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#12344D]"
        >
          <Plus size={16} /> Add tour package
        </button>
      )}

      {form && (
        <TourPackageForm
          form={form}
          setField={setField}
          errors={errors}
          touched={touched}
          editingId={editingId}
          saving={saving}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      )}

      <TourPackageTable
        packages={packages}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}