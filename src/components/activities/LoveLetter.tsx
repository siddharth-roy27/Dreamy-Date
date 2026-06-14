import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Feather, Mail, Stamp, Inbox } from "lucide-react";
import { receivedLetters } from "@/lib/mock";

const PAPERS = [
  { id: "ivory", label: "Ivory", bg: "bg-[#f7efe2]" },
  { id: "rose",  label: "Rose",  bg: "bg-[#f6e2e2]" },
  { id: "linen", label: "Linen", bg: "bg-[#efe7d4]" },
];
const SEALS = ["♡", "✦", "✿", "✶", "♛"];

export function LoveLetter() {
  const [mode, setMode] = useState<"write" | "inbox">("write");
  const [paper, setPaper] = useState(PAPERS[0]);
  const [seal, setSeal] = useState(SEALS[0]);
  const [body, setBody] = useState("");
  const [sealed, setSealed] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
      className="paper-texture diary-card ornament-border relative h-full overflow-hidden p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · X</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Love Letters</h3>
        </div>
        <div className="flex gap-1 rounded-full border border-border bg-paper p-1">
          {[{ id: "write", label: "Compose", Icon: Feather }, { id: "inbox", label: "Inbox", Icon: Inbox }].map((t) => (
            <button key={t.id} onClick={() => setMode(t.id as any)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-cinzel text-[10px] uppercase tracking-widest transition ${
                mode === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"
              }`}>
              <t.Icon className="h-3 w-3" /> {t.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === "write" ? (
          <motion.div key="w" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 grid gap-5 lg:grid-cols-[1fr_220px]">
            <div className={`relative rounded-md border border-border p-6 shadow-[var(--shadow-soft)] ${paper.bg}`}>
              <AnimatePresence>
                {sealed && (
                  <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }}
                    className="pointer-events-none absolute right-6 top-6 grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-burgundy)] font-display text-3xl text-cream shadow-[var(--shadow-gold)]">
                    {seal}
                  </motion.div>
                )}
              </AnimatePresence>
              <p className="font-hand text-2xl text-primary">My dearest James,</p>
              <textarea
                value={body} onChange={(e) => setBody(e.target.value)}
                rows={8} disabled={sealed}
                placeholder="write the thing you cannot say out loud…"
                className="mt-3 w-full resize-none rounded-md border-0 bg-transparent p-0 font-hand text-xl text-foreground placeholder:text-muted-foreground/60 focus:outline-none disabled:opacity-70"
              />
              <p className="mt-2 text-right font-script text-3xl text-primary">— always, Emma</p>
            </div>

            <div className="space-y-5">
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Paper</p>
                <div className="mt-2 flex gap-2">
                  {PAPERS.map((p) => (
                    <button key={p.id} onClick={() => setPaper(p)}
                      className={`h-10 w-10 rounded-md border-2 transition ${p.bg} ${paper.id === p.id ? "border-accent shadow-[var(--shadow-gold)]" : "border-border"}`} />
                  ))}
                </div>
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Wax Seal</p>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {SEALS.map((s) => (
                    <button key={s} onClick={() => setSeal(s)}
                      className={`grid h-10 w-10 place-items-center rounded-full border-2 font-display text-xl text-primary transition ${seal === s ? "border-accent bg-rose/20" : "border-border bg-paper"}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setSealed((v) => !v)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gradient-burgundy)] px-4 py-3 font-cinzel text-[11px] uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] transition hover:shadow-[var(--shadow-gold)]"
              >
                <Stamp className="h-3.5 w-3.5" /> {sealed ? "Break Seal" : "Seal & Send"}
              </button>
              {sealed && <p className="text-center font-hand text-lg text-accent">delivered to James's inbox</p>}
            </div>
          </motion.div>
        ) : (
          <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-6 grid gap-4 sm:grid-cols-2">
            {receivedLetters.map((l, i) => (
              <motion.article key={l.id} initial={{ rotate: i % 2 ? -1 : 1, y: 8, opacity: 0 }}
                animate={{ rotate: i % 2 ? -1 : 1, y: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                className="relative rounded-md border border-border bg-[#f7efe2] p-5 shadow-[var(--shadow-soft)]">
                <div className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-burgundy)] font-display text-lg text-cream">
                  {l.seal}
                </div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{l.date}</p>
                <p className="mt-1 font-display text-xl text-primary">From {l.from}</p>
                <p className="mt-3 line-clamp-4 font-hand text-lg leading-snug text-foreground">{l.body}</p>
                <div className="mt-4 flex items-center gap-2 font-cinzel text-[10px] uppercase tracking-widest text-accent">
                  <Mail className="h-3 w-3" /> open letter
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
