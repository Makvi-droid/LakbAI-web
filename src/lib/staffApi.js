import { supabase } from "./supabase";
import { fetchDestinations } from "./adminApi";

// Re-exported so staff feature code has a single import source
// (`lib/staffApi`) instead of reaching into `lib/adminApi` directly.
export { fetchDestinations };

const fallbackTourPackages = [
  {
    package_id: 1,
    agency_id: 1,
    title: "Banaue Heritage Trek",
    description:
      "A two-day cultural trek through the rice terraces with a local guide and homestay experience.",
    price: 4500,
    duration_days: 2,
  },
  {
    package_id: 2,
    agency_id: 1,
    title: "El Nido Island Hopping Escape",
    description:
      "Full-day island-hopping tour covering lagoons, beaches, and snorkeling spots around El Nido.",
    price: 3200,
    duration_days: 1,
  },
  {
    package_id: 3,
    agency_id: 1,
    title: "Sagada Cave & Culture Immersion",
    description:
      "Guided cave connection trek paired with a visit to local weaving communities.",
    price: 2800,
    duration_days: 1,
  },
];

export async function fetchTourPackages() {
  if (!supabase) return fallbackTourPackages;

  try {
    const { data, error } = await supabase.from("tour_package").select("*");
    if (error) throw error;
    return data && data.length ? data : fallbackTourPackages;
  } catch (error) {
    console.warn("Table fetch failed for tour_package:", error.message);
    return fallbackTourPackages;
  }
}

// Only these fields can ever be written by staff. Anything else on the
// `updates` object passed in is silently dropped, so a bug upstream can
// never accidentally let staff touch region, crowd_level, capacity, etc.
const DESTINATION_CONTENT_FIELDS = [
  "destination_name",
  "description",
  "destination_photos",
  "is_hidden_gem",
];

export async function updateDestinationContent(destinationId, updates) {
  const payload = {};
  for (const key of DESTINATION_CONTENT_FIELDS) {
    if (key in updates) payload[key] = updates[key];
  }

  if (
    "destination_photos" in payload &&
    typeof payload.destination_photos !== "string"
  ) {
    payload.destination_photos = JSON.stringify(
      payload.destination_photos ?? [],
    );
  }
  if ("is_hidden_gem" in payload) {
    payload.is_hidden_gem = Boolean(payload.is_hidden_gem);
  }

  if (!supabase) {
    return { destination_id: destinationId, ...payload };
  }

  const { data, error } = await supabase
    .from("destinations")
    .update(payload)
    .eq("destination_id", Number(destinationId))
    .select();

  if (error) {
    console.warn("Staff destination content update failed:", error.message);
    throw new Error(error.message || "Failed to update destination content.");
  }

  return data?.[0] ?? { destination_id: destinationId, ...payload };
}

// Tour packages are fully owned by staff (create/edit/delete), unlike
// destinations. Row-level security (scoped by agency_id) is the real
// guardrail here — see the Supabase policies set up on `tour_package`.
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

export async function saveTourPackage(pkg) {
  const payload = {
    agency_id: pkg.agency_id ?? (await resolveAgencyId()),
    title: String(pkg.title ?? "").trim(),
    description: String(pkg.description ?? "").trim(),
    price: Number(pkg.price ?? 0),
    duration_days: Number(pkg.duration_days ?? 1),
  };

  if (!supabase) {
    return { package_id: pkg.package_id ?? Date.now(), ...payload };
  }

  if (
    pkg.package_id !== undefined &&
    pkg.package_id !== null &&
    pkg.package_id !== ""
  ) {
    payload.package_id = Number(pkg.package_id);
    const { data, error } = await supabase
      .from("tour_package")
      .upsert(payload, { onConflict: "package_id" })
      .select();

    if (error) {
      console.warn("Tour package update failed:", error.message);
      throw new Error(error.message || "Failed to save tour package.");
    }
    return data?.[0] ?? payload;
  }

  const { data, error } = await supabase
    .from("tour_package")
    .insert(payload)
    .select();

  if (error) {
    console.warn("Tour package create failed:", error.message);
    throw new Error(error.message || "Failed to save tour package.");
  }
  return data?.[0] ?? payload;
}

export async function deleteTourPackage(packageId) {
  if (!supabase) return false;

  const { error } = await supabase
    .from("tour_package")
    .delete()
    .eq("package_id", Number(packageId));

  if (error) {
    console.warn("Delete tour package failed:", error.message);
    return false;
  }

  return true;
}