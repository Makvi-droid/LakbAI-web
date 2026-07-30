import { CalendarDays } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Schedule() {
  return (
    <PagePlaceholder
      eyebrow="Staff"
      title="Schedule"
      icon={CalendarDays}
      description="Check your shifts, availability, and upcoming schedule."
    />
  );
}
