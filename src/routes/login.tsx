import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { VintageInput, VintageButton, FloatingParticles } from "@/components/vintage";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — DreamyDate" }] }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.32 0.05 22) 0%, oklch(0.18 0.03 22) 70%)",
      }}
    >
      <FloatingParticles />
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{ perspective: 1200 }}
        className="relative w-full max-w-md"
      >
        <div className="diary-card ornament-border relative paper-texture p-10">
          <div className="absolute -left-3 top-10 h-24 w-3 rounded-l bg-[var(--gradient-burgundy)] shadow-[var(--shadow-soft)]" />
          <div className="text-center">
            <Sparkles className="mx-auto h-6 w-6 text-accent" />
            <h1 className="mt-3 font-display text-5xl gold-text">DreamyDate</h1>
            <p className="mt-2 font-hand text-xl text-primary">Where hearts meet, even when apart.</p>
          </div>

          <form className="mt-8 space-y-5">
            <VintageInput label="Email" type="email" placeholder="you@love.letters" />
            <VintageInput label="Password" type="password" placeholder="••••••••" />
            <Link to="/home" className="block">
              <VintageButton variant="primary" className="w-full">Sign In</VintageButton>
            </Link>
            <button type="button" className="w-full rounded-lg border border-border bg-secondary/60 py-3 font-cinzel text-xs uppercase tracking-[0.25em] text-foreground hover:bg-secondary">
              Continue with Google
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            <Link to="/register" className="hover:text-primary">Create Account</Link>
            <a href="#" className="hover:text-primary">Forgot Password</a>
          </div>

          <p className="mt-8 text-center font-hand text-base text-muted-foreground">
            sealed with love · {new Date().getFullYear()}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
