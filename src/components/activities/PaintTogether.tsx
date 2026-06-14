import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Brush, Eraser, Trash2, Download } from "lucide-react";

const PALETTE = ["#8B2635", "#D4A574", "#3E5C50", "#1A1F2E", "#E8B4B8", "#F4ECD8", "#C9A961", "#5D2E2E"];
const SIZES = [3, 6, 12, 22];

export function PaintTogether() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const partnerRef = useRef<HTMLCanvasElement>(null);
  const [color, setColor] = useState(PALETTE[0]);
  const [size, setSize] = useState(6);
  const [erase, setErase] = useState(false);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    // simulate partner brushstrokes
    const ctx = partnerRef.current?.getContext("2d");
    if (!ctx) return;
    let t = 0;
    const id = setInterval(() => {
      t += 0.08;
      ctx.fillStyle = "#3E5C50";
      const x = 150 + Math.cos(t) * 60;
      const y = 90 + Math.sin(t * 1.3) * 40;
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    }, 90);
    return () => clearInterval(id);
  }, []);

  function pos(e: React.PointerEvent) {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * canvasRef.current!.width, y: ((e.clientY - r.top) / r.height) * canvasRef.current!.height };
  }
  function down(e: React.PointerEvent) { drawing.current = true; last.current = pos(e); }
  function move(e: React.PointerEvent) {
    if (!drawing.current) return;
    const ctx = canvasRef.current!.getContext("2d")!;
    const p = pos(e);
    ctx.strokeStyle = erase ? "#f7efe2" : color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(last.current!.x, last.current!.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
  }
  function up() { drawing.current = false; last.current = null; }
  function clear() { const c = canvasRef.current!; c.getContext("2d")!.clearRect(0, 0, c.width, c.height); }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className="paper-texture diary-card ornament-border relative h-full overflow-hidden p-6 sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <p className="font-cinzel text-[10px] uppercase tracking-[0.35em] text-accent">Activity · VII</p>
          <h3 className="mt-1 font-display text-2xl text-primary sm:text-3xl">Paint Together</h3>
        </div>
        <p className="font-hand text-xl text-muted-foreground">a canvas you both touch</p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_200px]">
        <div className="space-y-3">
          <div className="relative rounded-md border-2 border-border bg-[#f7efe2] shadow-[var(--shadow-soft)]">
            <canvas
              ref={canvasRef} width={800} height={500}
              onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerLeave={up}
              className="block aspect-[8/5] w-full cursor-crosshair touch-none rounded-md"
            />
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 font-cinzel text-[9px] uppercase tracking-widest text-primary">your strokes</div>
          </div>
          <div className="relative rounded-md border border-dashed border-accent/40 bg-[#f7efe2]/60">
            <canvas ref={partnerRef} width={300} height={180} className="block aspect-[5/3] w-full rounded-md opacity-80" />
            <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-rose/80 px-3 py-1 font-cinzel text-[9px] uppercase tracking-widest text-cream">James is painting…</div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Palette</p>
            <div className="mt-2 grid grid-cols-4 gap-2">
              {PALETTE.map((c) => (
                <button key={c} onClick={() => { setColor(c); setErase(false); }}
                  style={{ background: c }}
                  className={`h-9 w-9 rounded-full border-2 transition ${color === c && !erase ? "border-accent shadow-[var(--shadow-gold)] scale-110" : "border-border"}`} />
              ))}
            </div>
          </div>
          <div>
            <p className="font-cinzel text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Brush</p>
            <div className="mt-2 flex items-center gap-2">
              {SIZES.map((s) => (
                <button key={s} onClick={() => setSize(s)}
                  className={`grid h-9 w-9 place-items-center rounded-md border-2 ${size === s ? "border-accent bg-rose/20" : "border-border bg-paper"}`}>
                  <span className="rounded-full bg-primary" style={{ width: s, height: s }} />
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setErase((v) => !v)}
              className={`inline-flex items-center justify-center gap-1 rounded-md border px-3 py-2 font-cinzel text-[10px] uppercase tracking-widest ${erase ? "border-accent bg-rose/20 text-primary" : "border-border bg-paper text-muted-foreground"}`}>
              <Eraser className="h-3 w-3" /> Erase
            </button>
            <button onClick={clear}
              className="inline-flex items-center justify-center gap-1 rounded-md border border-border bg-paper px-3 py-2 font-cinzel text-[10px] uppercase tracking-widest text-muted-foreground hover:text-primary">
              <Trash2 className="h-3 w-3" /> Clear
            </button>
          </div>
          <button className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[var(--gradient-burgundy)] px-4 py-3 font-cinzel text-[11px] uppercase tracking-widest text-primary-foreground">
            <Brush className="h-3.5 w-3.5" /> Save to Archive
          </button>
          <p className="font-hand text-base text-muted-foreground">two brushes, one painting — the strokes blend in your memory book.</p>
        </div>
      </div>
    </motion.div>
  );
}
