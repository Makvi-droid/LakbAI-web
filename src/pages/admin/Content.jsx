import { FileText } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Content() {
  return (
    <PagePlaceholder
      eyebrow="Admin"
      title="Content"
      icon={FileText}
      description="Manage pages, announcements, and other published content."
    />
  );
}
