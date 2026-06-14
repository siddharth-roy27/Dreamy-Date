import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Camera, Download, RotateCcw } from "lucide-react";
import { currentUser, partner } from "@/lib/mock";

const FILTERS = [
  { id: "vintage",  name: "Vintage",  className: "sepia-[40%] contrast-[1.1] saturate-[0.9]" },
  { id: "polaroid", name: "Polaroid", className: "brightness-[1.05] saturate-[1.2]" },
  { id: "bw",       name: "B&W",      className: "grayscale contrast-[1.15]" },
  { id: "sepia",    name: "Sepia",    className: "sepia contrast-[1.1]" },
  { id: "soft",     name: "Soft",     className: "brightness-[1.1] contrast-[0.95] saturate-[0.85] blur-[0.3px]" },
];

const PROPS = ["🎩","👒","🕶️","🌹","💋","🎀","🦋","✨"];

// Mock "frames" — pairs of stock portrait imagery to simulate captured snapshots.
const SHOT_POOL = [
  ["https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80", "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"],
  ["https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&q=80", "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80"],
  ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80", "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&q=80"],
];

type Strip = { id: string; filter: typeof FILTERS[number]; prop: string; shots: [string, string][] };

export function PhotoBooth() {
  const [filter, setFilter] = useState(FILTERS[0]);
  const [prop, setProp] = useState<string>("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [shooting, setShooting] = useState(false);
  const [flash, setFlash] = useState(false);
  const [strip, setStrip] = useState<Strip | null>(null);
  const [shotIndex, setShotIndex] = useState(0);
  const [collected, setCollected] = useState<[string, string][]>([]);

  useEffect(() => {
    if (countdown === null) return;
    if (countdown === 0) {
      setFlash(true);
      const nextShot = SHOT_POOL[Math.floor(Math.random() * SHOT_POOL.length)] as [string, string];
      const updated = [...collected, nextShot];
      setCollected(updated);
      setTimeout(() => setFlash(false), 200);

      if (updated.length >= 3) {
        setStrip({
          id: crypto.randomUUID(),
          filter,
          prop,
          shots: updated,
        });
        setCollected([]);
        setShooting(false);
        setCountdown(null);
        setShotIndex(0);
        return;
      }
      setShotIndex(updated.length);
      setTimeout(() => setCountdown(3), 600);
      return;
    }
    const t = setTimeout(() => setCountdown(c => (c ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown, collected, filter, prop]);

  function startShoot() {
    if (shooting) return;
    setStrip(null);
    setCollected([]);
    setShotIndex(0);
    setShooting(true);
    setCountdown(3);
  }
  function reset() {
    setStrip(null);
    setCollected([]);
    setShotIndex(0);
    setShooting(false);
    setCountdown(null);
  }

  return (
    <div className="paper-texture diary-card ornament-border h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · II</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Photo Booth</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">three. two. one. flash.</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        {/* Live stage */}
        <div>
          <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-ink">
            <div className="absolute inset-0 grid grid-cols-2 gap-1 p-1">
              {[currentUser, partner].map((p, i) => (
                <div key={p.id} className={`relative overflow-hidden rounded-md ${filter.className}`}>
                  <img src={p.avatar} alt={p.name} className="h-full w-full object-cover" />
                  {prop && (
                    <span className="absolute left-1/2 top-2 -translate-x-1/2 text-4xl drop-shadow-lg">{prop}</span>
                  )}
                  <span className="absolute bottom-2 left-2 font-cinzel text-[10px] uppercase tracking-widest text-cream/80">
                    {i === 0 ? "you" : p.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Countdown */}
            <AnimatePresence mode="wait">
              {countdown !== null && countdown > 0 && (
                <motion.div
                  key={countdown}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.6, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="font-display text-[160px] leading-none text-cream drop-shadow-2xl">{countdown}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flash */}
            <AnimatePresence>
              {flash && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0 bg-cream"
                />
              )}
            </AnimatePresence>

            {shooting && (
              <div className="absolute right-3 top-3 rounded-full bg-ink/70 px-3 py-1 font-cinzel text-[10px] uppercase tracking-widest text-cream">
                shot {Math.min(shotIndex + 1, 3)} / 3
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={startShoot}
              disabled={shooting}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--gradient-burgundy)] px-5 py-2.5 font-cinzel text-xs uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-gold)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Camera className="h-4 w-4" /> {shooting ? "Capturing…" : strip ? "Take another" : "Start a strip"}
            </button>
            {strip && (
              <button onClick={reset} className="inline-flex items-center gap-1 font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-accent">
                <RotateCcw className="h-3 w-3" /> reset
              </button>
            )}
          </div>
        </div>

        {/* Controls + strip */}
        <div className="space-y-5">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">filter</p>
            <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5 lg:grid-cols-3">
              {FILTERS.map(f => (
                <button
                  key={f.id}
                  onClick={() => setFilter(f)}
                  className={`rounded-md border bg-paper px-2 py-2 font-hand text-base transition ${filter.id === f.id ? "border-accent text-primary shadow-[var(--shadow-gold)]" : "border-border text-muted-foreground hover:border-accent/60"}`}
                >
                  {f.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">props</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                onClick={() => setProp("")}
                className={`rounded-md border px-2 py-1 font-hand text-base ${prop === "" ? "border-accent text-primary" : "border-border text-muted-foreground"}`}
              >none</button>
              {PROPS.map(p => (
                <button
                  key={p}
                  onClick={() => setProp(p)}
                  className={`grid h-9 w-9 place-items-center rounded-md border bg-paper text-xl transition ${prop === p ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/60"}`}
                >{p}</button>
              ))}
            </div>
          </div>

          {/* Strip */}
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">your strip</p>
            <AnimatePresence mode="wait">
              {strip ? (
                <motion.div
                  key={strip.id}
                  initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
                  className="mt-2 mx-auto w-fit rounded-sm bg-cream p-2 shadow-[var(--shadow-diary)]"
                >
                  <div className="space-y-1">
                    {strip.shots.map((pair, i) => (
                      <div key={i} className="grid w-[180px] grid-cols-2 gap-0.5">
                        {pair.map((src, j) => (
                          <div key={j} className={`relative aspect-square overflow-hidden ${strip.filter.className}`}>
                            <img src={src} alt="" className="h-full w-full object-cover" />
                            {strip.prop && (
                              <span className="absolute left-1/2 top-0.5 -translate-x-1/2 text-base">{strip.prop}</span>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                    <p className="pt-1 text-center font-script text-base text-ink">{currentUser.name} &amp; {partner.name}</p>
                  </div>
                </motion.div>
              ) : (
                <div className="mt-2 grid place-items-center rounded-md border border-dashed border-accent/30 bg-secondary/30 px-4 py-6 text-center">
                  <p className="font-hand text-lg text-muted-foreground">three shots make a strip</p>
                </div>
              )}
            </AnimatePresence>
            {strip && (
              <button className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-paper py-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-primary hover:border-accent">
                <Download className="h-3 w-3" /> save to memories
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
