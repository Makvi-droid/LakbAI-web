import { useCallback, useEffect, useState } from "react";
import { fetchEmployees, saveEmployee } from "../../../lib/adminApi";
import { useToast } from "../../../hooks/useToast";

export function useEmployees() {
  const toast = useToast();
  const [employees, setEmployees] = useState([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    let ignore = false;

    const loadEmployees = async () => {
      try {
        const rows = await fetchEmployees();
        if (!ignore) setEmployees(rows || []);
      } catch (error) {
        if (!ignore) toast.error(error.message || "Unable to load employees.");
      } finally {
        if (!ignore) setLoadingList(false);
      }
    };

    loadEmployees();

    return () => {
      ignore = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addEmployee = useCallback(async (payload) => {
    const saved = await saveEmployee(payload);
    setEmployees((current) => [saved, ...current]);
    return saved;
  }, []);

  return { employees, loadingList, addEmployee };
}
