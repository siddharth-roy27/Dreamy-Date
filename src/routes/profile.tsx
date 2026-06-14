import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Heart, Clock, Star, Camera } from "lucide-react";
import { PageHeader, VintageCard, VintageButton } from "@/components/vintage";
import { me } from "@/lib/mock";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — DreamyDate" }] }),
  component: ProfilePage,
});

const stats = [
  { label: "Dates Completed", value: me.datesCompleted, icon: Heart },
  { label: "Memories Created", value: me.memoriesCreated, icon: Camera },
  { label: "Hours Together", value: me.hoursTogether, icon: Clock },
  { label: "Favorite Activity", value: me.favoriteActivity, icon: Star },
];

function ProfilePage() {
  return (
    <div>
      <PageHeader eyebrow="A Portrait" title="Your Page in the Diary" subtitle="A small gallery of who you are, kept beside his." />
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-1">
          <div className="diary-card relative p-6 paper-texture">
            <div className="ornament-border overflow-hidden rounded-md">
              <img src={me.avatar} alt={me.name} className="aspect-[3/4] w-full object-cover sepia-[15%]" />
            </div>
            <p className="mt-5 text-center font-display text-3xl text-primary">{me.name}</p>
            <p className="text-center font-hand text-xl text-muted-foreground">& {me.partner}</p>
            <div className="mt-4 flex items-center justify-center gap-1.5 font-body italic text-muted-foreground">
              <MapPin className="h-4 w-4" /> {me.location}
            </div>
            <VintageButton variant="gold" className="mt-6 w-full">Edit Profile</VintageButton>
          </div>
        </motion.div>

        <div className="space-y-6 lg:col-span-2">
          <VintageCard ornament className="p-8">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">About</p>
            <p className="mt-3 font-body text-xl italic leading-relaxed text-foreground">"{me.bio}"</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Anniversary</p>
                <p className="font-display text-xl text-primary">{me.anniversary}</p>
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Days together</p>
                <p className="font-display text-xl text-primary">{me.daysTogether}</p>
              </div>
            </div>
          </VintageCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <VintageCard key={s.label} className="flex items-center gap-4 p-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                    <p className="truncate font-display text-2xl text-primary">{s.value}</p>
                  </div>
                </VintageCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
