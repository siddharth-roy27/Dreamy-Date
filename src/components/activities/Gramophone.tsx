import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Pause, SkipForward, SkipBack, Heart, Disc3 } from "lucide-react";
import { playlist, partner } from "@/lib/mock";

function parseDuration(s: string) {
  const [m, sec] = s.split(":").map(Number);
  return m * 60 + sec;
}
function formatDuration(sec: number) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function Gramophone() {
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [loved, setLoved] = useState<Record<string, boolean>>({ "1": true });

  const track = playlist[idx];
  const total = parseDuration(track.duration);

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setElapsed(e => {
        if (e + 1 >= total) {
          setIdx(i => (i + 1) % playlist.length);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [playing, total]);

  useEffect(() => { setElapsed(0); }, [idx]);

  const progress = (elapsed / total) * 100;

  return (
    <div className="paper-texture diary-card ornament-border h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · III</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Gramophone</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">a record only you two hear</p>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr]">
        {/* Vinyl */}
        <div className="flex flex-col items-center">
          <div className="relative">
            {/* Brass arm */}
            <motion.div
              animate={{ rotate: playing ? 18 : 0 }}
              transition={{ duration: 0.6 }}
              style={{ transformOrigin: "90% 10%" }}
              className="absolute -right-6 -top-2 z-20 h-2 w-32 rounded-full bg-[var(--gradient-gold)] shadow-[var(--shadow-soft)]"
            >
              <div className="absolute -left-2 bottom-0 h-4 w-4 rounded-full bg-[var(--gradient-gold)]" />
            </motion.div>

            <motion.div
              animate={{ rotate: playing ? 360 : 0 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="relative grid h-64 w-64 place-items-center rounded-full bg-ink shadow-[var(--shadow-diary)]"
              style={{
                backgroundImage:
                  "repeating-radial-gradient(circle, #1a1410 0 2px, #0e0a08 2px 4px)",
              }}
            >
              <div className="grid h-24 w-24 place-items-center rounded-full bg-[var(--gradient-burgundy)] shadow-inner">
                <div className="text-center">
                  <p className="font-script text-lg text-cream leading-none">{track.title.split(" ")[0]}</p>
                  <p className="mt-1 font-cinzel text-[8px] uppercase tracking-widest text-cream/70">side A</p>
                </div>
              </div>
              <div className="absolute h-3 w-3 rounded-full bg-cream/40" />
            </motion.div>
          </div>

          <div className="mt-6 flex items-center gap-5">
            <button onClick={() => setIdx(i => (i - 1 + playlist.length) % playlist.length)} className="text-muted-foreground hover:text-primary">
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={() => setPlaying(p => !p)}
              className="grid h-14 w-14 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-gold)]"
            >
              {playing ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 translate-x-0.5" />}
            </button>
            <button onClick={() => setIdx(i => (i + 1) % playlist.length)} className="text-muted-foreground hover:text-primary">
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          <p className="mt-4 font-hand text-base text-muted-foreground">listening with {partner.name}</p>
        </div>

        {/* Track + queue */}
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={track.id}
              initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg bg-secondary/40 p-4"
            >
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">now spinning</p>
              <h4 className="mt-1 font-display text-2xl text-primary">{track.title}</h4>
              <p className="font-hand text-lg text-muted-foreground">{track.artist}</p>
              <div className="mt-4">
                <div className="h-1 overflow-hidden rounded-full bg-paper">
                  <motion.div
                    initial={false}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: "linear", duration: 0.5 }}
                    className="h-full bg-[var(--gradient-burgundy)]"
                  />
                </div>
                <div className="mt-1 flex justify-between font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">
                  <span>{formatDuration(elapsed)}</span>
                  <span>{track.duration}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">our record collection</p>
            <ul className="mt-2 divide-y divide-border rounded-md border border-border bg-paper">
              {playlist.map((t, i) => {
                const active = i === idx;
                return (
                  <li key={t.id}>
                    <button
                      onClick={() => { setIdx(i); setPlaying(true); }}
                      className={`flex w-full items-center gap-3 px-3 py-2.5 text-left transition ${active ? "bg-secondary/50" : "hover:bg-secondary/30"}`}
                    >
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary/50 text-muted-foreground">
                        {active && playing ? <Disc3 className="h-4 w-4 animate-spin text-accent" /> : <span className="font-cinzel text-[10px]">{i + 1}</span>}
                      </span>
                      <span className="flex-1">
                        <span className={`block font-display text-base ${active ? "text-primary" : "text-foreground"}`}>{t.title}</span>
                        <span className="block font-hand text-sm text-muted-foreground">{t.artist}</span>
                      </span>
                      <span
                        role="button"
                        onClick={(e) => { e.stopPropagation(); setLoved(l => ({ ...l, [t.id]: !l[t.id] })); }}
                        className="cursor-pointer"
                      >
                        <Heart className={`h-4 w-4 transition ${loved[t.id] ? "fill-rose text-rose" : "text-muted-foreground"}`} />
                      </span>
                      <span className="font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">{t.duration}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
