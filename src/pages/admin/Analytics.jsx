import { BarChart3 } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Analytics() {
  return (
    <PagePlaceholder
      eyebrow="Admin"
      title="Analytics"
      icon={BarChart3}
      description="Track usage trends, activity, and key metrics over time."
    />
  );
}
