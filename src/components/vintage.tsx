import { motion } from "framer-motion";
import type { ButtonHTMLAttributes, HTMLAttributes, InputHTMLAttributes, ReactNode } from "react";

export function VintageButton({
  variant = "primary",
  children,
  className = "",
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "gold" | "ghost" }) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-6 py-3 font-cinzel text-sm uppercase tracking-[0.2em] transition-all duration-300 hover:-translate-y-0.5";
  const variants = {
    primary:
      "bg-[var(--gradient-burgundy)] text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)]",
    gold:
      "bg-[var(--gradient-gold)] text-ink shadow-[var(--shadow-gold)]",
    ghost:
      "border border-border bg-transparent text-foreground hover:bg-secondary",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function VintageCard({
  children,
  className = "",
  ornament = false,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { ornament?: boolean }) {
  return (
    <div
      className={`diary-card p-6 ${ornament ? "ornament-border" : ""} ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

export function VintageInput({ label, ...rest }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          {label}
        </span>
      )}
      <input
        {...rest}
        className="w-full rounded-md border-b-2 border-border bg-transparent px-2 py-2.5 font-body text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
      />
    </label>
  );
}

export function WaxSeal({ color = "burgundy", label }: { color?: "burgundy" | "gold" | "sage" | "rose"; label?: string }) {
  const colors = {
    burgundy: "bg-[var(--gradient-burgundy)] text-primary-foreground",
    gold: "bg-[var(--gradient-gold)] text-ink",
    sage: "bg-sage text-cream",
    rose: "bg-rose text-cream",
  } as const;
  return (
    <motion.div
      initial={{ scale: 0, rotate: -20 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
      className={`relative flex h-14 w-14 items-center justify-center rounded-full font-script text-xl shadow-[var(--shadow-soft)] ${colors[color]}`}
      style={{
        clipPath:
          "polygon(50% 0%, 61% 12%, 78% 8%, 82% 25%, 96% 33%, 90% 50%, 96% 67%, 82% 75%, 78% 92%, 61% 88%, 50% 100%, 39% 88%, 22% 92%, 18% 75%, 4% 67%, 10% 50%, 4% 33%, 18% 25%, 22% 8%, 39% 12%)",
      }}
    >
      {label ?? "♥"}
    </motion.div>
  );
}

export function RibbonBookmark({ children }: { children: ReactNode }) {
  return (
    <div className="relative inline-block">
      <div className="bg-[var(--gradient-burgundy)] px-4 py-2 font-cinzel text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-[var(--shadow-soft)]">
        {children}
      </div>
      <div
        className="absolute left-0 top-full h-3 w-full"
        style={{
          background: "var(--gradient-burgundy)",
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 60%, 0 100%)",
        }}
      />
    </div>
  );
}

export function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-accent/40"
          initial={{
            x: Math.random() * 100 + "%",
            y: "110%",
            opacity: 0,
          }}
          animate={{
            y: "-10%",
            opacity: [0, 0.7, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 8,
            ease: "linear",
          }}
          style={{ left: `${Math.random() * 100}%`, fontSize: `${10 + Math.random() * 14}px` }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-10"
    >
      {eyebrow && (
        <p className="mb-2 font-cinzel text-[11px] uppercase tracking-[0.4em] text-accent">{eyebrow}</p>
      )}
      <h1 className="font-display text-4xl text-primary sm:text-5xl">{title}</h1>
      {subtitle && (
        <p className="mt-3 max-w-2xl font-body text-lg italic text-muted-foreground">{subtitle}</p>
      )}
      <div className="mt-5 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-accent/60 to-transparent" />
        <span className="text-accent">❦</span>
        <div className="h-px flex-1 bg-gradient-to-l from-accent/60 to-transparent" />
      </div>
    </motion.header>
  );
}
