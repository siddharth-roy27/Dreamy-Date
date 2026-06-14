import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Film, Camera, Music, Mail, Flower2, Brush, Map, Sparkles } from "lucide-react";
import { useState } from "react";
import { PageHeader, VintageCard } from "@/components/vintage";
import { archiveItems, type ArchiveKind } from "@/lib/mock";

export const Route = createFileRoute("/memories")({
  head: () => ({ meta: [{ title: "Memory Archive — DreamyDate" }] }),
  component: MemoriesPage,
});

const TABS: { id: ArchiveKind | "all"; label: string; Icon: any }[] = [
  { id: "all",      label: "All",       Icon: Heart },
  { id: "movie",    label: "AI Films",  Icon: Film },
  { id: "photo",    label: "Photos",    Icon: Camera },
  { id: "letter",   label: "Letters",   Icon: Mail },
  { id: "bouquet",  label: "Bouquets",  Icon: Flower2 },
  { id: "painting", label: "Paintings", Icon: Brush },
  { id: "postcard", label: "Postcards", Icon: Map },
  { id: "dance",    label: "Dances",    Icon: Sparkles },
  { id: "song",     label: "Songs",     Icon: Music },
];

function MemoriesPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("all");
  const items = tab === "all" ? archiveItems : archiveItems.filter((m) => m.kind === tab);

  return (
    <div>
      <PageHeader
        eyebrow="The Museum of Us"
        title="Memory Archive"
        subtitle="Every letter, bouquet, brushstroke and dance — kept under glass."
      />

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-cinzel text-[11px] uppercase tracking-widest transition ${
                active ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]" : "border border-border text-foreground hover:border-accent"
              }`}>
              <t.Icon className="h-3.5 w-3.5" /> {t.label}
              <span className={`ml-1 text-[9px] ${active ? "text-cream/80" : "text-muted-foreground"}`}>
                {t.id === "all" ? archiveItems.length : archiveItems.filter((m) => m.kind === t.id).length}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m, i) => (
            <motion.div key={m.id} layout
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              transition={{ delay: i * 0.04 }}>
              <VintageCard className="group h-full overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-[var(--shadow-diary)]">
                {m.img ? (
                  <div className="relative">
                    <img src={m.img} alt={m.title} className="aspect-[4/3] w-full object-cover sepia-[20%] transition group-hover:sepia-0" />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
                      <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-cream/80">{m.date}</p>
                      <p className="font-display text-xl text-cream">{m.title}</p>
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-cream/90 px-3 py-1 font-cinzel text-[9px] uppercase tracking-widest text-primary">
                      {m.kind}
                    </span>
                  </div>
                ) : (
                  <div className="relative grid aspect-[4/3] place-items-center bg-[#f7efe2] p-6">
                    <div className="text-center">
                      <p className="font-script text-4xl text-primary">{m.kind === "letter" ? "♡" : "♪"}</p>
                      <p className="mt-2 font-display text-xl text-primary">{m.title}</p>
                    </div>
                    <span className="absolute right-3 top-3 rounded-full bg-primary/90 px-3 py-1 font-cinzel text-[9px] uppercase tracking-widest text-cream">
                      {m.kind}
                    </span>
                    <p className="absolute bottom-3 left-3 font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">{m.date}</p>
                  </div>
                )}
                <div className="p-5">
                  <p className="font-hand text-xl leading-snug text-primary">"{m.quote}"</p>
                  <div className="mt-4 flex items-center justify-between font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span>kept in the archive</span>
                    <span className="text-accent">▶ open</span>
                  </div>
                </div>
              </VintageCard>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {items.length === 0 && (
        <p className="py-20 text-center font-hand text-2xl text-muted-foreground">no entries yet — make one tonight.</p>
      )}
    </div>
  );
}
