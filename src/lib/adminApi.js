import { supabase } from "./supabase";

const fallbackAgencyProfile = {
  agency_name: "LakbAI Travel Agency",
  short_description:
    "Curated tourism experiences across cultural destinations and island escapes.",
  about:
    "LakbAI Travel Agency connects travelers with curated local experiences, cultural heritage, and sustainable tourism across Philippine destinations.",
  region: "Mindanao & Visayas",
  business_hours: "Mon-Sat, 8:00 AM - 7:00 PM",
  contact_email: "hello@lakbai.travel",
  contact_number: "+63 912 345 6789",
  logo_url: "",
};

const fallbackFaqs = [
  {
    faq_id: 1,
    question: "Do you offer custom island-hopping tours?",
    answer:
      "Yes. We can build private island-hopping trips based on guest preferences and durations.",
    is_published: true,
  },
  {
    faq_id: 2,
    question: "Are guided heritage trips available year-round?",
    answer:
      "Most heritage tours run year-round, with weather-sensitive experiences scheduled by local guides.",
    is_published: true,
  },
  {
    faq_id: 3,
    question: "Can travelers book emergency assistance during trips?",
    answer:
      "Yes. Every itinerary includes local support contact and 24/7 emergency coordination.",
    is_published: true,
  },
];

const fallbackDestinations = [
  {
    destination_id: 1,
    destination_name: "Banaue Rice Terraces",
    region: "Cordillera",
    category: "Heritage",
    crowd_level: "moderate",
    description:
      "A cultural heritage landscape with sunrise viewpoints and local trekking routes.",
    agency_id: 1,
    latitude: 16.9242,
    longitude: 121.0618,
    destination_photos: "[]",
    immersive_support: true,
    max_capacity: 120,
  },
  {
    destination_id: 2,
    destination_name: "El Nido Island Tour",
    region: "Palawan",
    category: "Beach",
    crowd_level: "high",
    description:
      "Island hopping with limestone cliffs, beaches, and marine experiences.",
    agency_id: 1,
    latitude: 11.205,
    longitude: 119.419,
    destination_photos: "[]",
    immersive_support: true,
    max_capacity: 220,
  },
  {
    destination_id: 3,
    destination_name: "Sagada Cave Connection",
    region: "Mountain Province",
    category: "Adventure",
    crowd_level: "low",
    description: "A cave and cultural route for immersive local experiences.",
    agency_id: 1,
    latitude: 17.083,
    longitude: 120.905,
    destination_photos: "[]",
    immersive_support: false,
    max_capacity: 90,
  },
];

const fallbackEmployees = [
  {
    employee_id: "mock-1",
    name: "Maria Santos",
    email: "maria@lakbai.com",
    role: "admin",
    agency_id: 1,
    address: "Davao City",
    status: "active",
  },
  {
    employee_id: "mock-2",
    name: "Ruben Dela Cruz",
    email: "ruben@lakbai.com",
    role: "trip_coordinator",
    agency_id: 1,
    address: "Cebu City",
    status: "active",
  },
  {
    employee_id: "mock-3",
    name: "Lena Reyes",
    email: "lena@lakbai.com",
    role: "content_reviewer",
    agency_id: 1,
    address: "Baguio City",
    status: "reviewing",
  },
];

const fallbackKnowledge = [
  {
    knowledge_id: 1,
    topic: "Banaue Rice Terraces",
    content_type: "destination_insight",
    status: "verified",
    summary:
      "Best sunrise viewing spots and safe walking tips for heritage tours.",
    ai_guidance_text:
      "Best sunrise viewpoints are near the village edge. Travelers should wear proper footwear and respect local farming communities while exploring.",
  },
  {
    knowledge_id: 2,
    topic: "Siargao Surf Basics",
    content_type: "travel_tip",
    status: "draft",
    summary:
      "Seasonal surf notes, equipment checklist, and local etiquette for beginners.",
    ai_guidance_text:
      "Recommend reef-safe sunscreen and beginner-friendly breaks for new surfers.",
  },
  {
    knowledge_id: 3,
    topic: "Coron Island Hopping",
    content_type: "tour_story",
    status: "approved",
    summary:
      "Boat routes, timings, and marine safety guidance for island itineraries.",
    ai_guidance_text:
      "Coordinate island hopping with weather checks and prioritize local boat safety protocols.",
  },
];

const fallbackCrowd = [
  {
    crowd_record_id: 1,
    destination_id: 1,
    visitor_count: 860,
    crowd_level: "medium",
    observed_at: new Date().toISOString(),
    peak_window_start: "07:00:00",
    peak_window_end: "09:00:00",
  },
  {
    crowd_record_id: 2,
    destination_id: 2,
    visitor_count: 1420,
    crowd_level: "high",
    observed_at: new Date().toISOString(),
    peak_window_start: "11:30:00",
    peak_window_end: "13:30:00",
  },
  {
    crowd_record_id: 3,
    destination_id: 3,
    visitor_count: 340,
    crowd_level: "low",
    observed_at: new Date().toISOString(),
    peak_window_start: "15:00:00",
    peak_window_end: "16:30:00",
  },
];

const fallbackReports = [
  {
    report_id: 1,
    report_type: "tourism_performance",
    format: "csv",
    title: "Tourism performance summary",
    generated_at: new Date().toISOString(),
  },
  {
    report_id: 2,
    report_type: "sentiment",
    format: "doc",
    title: "Destination sentiment review",
    generated_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    report_id: 3,
    report_type: "crowd_density",
    format: "csv",
    title: "Crowd density snapshot",
    generated_at: new Date().toISOString(),
  },
];

const fallbackSentimentSummary = [
  {
    sentiment_summary_id: 1,
    destination_id: 1,
    analysis_date: new Date().toISOString(),
    positive_score: 68,
    neutral_score: 21,
    negative_score: 11,
    top_keywords: [
      "scenic views",
      "local hospitality",
      "destination storytelling",
    ],
    tfidf_summary: {
      "scenic views": 0.91,
      "local hospitality": 0.88,
      "crowd management": 0.64,
    },
  },
  {
    sentiment_summary_id: 2,
    destination_id: 2,
    analysis_date: new Date().toISOString(),
    positive_score: 62,
    neutral_score: 24,
    negative_score: 14,
    top_keywords: ["beach access", "water activities", "travel logistics"],
    tfidf_summary: {
      "beach access": 0.87,
      "water activities": 0.81,
      "travel logistics": 0.64,
    },
  },
];

function normalizeDestinationRow(row) {
  if (!row) return row;
  const normalized = { ...row };
  if (typeof normalized.crowd_level === "string") {
    normalized.crowd_level = normalized.crowd_level.toLowerCase();
  }
  if (typeof normalized.destination_photos === "string") {
    try {
      normalized.destination_photos = JSON.parse(normalized.destination_photos);
    } catch {
      normalized.destination_photos = [];
    }
  }
  return normalized;
}

async function tableQuery(table, select, fallbackValue) {
  if (!supabase) return fallbackValue;

  try {
    const { data, error } = await supabase.from(table).select(select);
    if (error) throw error;
    return data && data.length ? data : fallbackValue;
  } catch (error) {
    console.warn(`Table fetch failed for ${table}:`, error.message);
    return fallbackValue;
  }
}

function getFriendlySupabaseError(error) {
  const message = error?.message || "";

  if (error?.code === "42501" || /row-level security|policy/i.test(message)) {
    return "Supabase rejected the write because Row Level Security is blocking the insert/update. In Supabase SQL Editor, add a policy to allow INSERT/UPDATE/DELETE for authenticated users on this table.";
  }

  return message || "Supabase write failed.";
}

async function tableMutation(
  table,
  payload,
  fallbackValue,
  operation = "insert",
  idColumn = null,
) {
  if (!supabase) return fallbackValue;

  try {
    let query = supabase.from(table);
    if (operation === "upsert") {
      query = query.upsert(payload, { onConflict: idColumn });
    } else {
      query = query.insert(payload);
    }
    const { data, error } = await query.select();
    if (error) throw error;
    return data?.[0] ?? payload;
  } catch (error) {
    console.warn(`Mutation failed for ${table}:`, error.message);
    throw new Error(getFriendlySupabaseError(error), { cause: error });
  }
}

async function resolveAgencyId() {
  if (!supabase) return 1;

  try {
    const { data, error } = await supabase
      .from("travel_agency")
      .select("agency_id")
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data?.agency_id ?? 1;
  } catch (error) {
    console.warn("Could not resolve travel_agency id:", error.message);
    return 1;
  }
}

export async function fetchAgencyProfile() {
  const profile = await tableQuery("agency_profiles", "*", [
    fallbackAgencyProfile,
  ]);
  return profile[0] ?? fallbackAgencyProfile;
}

export async function saveAgencyProfile(profile) {
  const agencyId = profile.agency_id ?? (await resolveAgencyId());

  const payload = {
    agency_id: agencyId,
    agency_name: (
      profile.agency_name ?? fallbackAgencyProfile.agency_name
    ).trim(),
    short_description: (
      profile.short_description ?? fallbackAgencyProfile.short_description
    ).trim(),
    about: (profile.about ?? fallbackAgencyProfile.about).trim(),
    region: (profile.region ?? fallbackAgencyProfile.region).trim(),
    business_hours: (
      profile.business_hours ?? fallbackAgencyProfile.business_hours
    ).trim(),
    contact_email: (
      profile.contact_email ?? fallbackAgencyProfile.contact_email
    ).trim(),
    contact_number: (
      profile.contact_number ?? fallbackAgencyProfile.contact_number
    ).trim(),
    logo_url: profile.logo_url ?? fallbackAgencyProfile.logo_url,
    updated_at: new Date().toISOString(),
  };

  if (!supabase) return payload;

  const { data: existing, error: fetchError } = await supabase
    .from("agency_profiles")
    .select("agency_profile_id")
    .eq("agency_id", agencyId)
    .maybeSingle();

  if (fetchError)
    throw new Error(getFriendlySupabaseError(fetchError), {
      cause: fetchError,
    });

  if (existing?.agency_profile_id) {
    const { data, error } = await supabase
      .from("agency_profiles")
      .update(payload)
      .eq("agency_profile_id", existing.agency_profile_id)
      .select();

    if (error)
      throw new Error(getFriendlySupabaseError(error), { cause: error });
    return data?.[0] ?? payload;
  }

  const { data, error } = await supabase
    .from("agency_profiles")
    .insert(payload)
    .select();
  if (error) throw new Error(getFriendlySupabaseError(error), { cause: error });
  return data?.[0] ?? payload;
}

export async function fetchFaqs() {
  const faqRows = await tableQuery("agency_faq", "*", fallbackFaqs);
  return faqRows || fallbackFaqs;
}

export async function saveFaq(faq) {
  const payload = {
    faq_id: faq.faq_id ?? undefined,
    agency_id: faq.agency_id ?? (await resolveAgencyId()),
    question: faq.question,
    answer: faq.answer,
    is_published: faq.is_published ?? true,
    updated_at: new Date().toISOString(),
  };

  return tableMutation(
    "agency_faq",
    payload,
    payload,
    faq.faq_id ? "upsert" : "insert",
    "faq_id",
  );
}

export async function deleteFaq(faqId) {
  if (!supabase || faqId === undefined || faqId === null || faqId === "")
    return false;

  const { error } = await supabase
    .from("agency_faq")
    .delete()
    .eq("faq_id", Number(faqId));

  if (error) {
    console.warn("Delete FAQ failed:", error.message);
    return false;
  }

  return true;
}

export async function fetchEmployees() {
  const employees = await tableQuery("employees", "*", fallbackEmployees);
  return employees || fallbackEmployees;
}

export async function saveEmployee(employee) {
  const agencyId = employee.agency_id ?? (await resolveAgencyId());
  const name = String(employee.name ?? "").trim();
  const email = String(employee.email ?? "").trim();
  const address = String(employee.address ?? "").trim();
  const role = String(employee.role ?? "staff").trim();
  const password = String(employee.password ?? "").trim();

  if (!name || !email) {
    throw new Error("Employee name and email are required.");
  }

  let employeeId = employee.employee_id ?? null;

  if (!employeeId && supabase && password) {
    const { data: existingSessionData } = await supabase.auth.getSession();
    const previousSession = existingSessionData?.session ?? null;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error(getFriendlySupabaseError(error), { cause: error });
    }

    if (previousSession && data?.session) {
      await supabase.auth.setSession({
        access_token: previousSession.access_token,
        refresh_token: previousSession.refresh_token,
      });
    }

    employeeId = data?.user?.id ?? null;
    if (!employeeId) {
      throw new Error(
        "The new staff account was created without a user id. Please try again.",
      );
    }
  }

  if (!employeeId) {
    throw new Error(
      "A password is required to create a staff account. Existing staff records can only be updated.",
    );
  }

  const payload = {
    employee_id: employeeId,
    agency_id: agencyId,
    name,
    email,
    address,
    role,
  };

  return tableMutation(
    "employees",
    payload,
    payload,
    employee.employee_id ? "upsert" : "insert",
    "employee_id",
  );
}

export async function fetchDestinations() {
  const destinations = await tableQuery(
    "destinations",
    "*",
    fallbackDestinations,
  );
  return (destinations || fallbackDestinations).map(normalizeDestinationRow);
}

export async function saveDestination(destination) {
  const payload = {
    agency_id: destination.agency_id ?? (await resolveAgencyId()),
    destination_name: String(destination.destination_name ?? "").trim(),
    region: String(destination.region ?? "").trim(),
    category: String(destination.category ?? "").trim(),
    crowd_level: String(destination.crowd_level ?? "medium").toLowerCase(),
    description: String(destination.description ?? "").trim(),
    latitude: Number(destination.latitude ?? 0),
    longitude: Number(destination.longitude ?? 0),
    destination_photos:
      typeof destination.destination_photos === "string"
        ? destination.destination_photos
        : JSON.stringify(destination.destination_photos ?? []),
    immersive_support: Boolean(destination.immersive_support),
    max_capacity: Number(destination.max_capacity ?? 100),
  };

  if (
    destination.destination_id !== undefined &&
    destination.destination_id !== null &&
    destination.destination_id !== ""
  ) {
    payload.destination_id = Number(destination.destination_id);
    return tableMutation(
      "destinations",
      payload,
      payload,
      "upsert",
      "destination_id",
    );
  }

  return tableMutation("destinations", payload, payload, "insert");
}

export async function deleteDestination(destinationId) {
  if (!supabase) return false;

  const { error } = await supabase
    .from("destinations")
    .delete()
    .eq("destination_id", Number(destinationId));

  if (error) {
    console.warn("Delete destination failed:", error.message);
    return false;
  }

  return true;
}

export async function fetchTourGuideKnowledge() {
  const records = await tableQuery(
    "tour_guide_knowledge",
    "*",
    fallbackKnowledge,
  );
  return records || fallbackKnowledge;
}

export async function saveTourGuideKnowledge(entry) {
  const payload = {
    knowledge_id: entry.knowledge_id ?? undefined,
    agency_id: entry.agency_id ?? (await resolveAgencyId()),
    destination_id: entry.destination_id ?? null,
    topic: entry.topic,
    content_type: entry.content_type ?? "destination_insight",
    summary: entry.summary,
    ai_guidance_text: entry.ai_guidance_text ?? entry.summary,
    status: entry.status ?? "draft",
    updated_at: new Date().toISOString(),
  };

  return tableMutation(
    "tour_guide_knowledge",
    payload,
    payload,
    entry.knowledge_id ? "upsert" : "insert",
    "knowledge_id",
  );
}

export async function deleteTourGuideKnowledge(knowledgeId) {
  if (
    !supabase ||
    knowledgeId === undefined ||
    knowledgeId === null ||
    knowledgeId === ""
  )
    return false;

  const { error } = await supabase
    .from("tour_guide_knowledge")
    .delete()
    .eq("knowledge_id", Number(knowledgeId));

  if (error) {
    console.warn("Delete knowledge entry failed:", error.message);
    return false;
  }

  return true;
}

export async function fetchCrowdRecords() {
  const records = await tableQuery("crowd_density_records", "*", fallbackCrowd);
  return records || fallbackCrowd;
}

export async function saveCrowdRecord(record) {
  const payload = {
    crowd_record_id: record.crowd_record_id ?? undefined,
    destination_id: record.destination_id ?? 1,
    visitor_count: Number(record.visitor_count ?? 0),
    crowd_level: record.crowd_level ?? "low",
    observed_at: record.observed_at ?? new Date().toISOString(),
    peak_window_start: record.peak_window_start ?? "09:00:00",
    peak_window_end: record.peak_window_end ?? "11:00:00",
    notes: record.notes ?? "",
  };

  return tableMutation(
    "crowd_density_records",
    payload,
    payload,
    record.crowd_record_id ? "upsert" : "insert",
    "crowd_record_id",
  );
}

export async function fetchSentimentSummary() {
  const rows = await tableQuery(
    "destination_sentiment_summary",
    "*",
    fallbackSentimentSummary,
  );
  return (rows || fallbackSentimentSummary).map((row) => ({
    ...row,
    top_keywords: Array.isArray(row.top_keywords)
      ? row.top_keywords
      : typeof row.top_keywords === "string"
        ? (() => {
            try {
              return JSON.parse(row.top_keywords);
            } catch {
              return [];
            }
          })()
        : [],
  }));
}

export async function saveSentimentSummary(summary) {
  const payload = {
    sentiment_summary_id: summary.sentiment_summary_id ?? undefined,
    destination_id: summary.destination_id ?? 1,
    analysis_date:
      summary.analysis_date ?? new Date().toISOString().slice(0, 10),
    positive_score: Number(summary.positive_score ?? 0),
    neutral_score: Number(summary.neutral_score ?? 0),
    negative_score: Number(summary.negative_score ?? 0),
    top_keywords: summary.top_keywords ?? [],
    tfidf_summary: summary.tfidf_summary ?? {},
  };

  return tableMutation(
    "destination_sentiment_summary",
    payload,
    payload,
    summary.sentiment_summary_id ? "upsert" : "insert",
    "sentiment_summary_id",
  );
}

export async function fetchReports() {
  const rows = await tableQuery("analytics_reports", "*", fallbackReports);
  return rows || fallbackReports;
}

export async function saveReport(report) {
  const payload = {
    report_id: report.report_id ?? undefined,
    agency_id: report.agency_id ?? (await resolveAgencyId()),
    report_type: report.report_type ?? "tourism_performance",
    format: report.format ?? "csv",
    title: report.title ?? "Agency report",
    file_url: report.file_url ?? "",
    generated_by: report.generated_by ?? "admin",
    generated_at: report.generated_at ?? new Date().toISOString(),
  };

  return tableMutation(
    "analytics_reports",
    payload,
    payload,
    report.report_id ? "upsert" : "insert",
    "report_id",
  );
}

export async function generateTourGuideSuggestion({
  topic,
  contentType,
  destinationName,
  currentText,
}) {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "Gemini is not configured. Add VITE_GEMINI_API_KEY to your .env file.",
    );
  }

  const prompt = [
    "You are a tourism content editor for a travel agency.",
    "Write a concise, accurate, visitor-friendly tourism knowledge entry for the AI virtual tour guide.",
    `Topic: ${topic || destinationName || "Destination"}`,
    `Content type: ${contentType || "destination_insight"}`,
    `Destination name: ${destinationName || "General tourism destination"}`,
    currentText
      ? `Current draft: ${currentText}`
      : "Create polished, factual content without making unsupported claims.",
    "Include practical travel tips, cultural context, and safety guidance when relevant.",
    "Keep the response in plain text, not markdown, and avoid speculation.",
  ].join("\n");

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
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
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 500,
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        errorText || `Gemini request failed with status ${response.status}`,
      );
    }

    const json = await response.json();
    const generatedText = json?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .join("\n")
      ?.trim();

    return (
      generatedText ||
      `Draft content for ${topic || destinationName || "this destination"}: ${currentText || "Traveler-friendly, concise information with local guidance and cultural context."}`
    );
  } catch (error) {
    console.warn("Gemini generation failed:", error);
    throw error;
  }
}

export async function fetchAgencySummaryStats() {
  const [employees, destinations, records] = await Promise.all([
    fetchEmployees(),
    fetchDestinations(),
    fetchCrowdRecords(),
  ]);

  return {
    employeeCount: employees.length,
    destinationCount: destinations.length,
    crowdAlerts: records.filter((record) => record.crowd_level === "high")
      .length,
  };
}
