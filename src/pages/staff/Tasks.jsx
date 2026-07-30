import { ClipboardCheck } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Tasks() {
  return (
    <PagePlaceholder
      eyebrow="Staff"
      title="My Tasks"
      icon={ClipboardCheck}
      description="View and manage tasks assigned to you."
    />
  );
}
