import { useCallback, useMemo, useState } from "react";
import { isValidImageUrl } from "../../../utils/validators";

const DESCRIPTION_MIN_LENGTH = 20;

function validate(form) {
  const errors = {};

  if (!form.destination_name?.trim()) {
    errors.destination_name = "Destination name is required.";
  }

  if (!form.description?.trim()) {
    errors.description = "Description is required.";
  } else if (form.description.trim().length < DESCRIPTION_MIN_LENGTH) {
    errors.description = `Description should be at least ${DESCRIPTION_MIN_LENGTH} characters.`;
  }

  if (!Array.isArray(form.destination_photos) || form.destination_photos.length === 0) {
    errors.destination_photos = "Add at least one photo URL.";
  } else if (form.destination_photos.some((url) => !isValidImageUrl(url))) {
    errors.destination_photos = "One or more photo URLs look invalid.";
  }

  return errors;
}

export function useStaffDestinationContent() {
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
      destination_name: true,
      description: true,
      destination_photos: true,
    });
  }, []);

  const loadDestination = useCallback((destination) => {
    setEditingId(destination.destination_id);
    setForm({
      destination_name: destination.destination_name ?? "",
      description: destination.description ?? "",
      destination_photos: Array.isArray(destination.destination_photos)
        ? destination.destination_photos
        : [],
      is_hidden_gem: Boolean(destination.is_hidden_gem),
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
    loadDestination,
    reset,
    isValid,
  };
}