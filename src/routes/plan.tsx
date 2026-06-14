import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader, VintageCard, VintageButton, WaxSeal } from "@/components/vintage";
import { activities, themes } from "@/lib/mock";

export const Route = createFileRoute("/plan")({
  head: () => ({ meta: [{ title: "Plan a Date — DreamyDate" }] }),
  component: PlanPage,
});

function PlanPage() {
  const [activity, setActivity] = useState("dance");
  const [theme, setTheme] = useState("romantic");
  const [day, setDay] = useState(19);
  const [hour, setHour] = useState(20);

  return (
    <div>
      <PageHeader eyebrow="A New Page" title="Plan a Date" subtitle="Write a chapter for the two of you." />
      <div className="grid gap-8 lg:grid-cols-3">
        <VintageCard className="p-6 lg:col-span-2">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">i · choose the day</p>
          <div className="mt-3 grid grid-cols-7 gap-2">
            {Array.from({ length: 21 }).map((_, i) => {
              const d = i + 8;
              const active = d === day;
              return (
                <button key={d} onClick={() => setDay(d)}
                  className={`aspect-square rounded-md border font-display text-lg transition ${active ? "border-accent bg-primary text-primary-foreground shadow-[var(--shadow-gold)]" : "border-border bg-secondary/40 hover:border-accent"}`}>
                  {d}
                </button>
              );
            })}
          </div>

          <p className="mt-8 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">ii · choose the hour</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {[18,19,20,21,22,23,0].map((h) => (
              <button key={h} onClick={() => setHour(h)}
                className={`rounded-full px-4 py-2 font-cinzel text-xs uppercase tracking-widest transition ${h === hour ? "bg-primary text-primary-foreground" : "border border-border bg-secondary/40 text-foreground hover:border-accent"}`}>
                {h.toString().padStart(2,"0")}:00
              </button>
            ))}
          </div>

          <p className="mt-8 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">iii · choose the activity</p>
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {activities.map((a) => {
              const active = activity === a.id;
              return (
                <motion.button key={a.id} onClick={() => setActivity(a.id)} whileHover={{ y: -3 }}
                  className={`rounded-lg border p-4 text-left transition ${active ? "border-accent bg-secondary shadow-[var(--shadow-gold)]" : "border-border bg-card hover:border-accent/60"}`}>
                  <div className="text-3xl">{a.icon}</div>
                  <p className="mt-2 font-display text-lg text-primary">{a.name}</p>
                  <p className="font-body text-sm italic text-muted-foreground">{a.desc}</p>
                </motion.button>
              );
            })}
          </div>

          <p className="mt-8 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">iv · choose the mood</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {themes.map((t) => (
              <button key={t.id} onClick={() => setTheme(t.id)}
                className={`rounded-full px-5 py-2.5 font-cinzel text-xs uppercase tracking-widest transition ${theme === t.id ? "bg-[var(--gradient-gold)] text-ink shadow-[var(--shadow-gold)]" : "border border-border text-foreground hover:border-accent"}`}>
                {t.name}
              </button>
            ))}
          </div>

          <p className="mt-8 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">v · a private note</p>
          <textarea
            placeholder="Wear something soft. I'll light a candle on my side..."
            rows={4}
            className="mt-3 w-full rounded-md border border-border bg-secondary/30 p-4 font-hand text-xl text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
          />
        </VintageCard>

        <div className="space-y-5">
          <VintageCard ornament className="relative p-6 paper-texture">
            <div className="absolute right-4 top-4"><WaxSeal label="✉" /></div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">a preview</p>
            <h3 className="mt-2 font-display text-2xl text-primary">An Invitation</h3>
            <p className="mt-3 font-hand text-xl text-primary">My dearest James,</p>
            <p className="mt-2 font-body text-lg italic leading-relaxed">
              On the {day}th, at the {hour}th hour, may we share a {activities.find(a => a.id === activity)?.name.toLowerCase()}? A {themes.find(t => t.id === theme)?.name.toLowerCase()} affair.
            </p>
            <p className="mt-3 font-hand text-xl text-primary">— always, Emma</p>
          </VintageCard>
          <VintageButton variant="primary" className="w-full">Confirm Date</VintageButton>
          <VintageButton variant="ghost" className="w-full">Save as draft</VintageButton>
        </div>
      </div>
    </div>
  );
}
