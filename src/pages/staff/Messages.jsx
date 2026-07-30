import { MessageSquare } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Messages() {
  return (
    <PagePlaceholder
      eyebrow="Staff"
      title="Messages"
      icon={MessageSquare}
      description="Communicate with admins and other staff members."
    />
  );
}
