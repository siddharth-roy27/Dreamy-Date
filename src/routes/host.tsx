import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageHeader, VintageCard, VintageButton, WaxSeal, FloatingParticles } from "@/components/vintage";
import { activities, me } from "@/lib/mock";

export const Route = createFileRoute("/host")({
  head: () => ({ meta: [{ title: "Host a Date — DreamyDate" }] }),
  component: HostPage,
});

function HostPage() {
  return (
    <div className="relative">
      <FloatingParticles />
      <PageHeader eyebrow="Right now" title="Begin Our Date" subtitle="No planning. Just presence." />

      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.7 }}>
        <VintageCard ornament className="relative overflow-hidden p-10 paper-texture">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[var(--gradient-gold)] opacity-20 blur-3xl" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-accent">An Invitation</p>
              <h2 className="mt-2 font-display text-4xl text-primary">Will you join me, tonight?</h2>
              <p className="mt-3 font-hand text-2xl text-foreground/80">No need to dress up. Just bring your eyes.</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center -space-x-3">
                  <img src={me.avatar} className="h-12 w-12 rounded-full border-4 border-paper object-cover" />
                  <img src={me.partnerAvatar} className="h-12 w-12 rounded-full border-4 border-paper object-cover" />
                </div>
                <p className="font-body italic text-muted-foreground">{me.name} & {me.partner}</p>
              </div>
            </div>
            <WaxSeal color="gold" label="❤" />
          </div>
        </VintageCard>
      </motion.div>

      <section className="mt-10">
        <h3 className="mb-4 font-display text-2xl text-primary">Pick a moment</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {activities.map((a, i) => (
            <motion.div key={a.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <VintageCard className="text-center transition hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]">
                <div className="text-4xl">{a.icon}</div>
                <p className="mt-2 font-cinzel text-xs uppercase tracking-widest text-primary">{a.name}</p>
              </VintageCard>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-3">
        <VintageCard className="lg:col-span-2 p-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sage opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-sage" />
            </span>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-sage">Online · Kyoto</p>
          </div>
          <p className="mt-3 font-display text-3xl text-primary">Your partner is ready ❤</p>
          <p className="font-hand text-xl text-muted-foreground">James lit a candle two minutes ago.</p>
        </VintageCard>
        <Link to="/video-date" className="flex">
          <VintageButton variant="primary" className="w-full py-6 text-base">Begin Our Date →</VintageButton>
        </Link>
      </section>
    </div>
  );
}
