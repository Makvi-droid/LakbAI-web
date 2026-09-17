import { useCallback, useMemo, useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  price: "",
  duration_days: 1,
};

function validate(form) {
  const errors = {};

  if (!form.title?.trim()) {
    errors.title = "Package title is required.";
  }
  if (!form.description?.trim()) {
    errors.description = "Description is required.";
  }

  const price = Number(form.price);
  if (form.price === "" || Number.isNaN(price) || price < 0) {
    errors.price = "Enter a valid price.";
  }

  const duration = Number(form.duration_days);
  if (!form.duration_days || Number.isNaN(duration) || duration < 1) {
    errors.duration_days = "Duration must be at least 1 day.";
  }

  return errors;
}

export function useTourPackageForm() {
  const [form, setForm] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [touched, setTouched] = useState({});

  const errors = useMemo(() => (form ? validate(form) : {}), [form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const setField = useCallback((name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
  }, []);

  const touchAll = useCallback(() => {
    setTouched({
      title: true,
      description: true,
      price: true,
      duration_days: true,
    });
  }, []);

  const startCreate = useCallback(() => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setTouched({});
  }, []);

  const loadPackage = useCallback((pkg) => {
    setEditingId(pkg.package_id);
    setForm({
      title: pkg.title ?? "",
      description: pkg.description ?? "",
      price: pkg.price ?? "",
      duration_days: pkg.duration_days ?? 1,
    });
    setTouched({});
  }, []);

  const reset = useCallback(() => {
    setForm(null);
    setEditingId(null);
    setTouched({});
  }, []);

  return {
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
  };
}