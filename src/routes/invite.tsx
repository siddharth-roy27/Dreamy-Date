import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Mail, QrCode, Link as LinkIcon, Check } from "lucide-react";
import { PageHeader, VintageCard, VintageButton, WaxSeal, FloatingParticles } from "@/components/vintage";
import { coupleConnection, currentUser } from "@/lib/mock";

export const Route = createFileRoute("/invite")({
  head: () => ({ meta: [{ title: "Invite Your Partner — DreamyDate" }] }),
  component: InvitePage,
});

function InvitePage() {
  const [copied, setCopied] = useState<"code" | "link" | null>(null);

  const copy = async (value: string, what: "code" | "link") => {
    try { await navigator.clipboard.writeText(value); } catch {}
    setCopied(what);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="relative">
      <FloatingParticles />
      <PageHeader
        eyebrow="Chapter One"
        title="Invite Your Beloved"
        subtitle="A diary needs two voices. Send them a key to ours."
      />

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Invitation card */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <VintageCard ornament className="relative overflow-hidden p-10 paper-texture">
            <div className="absolute right-6 top-6"><WaxSeal label="✉" /></div>

            <p className="font-cinzel text-[11px] uppercase tracking-[0.35em] text-accent">A Private Invitation</p>
            <h2 className="mt-2 font-display text-3xl text-primary">From {currentUser.name}, with love</h2>
            <p className="mt-3 font-hand text-2xl text-foreground/80">
              Come away with me — to a quieter place where the pages turn just for us.
            </p>

            <div className="mt-8 rounded-lg border-2 border-dashed border-accent/50 bg-secondary/30 p-6 text-center">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-muted-foreground">your private code</p>
              <p className="mt-2 select-all font-display text-3xl tracking-[0.25em] text-primary">{coupleConnection.code}</p>
              <button
                onClick={() => copy(coupleConnection.code, "code")}
                className="mt-3 inline-flex items-center gap-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent hover:text-primary"
              >
                {copied === "code" ? <><Check className="h-3.5 w-3.5" /> copied</> : <><Copy className="h-3.5 w-3.5" /> copy</>}
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <VintageButton variant="primary" onClick={() => copy(coupleConnection.inviteLink, "link")}>
                <LinkIcon className="h-4 w-4" />
                {copied === "link" ? "Link copied" : "Copy invite link"}
              </VintageButton>
              <VintageButton variant="ghost">
                <Mail className="h-4 w-4" /> Send by email
              </VintageButton>
              <Link to="/waiting" className="inline-flex">
                <VintageButton variant="gold">Sent — I'll wait</VintageButton>
              </Link>
            </div>

            <p className="mt-6 font-hand text-xl text-primary">— yours always, {currentUser.name}</p>
          </VintageCard>
        </motion.div>

        {/* QR + share methods */}
        <div className="space-y-6">
          <VintageCard className="p-6 text-center">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">or scan</p>
            <div className="mx-auto mt-4 grid h-48 w-48 place-items-center rounded-lg border border-border bg-paper">
              <QrCode className="h-32 w-32 text-primary/80" strokeWidth={1.2} />
            </div>
            <p className="mt-4 font-hand text-base text-muted-foreground">point a camera at the page</p>
          </VintageCard>

          <VintageCard className="p-6">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">how it works</p>
            <ol className="mt-3 space-y-3 font-body text-base text-foreground/80">
              <li><span className="font-display text-primary">i.</span> Share your code or link.</li>
              <li><span className="font-display text-primary">ii.</span> They open DreamyDate and enter it.</li>
              <li><span className="font-display text-primary">iii.</span> The diary opens for two.</li>
            </ol>
          </VintageCard>
        </div>
      </div>
    </div>
  );
}
