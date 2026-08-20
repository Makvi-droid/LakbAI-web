import { useMemo, useState } from "react";
import { Bot, SendHorizonal, Sparkles, User } from "lucide-react";
import { generateGuideContent } from "../lib/gemini";

const quickPrompts = [
  "Summarize this destination for an international tourist.",
  "Give me a short travel tip for this area.",
  "Draft a friendly FAQ answer for visitors.",
  "Suggest a safe and practical itinerary for one day.",
];

export default function ChatPage({ role = "admin" }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      text:
        role === "admin"
          ? "Hi admin. Ask about a destination, staffing issue, compliance concern, or a tourism response draft."
          : "Hi staff. Ask for a quick travel summary, itinerary idea, or customer support reply.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const assistantName = useMemo(
    () =>
      role === "admin" ? "LakbAI Admin Assistant" : "LakbAI Staff Assistant",
    [role],
  );

  const handleSubmit = async (event) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || loading) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: trimmed,
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const prompt = `
        You are the ${assistantName}. You help a tourism agency with admin and customer-facing travel support.
        Context: the user is a ${role} user in the LakbAI platform.
        They are asking: ${trimmed}

        Respond clearly, warmly, and practically. Keep it concise but useful. If they ask for marketing, customer support, or destination advice, give a polished answer.
      `;

      const reply = await generateGuideContent(prompt);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: reply,
        },
      ]);
    } catch (error) {
      const message =
        error?.message || "The AI service is temporarily unavailable.";
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 2,
          role: "assistant",
          text: `I couldn’t reach the Gemini API right now. ${message}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[#0D9488]">
            AI testing workspace
          </p>
          <h1 className="font-display mt-1 text-3xl text-[#12202B]">
            {role === "admin" ? "Admin chatbot test" : "Staff chatbot test"}
          </h1>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full border border-[#D9E2EC] bg-white px-3 py-1.5 text-sm text-[#12202B]">
          <Sparkles size={15} className="text-[#14B8A6]" />
          Gemini-powered
        </div>
      </div>

      <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-[0_12px_35px_rgba(10,37,64,0.04)]">
        <div className="mb-4 flex flex-wrap gap-2">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              type="button"
              onClick={() => setInput(prompt)}
              className="rounded-full border border-[#D9E2EC] bg-[#F7FAFC] px-3 py-1.5 text-xs text-[#12202B] transition hover:border-[#14B8A6] hover:text-[#0D9488]"
            >
              {prompt}
            </button>
          ))}
        </div>

        <div className="space-y-3 rounded-2xl border border-black/5 bg-[#F8FAFC] p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                  message.role === "user"
                    ? "bg-[#0A2540] text-white"
                    : "bg-white text-[#12202B] shadow-sm ring-1 ring-black/5"
                }`}
              >
                <div className="mb-1 flex items-center gap-2 text-[11px] uppercase tracking-[0.12em] opacity-70">
                  {message.role === "user" ? (
                    <User size={12} />
                  ) : (
                    <Bot size={12} />
                  )}
                  {message.role === "user" ? "You" : assistantName}
                </div>
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-white px-4 py-3 text-sm text-[#12202B] shadow-sm ring-1 ring-black/5">
                Thinking...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex gap-3">
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask about a destination, response draft, or staff support scenario..."
            className="flex-1 rounded-2xl border border-[#D9E2EC] bg-[#F8FAFC] px-4 py-3 text-sm text-[#12202B] outline-none transition focus:border-[#14B8A6]"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#14B8A6] px-4 py-3 text-sm font-medium text-white transition hover:bg-[#0D9488] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <SendHorizonal size={16} />
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
