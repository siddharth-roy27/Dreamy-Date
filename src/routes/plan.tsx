import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, ArrowUp, Plus, Trash2, GripVertical } from "lucide-react";
import { PageHeader, VintageCard, VintageButton, WaxSeal } from "@/components/vintage";
import { dateRoomActivities, themes, type ActivityId, type TimelineBlock, plannedDateDraft } from "@/lib/mock";

export const Route = createFileRoute("/plan")({
  head: () => ({ meta: [{ title: "Plan a Date — DreamyDate" }] }),
  component: PlanPage,
});

let _id = 100;
const newId = () => `t${++_id}`;

function addMinutes(t: string, min: number): string {
  // parse "H:MM AM/PM"
  const m = /(\d+):(\d+)\s?(AM|PM)/i.exec(t);
  if (!m) return t;
  let h = parseInt(m[1]) % 12 + (m[3].toUpperCase() === "PM" ? 12 : 0);
  let mm = parseInt(m[2]) + min;
  h += Math.floor(mm / 60); mm = mm % 60;
  h = h % 24;
  const period = h >= 12 ? "PM" : "AM";
  const h12 = ((h + 11) % 12) + 1;
  return `${h12}:${String(mm).padStart(2,"0")} ${period}`;
}

function recompute(blocks: TimelineBlock[], startTime: string): TimelineBlock[] {
  let t = startTime;
  return blocks.map(b => {
    const nb = { ...b, startTime: t };
    t = addMinutes(t, b.durationMin);
    return nb;
  });
}

function PlanPage() {
  const [title, setTitle] = useState(plannedDateDraft.title);
  const [theme, setTheme] = useState(plannedDateDraft.theme);
  const [day, setDay] = useState(19);
  const [startTime, setStartTime] = useState("7:00 PM");
  const [blocks, setBlocks] = useState<TimelineBlock[]>(plannedDateDraft.timeline);

  const computed = useMemo(() => recompute(blocks, startTime), [blocks, startTime]);
  const totalMin = blocks.reduce((s, b) => s + b.durationMin, 0);

  const move = (i: number, dir: -1 | 1) => {
    const next = [...blocks];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    setBlocks(next);
  };
  const remove = (i: number) => setBlocks(b => b.filter((_, k) => k !== i));
  const setDuration = (i: number, d: number) =>
    setBlocks(b => b.map((x, k) => (k === i ? { ...x, durationMin: Math.max(5, d) } : x)));
  const addBlock = (activityId: ActivityId) =>
    setBlocks(b => [...b, { id: newId(), activityId, startTime: "", durationMin: 15 }]);

  return (
    <div>
      <PageHeader eyebrow="A New Chapter" title="Plan a Date" subtitle="Build the evening, activity by activity." />

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Header card */}
          <VintageCard className="p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_auto]">
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">title</p>
                <input
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="mt-1 w-full border-b border-border bg-transparent font-display text-2xl text-primary focus:border-accent focus:outline-none"
                />
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">day</p>
                <p className="mt-1 font-display text-2xl text-primary">Apr {day}</p>
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">starts</p>
                <input
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="mt-1 w-28 border-b border-border bg-transparent font-display text-2xl text-primary focus:border-accent focus:outline-none"
                />
              </div>
            </div>

            <div className="mt-5 grid grid-cols-7 gap-2">
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

            <p className="mt-6 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">the mood</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {themes.map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className={`rounded-full px-5 py-2 font-cinzel text-xs uppercase tracking-widest transition ${theme === t.id ? "bg-[var(--gradient-gold)] text-ink shadow-[var(--shadow-gold)]" : "border border-border text-foreground hover:border-accent"}`}>
                  {t.name}
                </button>
              ))}
            </div>
          </VintageCard>

          {/* Timeline builder */}
          <VintageCard className="p-6">
            <div className="flex items-baseline justify-between">
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">activity timeline</p>
                <h3 className="mt-1 font-display text-2xl text-primary">The Evening, In Order</h3>
              </div>
              <p className="font-hand text-lg text-muted-foreground">
                {blocks.length} activities · {Math.floor(totalMin / 60)}h {totalMin % 60}m
              </p>
            </div>

            <ol className="mt-5 space-y-3">
              <AnimatePresence initial={false}>
                {computed.map((b, i) => {
                  const meta = dateRoomActivities.find(a => a.id === b.activityId)!;
                  return (
                    <motion.li
                      key={b.id}
                      layout
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                    >
                      <GripVertical className="h-4 w-4 text-muted-foreground" />
                      <div className="w-20 text-center">
                        <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">start</p>
                        <p className="font-display text-base text-primary">{b.startTime}</p>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-display text-lg text-primary">
                          <span className="mr-2">{meta.icon}</span>{meta.name}
                        </p>
                        <p className="truncate font-hand text-base text-muted-foreground">{b.note ?? meta.tagline}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => setDuration(i, b.durationMin - 5)} className="h-7 w-7 rounded-md border border-border text-primary hover:border-accent">−</button>
                        <span className="w-14 text-center font-cinzel text-xs tracking-widest text-foreground">{b.durationMin} min</span>
                        <button onClick={() => setDuration(i, b.durationMin + 5)} className="h-7 w-7 rounded-md border border-border text-primary hover:border-accent">+</button>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => move(i, -1)} className="h-7 w-7 rounded-md border border-border text-primary hover:border-accent" aria-label="Move up"><ArrowUp className="mx-auto h-3.5 w-3.5" /></button>
                        <button onClick={() => move(i, 1)} className="h-7 w-7 rounded-md border border-border text-primary hover:border-accent" aria-label="Move down"><ArrowDown className="mx-auto h-3.5 w-3.5" /></button>
                        <button onClick={() => remove(i)} className="h-7 w-7 rounded-md border border-border text-rose hover:border-rose" aria-label="Remove"><Trash2 className="mx-auto h-3.5 w-3.5" /></button>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>

            <div className="mt-6 border-t border-dashed border-border pt-5">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">add to the evening</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {dateRoomActivities.map(a => (
                  <button
                    key={a.id}
                    onClick={() => addBlock(a.id)}
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-paper px-3 py-1.5 font-cinzel text-[11px] uppercase tracking-widest text-foreground transition hover:border-accent hover:shadow-[var(--shadow-soft)]"
                  >
                    <Plus className="h-3 w-3" /> <span>{a.icon}</span> {a.name}
                  </button>
                ))}
              </div>
            </div>
          </VintageCard>
        </div>

        {/* Preview */}
        <div className="space-y-5">
          <VintageCard ornament className="relative p-6 paper-texture">
            <div className="absolute right-4 top-4"><WaxSeal label="✉" /></div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">a preview</p>
            <h3 className="mt-2 font-display text-2xl text-primary">{title}</h3>
            <p className="font-hand text-xl text-muted-foreground">Apr {day} · {startTime}</p>

            <ul className="mt-4 space-y-2 border-l-2 border-accent/40 pl-4">
              {computed.map(b => {
                const meta = dateRoomActivities.find(a => a.id === b.activityId)!;
                return (
                  <li key={b.id} className="relative">
                    <span className="absolute -left-[21px] top-1.5 h-2.5 w-2.5 rounded-full bg-accent" />
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{b.startTime}</p>
                    <p className="font-display text-base text-primary">{meta.icon} {meta.name}</p>
                  </li>
                );
              })}
            </ul>
          </VintageCard>

          <Link to="/date-room"><VintageButton variant="primary" className="w-full">Begin this evening</VintageButton></Link>
          <VintageButton variant="ghost" className="w-full">Save as draft</VintageButton>
        </div>
      </div>
    </div>
  );
}
