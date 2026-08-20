const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateGuideContent(prompt, attempt = 0) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing VITE_GEMINI_API_KEY");
  }

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (response.status === 429 && attempt < 2) {
      await delay(1000 * (attempt + 1));
      return generateGuideContent(prompt, attempt + 1);
    }

    if (!response.ok) {
      const text = await response.text();
      if (response.status === 429) {
        throw new Error(
          "Gemini is rate-limiting requests right now. Please wait 30-60 seconds and try again.",
        );
      }
      throw new Error(text || `Gemini request failed (${response.status})`);
    }

    const json = await response.json();
    return (
      json.candidates?.[0]?.content?.parts?.[0]?.text ??
      "Unable to generate content right now."
    );
  } catch (error) {
    if (
      error?.message?.includes("rate-limiting") ||
      error?.message?.includes("429")
    ) {
      throw new Error(
        "Gemini is rate-limiting requests right now. Please wait a moment and try again.",
        { cause: error },
      );
    }
    throw error;
  }
}
