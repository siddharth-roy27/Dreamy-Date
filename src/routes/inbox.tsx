import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Bell, Flower2, Clapperboard, Heart, Camera, Check } from "lucide-react";
import { PageHeader } from "@/components/vintage";
import { inboxItems } from "@/lib/mock";

export const Route = createFileRoute("/inbox")({
  head: () => ({ meta: [{ title: "Inbox — DreamyDate" }] }),
  component: InboxPage,
});

const ICONS: Record<string, any> = { letter: Mail, bouquet: Flower2, date: Clapperboard, memory: Heart, photo: Camera, reminder: Bell };
const FILTERS = ["All", "Letters", "Bouquets", "Dates", "Memories"] as const;

function InboxPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");
  const [items, setItems] = useState(inboxItems);

  const filtered = items.filter((i) => {
    if (filter === "All") return true;
    if (filter === "Letters") return i.kind === "letter";
    if (filter === "Bouquets") return i.kind === "bouquet";
    if (filter === "Dates") return i.kind === "date" || i.kind === "reminder";
    if (filter === "Memories") return i.kind === "memory" || i.kind === "photo";
    return true;
  });
  const unread = items.filter((i) => i.unread).length;

  return (
    <div>
      <PageHeader eyebrow="The Envelope Stack" title="Inbox" subtitle={`${unread} unread — sealed and waiting for you.`} />

      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-1.5 font-cinzel text-[10px] uppercase tracking-widest transition ${
                filter === f ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:border-accent"
              }`}>{f}</button>
          ))}
        </div>
        <button onClick={() => setItems(items.map((i) => ({ ...i, unread: false })))}
          className="inline-flex items-center gap-2 font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
          <Check className="h-3 w-3" /> Mark all read
        </button>
      </div>

      <div className="relative space-y-3">
        {filtered.map((n, i) => {
          const Icon = ICONS[n.kind] ?? Mail;
          return (
            <motion.div key={n.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}
              onClick={() => setItems(items.map((it) => it.id === n.id ? { ...it, unread: false } : it))}
              className={`group relative cursor-pointer overflow-hidden rounded-md border bg-paper p-5 transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)] ${
                n.unread ? "border-accent shadow-[var(--shadow-gold)]" : "border-border opacity-90"
              }`}>
              {/* envelope flap */}
              <div className="absolute -top-12 left-1/2 h-24 w-[140%] -translate-x-1/2 rotate-1 bg-[var(--gradient-burgundy)] opacity-10" />
              <div className="relative flex items-start gap-4">
                <div className={`grid h-12 w-12 flex-none place-items-center rounded-full ${n.unread ? "bg-[var(--gradient-burgundy)] text-cream" : "bg-secondary text-muted-foreground"}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-display text-xl text-primary">
                      {n.from} <span className="font-hand text-lg text-muted-foreground">— {n.title}</span>
                    </p>
                    <p className="font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">{n.time}</p>
                  </div>
                  <p className="mt-1 truncate font-hand text-lg text-foreground/80">{n.preview}</p>
                </div>
                {n.unread && <span className="mt-2 h-2 w-2 flex-none rounded-full bg-accent" />}
              </div>
            </motion.div>
          );
        })}
        {filtered.length === 0 && (
          <p className="py-16 text-center font-hand text-2xl text-muted-foreground">no letters here — yet.</p>
        )}
      </div>

      <div className="mt-10 text-center">
        <Link to="/date-room" className="font-cinzel text-[11px] uppercase tracking-widest text-accent hover:underline">
          ← back to the date room
        </Link>
      </div>
    </div>
  );
}
