import { useCallback, useState } from "react";
import { ToastContext } from "./toastContext";
import ToastContainer from "../components/ui/ToastContainer";

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = "info", message, duration = 4000 }) => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, type, message }]);
      if (duration > 0) setTimeout(() => removeToast(id), duration);
      return id;
    },
    [removeToast],
  );

  const toast = {
    success: (message, duration) =>
      addToast({ type: "success", message, duration }),
    error: (message, duration) =>
      addToast({ type: "error", message, duration }),
    info: (message, duration) => addToast({ type: "info", message, duration }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}
