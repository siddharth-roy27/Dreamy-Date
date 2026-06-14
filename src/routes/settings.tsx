import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Sun, Moon, Coffee, Trash2, LogOut, Download, KeyRound, Check } from "lucide-react";
import { PageHeader, VintageCard, VintageButton } from "@/components/vintage";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTheme, type Theme } from "@/hooks/useTheme";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings — DreamyDate" }] }),
  component: SettingsPage,
});

const sections = [
  { id: "notify",     title: "Notifications", items: ["Date reminders", "Partner is online", "New memories", "Weekly love letter"] },
  { id: "privacy",    title: "Privacy",       items: ["Show location to partner", "Allow date recording", "Share memories publicly"] },
  { id: "appearance", title: "Diary Details", items: ["Film grain on memories", "Animated wax seals", "Floating hearts on home"] },
];

const services = [
  { name: "Google",      desc: "Calendar & contacts",  connected: true  },
  { name: "Spotify",     desc: "Shared playlists",     connected: true  },
  { name: "Apple Music", desc: "Shared playlists",     connected: false },
  { name: "Instagram",   desc: "Import memories",      connected: false },
];

const THEME_META: Record<Theme, { label: string; desc: string; icon: typeof Sun; swatch: string[] }> = {
  burgundy: { label: "Burgundy",  desc: "Candlelit parchment",  icon: Sun,    swatch: ["#7a2e2e", "#c8a85b", "#f3e7d3"] },
  midnight: { label: "Midnight",  desc: "Velvet & gold by night", icon: Moon,  swatch: ["#1f1f3a", "#c8a85b", "#3a3a5a"] },
  sepia:    { label: "Sepia",     desc: "Old film softness",    icon: Coffee, swatch: ["#a06a3a", "#e8c89a", "#f4e6cc"] },
};

function SettingsPage() {
  const { theme, setTheme, themes } = useTheme();
  const [services2, setServices] = useLocalStorage("dd:services", services);
  const [savedFlash, setSavedFlash] = useState(false);

  return (
    <div>
      <PageHeader eyebrow="The Endpaper" title="Settings" subtitle="The small adjustments that make the diary feel like yours." />

      {/* Theme switcher */}
      <VintageCard ornament className="mb-8 p-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h3 className="font-display text-2xl text-primary">Diary Skin</h3>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">applies instantly · saved to this device</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {themes.map((t) => {
            const meta = THEME_META[t];
            const Icon = meta.icon;
            const active = theme === t;
            return (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`group relative flex flex-col items-start gap-3 rounded-xl border-2 p-5 text-left transition ${
                  active ? "border-accent shadow-[var(--shadow-gold)]" : "border-border bg-card hover:border-accent/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-lg text-primary">{meta.label}</p>
                    <p className="font-body italic text-sm text-muted-foreground">{meta.desc}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  {meta.swatch.map((c) => (
                    <span key={c} className="h-5 w-5 rounded-full border border-border/60" style={{ background: c }} />
                  ))}
                </div>
                {active && (
                  <span className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </VintageCard>

      <div className="grid gap-8 lg:grid-cols-2">
        {sections.map((s) => (
          <VintageCard key={s.id} className="p-6">
            <h3 className="font-display text-2xl text-primary">{s.title}</h3>
            <div className="mt-4 divide-y divide-border">
              {s.items.map((it, i) => (
                <SettingRow key={it} storageKey={`dd:setting:${s.id}:${it}`} label={it} defaultOn={i % 2 === 0} />
              ))}
            </div>
          </VintageCard>
        ))}

        {/* Connected services */}
        <VintageCard className="p-6 lg:col-span-2">
          <h3 className="font-display text-2xl text-primary">Connected Services</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {services2.map((sv, idx) => (
              <div key={sv.name} className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4">
                <div className="min-w-0">
                  <p className="font-display text-lg text-primary">{sv.name}</p>
                  <p className="font-body italic text-sm text-muted-foreground">{sv.desc}</p>
                </div>
                <button
                  onClick={() => setServices((arr) => arr.map((x, i) => i === idx ? { ...x, connected: !x.connected } : x))}
                  className={`shrink-0 rounded-full px-4 py-1.5 font-cinzel text-[10px] uppercase tracking-widest transition ${
                    sv.connected ? "bg-sage text-cream" : "border border-border text-foreground hover:bg-secondary"
                  }`}
                >
                  {sv.connected ? "Connected" : "Connect"}
                </button>
              </div>
            ))}
          </div>
        </VintageCard>

        {/* Account actions */}
        <AccountActions onSaved={() => { setSavedFlash(true); setTimeout(() => setSavedFlash(false), 1800); }} />
      </div>

      {savedFlash && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 rounded-full bg-[var(--gradient-burgundy)] px-5 py-2 font-cinzel text-[10px] uppercase tracking-[0.3em] text-primary-foreground shadow-[var(--shadow-gold)] lg:bottom-8">
          Saved to your diary
        </div>
      )}
    </div>
  );
}

function SettingRow({ storageKey, label, defaultOn }: { storageKey: string; label: string; defaultOn: boolean }) {
  const [on, setOn] = useLocalStorage(storageKey, defaultOn);
  return (
    <div className="flex items-center justify-between py-3">
      <span className="font-body text-base text-foreground">{label}</span>
      <button
        onClick={() => setOn(!on)}
        aria-pressed={on}
        aria-label={label}
        className={`relative h-7 w-12 rounded-full border-2 transition ${on ? "border-accent bg-[var(--gradient-gold)]" : "border-border bg-secondary"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function AccountActions({ onSaved }: { onSaved: () => void }) {
  const navigate = useNavigate();
  const [pwdOpen, setPwdOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  function exportDiary() {
    if (typeof window === "undefined") return;
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), settings: { ...window.localStorage } }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dreamydate-diary.json";
    a.click();
    URL.revokeObjectURL(url);
    onSaved();
  }

  function signOut() {
    navigate({ to: "/login" });
  }

  function deleteAccount() {
    if (typeof window !== "undefined") window.localStorage.clear();
    navigate({ to: "/" });
  }

  return (
    <VintageCard className="p-6 lg:col-span-2">
      <h3 className="font-display text-2xl text-primary">Your Account</h3>
      <p className="mt-1 font-body italic text-muted-foreground">A few solemn levers for the keeper of the diary.</p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <button
          onClick={() => setPwdOpen((v) => !v)}
          className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4 text-left hover:bg-secondary"
        >
          <span className="flex items-center gap-3">
            <KeyRound className="h-4 w-4 text-primary" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-foreground">Change Password</span>
          </span>
          <span className="font-body italic text-sm text-muted-foreground">change</span>
        </button>

        <button
          onClick={exportDiary}
          className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4 text-left hover:bg-secondary"
        >
          <span className="flex items-center gap-3">
            <Download className="h-4 w-4 text-primary" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-foreground">Export Diary</span>
          </span>
          <span className="font-body italic text-sm text-muted-foreground">download .json</span>
        </button>

        <button
          onClick={signOut}
          className="flex items-center justify-between rounded-lg border border-border bg-secondary/40 p-4 text-left hover:bg-secondary"
        >
          <span className="flex items-center gap-3">
            <LogOut className="h-4 w-4 text-primary" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-foreground">Sign Out</span>
          </span>
          <span className="font-body italic text-sm text-muted-foreground">until tomorrow</span>
        </button>

        <button
          onClick={() => setConfirmDelete(true)}
          className="flex items-center justify-between rounded-lg border border-rose/40 bg-rose/10 p-4 text-left hover:bg-rose/20"
        >
          <span className="flex items-center gap-3">
            <Trash2 className="h-4 w-4 text-rose" />
            <span className="font-cinzel text-xs uppercase tracking-[0.25em] text-rose">Delete Account</span>
          </span>
          <span className="font-body italic text-sm text-muted-foreground">forever</span>
        </button>
      </div>

      {pwdOpen && (
        <form
          onSubmit={(e) => { e.preventDefault(); setPwdOpen(false); onSaved(); }}
          className="mt-6 grid gap-3 rounded-lg border border-border bg-secondary/40 p-5 sm:grid-cols-3"
        >
          <input type="password" placeholder="Current" className="rounded-md border border-border bg-card px-3 py-2 font-body" />
          <input type="password" placeholder="New" className="rounded-md border border-border bg-card px-3 py-2 font-body" />
          <input type="password" placeholder="Confirm" className="rounded-md border border-border bg-card px-3 py-2 font-body" />
          <div className="sm:col-span-3 flex justify-end gap-2">
            <button type="button" onClick={() => setPwdOpen(false)} className="px-4 py-2 font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Cancel</button>
            <VintageButton type="submit" variant="primary">Update password</VintageButton>
          </div>
        </form>
      )}

      {confirmDelete && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur" onClick={() => setConfirmDelete(false)}>
          <div onClick={(e) => e.stopPropagation()} className="diary-card max-w-md p-8 text-center">
            <h4 className="font-display text-2xl text-primary">Close the diary forever?</h4>
            <p className="mt-2 font-body italic text-muted-foreground">
              Every letter, every reel, every wax seal will be ash. This cannot be undone.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <VintageButton variant="ghost" onClick={() => setConfirmDelete(false)}>Keep my diary</VintageButton>
              <button
                onClick={deleteAccount}
                className="rounded-lg bg-rose px-6 py-3 font-cinzel text-xs uppercase tracking-[0.2em] text-cream hover:opacity-90"
              >
                Delete forever
              </button>
            </div>
          </div>
        </div>
      )}
    </VintageCard>
  );
}
