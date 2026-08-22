const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginForm({ email, password }) {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!password) {
    errors.password = "Password is required";
  }

  return errors;
}

export function validateEmployeeForm({ name, email, password, role, address }) {
  const errors = {};

  if (!name || !name.trim()) {
    errors.name = "Full name is required";
  }

  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = "Enter a valid email address";
  }

  if (!password || !password.trim()) {
    errors.password = "Password is required";
  } else if (password.trim().length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  if (!role || !role.trim()) {
    errors.role = "Please select a role";
  }

  if (address && address.trim() && address.trim().length < 3) {
    errors.address = "Address must be at least 3 characters if provided";
  }

  return errors;
}

export function isValidImageUrl(value) {
  if (typeof value !== "string") return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export function validateDestinationForm({
  destination_name,
  region,
  category,
  description,
  latitude,
  longitude,
  max_capacity,
  destination_photos,
}) {
  const errors = {};

  if (!destination_name || !destination_name.trim()) {
    errors.destination_name = "Destination name is required";
  } else if (destination_name.trim().length < 3) {
    errors.destination_name = "Name must be at least 3 characters";
  }

  if (!region || !region.trim()) {
    errors.region = "Region is required";
  }

  if (!category || !category.trim()) {
    errors.category = "Category is required";
  }

  if (!description || !description.trim()) {
    errors.description = "Description is required";
  } else if (description.trim().length < 5) {
    errors.description = "Description should be at least 5 characters";
  }

  if (latitude === "" || latitude === null || latitude === undefined) {
    errors.latitude = "Latitude is required";
  } else {
    const lat = Number(latitude);
    if (Number.isNaN(lat)) {
      errors.latitude = "Latitude must be a number";
    } else if (lat < -90 || lat > 90) {
      errors.latitude = "Latitude must be between -90 and 90";
    }
  }

  if (longitude === "" || longitude === null || longitude === undefined) {
    errors.longitude = "Longitude is required";
  } else {
    const lng = Number(longitude);
    if (Number.isNaN(lng)) {
      errors.longitude = "Longitude must be a number";
    } else if (lng < -180 || lng > 180) {
      errors.longitude = "Longitude must be between -180 and 180";
    }
  }

  const capacity = Number(max_capacity);
  if (!max_capacity || Number.isNaN(capacity) || capacity <= 0) {
    errors.max_capacity = "Max capacity must be a number greater than zero";
  }

  const photos = Array.isArray(destination_photos) ? destination_photos : [];
  if (photos.some((url) => !isValidImageUrl(url))) {
    errors.destination_photos = "One of the image URLs doesn't look valid";
  }

  return errors;
}
