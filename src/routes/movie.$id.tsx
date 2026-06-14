import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Play, Pause, Share2, Download, Heart, ChevronLeft } from "lucide-react";
import { PageHeader, VintageCard, VintageButton, WaxSeal, FloatingParticles } from "@/components/vintage";
import { archiveItems, recentMemories, me } from "@/lib/mock";

export const Route = createFileRoute("/movie/$id")({
  head: () => ({ meta: [{ title: "AI Date Movie — DreamyDate" }] }),
  component: MoviePage,
});

const quotes = [
  "We watched it fall together, six thousand miles apart.",
  "Same cup. Different time zone.",
  "He stepped on my foot. Twice. I forgave him.",
  "The kitchen needed your humming.",
];

function MoviePage() {
  const { id } = Route.useParams();
  const archive = archiveItems.find((a) => a.id === id);
  const fallback = recentMemories[0];
  const title = archive?.title ?? fallback.title;
  const date = archive?.date ?? fallback.date;

  // Photo montage source: cycle through memory images
  const frames = recentMemories.map((m) => m.img);
  const [playing, setPlaying] = useState(true);
  const [frame, setFrame] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = 42; // seconds

  useEffect(() => {
    if (!playing) return;
    const t = setInterval(() => {
      setProgress((p) => {
        const next = p + 1;
        if (next >= total) {
          setPlaying(false);
          return total;
        }
        return next;
      });
      setFrame((f) => (f + 1) % frames.length);
    }, 1400);
    return () => clearInterval(t);
  }, [playing, frames.length]);

  const mm = String(Math.floor(progress / 60)).padStart(2, "0");
  const ss = String(progress % 60).padStart(2, "0");

  return (
    <div className="relative">
      <FloatingParticles />
      <Link to="/memories" className="mb-6 inline-flex items-center gap-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">
        <ChevronLeft className="h-4 w-4" /> back to archive
      </Link>

      <PageHeader eyebrow="An AI Date Movie" title={title} subtitle={`A reel polished from your evening · ${date}`} />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Reel */}
        <div className="lg:col-span-2">
          <VintageCard ornament className="relative overflow-hidden p-3 sm:p-4">
            <div className="relative aspect-video w-full overflow-hidden rounded-md bg-ink">
              {/* Title card */}
              {progress < 3 ? (
                <motion.div
                  key="title"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 grid place-items-center bg-[var(--gradient-burgundy)] text-center text-primary-foreground"
                >
                  <div>
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.4em] opacity-80">A DreamyDate Reel</p>
                    <h2 className="mt-3 font-display text-3xl sm:text-5xl">{title}</h2>
                    <p className="mt-2 font-hand text-2xl opacity-90">for {me.name} & {me.partner}</p>
                  </div>
                </motion.div>
              ) : (
                <>
                  <motion.img
                    key={frame}
                    src={frames[frame]}
                    alt="memory frame"
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2 }}
                    className="h-full w-full object-cover sepia-[20%]"
                  />
                  <motion.div
                    key={`q-${frame}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute inset-x-6 bottom-6 text-cream"
                  >
                    <p className="font-hand text-2xl sm:text-3xl drop-shadow-lg">
                      "{quotes[frame % quotes.length]}"
                    </p>
                  </motion.div>
                </>
              )}

              {/* film grain */}
              <div className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
                style={{ background: "radial-gradient(circle at 30% 20%, transparent, rgba(0,0,0,0.5))" }} />
            </div>

            {/* Controls */}
            <div className="mt-4 flex items-center gap-3 px-2">
              <button
                onClick={() => { if (progress >= total) setProgress(0); setPlaying((p) => !p); }}
                className="grid h-11 w-11 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-soft)]"
              >
                {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
              </button>
              <div className="flex-1">
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full bg-[var(--gradient-gold)]"
                    style={{ width: `${(progress / total) * 100}%` }}
                  />
                </div>
              </div>
              <span className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                {mm}:{ss} / 00:42
              </span>
            </div>
          </VintageCard>

          <div className="mt-4 flex flex-wrap gap-3">
            <VintageButton variant="primary"><Share2 className="h-4 w-4" /> Share with James</VintageButton>
            <VintageButton variant="gold"><Download className="h-4 w-4" /> Save Reel</VintageButton>
            <VintageButton variant="ghost"><Heart className="h-4 w-4" /> Add to Archive</VintageButton>
          </div>
        </div>

        {/* Memory card */}
        <VintageCard ornament className="relative p-6">
          <div className="absolute right-5 top-5"><WaxSeal label="🎬" color="gold" /></div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">Memory Card</p>
          <h3 className="mt-2 font-display text-2xl text-primary">{title}</h3>
          <p className="mt-1 font-body italic text-muted-foreground">{date}</p>

          <div className="my-5 h-px bg-gradient-to-r from-accent/60 to-transparent" />

          <dl className="space-y-3 font-body text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Length</dt><dd className="text-foreground">0:42</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Frames</dt><dd className="text-foreground">{frames.length} stills</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Score</dt><dd className="text-foreground">Piano · Édith Piaf</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Filter</dt><dd className="text-foreground">Sepia + Grain</dd></div>
          </dl>

          <div className="mt-6 rounded-lg border border-border/60 bg-secondary/40 p-4">
            <p className="font-hand text-lg text-primary">"{quotes[0]}"</p>
            <p className="mt-2 font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">— closing line</p>
          </div>
        </VintageCard>
      </div>
    </div>
  );
}
