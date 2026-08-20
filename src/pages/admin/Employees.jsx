import { motion } from "framer-motion";
import { Users as UsersIcon } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useEmployees } from "../../features/employees/hooks/useEmployees";
import EmployeeForm from "../../features/employees/components/EmployeeForm";
import EmployeeTable from "../../features/employees/components/EmployeeTable";
import EmployeeStats from "../../features/employees/components/EmployeeStats";

export default function Employees() {
  const { employee: currentEmployee } = useAuth();
  const { employees, loadingList, addEmployee } = useEmployees();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Account & staff management
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <UsersIcon size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          Staff access and roles
        </h1>
      </div>

      <EmployeeStats employees={employees} />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <EmployeeForm
          onAdd={addEmployee}
          agencyId={currentEmployee?.agency_id}
        />
        <EmployeeTable employees={employees} loading={loadingList} />
      </div>
    </motion.div>
  );
}
