import React, { useMemo, useState } from "react";
import GlassCard from "../common/GlassCard";

export type EventItem = {
  id: string;
  city: string;
  venue: string;
  dateISO: string;
  time: string;
  outdoor: boolean;
  imageUrl: string;
  summary: string;
  mapLink?: string;
};

const Badge: React.FC<{ outdoor: boolean }> = ({ outdoor }) => (
  <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${outdoor ? "bg-green-500/90 text-white" : "bg-blue-500/90 text-white"}`}>
    {outdoor ? "Buiten" : "Binnen"}
  </span>
);

export default function HomeEventsPreview({ events }: { events: EventItem[] }) {
  const items = useMemo(() => {
    return [...events].sort((a, b) => a.dateISO.localeCompare(b.dateISO)).slice(0, 6);
  }, [events]);
  const [activeId, setActiveId] = useState(items[0]?.id);
  const active = items.find(e => e.id === activeId) ?? items[0];

  if (!active) return null;

  const fmt = (iso: string) => new Date(iso).toLocaleDateString("nl-NL", { day: "2-digit", month: "long", year: "numeric" });

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-6 py-10 bg-dark">
      <h2 className="mb-6 text-2xl md:text-3xl font-extrabold text-white/95 drop-shadow">Komende evenementen</h2>

      <div className="grid gap-6 md:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)_400px]">
        {/* LISTA (lewa kolumna) */}
        <GlassCard className="p-3 h-full">
          <div className="flex flex-col gap-3 max-h-[560px] overflow-y-auto pr-1">
            {items.map(ev => (
              <button
                key={ev.id}
                onClick={() => setActiveId(ev.id)}
                className={`text-left rounded-xl p-3 transition border ${activeId === ev.id ? "ring-2 ring-cyan-400 bg-white/15 border-white/30" : "border-white/10 hover:bg-white/10"}`}
              >
                <div className="text-slate-200 text-sm">{fmt(ev.dateISO)}</div>
                <div className="font-semibold text-cyan-300 text-lg">{ev.city}</div>
                <div className="text-slate-300 text-sm truncate">{ev.venue}</div>
              </button>
            ))}
          </div>
        </GlassCard>

        {/* SZCZEGÓŁY (środek) */}
        <GlassCard className="p-4 md:p-5">
          <div className="flex items-center justify-between mb-3">
            <Badge outdoor={!!active.outdoor} />
            <div className="text-slate-200 text-sm">{fmt(active.dateISO)} • {active.time}</div>
          </div>

          <img src={active.imageUrl} alt={`${active.city} – ${active.venue}`} className="w-full h-56 md:h-72 object-cover rounded-xl mb-4" />

          <h3 className="text-2xl md:text-3xl font-extrabold text-cyan-300">{active.city}</h3>
          <p className="text-slate-300">{active.venue}</p>
          <p className="mt-3 text-slate-100/90">{active.summary}</p>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <a href="/rsvp" className="inline-flex items-center justify-center rounded-xl bg-gradient-to-b from-cyan-500 to-cyan-600 px-4 py-2 text-white hover:to-cyan-700 shadow-inner">
              Kind inschrijven (RSVP)
            </a>
            <a href="/ics" className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white px-4 py-2 hover:bg-white/20">
              Toevoegen aan kalender (.ics)
            </a>
            <a href="/ticket-email" className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white px-4 py-2 hover:bg-white/20">
              Ticket per e-mail versturen
            </a>
          </div>
        </GlassCard>

        {/* PRAWA KOLUMNA (opcjonalnie mini-mapa lub link) */}
        <GlassCard className="hidden xl:block p-4 md:p-5">
          <h4 className="mb-3 font-semibold text-white">Locatie</h4>
          {active.mapLink ? (
            <iframe
              title="Kaart"
              className="w-full h-[360px] rounded-xl"
              style={{ border: 0 }}
              src={active.mapLink}
            />
          ) : (
            <a href="/evenementen" className="inline-flex items-center justify-center rounded-xl bg-white/10 text-white px-4 py-2 hover:bg-white/20">
              Bekijk op kaart
            </a>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
