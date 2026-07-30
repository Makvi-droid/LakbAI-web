import { ClipboardList } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Reports() {
  return (
    <PagePlaceholder
      eyebrow="Admin"
      title="Reports"
      icon={ClipboardList}
      description="Generate and review exportable reports."
    />
  );
}
