import { Settings as SettingsIcon } from "lucide-react";
import PagePlaceholder from "../../components/ui/PagePlaceholder";

export default function Settings() {
  return (
    <PagePlaceholder
      eyebrow="Admin"
      title="Settings"
      icon={SettingsIcon}
      description="Configure system preferences and account settings."
    />
  );
}
