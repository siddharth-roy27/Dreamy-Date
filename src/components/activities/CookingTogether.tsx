import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ChefHat, Check, Timer as TimerIcon, Flame } from "lucide-react";
import { currentUser, partner } from "@/lib/mock";

type Recipe = {
  id: string;
  title: string;
  cuisine: string;
  time: number;
  serves: number;
  hero: string;
  ingredients: string[];
  steps: { text: string; minutes: number; emoji: string }[];
};

const RECIPES: Recipe[] = [
  {
    id: "risotto",
    title: "Mushroom Risotto",
    cuisine: "Italian",
    time: 35,
    serves: 2,
    hero: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&q=80",
    ingredients: [
      "1½ cups arborio rice",
      "4 cups warm stock",
      "200g mixed mushrooms",
      "1 small onion, diced",
      "½ cup white wine",
      "½ cup parmesan",
      "2 tbsp butter, salt, pepper",
    ],
    steps: [
      { text: "Warm the stock. Soften onion in butter until translucent.", minutes: 5, emoji: "🧅" },
      { text: "Toast rice 2 min. Pour the wine, let it whisper away.", minutes: 4, emoji: "🍷" },
      { text: "Ladle stock in slowly, stir like you mean it.", minutes: 18, emoji: "🥄" },
      { text: "Fold mushrooms, parmesan, butter. Rest 2 min.", minutes: 6, emoji: "🍄" },
      { text: "Plate. Light a candle. Toast each other.", minutes: 2, emoji: "🕯️" },
    ],
  },
  {
    id: "pasta",
    title: "Cacio e Pepe",
    cuisine: "Roman",
    time: 20,
    serves: 2,
    hero: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80",
    ingredients: ["200g tonnarelli", "100g pecorino", "2 tsp black pepper", "salt"],
    steps: [
      { text: "Boil salted water. Drop pasta.", minutes: 2, emoji: "💧" },
      { text: "Toast pepper in a dry pan until fragrant.", minutes: 2, emoji: "🌶️" },
      { text: "Reserve starchy water. Whisk pecorino with a splash.", minutes: 3, emoji: "🧀" },
      { text: "Toss pasta with pepper, then the cheese cream.", minutes: 3, emoji: "🍝" },
      { text: "Plate. Eat immediately. Smile widely.", minutes: 1, emoji: "💕" },
    ],
  },
  {
    id: "ramen",
    title: "Shoyu Ramen",
    cuisine: "Japanese",
    time: 45,
    serves: 2,
    hero: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80",
    ingredients: ["2 portions ramen noodles", "1L dashi", "soy + mirin tare", "2 eggs", "scallions, nori"],
    steps: [
      { text: "Simmer dashi. Mix tare in serving bowls.", minutes: 8, emoji: "🍲" },
      { text: "Soft-boil eggs 6½ min, ice bath, peel.", minutes: 8, emoji: "🥚" },
      { text: "Cook noodles to package time.", minutes: 4, emoji: "🍜" },
      { text: "Ladle hot dashi over tare. Add noodles.", minutes: 2, emoji: "💨" },
      { text: "Top with egg, scallion, nori. Slurp loudly.", minutes: 1, emoji: "🥢" },
    ],
  },
];

export function CookingTogether() {
  const [recipe, setRecipe] = useState(RECIPES[0]);
  const [stepIdx, setStepIdx] = useState(0);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [timer, setTimer] = useState<number | null>(null);
  const [partnerStep, setPartnerStep] = useState(0);

  useEffect(() => { setStepIdx(0); setDone({}); setTimer(null); setPartnerStep(0); }, [recipe.id]);
  useEffect(() => {
    if (timer === null) return;
    if (timer <= 0) { setTimer(null); return; }
    const t = setTimeout(() => setTimer(s => (s ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  // Partner slowly progresses
  useEffect(() => {
    const t = setInterval(() => {
      setPartnerStep(s => Math.min(s + 1, recipe.steps.length));
    }, 7000);
    return () => clearInterval(t);
  }, [recipe.id, recipe.steps.length]);

  const step = recipe.steps[stepIdx];
  const completed = Object.values(done).filter(Boolean).length;
  const progress = (completed / recipe.steps.length) * 100;
  const partnerProgress = (partnerStep / recipe.steps.length) * 100;

  function completeStep() {
    setDone(d => ({ ...d, [stepIdx]: true }));
    setTimer(null);
    if (stepIdx < recipe.steps.length - 1) setStepIdx(stepIdx + 1);
  }

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;

  return (
    <div className="paper-texture diary-card ornament-border h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · VI</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Cook Together</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">one recipe, two kitchens</p>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.4fr]">
        {/* Recipe picker + ingredients */}
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            {RECIPES.map(r => (
              <button
                key={r.id}
                onClick={() => setRecipe(r)}
                className={`overflow-hidden rounded-md border bg-paper text-left transition ${recipe.id === r.id ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/60"}`}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={r.hero} alt={r.title} className="h-full w-full object-cover" />
                </div>
                <div className="px-2 py-1.5">
                  <p className="truncate font-display text-sm text-primary">{r.title}</p>
                  <p className="font-cinzel text-[9px] uppercase tracking-widest text-muted-foreground">{r.time}m</p>
                </div>
              </button>
            ))}
          </div>

          <div className="rounded-lg bg-secondary/40 p-4">
            <div className="flex items-baseline justify-between">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">mise en place</p>
              <p className="font-hand text-base text-muted-foreground">serves {recipe.serves}</p>
            </div>
            <ul className="mt-2 space-y-1">
              {recipe.ingredients.map(i => (
                <li key={i} className="flex items-start gap-2 font-hand text-lg text-primary">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
                  {i}
                </li>
              ))}
            </ul>
          </div>

          {/* Sync ribbon */}
          <div className="rounded-md border border-border bg-paper p-3">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">two kitchens, in sync</p>
            <div className="mt-2 space-y-2">
              {[
                { name: currentUser.name, pct: progress, color: "var(--gradient-burgundy)" },
                { name: partner.name, pct: partnerProgress, color: "var(--gradient-gold)" },
              ].map(p => (
                <div key={p.name}>
                  <div className="flex justify-between font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>{p.name}</span><span>{Math.round(p.pct)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <motion.div animate={{ width: `${p.pct}%` }} transition={{ duration: 0.5 }} className="h-full" style={{ background: p.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step-by-step */}
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border bg-paper p-5">
            <div className="flex items-center justify-between">
              <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">
                step {stepIdx + 1} of {recipe.steps.length}
              </p>
              <span className="inline-flex items-center gap-1 rounded-full bg-secondary/60 px-2 py-0.5 font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">
                <ChefHat className="h-3 w-3" /> {recipe.cuisine}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={stepIdx}
                initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3 flex items-start gap-4"
              >
                <span className="text-5xl">{step.emoji}</span>
                <div className="flex-1">
                  <p className="font-display text-xl text-primary leading-snug">{step.text}</p>
                  <p className="mt-1 font-hand text-base text-muted-foreground">about {step.minutes} minutes</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setTimer(step.minutes * 60)}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-paper px-3 py-2 font-cinzel text-[10px] uppercase tracking-widest text-primary hover:border-accent"
              >
                <TimerIcon className="h-3.5 w-3.5" /> start {step.minutes}m timer
              </button>
              <button
                onClick={completeStep}
                className="inline-flex items-center gap-2 rounded-md bg-[var(--gradient-burgundy)] px-4 py-2 font-cinzel text-[10px] uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)]"
              >
                <Check className="h-3.5 w-3.5" /> mark done
              </button>
              {timer !== null && (
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary/50 px-3 py-1 font-display text-lg text-primary">
                  <Flame className="h-4 w-4 text-accent" /> {fmt(timer)}
                </span>
              )}
            </div>
          </div>

          {/* All steps tracker */}
          <div className="rounded-lg border border-border bg-paper p-4">
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">tonight's flow</p>
            <ol className="mt-2 space-y-1">
              {recipe.steps.map((s, i) => (
                <li
                  key={i}
                  onClick={() => setStepIdx(i)}
                  className={`flex cursor-pointer items-center gap-3 rounded-md px-2 py-1.5 transition ${i === stepIdx ? "bg-secondary/60" : "hover:bg-secondary/30"}`}
                >
                  <span className={`grid h-6 w-6 place-items-center rounded-full text-[10px] font-cinzel ${done[i] ? "bg-[var(--gradient-gold)] text-ink" : "bg-secondary text-muted-foreground"}`}>
                    {done[i] ? <Check className="h-3 w-3" /> : i + 1}
                  </span>
                  <span className={`flex-1 font-hand text-base ${done[i] ? "text-muted-foreground line-through" : "text-primary"}`}>{s.text}</span>
                  <span className="font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground">{s.minutes}m</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
