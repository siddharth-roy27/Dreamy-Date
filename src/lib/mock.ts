export const me = {
  name: "Emma",
  partner: "James",
  avatar: "https://i.pravatar.cc/200?img=47",
  partnerAvatar: "https://i.pravatar.cc/200?img=12",
  bio: "Hopeless romantic. Tea hoarder. Counting sunsets until we meet again.",
  location: "Paris, France",
  partnerLocation: "Kyoto, Japan",
  anniversary: "March 14, 2022",
  daysTogether: 1187,
  datesCompleted: 142,
  memoriesCreated: 318,
  hoursTogether: 642,
  favoriteActivity: "Slow Dancing",
};

export const upcomingDates = [
  { id: "1", title: "Movie Under the Stars", date: "Fri, Apr 12", time: "8:00 PM", theme: "Romantic", activity: "Movie Night" },
  { id: "2", title: "Cook Together: Risotto", date: "Sun, Apr 14", time: "6:30 PM", theme: "Cozy", activity: "Cooking" },
  { id: "3", title: "Waltz at Midnight", date: "Fri, Apr 19", time: "11:00 PM", theme: "Romantic", activity: "Dance" },
];

export const recentMemories = [
  { id: "1", title: "Snowfall in February", date: "Feb 03, 2026", quote: "We watched it fall together, 6000 miles apart.", img: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80" },
  { id: "2", title: "Our First Tango", date: "Jan 22, 2026", quote: "He stepped on my foot. Twice. I forgave him.", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80" },
  { id: "3", title: "Sunrise Coffee", date: "Jan 08, 2026", quote: "Same cup. Different time zone.", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80" },
  { id: "4", title: "Pasta & Promises", date: "Dec 30, 2025", quote: "He swore the sauce was simple. It wasn't.", img: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&q=80" },
];

export const activities = [
  { id: "movie", name: "Movie Night", icon: "🎬", desc: "Synchronized screens, shared popcorn." },
  { id: "dance", name: "Dance Together", icon: "💃", desc: "Pick a song, pick a style." },
  { id: "cook", name: "Cooking Date", icon: "🍝", desc: "Same recipe, two kitchens." },
  { id: "travel", name: "Travel Adventure", icon: "🗺️", desc: "Virtual journeys together." },
  { id: "bouquet", name: "Bouquet Exchange", icon: "💐", desc: "Send a digital posy." },
  { id: "photo", name: "Photo Booth", icon: "📸", desc: "Vintage filters, silly faces." },
];

export const themes = [
  { id: "romantic", name: "Romantic", color: "rose" },
  { id: "fun", name: "Fun", color: "gold" },
  { id: "cozy", name: "Cozy", color: "burgundy" },
  { id: "adventure", name: "Adventure", color: "sage" },
  { id: "creative", name: "Creative", color: "rose" },
];

export const playlist = [
  { id: "1", title: "La Vie en Rose", artist: "Édith Piaf", duration: "3:07" },
  { id: "2", title: "At Last", artist: "Etta James", duration: "3:00" },
  { id: "3", title: "Can't Help Falling in Love", artist: "Elvis Presley", duration: "2:58" },
  { id: "4", title: "Moon River", artist: "Audrey Hepburn", duration: "2:42" },
  { id: "5", title: "Fly Me to the Moon", artist: "Frank Sinatra", duration: "2:28" },
];

export const dances = [
  { id: "waltz", name: "Waltz", tempo: "Slow • 3/4" },
  { id: "tango", name: "Tango", tempo: "Passionate" },
  { id: "swing", name: "Swing", tempo: "Lively" },
  { id: "bachata", name: "Bachata", tempo: "Sensual" },
];

export const calendarDays: { day: number; status?: "scheduled" | "completed" | "missed"; label?: string }[] = [
  ...Array.from({ length: 30 }, (_, i) => ({ day: i + 1 })),
];
calendarDays[2] = { day: 3, status: "completed", label: "Picnic" };
calendarDays[9] = { day: 10, status: "completed", label: "Movie" };
calendarDays[14] = { day: 15, status: "missed", label: "Dance" };
calendarDays[18] = { day: 19, status: "scheduled", label: "Waltz" };
calendarDays[22] = { day: 23, status: "scheduled", label: "Cook" };
