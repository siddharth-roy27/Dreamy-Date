import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Sparkles, Heart, Clapperboard, Music, BookHeart, Mail, Camera, Palette, Plane,
  ChevronRight, Star, Quote,
} from "lucide-react";
import { VintageButton, FloatingParticles, WaxSeal } from "@/components/vintage";
import heroBallroom from "@/assets/hero-ballroom.jpg";
import landingDiary from "@/assets/landing-diary.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DreamyDate — Where hearts meet, even when apart" },
      { name: "description", content: "A romantic, vintage-styled platform for long-distance couples. Plan dates, dance, write love letters, and keep a shared diary of your love." },
      { property: "og:title", content: "DreamyDate — Where hearts meet, even when apart" },
      { property: "og:description", content: "Plan dates, dance, write love letters, and keep a shared diary of your love." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Clapperboard, title: "Date Room",     desc: "A candlelit room with ten activities — bouquets, gramophones, slow dances, shared canvases." },
  { icon: Music,        title: "Song Room",     desc: "Spin a record together. The needle hits the same groove on two continents." },
  { icon: Mail,         title: "Love Letters",  desc: "Handwritten on paper, sealed with wax, delivered in an instant." },
  { icon: Camera,       title: "Photo Booth",   desc: "Three. Two. One. Flash. Three sepia frames you'll keep forever." },
  { icon: Palette,      title: "Paint Together",desc: "Two brushes, one canvas. His strokes appear beside yours in real time." },
  { icon: Plane,        title: "Virtual Travel",desc: "Tonight Paris, tomorrow Kyoto. Postcards stamped by you." },
  { icon: BookHeart,    title: "Memory Archive",desc: "Every letter, every bouquet, every reel — bound into a diary of your years." },
  { icon: Heart,        title: "AI Date Movies",desc: "A 42-second reel of your evening, scored and sepia-toned by morning." },
];

const testimonials = [
  { quote: "We've been apart eleven months. The Song Room makes Tuesday feel like a first dance.", from: "Amélie & Theo", route: "Paris ↔ Montréal" },
  { quote: "He sealed me a letter with a real wax stamp. I cried in the kitchen.",                from: "Mei & Jonas",   route: "Taipei ↔ Berlin" },
  { quote: "Our anniversary movie is the most beautiful thing on my phone.",                       from: "Lily & Sam",    route: "Brisbane ↔ Dublin" },
];

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <FloatingParticles />

      {/* Top bar */}
      <header className="relative z-10">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 sm:py-7">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-display text-2xl text-primary">DreamyDate</span>
          </Link>
          <div className="hidden items-center gap-8 font-cinzel text-[11px] uppercase tracking-[0.3em] text-muted-foreground md:flex">
            <a href="#features" className="hover:text-primary">Features</a>
            <a href="#how" className="hover:text-primary">How it works</a>
            <a href="#stories" className="hover:text-primary">Stories</a>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="hidden font-cinzel text-[11px] uppercase tracking-[0.3em] text-foreground/80 hover:text-primary sm:inline">Sign in</Link>
            <Link to="/register"><VintageButton variant="primary" className="px-4 py-2 text-[10px]">Begin</VintageButton></Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 pt-6 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="font-cinzel text-[11px] uppercase tracking-[0.4em] text-accent">For Long-Distance Lovers · MMXXVI</p>
            <h1 className="mt-4 font-display text-5xl leading-[1.05] text-primary sm:text-6xl lg:text-7xl">
              Where hearts meet,<br />
              <span className="italic">even when apart.</span>
            </h1>
            <p className="mt-5 max-w-xl font-body text-lg italic leading-relaxed text-muted-foreground sm:text-xl">
              A shared diary of love — candlelit dates, dances, wax-sealed letters, and a quiet little world built just for the two of you.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link to="/register"><VintageButton variant="primary">Open your diary <ChevronRight className="h-4 w-4" /></VintageButton></Link>
              <Link to="/home"><VintageButton variant="ghost">Take the tour</VintageButton></Link>
            </div>
            <div className="mt-8 flex items-center gap-6 font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              <span className="flex items-center gap-1 text-accent">{"★★★★★".split("").map((s, i) => <Star key={i} className="h-3.5 w-3.5 fill-accent" />)}</span>
              <span>loved by 12,000+ couples on six continents</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1 }}
            className="relative"
          >
            <div className="relative ornament-border overflow-hidden rounded-md diary-card paper-texture p-3 shadow-[var(--shadow-diary)]">
              <img
                src={heroBallroom}
                alt="A candlelit ballroom at twilight with two distant dancers"
                width={1536}
                height={896}
                className="h-auto w-full rounded-md object-cover"
              />
              <div className="absolute right-6 top-6"><WaxSeal label="❤" /></div>
            </div>
            <motion.div
              initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -left-4 hidden max-w-xs rotate-[-3deg] bg-paper p-4 shadow-[var(--shadow-diary)] sm:block"
            >
              <p className="font-hand text-lg text-primary">"He kissed the page goodnight."</p>
              <p className="mt-1 font-cinzel text-[9px] uppercase tracking-[0.3em] text-muted-foreground">— a love letter, Tuesday</p>
            </motion.div>
          </motion.div>
        </div>

        {/* divider */}
        <div className="mx-auto flex max-w-3xl items-center gap-3 px-8">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-accent/60" />
          <span className="text-accent">❦</span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-accent/60" />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 text-center">
          <p className="font-cinzel text-[11px] uppercase tracking-[0.4em] text-accent">The Rooms of the Diary</p>
          <h2 className="mt-3 font-display text-4xl text-primary sm:text-5xl">Eight ways to be together tonight</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                className="diary-card paper-texture p-6 transition hover:-translate-y-1 hover:shadow-[var(--shadow-gold)]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[var(--gradient-gold)] text-ink">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-xl text-primary">{f.title}</h3>
                <p className="mt-2 font-body text-sm italic leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="relative z-10 bg-card/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <div className="mb-12 grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="font-cinzel text-[11px] uppercase tracking-[0.4em] text-accent">A short ritual</p>
              <h2 className="mt-3 font-display text-4xl text-primary sm:text-5xl">How a DreamyDate begins</h2>
              <ol className="mt-8 space-y-6">
                {[
                  { n: "I", t: "Open your diary",   d: "Make an account in under a minute. Choose your handle and a wax seal." },
                  { n: "II", t: "Invite your love",  d: "Send one link. They become the second page in your diary." },
                  { n: "III", t: "Plan an evening", d: "Pick a theme, drag activities onto the timeline — bouquet, movie, letter." },
                  { n: "IV", t: "Step into the room", d: "Tonight, the door opens. Side-by-side video. Shared everything." },
                ].map((s) => (
                  <li key={s.n} className="flex gap-5">
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[var(--gradient-burgundy)] font-display text-lg text-primary-foreground shadow-[var(--shadow-soft)]">
                      {s.n}
                    </div>
                    <div>
                      <p className="font-display text-xl text-primary">{s.t}</p>
                      <p className="font-body italic text-muted-foreground">{s.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <motion.div
              initial={{ opacity: 0, rotate: -2 }} whileInView={{ opacity: 1, rotate: -1 }} viewport={{ once: true }}
              className="relative"
            >
              <div className="ornament-border overflow-hidden rounded-md diary-card paper-texture p-3 shadow-[var(--shadow-diary)]">
                <img
                  src={landingDiary}
                  alt="A candlelit writing desk with diary, quill, and wax-sealed envelope"
                  width={1600}
                  height={1024}
                  loading="lazy"
                  className="h-auto w-full rounded-md object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-12 text-center">
          <p className="font-cinzel text-[11px] uppercase tracking-[0.4em] text-accent">Pages from real diaries</p>
          <h2 className="mt-3 font-display text-4xl text-primary sm:text-5xl">What lovers are writing</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.from}
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="diary-card paper-texture relative p-7"
            >
              <Quote className="h-7 w-7 text-accent/60" />
              <p className="mt-3 font-hand text-2xl leading-snug text-primary">"{t.quote}"</p>
              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <p className="font-display text-lg text-primary">{t.from}</p>
                <p className="font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">{t.route}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 mx-auto max-w-5xl px-5 pb-24 sm:px-8">
        <div className="diary-card ornament-border relative overflow-hidden p-10 text-center sm:p-16">
          <div className="absolute inset-0 opacity-30" style={{ background: "var(--gradient-burgundy)" }} />
          <div className="relative">
            <p className="font-cinzel text-[11px] uppercase tracking-[0.4em] text-accent">An open invitation</p>
            <h2 className="mt-3 font-display text-4xl text-primary sm:text-5xl">Your story begins tonight.</h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-lg italic text-foreground/80">
              Distance is just a chapter. Turn the page with us.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link to="/register"><VintageButton variant="primary">Begin our story <Heart className="h-4 w-4" /></VintageButton></Link>
              <Link to="/login"><VintageButton variant="ghost">I already have a diary</VintageButton></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="font-display text-lg text-primary">DreamyDate</span>
            <span className="font-hand text-base text-muted-foreground">· a shared diary of love</span>
          </div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">© MMXXVI · made with ❤ for distant lovers</p>
        </div>
      </footer>
    </div>
  );
}
