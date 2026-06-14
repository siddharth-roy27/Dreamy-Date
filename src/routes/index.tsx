import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Calendar, Music, BookHeart, Video, Sparkles, ChevronRight } from "lucide-react";
import { VintageCard, PageHeader, WaxSeal, FloatingParticles } from "@/components/vintage";
import { me, upcomingDates, recentMemories } from "@/lib/mock";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard — DreamyDate" },
      { name: "description", content: "Your shared diary of love, at a glance." },
    ],
  }),
  component: Dashboard,
});

const quickActions = [
  { to: "/host", label: "Host Date", icon: Heart, hint: "begin now" },
  { to: "/plan", label: "Plan Date", icon: Calendar, hint: "for later" },
  { to: "/song-room", label: "Song Room", icon: Music, hint: "dance with me" },
  { to: "/memories", label: "Memories", icon: BookHeart, hint: "our story" },
  { to: "/video-date", label: "Video Date", icon: Video, hint: "face to face" },
  { to: "/calendar", label: "Calendar", icon: Calendar, hint: "our days" },
];

function Dashboard() {
  return (
    <div className="relative">
      <FloatingParticles />
      <PageHeader
        eyebrow={`${new Date().toLocaleDateString("en", { weekday: "long" })} · Evening`}
        title={`Good evening, ${me.name}`}
        subtitle="Another page turns in the diary of us. What shall we write tonight?"
      />

      <section className="grid gap-6 lg:grid-cols-3">
        {/* Couple card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-2"
        >
          <VintageCard ornament className="relative overflow-hidden p-8">
            <div className="absolute right-6 top-6"><WaxSeal label="❤" /></div>
            <p className="font-cinzel text-[11px] uppercase tracking-[0.35em] text-accent">Our Story</p>
            <h2 className="mt-2 font-display text-3xl text-primary">{me.name} & {me.partner}</h2>
            <p className="font-hand text-2xl text-foreground/80">{me.daysTogether} days, and counting forever</p>

            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-center -space-x-3">
                <img src={me.avatar} alt={me.name} className="h-16 w-16 rounded-full border-4 border-paper object-cover shadow-[var(--shadow-soft)]" />
                <img src={me.partnerAvatar} alt={me.partner} className="h-16 w-16 rounded-full border-4 border-paper object-cover shadow-[var(--shadow-soft)]" />
              </div>
              <div className="flex-1 min-w-[200px]">
                <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Next chapter</p>
                <p className="font-display text-xl text-primary">{upcomingDates[0].title}</p>
                <p className="font-body italic text-muted-foreground">{upcomingDates[0].date} · {upcomingDates[0].time}</p>
              </div>
              <Link to="/host" className="inline-flex items-center gap-2 font-cinzel text-xs uppercase tracking-[0.3em] text-primary">
                Begin now <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </VintageCard>
        </motion.div>

        <VintageCard className="flex flex-col justify-between">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">A Quiet Note</p>
            <p className="mt-3 font-hand text-2xl leading-snug text-primary">
              "I held the page open so the wind could read your name aloud."
            </p>
          </div>
          <div className="mt-6 flex items-center gap-2 text-muted-foreground">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="font-cinzel text-[10px] uppercase tracking-[0.3em]">today's whisper</span>
          </div>
        </VintageCard>
      </section>

      <section className="mt-10">
        <h3 className="mb-4 font-display text-2xl text-primary">What shall we do?</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {quickActions.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.to}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link to={a.to} className="block">
                  <VintageCard className="group h-full p-5 text-center transition hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]">
                    <Icon className="mx-auto h-7 w-7 text-primary transition group-hover:text-accent" />
                    <p className="mt-3 font-cinzel text-xs uppercase tracking-[0.2em] text-foreground">{a.label}</p>
                    <p className="mt-1 font-hand text-base text-muted-foreground">{a.hint}</p>
                  </VintageCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-display text-2xl text-primary">Recent Memories</h3>
            <Link to="/memories" className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">view all</Link>
          </div>
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
            {recentMemories.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ rotate: -2, opacity: 0 }}
                animate={{ rotate: i % 2 === 0 ? -2 : 2, opacity: 1 }}
                whileHover={{ rotate: 0, y: -6 }}
                transition={{ duration: 0.4 }}
                className="bg-paper p-3 pb-10 shadow-[var(--shadow-diary)]"
              >
                <img src={m.img} alt={m.title} className="aspect-square w-full object-cover grayscale-[20%] sepia-[15%]" />
                <p className="mt-3 text-center font-hand text-base text-primary">{m.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="mb-4 flex items-baseline justify-between">
            <h3 className="font-display text-2xl text-primary">Upcoming Dates</h3>
            <Link to="/calendar" className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary">calendar</Link>
          </div>
          <div className="space-y-3">
            {upcomingDates.map((d) => (
              <VintageCard key={d.id} className="flex items-center gap-4 p-4">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-secondary text-center">
                  <span className="font-cinzel text-[9px] uppercase tracking-[0.2em] text-muted-foreground">{d.date.split(",")[0]}</span>
                  <span className="font-display text-lg text-primary leading-none">{d.date.split(" ")[1]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-lg text-primary">{d.title}</p>
                  <p className="font-body italic text-sm text-muted-foreground">{d.time} · {d.theme}</p>
                </div>
              </VintageCard>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
