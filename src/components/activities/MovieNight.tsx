import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Pause, Film, Popcorn, MessageCircle, Heart } from "lucide-react";
import { currentUser, partner } from "@/lib/mock";

const LIBRARY = [
  { id: "amelie",      title: "Amélie",                year: 2001, runtime: 122, mood: "Whimsical", poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80" },
  { id: "notebook",    title: "The Notebook",          year: 2004, runtime: 123, mood: "Tearjerker", poster: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&q=80" },
  { id: "before",      title: "Before Sunrise",        year: 1995, runtime: 101, mood: "Romantic",   poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&q=80" },
  { id: "casa",        title: "Casablanca",            year: 1942, runtime: 102, mood: "Classic",    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&q=80" },
  { id: "lalaland",    title: "La La Land",            year: 2016, runtime: 128, mood: "Musical",    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&q=80" },
  { id: "ghibli",      title: "Whisper of the Heart",  year: 1995, runtime: 111, mood: "Gentle",     poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&q=80" },
];

const REACTIONS = ["❤️","😂","😭","🍿","✨"];

type Reaction = { id: string; emoji: string; from: string; x: number };
type Chat = { id: string; from: string; text: string };

export function MovieNight() {
  const [selected, setSelected] = useState(LIBRARY[0]);
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [chat, setChat] = useState<Chat[]>([
    { id: "c1", from: partner.name, text: "popcorn ready ✨" },
    { id: "c2", from: currentUser.name, text: "lights are dim. press play." },
  ]);
  const [draft, setDraft] = useState("");

  const total = selected.runtime * 60;
  useEffect(() => { setElapsed(0); setPlaying(false); }, [selected.id]);
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => setElapsed(e => Math.min(e + 30, total)), 1000);
    return () => clearInterval(t);
  }, [playing, total]);

  // Auto chatter from partner
  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      const lines = ["this scene 🥺", "I love this part", "are you crying?", "wait wait wait"];
      setChat(c => [...c.slice(-6), { id: crypto.randomUUID(), from: partner.name, text: lines[Math.floor(Math.random() * lines.length)] }]);
    }, 9000);
    return () => clearInterval(t);
  }, [playing]);

  function fly(emoji: string) {
    const id = crypto.randomUUID();
    setReactions(r => [...r, { id, emoji, from: currentUser.name, x: 20 + Math.random() * 60 }]);
    setTimeout(() => setReactions(r => r.filter(x => x.id !== id)), 2500);
  }
  function send() {
    if (!draft.trim()) return;
    setChat(c => [...c, { id: crypto.randomUUID(), from: currentUser.name, text: draft.trim() }]);
    setDraft("");
  }

  const progress = (elapsed / total) * 100;
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div className="paper-texture diary-card ornament-border h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · V</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Movie Night</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">curtain up, share a screen</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.5fr_1fr]">
        {/* Theater */}
        <div>
          <div className="relative aspect-video overflow-hidden rounded-lg border-4 border-ink bg-ink shadow-[var(--shadow-diary)]">
            {/* Curtains */}
            <motion.div
              animate={{ x: playing ? "-100%" : "0%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-y-0 left-0 z-20 w-1/2"
              style={{ background: "var(--gradient-burgundy)", boxShadow: "inset -10px 0 30px rgba(0,0,0,0.5)" }}
            />
            <motion.div
              animate={{ x: playing ? "100%" : "0%" }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-y-0 right-0 z-20 w-1/2"
              style={{ background: "var(--gradient-burgundy)", boxShadow: "inset 10px 0 30px rgba(0,0,0,0.5)" }}
            />

            <img src={selected.poster} alt={selected.title} className="absolute inset-0 h-full w-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />

            {!playing && (
              <div className="absolute inset-0 z-30 grid place-items-center">
                <div className="text-center">
                  <p className="font-script text-5xl text-gold">{selected.title}</p>
                  <p className="mt-1 font-cinzel text-[10px] uppercase tracking-[0.4em] text-cream/80">{selected.year} · {selected.mood}</p>
                </div>
              </div>
            )}

            {/* Floating reactions */}
            <AnimatePresence>
              {reactions.map(r => (
                <motion.span
                  key={r.id}
                  initial={{ y: 0, opacity: 0, scale: 0.5 }}
                  animate={{ y: -180, opacity: 1, scale: 1.2 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.5, ease: "easeOut" }}
                  className="absolute bottom-6 z-30 text-3xl"
                  style={{ left: `${r.x}%` }}
                >
                  {r.emoji}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>

          {/* Transport */}
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => setPlaying(p => !p)}
              className="grid h-11 w-11 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)]"
            >
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 translate-x-0.5" />}
            </button>
            <div className="flex-1">
              <div className="h-1 overflow-hidden rounded-full bg-secondary">
                <div className="h-full bg-[var(--gradient-burgundy)] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-1 flex justify-between font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">
                <span>{fmt(elapsed)}</span>
                <span>{selected.runtime}:00</span>
              </div>
            </div>
            <div className="hidden items-center gap-1 text-muted-foreground sm:flex">
              <Popcorn className="h-4 w-4" />
              <span className="font-cinzel text-[10px] uppercase tracking-widest">synced</span>
            </div>
          </div>

          {/* Reactions */}
          <div className="mt-3 flex gap-2">
            {REACTIONS.map(e => (
              <button
                key={e}
                onClick={() => fly(e)}
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-paper text-xl transition hover:-translate-y-0.5 hover:border-accent"
              >{e}</button>
            ))}
          </div>
        </div>

        {/* Library + chat */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">tonight's library</p>
            <div className="mt-2 grid max-h-48 grid-cols-3 gap-2 overflow-y-auto pr-1">
              {LIBRARY.map(m => (
                <button
                  key={m.id}
                  onClick={() => setSelected(m)}
                  className={`overflow-hidden rounded-md border transition ${selected.id === m.id ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/60"}`}
                >
                  <div className="relative aspect-[2/3]">
                    <img src={m.poster} alt={m.title} className="h-full w-full object-cover" />
                  </div>
                  <p className="truncate px-1.5 py-1 text-left font-hand text-sm text-primary">{m.title}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col rounded-md border border-border bg-paper">
            <div className="flex items-center gap-2 border-b border-border px-3 py-2">
              <MessageCircle className="h-4 w-4 text-accent" />
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">whisper</p>
            </div>
            <div className="flex-1 space-y-1.5 overflow-y-auto px-3 py-2">
              {chat.map(c => (
                <div key={c.id} className={c.from === currentUser.name ? "text-right" : ""}>
                  <span className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">{c.from}</span>
                  <p className="font-hand text-base text-primary">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 border-t border-border p-2">
              <input
                value={draft}
                onChange={e => setDraft(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send()}
                placeholder="say something soft…"
                className="flex-1 rounded-md border border-border bg-transparent px-2 py-1.5 font-hand text-base focus:border-accent focus:outline-none"
              />
              <button onClick={send} className="rounded-md bg-[var(--gradient-burgundy)] px-3 font-cinzel text-[10px] uppercase tracking-widest text-primary-foreground">
                <Heart className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieNight;
export { Film as _f };
