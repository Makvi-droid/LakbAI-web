import { ClipboardList } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Reports() {
  return (
    <PagePlaceholder
      eyebrow="Staff"
      title="Reports"
      icon={ClipboardList}
      description="Submit and review your work reports."
    />
  );
}
