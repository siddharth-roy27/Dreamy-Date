import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { PageHeader, VintageButton, RibbonBookmark, WaxSeal } from "@/components/vintage";
import { calendarDays } from "@/lib/mock";

export const Route = createFileRoute("/calendar")({
  head: () => ({ meta: [{ title: "Calendar — DreamyDate" }] }),
  component: CalendarPage,
});

const sealColor = { scheduled: "gold", completed: "rose", missed: "burgundy" } as const;

function CalendarPage() {
  return (
    <div className="relative">
      <PageHeader eyebrow="April · MMXXVI" title="Our Diary of Days" subtitle="Each square a promise, each seal a memory." />
      <div className="relative grid gap-1 lg:grid-cols-2">
        {/* Left page */}
        <motion.div initial={{ rotateY: -15, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          className="diary-card paper-texture relative p-6 sm:p-10"
          style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
          <div className="absolute right-6 top-6"><RibbonBookmark>April</RibbonBookmark></div>
          <div className="mb-6 flex items-center justify-between">
            <button className="rounded-full border border-border p-2"><ChevronLeft className="h-4 w-4" /></button>
            <h3 className="font-display text-2xl text-primary">April 2026</h3>
            <button className="rounded-full border border-border p-2"><ChevronRight className="h-4 w-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">
            {["Su","Mo","Tu","We","Th","Fr","Sa"].map((d) => <div key={d} className="py-2 text-center">{d}</div>)}
          </div>
          <div className="mt-1 grid grid-cols-7 gap-1.5">
            {Array.from({ length: 2 }).map((_, i) => <div key={"e"+i} />)}
            {calendarDays.map((d) => (
              <button key={d.day} className="group relative aspect-square rounded-md border border-border/50 bg-secondary/40 p-1 transition hover:border-accent hover:bg-secondary">
                <span className="absolute left-1.5 top-1 font-display text-sm text-foreground">{d.day}</span>
                {d.status && (
                  <div className="absolute bottom-1 right-1 h-3 w-3 rounded-full"
                    style={{ background: d.status === "scheduled" ? "var(--gold)" : d.status === "completed" ? "var(--rose)" : "var(--muted-foreground)" }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 font-cinzel text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-accent" /> scheduled</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose" /> completed</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-muted-foreground" /> missed</span>
          </div>
        </motion.div>

        {/* Right page */}
        <motion.div initial={{ rotateY: 15, opacity: 0 }} animate={{ rotateY: 0, opacity: 1 }} transition={{ duration: 0.8 }}
          className="diary-card paper-texture relative p-6 sm:p-10"
          style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          <div className="absolute right-6 top-6"><WaxSeal color="gold" /></div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">Friday, April 19</p>
          <h3 className="mt-2 font-display text-3xl text-primary">Waltz at Midnight</h3>
          <p className="mt-1 font-hand text-xl text-muted-foreground">a slow dance in two cities</p>
          <div className="my-6 h-px bg-gradient-to-r from-accent/60 via-transparent to-accent/60" />
          <dl className="space-y-3 font-body text-lg">
            <div className="flex justify-between"><dt className="text-muted-foreground italic">Time</dt><dd>11:00 PM</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground italic">Theme</dt><dd>Romantic</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground italic">Activity</dt><dd>Waltz</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground italic">Soundtrack</dt><dd>La Vie en Rose</dd></div>
          </dl>
          <p className="mt-6 font-hand text-xl leading-relaxed text-primary">
            "Wear something soft. I'll light a candle on my side; light one on yours, and we'll meet in the flame."
          </p>
          <VintageButton variant="primary" className="mt-8 w-full">Open this date</VintageButton>
        </motion.div>
      </div>

      <button className="fixed bottom-24 right-6 z-30 grid h-14 w-14 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-gold)] lg:bottom-10">
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
