import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward, Heart } from "lucide-react";
import { useState } from "react";
import { PageHeader, VintageCard } from "@/components/vintage";
import { playlist, dances, me } from "@/lib/mock";

export const Route = createFileRoute("/song-room")({
  head: () => ({ meta: [{ title: "Song & Dance Room — DreamyDate" }] }),
  component: SongRoomPage,
});

function SongRoomPage() {
  const [playing, setPlaying] = useState(true);
  const [dance, setDance] = useState("waltz");
  const [track, setTrack] = useState(0);

  return (
    <div className="relative">
      {/* chandelier glow background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[var(--gradient-gold)] opacity-20 blur-3xl" />
      </div>

      <PageHeader eyebrow="The Ballroom" title="Song & Dance Room" subtitle="A 1920s evening, candlelit and slow." />

      <VintageCard ornament className="paper-texture relative overflow-hidden p-8">
        <div className="flex flex-wrap items-center gap-6">
          <motion.div animate={{ rotate: playing ? 360 : 0 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="relative grid h-28 w-28 shrink-0 place-items-center rounded-full bg-ink">
            <div className="absolute inset-3 rounded-full border border-accent/30" />
            <div className="absolute inset-6 rounded-full border border-accent/20" />
            <div className="h-6 w-6 rounded-full bg-[var(--gradient-gold)]" />
          </motion.div>
          <div className="min-w-0 flex-1">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">now playing</p>
            <p className="truncate font-display text-3xl text-primary">{playlist[track].title}</p>
            <p className="font-body italic text-lg text-muted-foreground">{playlist[track].artist}</p>
            <div className="mt-3 h-1 rounded-full bg-secondary">
              <motion.div className="h-1 rounded-full bg-[var(--gradient-gold)]"
                initial={{ width: "0%" }} animate={{ width: "42%" }} transition={{ duration: 2 }} />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setTrack(Math.max(0, track-1))} className="grid h-10 w-10 place-items-center rounded-full border border-border"><SkipBack className="h-4 w-4" /></button>
            <button onClick={() => setPlaying(!playing)} className="grid h-14 w-14 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-gold)]">
              {playing ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={() => setTrack(Math.min(playlist.length-1, track+1))} className="grid h-10 w-10 place-items-center rounded-full border border-border"><SkipForward className="h-4 w-4" /></button>
          </div>
        </div>
      </VintageCard>

      <section className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h3 className="mb-4 font-display text-2xl text-primary">Our Shared Playlist</h3>
          <div className="space-y-3">
            {playlist.map((t, i) => (
              <button key={t.id} onClick={() => setTrack(i)}
                className={`flex w-full items-center gap-4 rounded-lg border p-3 text-left transition ${i === track ? "border-accent bg-secondary shadow-[var(--shadow-soft)]" : "border-border bg-card hover:border-accent/50"}`}>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink">
                  <div className="h-3 w-3 rounded-full bg-accent" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg text-primary">{t.title}</p>
                  <p className="truncate font-body italic text-sm text-muted-foreground">{t.artist}</p>
                </div>
                <span className="font-cinzel text-xs text-muted-foreground">{t.duration}</span>
                <Heart className="h-4 w-4 text-rose" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 font-display text-2xl text-primary">The Dance Floor</h3>
          <div className="mb-4 flex flex-wrap gap-2">
            {dances.map((d) => (
              <button key={d.id} onClick={() => setDance(d.id)}
                className={`rounded-full px-4 py-2 font-cinzel text-[11px] uppercase tracking-widest transition ${dance === d.id ? "bg-[var(--gradient-gold)] text-ink" : "border border-border text-foreground hover:border-accent"}`}>
                {d.name} <span className="ml-1 text-[9px] opacity-70">{d.tempo}</span>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[{ name: me.name, img: me.avatar }, { name: me.partner, img: me.partnerAvatar }].map((p) => (
              <div key={p.name} className="diary-card overflow-hidden p-3">
                <div className="relative ornament-border overflow-hidden rounded-md">
                  <img src={p.img} className="aspect-[3/4] w-full object-cover sepia-[20%]" />
                  <motion.div animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-[var(--gradient-gold)] mix-blend-overlay opacity-30" />
                </div>
                <p className="mt-3 text-center font-display text-lg text-primary">{p.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
