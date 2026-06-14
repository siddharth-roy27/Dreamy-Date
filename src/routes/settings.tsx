import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageHeader, VintageCard } from "@/components/vintage";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — DreamyDate" }] }),
  component: SettingsPage,
});

const sections = [
  { id: "account", title: "Account", items: ["Name", "Email", "Password", "Two-factor authentication"] },
  { id: "notify", title: "Notifications", items: ["Date reminders", "Partner is online", "New memories", "Weekly love letter"] },
  { id: "privacy", title: "Privacy", items: ["Show location to partner", "Allow date recording", "Share memories publicly"] },
  { id: "appearance", title: "Appearance", items: ["Diary skin: Burgundy", "Wax seal color", "Film grain intensity"] },
];

const services = [
  { name: "Google", desc: "Calendar & contacts", connected: true },
  { name: "Spotify", desc: "Shared playlists", connected: true },
  { name: "Apple Music", desc: "Shared playlists", connected: false },
  { name: "Instagram", desc: "Import memories", connected: false },
];

function SettingsPage() {
  return (
    <div>
      <PageHeader eyebrow="The Endpaper" title="Settings" subtitle="The small adjustments that make the diary feel like yours." />
      <div className="grid gap-8 lg:grid-cols-2">
        {sections.map((s) => (
          <VintageCard key={s.id} className="p-6">
            <h3 className="font-display text-2xl text-primary">{s.title}</h3>
            <div className="mt-4 divide-y divide-border">
              {s.items.map((it, i) => <SettingRow key={it} label={it} defaultOn={i % 2 === 0} />)}
            </div>
          </VintageCard>
        ))}
        <VintageCard className="lg:col-span-2 p-6">
          <h3 className="font-display text-2xl text-primary">Connected Services</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {services.map((sv) => (
              <div key={sv.name} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4">
                <div className="min-w-0">
                  <p className="font-display text-lg text-primary">{sv.name}</p>
                  <p className="font-body italic text-sm text-muted-foreground">{sv.desc}</p>
                </div>
                <button className={`shrink-0 rounded-full px-4 py-1.5 font-cinzel text-[10px] uppercase tracking-widest ${sv.connected ? "bg-sage text-cream" : "border border-border text-foreground"}`}>
                  {sv.connected ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </VintageCard>
      </div>
    </div>
  );
}

function SettingRow({ label, defaultOn }: { label: string; defaultOn: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-body text-base text-foreground">{label}</span>
      <button onClick={() => setOn(!on)}
        className={`relative h-7 w-12 rounded-full border-2 transition ${on ? "border-accent bg-[var(--gradient-gold)]" : "border-border bg-secondary"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}
