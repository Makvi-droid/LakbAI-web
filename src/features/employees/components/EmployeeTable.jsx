export default function EmployeeTable({ employees, loading }) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[#12202B]">Agency team</h3>
        <button type="button" className="text-sm font-medium text-[#0D9488]">
          Manage roles
        </button>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-black/5">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[#F7FAFC] text-[#7C93A3]">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Address</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((member) => (
              <tr
                key={member.employee_id || member.email}
                className="border-t border-black/5"
              >
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium text-[#12202B]">{member.name}</p>
                    <p className="text-xs text-[#7C93A3]">{member.email}</p>
                  </div>
                </td>
                <td className="px-4 py-3 text-[#12202B]">{member.role}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      member.role === "admin"
                        ? "bg-[#DCFCE7] text-[#166534]"
                        : "bg-[#E0F2FE] text-[#075985]"
                    }`}
                  >
                    {member.role === "admin" ? "Active" : "Assigned"}
                  </span>
                </td>
                <td className="px-4 py-3 text-[#12202B]">
                  {member.address || "—"}
                </td>
              </tr>
            ))}
            {!loading && employees.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-6 text-center text-sm text-[#7C93A3]"
                >
                  No staff members yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
