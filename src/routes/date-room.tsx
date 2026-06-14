import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mic, MicOff, Video as VideoIcon, VideoOff, PhoneOff, Sparkles, Clock } from "lucide-react";
import { dateRoomActivities, me, plannedDateDraft, type ActivityId } from "@/lib/mock";
import { ActivityPanel } from "@/components/activities/ActivityPanels";

export const Route = createFileRoute("/date-room")({
  head: () => ({ meta: [{ title: "Date Room — DreamyDate" }] }),
  component: DateRoomPage,
});

function useTimer(running: boolean) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [running]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${String(h).padStart(2,"0")} : ${String(m).padStart(2,"0")} : ${String(s).padStart(2,"0")}`;
}

function DateRoomPage() {
  const [active, setActive] = useState<ActivityId>("music");
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const time = useTimer(true);
  const meta = useMemo(() => dateRoomActivities.find(a => a.id === active)!, [active]);

  return (
    <div className="space-y-5">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card/80 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">
            <span className="h-2 w-2 animate-pulse rounded-full bg-rose" /> Live
          </span>
          <span className="font-display text-xl text-primary">{time}</span>
          <span className="hidden items-center gap-2 font-body italic text-muted-foreground sm:inline-flex">
            <Clock className="h-4 w-4" /> {plannedDateDraft.title}
          </span>
        </div>
        <div className="flex items-center gap-3 font-body italic text-muted-foreground">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="font-cinzel text-[10px] uppercase tracking-[0.3em]">{meta.name}</span>
        </div>
      </div>

      {/* Video tiles */}
      <div className="grid gap-4 sm:grid-cols-2">
        {[{ name: me.name, img: me.avatar, label: "you" }, { name: me.partner, img: me.partnerAvatar, label: "your love" }].map(p => (
          <div key={p.name} className="diary-card paper-texture p-3">
            <div className="relative overflow-hidden rounded-md ornament-border">
              <img src={p.img} alt={p.name} className={`aspect-video w-full object-cover sepia-[15%] ${cam ? "" : "blur-md"}`} />
              <div className="absolute bottom-3 left-3 rounded-md bg-ink/70 px-3 py-1 font-cinzel text-[10px] uppercase tracking-widest text-cream">
                {p.name} · {p.label}
              </div>
              {!mic && p.label === "you" && (
                <div className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-ink/70 text-cream">
                  <MicOff className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Call controls */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setMic(v => !v)}
          className={`grid h-12 w-12 place-items-center rounded-full border border-border shadow-[var(--shadow-soft)] transition ${mic ? "bg-card text-primary" : "bg-rose text-cream"}`}
          aria-label="Toggle microphone"
        >
          {mic ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </button>
        <button
          onClick={() => setCam(v => !v)}
          className={`grid h-12 w-12 place-items-center rounded-full border border-border shadow-[var(--shadow-soft)] transition ${cam ? "bg-card text-primary" : "bg-rose text-cream"}`}
          aria-label="Toggle camera"
        >
          {cam ? <VideoIcon className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </button>
        <button
          className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-soft)]"
          aria-label="End date"
        >
          <PhoneOff className="h-5 w-5" />
        </button>
      </div>

      {/* Activity panel (swaps in place; videos stay mounted above) */}
      <AnimatePresence mode="wait">
        <ActivityPanel key={active} id={active} />
      </AnimatePresence>

      {/* Activity dock */}
      <div className="sticky bottom-20 z-20 mt-2 lg:bottom-4">
        <div className="diary-card paper-texture flex items-center gap-2 overflow-x-auto p-3">
          <p className="hidden shrink-0 px-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:block">
            tonight's activities
          </p>
          <div className="flex flex-1 items-center gap-2">
            {dateRoomActivities.map(a => {
              const on = a.id === active;
              return (
                <motion.button
                  key={a.id}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActive(a.id)}
                  className={`group flex shrink-0 flex-col items-center gap-1 rounded-lg px-3 py-2 transition ${
                    on
                      ? "bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-gold)]"
                      : "bg-secondary/50 text-foreground hover:bg-secondary"
                  }`}
                  title={a.name}
                >
                  <span className="text-xl leading-none">{a.icon}</span>
                  <span className="font-cinzel text-[9px] uppercase tracking-[0.2em]">
                    {a.name.split(" ")[0]}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
