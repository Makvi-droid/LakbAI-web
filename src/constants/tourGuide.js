export const EMPTY_ENTRY = {
  topic: "",
  content_type: "destination_insight",
  summary: "",
  ai_guidance_text: "",
  status: "draft",
};

export const CONTENT_TYPE_OPTIONS = [
  { value: "destination_insight", label: "Destination insight" },
  { value: "landmark_info", label: "Landmark info" },
  { value: "travel_tip", label: "Travel tip" },
  { value: "faq_answer", label: "FAQ answer" },
  { value: "tour_story", label: "Tour story" },
];

export const STATUS_OPTIONS = [
  { value: "draft", label: "Draft" },
  { value: "review", label: "Review" },
  { value: "approved", label: "Approved" },
  { value: "verified", label: "Verified" },
  { value: "rejected", label: "Rejected" },
];

export const STATUS_BADGE_STYLES = {
  verified: "bg-[#DCFCE7] text-[#166534]",
  approved: "bg-[#E0F2FE] text-[#075985]",
  rejected: "bg-[#FEE2E2] text-[#991B1B]",
  default: "bg-[#FEF3C7] text-[#92400E]",
};
