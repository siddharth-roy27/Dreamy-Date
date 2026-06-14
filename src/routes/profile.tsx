import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { MapPin, Heart, Clock, Star, Camera, X, Pencil } from "lucide-react";
import { PageHeader, VintageCard, VintageButton } from "@/components/vintage";
import { me as seedMe } from "@/lib/mock";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — DreamyDate" }] }),
  component: ProfilePage,
});

type ProfileShape = {
  name: string;
  partner: string;
  avatar: string;
  bio: string;
  location: string;
  anniversary: string;
  daysTogether: number;
};

function ProfilePage() {
  const [profile, setProfile] = useLocalStorage<ProfileShape>("dd:profile", {
    name: seedMe.name,
    partner: seedMe.partner,
    avatar: seedMe.avatar,
    bio: seedMe.bio,
    location: seedMe.location,
    anniversary: seedMe.anniversary,
    daysTogether: seedMe.daysTogether,
  });
  const [editing, setEditing] = useState(false);

  const stats = [
    { label: "Dates Completed", value: seedMe.datesCompleted, icon: Heart },
    { label: "Memories Created", value: seedMe.memoriesCreated, icon: Camera },
    { label: "Hours Together", value: seedMe.hoursTogether, icon: Clock },
    { label: "Favorite Activity", value: seedMe.favoriteActivity, icon: Star },
  ];

  return (
    <div>
      <PageHeader eyebrow="A Portrait" title="Your Page in the Diary" subtitle="A small gallery of who you are, kept beside his." />
      <div className="grid gap-8 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="lg:col-span-1">
          <div className="diary-card relative p-6 paper-texture">
            <div className="ornament-border overflow-hidden rounded-md">
              <img src={profile.avatar} alt={profile.name} className="aspect-[3/4] w-full object-cover sepia-[15%]" />
            </div>
            <p className="mt-5 text-center font-display text-3xl text-primary">{profile.name}</p>
            <p className="text-center font-hand text-xl text-muted-foreground">& {profile.partner}</p>
            <div className="mt-4 flex items-center justify-center gap-1.5 font-body italic text-muted-foreground">
              <MapPin className="h-4 w-4" /> {profile.location}
            </div>
            <VintageButton variant="gold" className="mt-6 w-full" onClick={() => setEditing(true)}>
              <Pencil className="h-4 w-4" /> Edit Profile
            </VintageButton>
          </div>
        </motion.div>

        <div className="space-y-6 lg:col-span-2">
          <VintageCard ornament className="p-8">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">About</p>
            <p className="mt-3 font-body text-xl italic leading-relaxed text-foreground">"{profile.bio}"</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Anniversary</p>
                <p className="font-display text-xl text-primary">{profile.anniversary}</p>
              </div>
              <div>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Days together</p>
                <p className="font-display text-xl text-primary">{profile.daysTogether}</p>
              </div>
            </div>
          </VintageCard>

          <div className="grid gap-4 sm:grid-cols-2">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <VintageCard key={s.label} className="flex items-center gap-4 p-5">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{s.label}</p>
                    <p className="truncate font-display text-2xl text-primary">{s.value}</p>
                  </div>
                </VintageCard>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {editing && (
          <EditModal
            profile={profile}
            onClose={() => setEditing(false)}
            onSave={(next) => { setProfile(next); setEditing(false); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EditModal({
  profile, onClose, onSave,
}: { profile: ProfileShape; onClose: () => void; onSave: (p: ProfileShape) => void }) {
  const [draft, setDraft] = useState(profile);

  function field<K extends keyof ProfileShape>(k: K, v: ProfileShape[K]) {
    setDraft((d) => ({ ...d, [k]: v }));
  }

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-ink/60 p-4 backdrop-blur"
      onClick={onClose}
    >
      <motion.form
        initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        onSubmit={(e) => { e.preventDefault(); onSave(draft); }}
        className="diary-card paper-texture w-full max-w-2xl p-7"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">A revision to the portrait</p>
            <h3 className="mt-1 font-display text-3xl text-primary">Edit Profile</h3>
          </div>
          <button type="button" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full text-muted-foreground hover:bg-secondary">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Your name"      value={draft.name}     onChange={(v) => field("name", v)} />
          <Field label="Partner's name" value={draft.partner}  onChange={(v) => field("partner", v)} />
          <Field label="Location"       value={draft.location} onChange={(v) => field("location", v)} />
          <Field label="Anniversary"    value={draft.anniversary} onChange={(v) => field("anniversary", v)} />
          <Field label="Avatar URL"     value={draft.avatar}   onChange={(v) => field("avatar", v)} className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <span className="mb-1.5 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">A line about you</span>
            <textarea
              value={draft.bio}
              onChange={(e) => field("bio", e.target.value)}
              rows={3}
              className="w-full rounded-md border border-border bg-card/60 p-3 font-body text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <VintageButton type="button" variant="ghost" onClick={onClose}>Cancel</VintageButton>
          <VintageButton type="submit" variant="primary">Save to diary</VintageButton>
        </div>
      </motion.form>
    </motion.div>
  );
}

function Field({
  label, value, onChange, className = "",
}: { label: string; value: string; onChange: (v: string) => void; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-b-2 border-border bg-transparent px-2 py-2.5 font-body text-lg text-foreground placeholder:text-muted-foreground/60 focus:border-accent focus:outline-none"
      />
    </label>
  );
}
