import { useCallback, useMemo, useState } from "react";
import { validateDestinationForm } from "../../../utils/validators";

const emptyForm = {
  destination_name: "",
  region: "",
  category: "",
  crowd_level: "medium",
  description: "",
  latitude: "",
  longitude: "",
  max_capacity: 100,
  immersive_support: false,
  destination_photos: [],
};

export function useDestinationForm() {
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [touched, setTouched] = useState({});

  // Derived from `form`, not stored in state — errors are always in sync
  // with the current form on every render, no effect/setState needed.
  const errors = useMemo(() => validateDestinationForm(form), [form]);
  const isValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  const setField = useCallback((name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setTouched((current) => ({ ...current, [name]: true }));
  }, []);

  const touchAll = useCallback(() => {
    setTouched(
      Object.keys(emptyForm).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {}),
    );
  }, []);

  const loadDestination = useCallback((destination) => {
    setEditingId(destination.destination_id);
    setForm({
      destination_name: destination.destination_name ?? "",
      region: destination.region ?? "",
      category: destination.category ?? "",
      crowd_level: destination.crowd_level ?? "medium",
      description: destination.description ?? "",
      latitude: destination.latitude ?? "",
      longitude: destination.longitude ?? "",
      max_capacity: destination.max_capacity ?? 100,
      immersive_support: Boolean(destination.immersive_support),
      destination_photos: Array.isArray(destination.destination_photos)
        ? destination.destination_photos
        : [],
    });
    setTouched({});
  }, []);

  const reset = useCallback(() => {
    setForm(emptyForm);
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
    loadDestination,
    reset,
    isValid,
  };
}
