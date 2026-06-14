import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Film, Camera, Music } from "lucide-react";
import { useState } from "react";
import { PageHeader, VintageCard } from "@/components/vintage";
import { recentMemories } from "@/lib/mock";

export const Route = createFileRoute("/memories")({
  head: () => ({ meta: [{ title: "Memory Library — DreamyDate" }] }),
  component: MemoriesPage,
});

const tabs = [
  { id: "all", label: "All", icon: Heart },
  { id: "videos", label: "AI Videos", icon: Film },
  { id: "photos", label: "Photos", icon: Camera },
  { id: "dance", label: "Dance", icon: Music },
];

const extended = [...recentMemories, ...recentMemories.map(m => ({ ...m, id: m.id + "b" }))];

function MemoriesPage() {
  const [tab, setTab] = useState("all");
  return (
    <div>
      <PageHeader eyebrow="The Museum of Us" title="Memory Library" subtitle="Postcards from every chapter, kept under glass." />

      <div className="mb-8 flex flex-wrap gap-2">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`inline-flex items-center gap-2 rounded-full px-5 py-2 font-cinzel text-[11px] uppercase tracking-widest transition ${tab === t.id ? "bg-primary text-primary-foreground" : "border border-border text-foreground hover:border-accent"}`}>
              <Icon className="h-3.5 w-3.5" /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {extended.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
            <VintageCard className="group overflow-hidden p-0 transition hover:-translate-y-1 hover:shadow-[var(--shadow-diary)]">
              <div className="relative">
                <img src={m.img} className="aspect-[4/3] w-full object-cover sepia-[20%] transition group-hover:sepia-0" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
                  <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-cream/80">{m.date}</p>
                  <p className="font-display text-xl text-cream">{m.title}</p>
                </div>
                <button className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream/90 text-rose">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
              <div className="p-5">
                <p className="font-hand text-xl leading-snug text-primary">"{m.quote}"</p>
                <div className="mt-4 flex items-center justify-between font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  <span>AI video ready</span>
                  <span className="text-accent">▶ play</span>
                </div>
              </div>
            </VintageCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
