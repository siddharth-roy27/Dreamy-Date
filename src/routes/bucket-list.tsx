import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Plus, Check, Trash2, Heart, MapPin, Sparkles } from "lucide-react";
import { PageHeader, VintageCard, VintageButton } from "@/components/vintage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { me } from "@/lib/mock";

export const Route = createFileRoute("/bucket-list")({
  head: () => ({
    meta: [
      { title: "Bucket List — DreamyDate" },
      { name: "description", content: "A shared list of dreams you'll cross off together." },
    ],
  }),
  component: BucketListPage,
});

type Wish = {
  id: string;
  text: string;
  category: "Travel" | "Together" | "Someday" | "Tiny";
  addedBy: "you" | "partner";
  done: boolean;
  doneOn?: string;
};

const seed: Wish[] = [
  { id: "w1", text: "Watch the cherry blossoms in Kyoto together",     category: "Travel",   addedBy: "you",     done: true,  doneOn: "Apr 04, 2024" },
  { id: "w2", text: "Read the same book in the same week",             category: "Together", addedBy: "partner", done: true,  doneOn: "Feb 19, 2025" },
  { id: "w3", text: "Cook every Studio Ghibli recipe in one month",    category: "Together", addedBy: "you",     done: false },
  { id: "w4", text: "Dance under the northern lights in Tromsø",       category: "Travel",   addedBy: "partner", done: false },
  { id: "w5", text: "Adopt a small disgraceful dog",                   category: "Someday",  addedBy: "you",     done: false },
  { id: "w6", text: "Write a hundred letters before we meet again",    category: "Tiny",     addedBy: "partner", done: false },
  { id: "w7", text: "Get matching freckles from one shared summer",    category: "Someday",  addedBy: "you",     done: false },
];

const CATEGORIES: Wish["category"][] = ["Travel", "Together", "Someday", "Tiny"];

function BucketListPage() {
  const [list, setList] = useLocalStorage<Wish[]>("dd:bucket-list", seed);
  const [text, setText] = useState("");
  const [cat, setCat] = useState<Wish["category"]>("Together");
  const [filter, setFilter] = useState<"all" | Wish["category"]>("all");

  const filtered = useMemo(
    () => (filter === "all" ? list : list.filter((w) => w.category === filter)),
    [list, filter]
  );
  const doneCount = list.filter((w) => w.done).length;

  function add() {
    const t = text.trim();
    if (!t) return;
    setList((p) => [
      { id: `w-${Date.now()}`, text: t, category: cat, addedBy: "you", done: false },
      ...p,
    ]);
    setText("");
  }

  function toggle(id: string) {
    setList((p) =>
      p.map((w) =>
        w.id === id
          ? { ...w, done: !w.done, doneOn: !w.done ? new Date().toLocaleDateString("en", { month: "short", day: "2-digit", year: "numeric" }) : undefined }
          : w
      )
    );
  }

  function remove(id: string) {
    setList((p) => p.filter((w) => w.id !== id));
  }

  return (
    <div>
      <PageHeader
        eyebrow="A Shared List of Dreams"
        title="Bucket List"
        subtitle="Every line a promise you'll cross off, hand in hand."
      />

      {/* progress */}
      <VintageCard ornament className="mb-8 flex flex-wrap items-center gap-6 p-6">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {me.name} & {me.partner}
          </p>
          <p className="font-display text-2xl text-primary">
            {doneCount} of {list.length} dreams kept
          </p>
          <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
            <motion.div
              className="h-full bg-[var(--gradient-burgundy)]"
              initial={{ width: 0 }}
              animate={{ width: `${list.length ? (doneCount / list.length) * 100 : 0}%` }}
              transition={{ duration: 0.6 }}
            />
          </div>
        </div>
      </VintageCard>

      {/* add new */}
      <VintageCard className="mb-6 p-5">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && add()}
            placeholder="A dream worth crossing an ocean for…"
            className="flex-1 rounded-md border-b-2 border-border bg-transparent px-3 py-2 font-body text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
          />
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as Wish["category"])}
            className="rounded-md border border-border bg-card px-3 py-2 font-cinzel text-[11px] uppercase tracking-[0.25em] text-foreground"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <VintageButton onClick={add} variant="primary">
            <Plus className="h-4 w-4" /> Add
          </VintageButton>
        </div>
      </VintageCard>

      {/* filters */}
      <div className="mb-4 flex flex-wrap gap-2">
        {(["all", ...CATEGORIES] as const).map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`rounded-full border px-4 py-1.5 font-cinzel text-[10px] uppercase tracking-[0.25em] transition ${
                active
                  ? "border-accent bg-[var(--gradient-gold)] text-ink"
                  : "border-border bg-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* list */}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {filtered.map((w) => (
            <motion.div
              key={w.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              <VintageCard className={`flex items-center gap-4 p-4 ${w.done ? "opacity-70" : ""}`}>
                <button
                  onClick={() => toggle(w.id)}
                  aria-label={w.done ? "Mark as not done" : "Mark as done"}
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition ${
                    w.done
                      ? "border-accent bg-[var(--gradient-gold)] text-ink"
                      : "border-border bg-card text-muted-foreground hover:border-accent"
                  }`}
                >
                  {w.done ? <Check className="h-4 w-4" /> : <Heart className="h-4 w-4" />}
                </button>
                <div className="min-w-0 flex-1">
                  <p className={`font-body text-lg text-foreground ${w.done ? "line-through" : ""}`}>{w.text}</p>
                  <p className="mt-0.5 flex flex-wrap items-center gap-3 font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {w.category}</span>
                    <span>added by {w.addedBy}</span>
                    {w.done && w.doneOn && <span className="text-accent">kept · {w.doneOn}</span>}
                  </p>
                </div>
                <button
                  onClick={() => remove(w.id)}
                  aria-label="Remove"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition hover:bg-secondary hover:text-rose"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </VintageCard>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <VintageCard className="p-10 text-center">
            <p className="font-hand text-2xl text-primary">The page is blank.</p>
            <p className="font-body italic text-muted-foreground">Write your first dream above.</p>
          </VintageCard>
        )}
      </div>
    </div>
  );
}
