import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Home, User, Calendar, Heart, Video, Music,
  BookHeart, Settings, CalendarPlus, Sparkles,
} from "lucide-react";
import type { ReactNode } from "react";

const nav = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/calendar", label: "Calendar", icon: Calendar },
  { to: "/plan", label: "Plan Date", icon: CalendarPlus },
  { to: "/host", label: "Host Date", icon: Heart },
  { to: "/song-room", label: "Song Room", icon: Music },
  { to: "/video-date", label: "Video Date", icon: Video },
  { to: "/memories", label: "Memories", icon: BookHeart },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-screen">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-card/60 px-5 py-8 backdrop-blur-sm lg:flex">
        <Link to="/" className="mb-10 block">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="font-display text-2xl text-primary">DreamyDate</span>
          </div>
          <p className="mt-1 font-hand text-sm text-muted-foreground">a shared diary of love</p>
        </Link>
        <nav className="flex flex-1 flex-col gap-1">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-cinzel text-sm tracking-wide transition ${
                  active
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="active-pill"
                    className="absolute right-2 h-1.5 w-1.5 rounded-full bg-accent"
                  />
                )}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 rounded-xl border border-border/60 bg-secondary/50 p-4">
          <p className="font-hand text-base text-primary">"Distance means so little when someone means so much."</p>
          <p className="mt-2 font-cinzel text-[10px] uppercase tracking-[0.25em] text-muted-foreground">— a love letter</p>
        </div>
      </aside>

      <main className="min-h-screen lg:ml-64">
        <div className="mx-auto max-w-7xl px-4 pb-28 pt-6 sm:px-8 sm:pt-10 lg:pb-12">
          {children}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/90 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-5 gap-1 px-2 py-2">
          {nav.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 rounded-lg py-2 text-[10px] font-cinzel uppercase tracking-wider ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label.split(" ")[0]}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
