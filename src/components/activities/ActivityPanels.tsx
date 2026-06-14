import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import type { ActivityId } from "@/lib/mock";
import { dateRoomActivities } from "@/lib/mock";
import { BouquetStudio } from "./BouquetStudio";
import { PhotoBooth } from "./PhotoBooth";
import { Gramophone } from "./Gramophone";
import { MovieNight } from "./MovieNight";
import { CookingTogether } from "./CookingTogether";
import { CoupleGames } from "./CoupleGames";
import { LoveLetter } from "./LoveLetter";
import { PaintTogether } from "./PaintTogether";
import { VirtualTravel } from "./VirtualTravel";

/**
 * Activity panels for the Date Room.
 * Phase B activities (Bouquet, Photo Booth, Gramophone) are fully built;
 * remaining activities are richly themed placeholders awaiting later phases.
 */

function PanelShell({
  title,
  tagline,
  accent,
  children,
}: {
  title: string;
  tagline: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35 }}
      className="paper-texture diary-card ornament-border relative h-full overflow-hidden p-6 sm:p-8"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">{accent}</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">{title}</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">{tagline}</p>
      </div>
      <div className="mt-6">{children}</div>
    </motion.div>
  );
}

function ComingSoon({ children }: { children: string }) {
  return (
    <div className="grid place-items-center rounded-lg border border-dashed border-accent/40 bg-secondary/30 px-6 py-12 text-center">
      <Sparkles className="h-6 w-6 text-accent" />
      <p className="mt-3 font-display text-xl text-primary">{children}</p>
      <p className="mt-1 font-hand text-lg text-muted-foreground">opening soon — keep the video rolling</p>
    </div>
  );
}

function DancePanel() {
  return (
    <PanelShell title="Dance Together" tagline="slow waltz, soft light" accent="Activity · IV">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {["Waltz","Tango","Swing","Bachata","Slow"].map(d => (
          <button key={d} className="rounded-md border border-border bg-paper py-6 font-display text-lg text-primary transition hover:border-accent hover:shadow-[var(--shadow-gold)]">
            {d}
          </button>
        ))}
      </div>
    </PanelShell>
  );
}

function MoviePanel() {
  return (
    <PanelShell title="Movie Night" tagline="curtain up, share a screen" accent="Activity · V">
      <div className="grid aspect-video place-items-center rounded-md border border-border bg-ink text-cream">
        <div className="text-center">
          <p className="font-script text-4xl text-gold">— intermission —</p>
          <p className="mt-2 font-hand text-lg opacity-80">your shared cinema, ready when you are</p>
        </div>
      </div>
    </PanelShell>
  );
}

function CookingPanel() {
  return (
    <PanelShell title="Cook Together" tagline="one recipe, two kitchens" accent="Activity · VI">
      <ComingSoon>Tonight's recipe will live here</ComingSoon>
    </PanelShell>
  );
}

function PaintPanel() {
  return (
    <PanelShell title="Paint Together" tagline="a canvas you both touch" accent="Activity · VII">
      <div className="grid aspect-video place-items-center rounded-md border-2 border-dashed border-accent/40 bg-paper">
        <p className="font-hand text-xl text-muted-foreground">your shared canvas</p>
      </div>
    </PanelShell>
  );
}

function TravelPanel() {
  return (
    <PanelShell title="Virtual Travel" tagline="tonight: Paris" accent="Activity · VIII">
      <div className="grid gap-3 sm:grid-cols-3">
        {["Paris","Venice","Kyoto","Santorini","Maldives","Swiss Alps"].map(p => (
          <div key={p} className="rounded-md border border-border bg-paper p-4 text-center">
            <p className="font-display text-xl text-primary">{p}</p>
            <p className="font-hand text-base text-muted-foreground">a postcard for two</p>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function GamesPanel() {
  return (
    <PanelShell title="Couple Games" tagline="truth or dare, gently" accent="Activity · IX">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {["Truth or Dare","This or That","Couple Quiz","Memory Match","Love Trivia"].map(g => (
          <div key={g} className="rounded-md border border-border bg-paper p-5 text-center font-display text-primary">{g}</div>
        ))}
      </div>
    </PanelShell>
  );
}

function LetterPanel() {
  return (
    <PanelShell title="Love Letter" tagline="sealed with wax, sent at once" accent="Activity · X">
      <div className="paper-texture rounded-md border border-border p-6">
        <p className="font-hand text-2xl text-primary">My dearest…</p>
        <textarea
          rows={6}
          placeholder="write the thing you cannot say out loud"
          className="mt-3 w-full resize-none rounded-md border border-border bg-transparent p-3 font-hand text-xl text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
        />
        <div className="mt-3 flex items-center justify-between">
          <p className="font-hand text-xl text-primary">— always,</p>
          <button className="rounded-md bg-[var(--gradient-burgundy)] px-4 py-2 font-cinzel text-xs uppercase tracking-widest text-primary-foreground">Seal &amp; send</button>
        </div>
      </div>
    </PanelShell>
  );
}

const panelMap: Record<ActivityId, () => React.ReactElement> = {
  bouquet: BouquetStudio,
  photobooth: PhotoBooth,
  music: Gramophone,
  dance: DancePanel,
  movie: MovieNight,
  cooking: CookingTogether,
  paint: PaintTogether,
  travel: VirtualTravel,
  games: CoupleGames,
  letter: LoveLetter,
};

export function ActivityPanel({ id }: { id: ActivityId }) {
  const Panel = panelMap[id];
  return <Panel />;
}

export function activityMeta(id: ActivityId) {
  return dateRoomActivities.find(a => a.id === id)!;
}
