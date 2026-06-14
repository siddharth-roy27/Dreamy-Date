import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Camera, Heart } from "lucide-react";

const DESTINATIONS = [
  { id: "paris",     name: "Paris",       country: "France",     img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80", tagline: "Walk the Seine at dusk." },
  { id: "venice",    name: "Venice",      country: "Italy",      img: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?w=900&q=80", tagline: "A gondola for two." },
  { id: "kyoto",     name: "Kyoto",       country: "Japan",      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80", tagline: "Lanterns over Gion." },
  { id: "santorini", name: "Santorini",   country: "Greece",     img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=900&q=80", tagline: "White walls, blue sea." },
  { id: "maldives",  name: "Maldives",    country: "Indian Sea", img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80", tagline: "An overwater hush." },
  { id: "alps",      name: "Swiss Alps",  country: "Switzerland",img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=900&q=80", tagline: "A cabin under stars." },
];

const CHALLENGES = [
  "Take a couple selfie at the landmark",
  "Order a dish neither of you have tried",
  "Send a postcard with one secret",
  "Find a song native to this place",
  "Plan the trip — flights, hotel, day one",
];

export function VirtualTravel() {
  const [active, setActive] = useState(DESTINATIONS[0]);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="paper-texture diary-card ornament-border relative h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · VIII</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Virtual Travel</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">tonight: {active.name}</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            className="relative overflow-hidden rounded-md border border-border shadow-[var(--shadow-diary)]">
            <img src={active.img} alt={active.name} className="aspect-[4/3] w-full object-cover sepia-[15%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-cream/90 px-3 py-1 font-cinzel text-[10px] uppercase tracking-widest text-primary">
                <MapPin className="h-3 w-3" /> {active.country}
              </div>
              <p className="mt-3 font-display text-4xl text-cream">{active.name}</p>
              <p className="font-hand text-2xl text-gold">{active.tagline}</p>
            </div>
            {/* postcard stamp */}
            <div className="absolute right-4 top-4 rotate-6 border-2 border-cream/80 bg-cream/10 px-3 py-2 text-center font-cinzel text-[9px] uppercase tracking-widest text-cream backdrop-blur-sm">
              <p>Postcard</p><p className="text-gold">№ {active.id}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="space-y-4">
          <div className="rounded-md border border-border bg-paper p-4">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Tonight's couple challenges</p>
            <ul className="mt-3 space-y-2">
              {CHALLENGES.map((c, i) => (
                <li key={i} className="flex items-start gap-3 font-hand text-lg text-foreground">
                  <span className="mt-1 grid h-5 w-5 flex-none place-items-center rounded-full bg-rose/30 text-[10px] text-primary">{i + 1}</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-[var(--gradient-burgundy)] px-3 py-2.5 font-cinzel text-[10px] uppercase tracking-widest text-primary-foreground">
              <Camera className="h-3 w-3" /> Take Postcard
            </button>
            <button className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-border bg-paper px-3 py-2.5 font-cinzel text-[10px] uppercase tracking-widest text-primary">
              <Heart className="h-3 w-3" /> Save Place
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Choose tonight's destination</p>
        <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {DESTINATIONS.map((d) => (
            <button key={d.id} onClick={() => setActive(d)}
              className={`overflow-hidden rounded-md border-2 text-left transition ${active.id === d.id ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/50"}`}>
              <img src={d.img} className="aspect-[4/3] w-full object-cover sepia-[20%]" />
              <p className="px-2 py-1.5 font-cinzel text-[10px] uppercase tracking-widest text-primary">{d.name}</p>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
