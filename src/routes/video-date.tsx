import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mic, MicOff, Video as VideoIcon, VideoOff, MessageCircle, Circle, Sparkles } from "lucide-react";
import { VintageCard } from "@/components/vintage";
import { me } from "@/lib/mock";

export const Route = createFileRoute("/video-date")({
  head: () => ({ meta: [{ title: "Video Date — DreamyDate" }] }),
  component: VideoDatePage,
});

const messages = [
  { from: "James", text: "Can you see me? You look beautiful." },
  { from: "Emma", text: "Always. Move closer to the lamp." },
  { from: "James", text: "Better?" },
  { from: "Emma", text: "Perfect. Stay there forever." },
];

function VideoDatePage() {
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [showChat, setShowChat] = useState(true);

  return (
    <div>
      {/* Top bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-card/80 px-5 py-3 backdrop-blur">
        <div className="flex items-center gap-4">
          <span className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">Recording</span>
          <span className="font-display text-xl text-primary">01 : 24 : 06</span>
        </div>
        <div className="flex items-center gap-3 font-body italic text-muted-foreground">
          <Sparkles className="h-4 w-4 text-accent" />
          Romantic · Movie Night
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="grid gap-4 sm:grid-cols-2">
          {[{ name: me.name, img: me.avatar }, { name: me.partner, img: me.partnerAvatar }].map((p) => (
            <div key={p.name} className="diary-card paper-texture p-3">
              <div className="relative overflow-hidden rounded-md ornament-border">
                <img src={p.img} className="aspect-square w-full object-cover sepia-[15%]" />
                <div className="absolute bottom-3 left-3 rounded-md bg-ink/70 px-3 py-1 font-cinzel text-[10px] uppercase tracking-widest text-cream">
                  {p.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showChat && (
          <VintageCard className="flex h-[500px] flex-col p-0">
            <div className="border-b border-border px-5 py-3 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">
              Telegram
            </div>
            <div className="flex-1 space-y-3 overflow-auto p-5">
              {messages.map((m, i) => (
                <div key={i} className={`max-w-[85%] rounded-lg px-4 py-2 font-body italic text-sm ${m.from === me.name ? "ml-auto bg-primary text-primary-foreground" : "bg-secondary text-foreground"}`}>
                  <p className="font-cinzel text-[9px] uppercase tracking-widest opacity-70">{m.from}</p>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border p-3">
              <input placeholder="A whisper..." className="w-full rounded-md bg-secondary/50 px-3 py-2 font-hand text-base focus:outline-none" />
            </div>
          </VintageCard>
        )}
      </div>

      {/* Toolbar */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 rounded-2xl bg-ink/90 px-6 py-4 text-cream shadow-[var(--shadow-diary)]">
        <ToolBtn onClick={() => setMic(!mic)} active={mic} icon={mic ? Mic : MicOff} />
        <ToolBtn onClick={() => setCam(!cam)} active={cam} icon={cam ? VideoIcon : VideoOff} />
        <ToolBtn onClick={() => setShowChat(!showChat)} active={showChat} icon={MessageCircle} />
        <ToolBtn active={false} icon={Circle} accent />
        <button className="ml-2 rounded-md bg-destructive px-5 py-2 font-cinzel text-xs uppercase tracking-widest text-destructive-foreground">
          End Date
        </button>
      </div>
    </div>
  );
}

function ToolBtn({ icon: Icon, active, accent, onClick }: { icon: any; active: boolean; accent?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick}
      className={`grid h-12 w-12 place-items-center rounded-full transition ${accent ? "bg-[var(--gradient-gold)] text-ink" : active ? "bg-cream/15 text-cream" : "bg-destructive/80 text-cream"}`}>
      <Icon className="h-5 w-5" />
    </button>
  );
}
