import type { Handler } from "@netlify/functions";
import { Resend } from "resend";

const required = (v?: string) => (v && v.trim().length > 0);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const body = JSON.parse(event.body || "{}");

    // prosta walidacja
    const ok =
      required(body.fullName) &&
      required(body.city) &&
      (required(body.email) || required(body.phone)) &&
      required(body.availability);

    if (!ok) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: "Brak wymaganych pól" }),
      };
    }

    const resend = new Resend(process.env.RESEND_API_KEY!);
    const html = `
      <h2>Nowe zgłoszenie wolontariusza</h2>
      <p><b>Imię i nazwisko:</b> ${body.fullName}</p>
      <p><b>Miasto:</b> ${body.city}</p>
      <p><b>Email:</b> ${body.email || "-"}</p>
      <p><b>Telefon/WhatsApp:</b> ${body.phone || "-"}</p>
      <p><b>Dostępność:</b> ${body.availability}</p>
      <p><b>Rola:</b> ${(body.roles || []).join(", ") || "-"}</p>
      <p><b>Doświadczenie:</b> ${body.experience || "-"}</p>
      <p><b>Zgoda RODO:</b> ${body.rodo ? "TAK" : "NIE"}</p>
    `;

    const { error } = await resend.emails.send({
      from: "Fundacja Schenk een Glimlach <no-reply@fundacja-go.org>",
      to: ["info@segim.ach.nl"],         // TODO: zmień na właściwy adres
      subject: "Nowe zgłoszenie wolontariusza",
      html,
    });

    if (error) {
      return {
        statusCode: 500,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ok: false, error: error.message }),
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: true }),
    };
  } catch (e: any) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ok: false, error: e.message || "Server error" }),
    };
  }
};
