import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { Dice5, Shuffle, Heart } from "lucide-react";
import { currentUser, partner } from "@/lib/mock";

type GameId = "truth-dare" | "this-or-that" | "quiz" | "trivia";

const TRUTH_DARE = {
  truths: [
    "What was the moment you knew?",
    "What's a song that always reminds you of me?",
    "What's one thing you've never told me?",
    "If we had one day together, where would we go?",
    "What's your favorite memory of us?",
    "What part of me do you miss the most right now?",
  ],
  dares: [
    "Tell me 'I love you' in another language.",
    "Show me your worst dance move.",
    "Read the last text you sent me out loud.",
    "Make me laugh in under 30 seconds.",
    "Send a selfie right now — no filter.",
    "Sing the chorus of our song.",
  ],
};

const THIS_OR_THAT = [
  ["Mountains", "Ocean"],
  ["Sunrise", "Sunset"],
  ["Paris", "Kyoto"],
  ["Coffee", "Tea"],
  ["Movies", "Music"],
  ["Stay in", "Go out"],
  ["Wine", "Whiskey"],
  ["Dogs", "Cats"],
  ["Texting", "Calling"],
  ["Forehead kiss", "Hand hold"],
] as const;

const QUIZ = [
  { q: "What's my favorite flower?", a: ["Tulips", "Peonies", "Roses", "Lilies"], correct: 2 },
  { q: "Where did we first meet?", a: ["A café", "Online", "A wedding", "A train"], correct: 1 },
  { q: "What's my comfort meal?", a: ["Ramen", "Pasta", "Pancakes", "Curry"], correct: 1 },
  { q: "My go-to ice cream?", a: ["Vanilla", "Pistachio", "Chocolate", "Strawberry"], correct: 1 },
  { q: "Morning person or night owl?", a: ["Morning", "Night", "Both", "Neither"], correct: 1 },
];

const TRIVIA = [
  { q: "Which year was 'Casablanca' released?", a: ["1939", "1942", "1948", "1951"], correct: 1 },
  { q: "Who sang 'La Vie en Rose'?", a: ["Piaf", "Aznavour", "Brel", "Gainsbourg"], correct: 0 },
  { q: "Tango originated in…", a: ["Spain", "Cuba", "Argentina", "Italy"], correct: 2 },
  { q: "Eiffel Tower height (m)?", a: ["230", "300", "330", "412"], correct: 2 },
];

const GAMES: { id: GameId; name: string; tagline: string; icon: string }[] = [
  { id: "truth-dare",   name: "Truth or Dare",  tagline: "soft questions, gentle dares", icon: "🎭" },
  { id: "this-or-that", name: "This or That",   tagline: "quick taps, no thinking",       icon: "↔️" },
  { id: "quiz",         name: "Couple Quiz",    tagline: "how well do they know you?",   icon: "💞" },
  { id: "trivia",       name: "Love Trivia",    tagline: "facts, romance, history",      icon: "📚" },
];

export function CoupleGames() {
  const [game, setGame] = useState<GameId>("truth-dare");

  return (
    <div className="paper-texture diary-card ornament-border h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · IX</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Couple Games</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">a little play between two hearts</p>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GAMES.map(g => (
          <button
            key={g.id}
            onClick={() => setGame(g.id)}
            className={`rounded-lg border bg-paper p-3 text-left transition ${game === g.id ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/60"}`}
          >
            <div className="text-2xl">{g.icon}</div>
            <p className="mt-1 font-display text-base text-primary">{g.name}</p>
            <p className="font-hand text-sm text-muted-foreground">{g.tagline}</p>
          </button>
        ))}
      </div>

      <div className="mt-6">
        <AnimatePresence mode="wait">
          {game === "truth-dare" && <motion.div key="td" {...fade}><TruthOrDare /></motion.div>}
          {game === "this-or-that" && <motion.div key="tot" {...fade}><ThisOrThat /></motion.div>}
          {game === "quiz" && <motion.div key="q" {...fade}><Quiz /></motion.div>}
          {game === "trivia" && <motion.div key="t" {...fade}><Trivia /></motion.div>}
        </AnimatePresence>
      </div>
    </div>
  );
}

const fade = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -8 },
  transition: { duration: 0.25 },
};

function pick<T>(arr: readonly T[]) { return arr[Math.floor(Math.random() * arr.length)]; }

function TruthOrDare() {
  const [mode, setMode] = useState<"truth" | "dare">("truth");
  const [prompt, setPrompt] = useState(TRUTH_DARE.truths[0]);
  const [target, setTarget] = useState(partner.name);

  function spin(next?: "truth" | "dare") {
    const m = next ?? (Math.random() > 0.5 ? "truth" : "dare");
    setMode(m);
    setPrompt(pick(m === "truth" ? TRUTH_DARE.truths : TRUTH_DARE.dares));
    setTarget(Math.random() > 0.5 ? currentUser.name : partner.name);
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_2fr]">
      <div className="rounded-lg bg-secondary/40 p-4">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">choose</p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {(["truth", "dare"] as const).map(m => (
            <button
              key={m}
              onClick={() => spin(m)}
              className={`rounded-md border bg-paper py-3 font-display text-lg capitalize transition ${mode === m ? "border-accent text-primary shadow-[var(--shadow-gold)]" : "border-border text-muted-foreground hover:border-accent/60"}`}
            >{m}</button>
          ))}
        </div>
        <button
          onClick={() => spin()}
          className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gradient-burgundy)] py-2.5 font-cinzel text-[10px] uppercase tracking-widest text-primary-foreground shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-gold)]"
        >
          <Shuffle className="h-3.5 w-3.5" /> spin again
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={prompt}
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="paper-texture grid place-items-center rounded-lg border border-border p-8 text-center"
          style={{ minHeight: 220 }}
        >
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.4em] text-accent">{target}, a {mode}</p>
            <p className="mt-3 font-script text-3xl text-primary leading-snug sm:text-4xl">"{prompt}"</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function ThisOrThat() {
  const [picks, setPicks] = useState<Record<number, 0 | 1>>({});
  const [partnerPicks] = useState<Record<number, 0 | 1>>(() => {
    const p: Record<number, 0 | 1> = {};
    THIS_OR_THAT.forEach((_, i) => { if (Math.random() > 0.4) p[i] = Math.random() > 0.5 ? 0 : 1; });
    return p;
  });
  const matches = useMemo(() =>
    Object.keys(picks).filter(k => partnerPicks[+k] !== undefined && partnerPicks[+k] === picks[+k]).length,
    [picks, partnerPicks]);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">tap a side</p>
        <p className="font-hand text-lg text-primary">
          <Heart className="mr-1 inline h-4 w-4 fill-rose text-rose" /> {matches} matches with {partner.name}
        </p>
      </div>
      <div className="grid gap-2">
        {THIS_OR_THAT.map(([a, b], i) => {
          const mine = picks[i];
          const theirs = partnerPicks[i];
          return (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-2">
              {[a, b].map((label, side) => {
                const sideN = side as 0 | 1;
                const isMine = mine === sideN;
                const isTheirs = theirs === sideN;
                return (
                  <button
                    key={side}
                    onClick={() => setPicks(p => ({ ...p, [i]: sideN }))}
                    className={`relative rounded-md border bg-paper px-4 py-3 font-display text-lg text-primary transition ${isMine ? "border-accent shadow-[var(--shadow-gold)]" : "border-border hover:border-accent/60"}`}
                  >
                    {label}
                    <span className="absolute -bottom-1.5 left-1/2 flex -translate-x-1/2 gap-1">
                      {isMine && <span className="h-2 w-2 rounded-full bg-[var(--gradient-burgundy)]" title="you" />}
                      {isTheirs && <span className="h-2 w-2 rounded-full bg-[var(--gradient-gold)]" title={partner.name} />}
                    </span>
                  </button>
                );
              })}
              <span className="self-center font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground sr-only">or</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function QuizBoard({ data, headline }: { data: typeof QUIZ; headline: string }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const q = data[i];
  const done = i >= data.length - 1 && picked !== null;

  function choose(idx: number) {
    if (picked !== null) return;
    setPicked(idx);
    if (idx === q.correct) setScore(s => s + 1);
  }
  function next() {
    if (i < data.length - 1) { setI(i + 1); setPicked(null); }
  }
  function reset() { setI(0); setPicked(null); setScore(0); }

  return (
    <div className="rounded-lg border border-border bg-paper p-5">
      <div className="flex items-baseline justify-between">
        <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-accent">{headline}</p>
        <p className="font-hand text-base text-muted-foreground">question {i + 1} of {data.length} · score {score}</p>
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
          <p className="mt-3 font-display text-2xl text-primary">{q.q}</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {q.a.map((opt, idx) => {
              const isCorrect = picked !== null && idx === q.correct;
              const isWrong = picked === idx && idx !== q.correct;
              return (
                <button
                  key={idx}
                  onClick={() => choose(idx)}
                  disabled={picked !== null}
                  className={`rounded-md border px-3 py-3 text-left font-hand text-lg transition
                    ${isCorrect ? "border-sage bg-sage/15 text-primary" : ""}
                    ${isWrong ? "border-rose bg-rose/15 text-primary" : ""}
                    ${picked === null ? "border-border bg-paper text-primary hover:border-accent" : ""}
                    ${picked !== null && !isCorrect && !isWrong ? "border-border bg-paper text-muted-foreground" : ""}
                  `}
                >{opt}</button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="mt-4 flex justify-end gap-2">
        {done ? (
          <button onClick={reset} className="rounded-md bg-[var(--gradient-burgundy)] px-4 py-2 font-cinzel text-[10px] uppercase tracking-widest text-primary-foreground">play again</button>
        ) : (
          <button onClick={next} disabled={picked === null} className="rounded-md bg-[var(--gradient-burgundy)] px-4 py-2 font-cinzel text-[10px] uppercase tracking-widest text-primary-foreground disabled:opacity-40">
            next
          </button>
        )}
      </div>
    </div>
  );
}

function Quiz()   { return <QuizBoard data={QUIZ}   headline={`how well does ${partner.name} know you?`} />; }
function Trivia() { return <QuizBoard data={TRIVIA} headline="love &amp; classics trivia" />; }
