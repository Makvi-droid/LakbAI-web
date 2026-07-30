import { UserCircle } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Profile() {
  return (
    <PagePlaceholder
      eyebrow="Staff"
      title="Profile"
      icon={UserCircle}
      description="View and update your personal information."
    />
  );
}
