import type { VolunteerForm } from "./types";

export async function sendVolunteer(data: VolunteerForm) {
  const res = await fetch("/.netlify/functions/volunteer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // ← naprawia „Unexpected token '<'”
  const ct = res.headers.get("content-type") || "";
  const body = ct.includes("application/json") ? await res.json() : { ok: res.ok, text: await res.text() };

  if (!res.ok || body?.ok === false) {
    const msg = body?.error || body?.text || `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return body;
}
