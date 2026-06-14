import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { VintageInput, VintageButton, FloatingParticles } from "@/components/vintage";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Begin Our Story — DreamyDate" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{ background: "radial-gradient(ellipse at center, oklch(0.32 0.05 22) 0%, oklch(0.18 0.03 22) 70%)" }}>
      <FloatingParticles />
      <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}
        className="diary-card ornament-border w-full max-w-md p-10 paper-texture">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: "spring" }}
            className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[var(--gradient-gold)] shadow-[var(--shadow-gold)]">
            <Mail className="h-7 w-7 text-ink" />
          </motion.div>
          <h1 className="mt-4 font-display text-4xl gold-text">Begin Our Story</h1>
          <p className="mt-2 font-hand text-lg text-primary">a new page, just for the two of you</p>
        </div>
        <form className="mt-8 space-y-5">
          <VintageInput label="Your Name" placeholder="Emma" />
          <VintageInput label="Email" type="email" placeholder="you@love.letters" />
          <VintageInput label="Password" type="password" placeholder="••••••••" />
          <VintageInput label="Confirm Password" type="password" placeholder="••••••••" />
          <Link to="/home"><VintageButton variant="gold" className="mt-2 w-full">Begin Our Story</VintageButton></Link>
        </form>
        <p className="mt-6 text-center font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Already written? <Link to="/login" className="text-primary">Open the diary</Link>
        </p>
      </motion.div>
    </div>
  );
}
