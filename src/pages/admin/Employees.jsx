import { Users as UsersIcon } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Employees() {
  return (
    <PagePlaceholder
      eyebrow="Admin"
      title="Employees"
      icon={UsersIcon}
      description="Manage staff and admin accounts, roles, and permissions."
    />
  );
}
