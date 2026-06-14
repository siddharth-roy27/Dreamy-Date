import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { VintageCard, VintageButton, WaxSeal, FloatingParticles } from "@/components/vintage";
import { currentUser, partner, coupleConnection } from "@/lib/mock";

export const Route = createFileRoute("/connected")({
  head: () => ({ meta: [{ title: "Connected — DreamyDate" }] }),
  component: ConnectedPage,
});

function ConnectedPage() {
  return (
    <div className="relative grid min-h-[70vh] place-items-center">
      <FloatingParticles />
      <VintageCard ornament className="relative max-w-2xl p-10 text-center paper-texture">
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180, damping: 14 }}
          className="mx-auto"
        >
          <WaxSeal label="❤" />
        </motion.div>

        <p className="mt-6 font-cinzel text-[11px] uppercase tracking-[0.35em] text-accent">The Diary Opens</p>
        <h1 className="mt-2 font-display text-4xl text-primary">You are connected</h1>
        <p className="mt-3 font-hand text-2xl text-foreground/80">Two pens. One story. Begin.</p>

        <div className="mt-10 flex items-center justify-center gap-6 sm:gap-10">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-paper p-3 pb-6 shadow-[var(--shadow-diary)]"
            style={{ transform: "rotate(-4deg)" }}
          >
            <img src={currentUser.avatar} alt={currentUser.name} className="h-28 w-28 object-cover sepia-[15%] sm:h-36 sm:w-36" />
            <p className="mt-2 font-hand text-lg text-primary">{currentUser.name}</p>
          </motion.div>

          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="font-display text-4xl text-accent"
          >
            &amp;
          </motion.span>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="bg-paper p-3 pb-6 shadow-[var(--shadow-diary)]"
            style={{ transform: "rotate(4deg)" }}
          >
            <img src={partner.avatar} alt={partner.name} className="h-28 w-28 object-cover sepia-[15%] sm:h-36 sm:w-36" />
            <p className="mt-2 font-hand text-lg text-primary">{partner.name}</p>
          </motion.div>
        </div>

        <p className="mt-8 font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          linked {coupleConnection.linkedAt}
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/date-room"><VintageButton variant="primary">Open the Date Room</VintageButton></Link>
          <Link to="/home"><VintageButton variant="ghost">Return to the dashboard</VintageButton></Link>
        </div>
      </VintageCard>
    </div>
  );
}
