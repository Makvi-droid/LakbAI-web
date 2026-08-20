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
