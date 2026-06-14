import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Sparkles, Trash2, Send } from "lucide-react";
import { currentUser, partner } from "@/lib/mock";

type Flower = { id: string; emoji: string; name: string; meaning: string };
const FLOWERS: Flower[] = [
  { id: "rose-red",    emoji: "🌹", name: "Red Rose",    meaning: "I love you" },
  { id: "tulip",       emoji: "🌷", name: "Tulip",       meaning: "perfect love" },
  { id: "cherry",      emoji: "🌸", name: "Cherry Blossom", meaning: "fleeting beauty" },
  { id: "iris",        emoji: "🪻", name: "Iris",        meaning: "good news" },
  { id: "daisy",       emoji: "🌼", name: "Daisy",       meaning: "loyal love" },
  { id: "sunflower",   emoji: "🌻", name: "Sunflower",   meaning: "adoration" },
  { id: "hibiscus",    emoji: "🌺", name: "Hibiscus",    meaning: "delicate beauty" },
  { id: "lotus",       emoji: "🪷", name: "Lotus",       meaning: "purity" },
];

const WRAPS = [
  { id: "kraft",  name: "Kraft Paper", color: "bg-[#c9a87a]" },
  { id: "linen",  name: "Linen",       color: "bg-[#e8d9c0]" },
  { id: "velvet", name: "Velvet",      color: "bg-[var(--gradient-burgundy)]" },
  { id: "lace",   name: "Lace",        color: "bg-cream" },
];

const RIBBONS = ["burgundy", "gold", "sage", "rose"] as const;

type Placed = { uid: string; flower: Flower; x: number; y: number; rot: number; scale: number };

export function BouquetStudio() {
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [wrap, setWrap] = useState(WRAPS[0]);
  const [ribbon, setRibbon] = useState<typeof RIBBONS[number]>("gold");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  function addFlower(f: Flower) {
    setPlaced(p => [
      ...p,
      {
        uid: crypto.randomUUID(),
        flower: f,
        x: 30 + Math.random() * 40,
        y: 15 + Math.random() * 40,
        rot: -20 + Math.random() * 40,
        scale: 0.9 + Math.random() * 0.5,
      },
    ]);
  }
  function clearAll() { setPlaced([]); setSent(false); }
  function send() { if (placed.length) setSent(true); }

  const meanings = useMemo(() => {
    const seen = new Set<string>();
    return placed.map(p => p.flower).filter(f => !seen.has(f.id) && seen.add(f.id));
  }, [placed]);

  const ribbonColor = {
    burgundy: "bg-[var(--gradient-burgundy)]",
    gold: "bg-[var(--gradient-gold)]",
    sage: "bg-sage",
    rose: "bg-rose",
  }[ribbon];

  return (
    <div className="paper-texture diary-card ornament-border h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · I</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Bouquet Studio</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">arrange a posy for {partner.name}</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.2fr_1fr]">
        {/* Flower palette */}
        <div className="rounded-lg bg-secondary/40 p-4">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">flowers</p>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {FLOWERS.map(f => (
              <button
                key={f.id}
                onClick={() => addFlower(f)}
                title={`${f.name} — ${f.meaning}`}
                className="aspect-square rounded-md border border-border bg-paper text-2xl transition hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-gold)]"
              >
                {f.emoji}
              </button>
            ))}
          </div>
          <p className="mt-3 font-hand text-base text-muted-foreground">tap to add — they'll fall into the bouquet.</p>
        </div>

        {/* Vase / bouquet stage */}
        <div className="relative">
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border border-border bg-gradient-to-b from-paper to-secondary/60">
            {/* Wrap cone */}
            <div
              className={`absolute bottom-0 left-1/2 h-[45%] w-[80%] -translate-x-1/2 ${wrap.color}`}
              style={{ clipPath: "polygon(15% 100%, 85% 100%, 100% 0, 0 0)" }}
            />
            {/* Ribbon */}
            <div className={`absolute bottom-[42%] left-1/2 h-3 w-[55%] -translate-x-1/2 rounded-sm ${ribbonColor} shadow-[var(--shadow-soft)]`} />
            <div className={`absolute bottom-[40%] left-1/2 h-6 w-2 -translate-x-1/2 ${ribbonColor}`} />

            {/* Flowers */}
            <AnimatePresence>
              {placed.map(p => (
                <motion.span
                  key={p.uid}
                  initial={{ y: -200, opacity: 0, rotate: 0 }}
                  animate={{ y: 0, opacity: 1, rotate: p.rot }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ type: "spring", stiffness: 90, damping: 14 }}
                  className="absolute select-none"
                  style={{
                    left: `${p.x}%`,
                    top: `${p.y}%`,
                    fontSize: `${48 * p.scale}px`,
                    filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))",
                  }}
                >
                  {p.flower.emoji}
                </motion.span>
              ))}
            </AnimatePresence>

            {placed.length === 0 && (
              <div className="absolute inset-0 grid place-items-center text-center">
                <div>
                  <Sparkles className="mx-auto h-6 w-6 text-accent" />
                  <p className="mt-2 font-hand text-xl text-muted-foreground">your bouquet begins empty</p>
                </div>
              </div>
            )}

            <AnimatePresence>
              {sent && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="absolute inset-0 grid place-items-center bg-ink/70 text-center"
                >
                  <div>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
                      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
                        <Send className="h-7 w-7" />
                      </div>
                    </motion.div>
                    <p className="mt-3 font-script text-3xl text-cream">delivered to {partner.name}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-3 flex items-center justify-between">
            <button onClick={clearAll} className="inline-flex items-center gap-1 font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent">
              <Trash2 className="h-3 w-3" /> clear
            </button>
            <p className="font-hand text-lg text-primary">{placed.length} stems</p>
          </div>
        </div>

        {/* Wrap, ribbon, card */}
        <div className="space-y-4">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">wrap</p>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {WRAPS.map(w => (
                <button
                  key={w.id}
                  onClick={() => setWrap(w)}
                  className={`flex items-center gap-2 rounded-md border bg-paper p-2 text-left transition ${wrap.id === w.id ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/60"}`}
                >
                  <span className={`h-6 w-6 rounded-sm ${w.color}`} />
                  <span className="font-hand text-base text-primary">{w.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">ribbon</p>
            <div className="mt-2 flex gap-2">
              {RIBBONS.map(r => {
                const c = { burgundy: "bg-[var(--gradient-burgundy)]", gold: "bg-[var(--gradient-gold)]", sage: "bg-sage", rose: "bg-rose" }[r];
                return (
                  <button
                    key={r}
                    onClick={() => setRibbon(r)}
                    className={`h-8 w-8 rounded-full ${c} ring-offset-2 ring-offset-paper transition ${ribbon === r ? "ring-2 ring-accent" : ""}`}
                    title={r}
                  />
                );
              })}
            </div>
          </div>

          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">a small note</p>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              rows={3}
              placeholder={`To ${partner.name}, with love…`}
              className="mt-2 w-full resize-none rounded-md border border-border bg-paper p-3 font-hand text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
            />
            <p className="mt-1 text-right font-hand text-base text-muted-foreground">— {currentUser.name}</p>
          </div>

          {meanings.length > 0 && (
            <div className="rounded-md border border-dashed border-accent/40 bg-secondary/30 p-3">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">flower language</p>
              <ul className="mt-1 space-y-0.5">
                {meanings.map(m => (
                  <li key={m.id} className="font-hand text-base text-primary">
                    {m.emoji} {m.name} — <span className="italic text-muted-foreground">{m.meaning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <button
            onClick={send}
            disabled={!placed.length}
            className="w-full rounded-md bg-[var(--gradient-burgundy)] px-4 py-3 font-cinzel text-xs uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-gold)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Wrap &amp; send to {partner.name}
          </button>
        </div>
      </div>
    </div>
  );
}
