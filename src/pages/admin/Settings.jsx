import { motion } from "framer-motion";
import {
  Building2,
  CircleHelp,
  Mail,
  Pencil,
  Phone,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  deleteFaq,
  fetchAgencyProfile,
  fetchFaqs,
  saveAgencyProfile,
  saveFaq,
} from "../../lib/adminApi";

const emptyProfile = {
  agency_name: "",
  short_description: "",
  about: "",
  region: "",
  business_hours: "",
  contact_email: "",
  contact_number: "",
  logo_url: "",
};

const emptyFaq = {
  question: "",
  answer: "",
  is_published: true,
};

export default function Settings() {
  const [profile, setProfile] = useState(emptyProfile);
  const [faqs, setFaqs] = useState([]);
  const [faqForm, setFaqForm] = useState(emptyFaq);
  const [editingFaqId, setEditingFaqId] = useState(null);
  const [profileSaving, setProfileSaving] = useState(false);
  const [faqSaving, setFaqSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [agencyProfile, rows] = await Promise.all([
          fetchAgencyProfile(),
          fetchFaqs(),
        ]);
        setProfile({
          agency_name: agencyProfile.agency_name || "",
          short_description: agencyProfile.short_description || "",
          about: agencyProfile.about || "",
          region: agencyProfile.region || "",
          business_hours: agencyProfile.business_hours || "",
          contact_email: agencyProfile.contact_email || "",
          contact_number: agencyProfile.contact_number || "",
          logo_url: agencyProfile.logo_url || "",
        });
        setFaqs(rows || []);
      } catch (error) {
        setMessage(error.message || "Unable to load agency settings.");
      }
    };

    loadData();
  }, []);

  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  };

  const handleProfileSave = async () => {
    const agencyName = String(profile.agency_name ?? "").trim();
    const email = String(profile.contact_email ?? "").trim();
    const phone = String(profile.contact_number ?? "").trim();

    if (!agencyName) {
      setMessage("Agency name is required.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setMessage("A valid contact email is required.");
      return;
    }

    if (!phone) {
      setMessage("Contact number is required.");
      return;
    }

    try {
      setProfileSaving(true);
      await saveAgencyProfile(profile);
      setMessage("Agency profile saved.");
    } catch (error) {
      setMessage(error.message || "Unable to save agency profile.");
    } finally {
      setProfileSaving(false);
    }
  };

  const handleFaqChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFaqForm((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFaqSave = async () => {
    const question = String(faqForm.question ?? "").trim();
    const answer = String(faqForm.answer ?? "").trim();

    if (!question || !answer) {
      setMessage("Please add both a FAQ question and answer.");
      return;
    }

    if (question.length < 5 || answer.length < 10) {
      setMessage("FAQ question and answer must be more descriptive.");
      return;
    }

    try {
      setFaqSaving(true);
      const savedFaq = await saveFaq({
        ...faqForm,
        faq_id: editingFaqId ?? faqForm.faq_id,
        question,
        answer,
      });

      setFaqs((current) => {
        if (!editingFaqId) {
          return [savedFaq, ...current];
        }

        return current.map((entry) =>
          entry.faq_id === editingFaqId ? savedFaq : entry,
        );
      });

      setFaqForm(emptyFaq);
      setEditingFaqId(null);
      setMessage(
        editingFaqId ? "FAQ updated successfully." : "FAQ saved successfully.",
      );
    } catch (error) {
      setMessage(error.message || "Unable to save FAQ.");
    } finally {
      setFaqSaving(false);
    }
  };

  const handleEditFaq = (faq) => {
    setEditingFaqId(faq.faq_id ?? null);
    setFaqForm({
      faq_id: faq.faq_id ?? null,
      question: faq.question ?? "",
      answer: faq.answer ?? "",
      is_published: faq.is_published ?? true,
    });
    setMessage("Editing selected FAQ.");
  };

  const handleDeleteFaq = async (faqId) => {
    if (!faqId) return;

    try {
      const removed = await deleteFaq(faqId);
      if (!removed) {
        setMessage("Unable to delete FAQ from Supabase.");
        return;
      }

      setFaqs((current) =>
        current.filter((faq) => (faq.faq_id ?? faq.question) !== faqId),
      );

      if (editingFaqId === faqId) {
        setFaqForm(emptyFaq);
        setEditingFaqId(null);
      }

      setMessage("FAQ deleted successfully.");
    } catch (error) {
      setMessage(error.message || "Unable to delete FAQ.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
          Agency profile & FAQ management
        </p>
        <h1 className="font-display mt-1 flex items-center gap-3 text-3xl text-[#12202B]">
          <Building2 size={26} strokeWidth={1.75} className="text-[#0A2540]" />
          Public agency profile
        </h1>
      </div>

      {message && (
        <div className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2 text-sm text-[#12202B]">
          {message}
        </div>
      )}

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <h3 className="text-lg font-semibold text-[#12202B]">
            Agency information
          </h3>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Agency name
              </label>
              <input
                name="agency_name"
                value={profile.agency_name}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Region
              </label>
              <input
                name="region"
                value={profile.region}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Business hours
              </label>
              <input
                name="business_hours"
                value={profile.business_hours}
                onChange={handleProfileChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5">
              <Mail size={16} className="text-[#0D9488]" />
              <input
                name="contact_email"
                value={profile.contact_email}
                onChange={handleProfileChange}
                className="w-full bg-transparent text-sm text-[#12202B] outline-none"
              />
            </div>

            <div className="flex items-center gap-3 rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5">
              <Phone size={16} className="text-[#0D9488]" />
              <input
                name="contact_number"
                value={profile.contact_number}
                onChange={handleProfileChange}
                className="w-full bg-transparent text-sm text-[#12202B] outline-none"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Short description
              </label>
              <textarea
                name="short_description"
                value={profile.short_description}
                onChange={handleProfileChange}
                className="min-h-20 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                About the agency
              </label>
              <textarea
                name="about"
                value={profile.about}
                onChange={handleProfileChange}
                className="min-h-28 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>
          </div>

          <button
            onClick={handleProfileSave}
            disabled={profileSaving}
            className="mt-6 rounded-xl bg-[#14B8A6] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0D9488] disabled:opacity-60"
          >
            {profileSaving ? "Saving..." : "Save agency profile"}
          </button>
        </div>

        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
          <div className="flex items-center gap-2">
            <CircleHelp className="text-[#14B8A6]" size={18} />
            <h3 className="text-lg font-semibold text-[#12202B]">
              FAQ management
            </h3>
          </div>

          <div className="mt-5 space-y-3">
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Question
              </label>
              <input
                name="question"
                value={faqForm.question}
                onChange={handleFaqChange}
                className="w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-[#7C93A3]">
                Answer
              </label>
              <textarea
                name="answer"
                value={faqForm.answer}
                onChange={handleFaqChange}
                className="min-h-24 w-full rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm text-[#12202B] outline-none focus:border-[#14B8A6]"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-[#12202B]">
              <input
                type="checkbox"
                name="is_published"
                checked={faqForm.is_published}
                onChange={handleFaqChange}
              />
              Published
            </label>

            <div className="flex gap-2">
              <button
                onClick={handleFaqSave}
                disabled={faqSaving}
                className="flex-1 rounded-xl border border-[#D9E2EC] bg-white px-4 py-2.5 text-sm font-medium text-[#12202B] hover:bg-[#F8FAFC] disabled:opacity-60"
              >
                {faqSaving
                  ? "Saving..."
                  : editingFaqId
                    ? "Update FAQ"
                    : "Add FAQ item"}
              </button>
              {editingFaqId && (
                <button
                  type="button"
                  onClick={() => {
                    setFaqForm(emptyFaq);
                    setEditingFaqId(null);
                    setMessage("FAQ form reset.");
                  }}
                  className="rounded-xl border border-[#D9E2EC] bg-[#F8FAFC] px-3 py-2.5 text-sm font-medium text-[#12202B]"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {faqs.map((faq) => (
              <div
                key={faq.faq_id ?? faq.question}
                className="rounded-2xl border border-black/5 bg-[#F7FAFC] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-[#12202B]">{faq.question}</p>
                    <p className="mt-2 text-sm text-[#7C93A3]">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditFaq(faq)}
                      className="rounded-lg border border-[#D9E2EC] bg-white p-2 text-[#0D9488] hover:bg-[#F0FDFA]"
                      aria-label="Edit FAQ"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteFaq(faq.faq_id)}
                      className="rounded-lg border border-[#FECACA] bg-[#FFF1F2] p-2 text-[#B91C1C] hover:bg-[#FFE4E6]"
                      aria-label="Delete FAQ"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
