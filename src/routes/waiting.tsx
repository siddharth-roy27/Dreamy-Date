import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { VintageCard, VintageButton, FloatingParticles } from "@/components/vintage";
import { coupleConnection } from "@/lib/mock";

export const Route = createFileRoute("/waiting")({
  head: () => ({ meta: [{ title: "Waiting for your love — DreamyDate" }] }),
  component: WaitingPage,
});

function WaitingPage() {
  return (
    <div className="relative grid min-h-[70vh] place-items-center">
      <FloatingParticles />
      <VintageCard ornament className="relative max-w-xl p-10 text-center paper-texture">
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto grid h-28 w-28 place-items-center rounded-full bg-[var(--gradient-burgundy)] text-cream shadow-[var(--shadow-soft)]"
        >
          <Mail className="h-12 w-12" />
        </motion.div>

        <p className="mt-6 font-cinzel text-[11px] uppercase tracking-[0.35em] text-accent">An Open Envelope</p>
        <h1 className="mt-2 font-display text-4xl text-primary">Waiting for your love</h1>
        <p className="mt-3 font-hand text-2xl text-foreground/80">
          The letter has gone. The candle is lit. The page is open.
        </p>

        <div className="mt-8 rounded-md border border-dashed border-accent/50 bg-secondary/30 px-6 py-4">
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">your code</p>
          <p className="mt-1 font-display text-2xl tracking-[0.25em] text-primary">{coupleConnection.code}</p>
        </div>

        <div className="mt-3 flex justify-center gap-1">
          {[0,1,2].map(i => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-accent"
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/invite"><VintageButton variant="ghost">Resend invitation</VintageButton></Link>
          <Link to="/connected"><VintageButton variant="primary">Preview connection</VintageButton></Link>
        </div>
      </VintageCard>
    </div>
  );
}
