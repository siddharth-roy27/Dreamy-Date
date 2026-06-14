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

// One account = one person. Partner is a separate profile linked by code.
export const currentUser = {
  id: "u-emma",
  name: "Emma",
  handle: "@emma.rose",
  avatar: "https://i.pravatar.cc/300?img=47",
  location: "Paris, France",
  bio: "Hopeless romantic. Tea hoarder.",
  joinedAt: "January 2024",
};

export const partner = {
  id: "u-james",
  name: "James",
  handle: "@james.w",
  avatar: "https://i.pravatar.cc/300?img=12",
  location: "Kyoto, Japan",
  bio: "Architect. Slow walker. Yours.",
  joinedAt: "January 2024",
};

export const coupleConnection = {
  code: "EMMA-ROSE-4921",
  inviteLink: "https://dreamydate.app/join/EMMA-ROSE-4921",
  status: "connected" as "pending" | "connected",
  linkedAt: "March 14, 2024",
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

// Full activity registry used by the Date Room dock.
export type ActivityId =
  | "bouquet" | "photobooth" | "music" | "dance" | "movie"
  | "cooking" | "paint" | "travel" | "games" | "letter";

export const dateRoomActivities: { id: ActivityId; name: string; icon: string; tagline: string }[] = [
  { id: "bouquet",   name: "Bouquet Studio",  icon: "🌹", tagline: "Arrange a posy for them." },
  { id: "photobooth",name: "Photo Booth",     icon: "📷", tagline: "Three. Two. One. Flash." },
  { id: "music",     name: "Gramophone",      icon: "🎵", tagline: "A record only you two hear." },
  { id: "dance",     name: "Dance Together",  icon: "💃", tagline: "Slow waltz, soft light." },
  { id: "movie",     name: "Movie Night",     icon: "🎬", tagline: "Curtain up, share a screen." },
  { id: "cooking",   name: "Cook Together",   icon: "🍳", tagline: "One recipe, two kitchens." },
  { id: "paint",     name: "Paint Together",  icon: "🎨", tagline: "A canvas you both touch." },
  { id: "travel",    name: "Virtual Travel",  icon: "✈️", tagline: "Tonight: Paris. Tomorrow: Kyoto." },
  { id: "games",     name: "Couple Games",    icon: "🎲", tagline: "Truth or dare, gently." },
  { id: "letter",    name: "Love Letter",     icon: "💌", tagline: "Sealed with wax, sent at once." },
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

// Planned date with activity timeline (sequence of activities back-to-back).
export type TimelineBlock = { id: string; activityId: ActivityId; startTime: string; durationMin: number; note?: string };

export const plannedDateDraft: { title: string; date: string; theme: string; timeline: TimelineBlock[] } = {
  title: "An Evening in Paris",
  date: "Sat, Apr 19 · 7:00 PM",
  theme: "romantic",
  timeline: [
    { id: "t1", activityId: "bouquet",   startTime: "7:00 PM", durationMin: 15, note: "open with roses" },
    { id: "t2", activityId: "photobooth",startTime: "7:15 PM", durationMin: 15 },
    { id: "t3", activityId: "movie",     startTime: "7:30 PM", durationMin: 60, note: "Amélie" },
    { id: "t4", activityId: "dance",     startTime: "8:30 PM", durationMin: 30 },
    { id: "t5", activityId: "letter",    startTime: "9:00 PM", durationMin: 15, note: "good-night letter" },
  ],
};

export const notifications = [
  { id: "n1", from: "James", title: "sent you a bouquet", preview: "Twelve red roses, with a charm.", time: "2h ago", unread: true },
  { id: "n2", from: "DreamyDate", title: "tonight's date is at 8 PM", preview: "Movie Under the Stars — be ready.", time: "5h ago", unread: true },
  { id: "n3", from: "James", title: "wrote you a love letter", preview: "My dearest Emma…", time: "yesterday", unread: false },
];

export type InboxKind = "letter" | "bouquet" | "date" | "memory" | "photo" | "reminder";
export const inboxItems: { id: string; kind: InboxKind; from: string; title: string; preview: string; time: string; unread: boolean }[] = [
  { id: "i1", kind: "letter",   from: "James",      title: "sealed a letter for you",   preview: "My dearest Emma, the moon here looks like the one we…", time: "12 min ago", unread: true },
  { id: "i2", kind: "bouquet",  from: "James",      title: "sent a bouquet",            preview: "Twelve red roses + sprig of lavender — \"yours, always.\"", time: "2h ago",     unread: true },
  { id: "i3", kind: "date",     from: "DreamyDate", title: "tonight at 8 PM",           preview: "Movie Under the Stars · Amélie · be in pyjamas.",         time: "5h ago",     unread: true },
  { id: "i4", kind: "memory",   from: "Archive",    title: "your AI movie is ready",    preview: "\"Snowfall in February\" — 0:42 reel polished.",          time: "yesterday",  unread: false },
  { id: "i5", kind: "photo",    from: "James",      title: "added a photo strip",       preview: "Three shots from the booth — golden hour filter.",        time: "yesterday",  unread: false },
  { id: "i6", kind: "reminder", from: "DreamyDate", title: "anniversary in 9 days",     preview: "Plan something? Bouquet + handwritten letter suggested.", time: "2 days ago", unread: false },
  { id: "i7", kind: "letter",   from: "James",      title: "broke a seal",              preview: "He's read your letter. He held it twice.",                 time: "3 days ago", unread: false },
];

export const receivedLetters = [
  { id: "l1", from: "James", date: "Apr 09, 2026", seal: "♡", body: "My dearest Emma, the moon here looks like the one we shared in the garden — only it has no one to share it with. I keep your photograph in my coat pocket and pretend the weight is your hand. Soon, soon. — J." },
  { id: "l2", from: "James", date: "Apr 02, 2026", seal: "✦", body: "I made the risotto without you and it was wrong. The kitchen needs your humming. Come back to it. Always, James." },
  { id: "l3", from: "James", date: "Mar 25, 2026", seal: "✿", body: "Today I bought a record because the sleeve looked like the dress you wore on our first night. I am writing this with the song still playing." },
  { id: "l4", from: "James", date: "Mar 14, 2026", seal: "♛", body: "Two years. Two whole years of choosing you across an ocean. Every dawn here is borrowed time until I can wake beside you." },
];

export type ArchiveKind = "letter" | "bouquet" | "photo" | "painting" | "movie" | "postcard" | "dance" | "song";
export const archiveItems: { id: string; kind: ArchiveKind; title: string; date: string; img?: string; quote: string }[] = [
  { id: "a1", kind: "photo",    title: "Photo Booth · Golden Hour", date: "Apr 09, 2026", img: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=80", quote: "Three shots. Two grins. One almost-kiss." },
  { id: "a2", kind: "bouquet",  title: "Twelve Roses + Lavender",   date: "Apr 09, 2026", img: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&q=80", quote: "Wrapped in kraft, tied in burgundy." },
  { id: "a3", kind: "letter",   title: "My dearest Emma…",          date: "Apr 09, 2026", quote: "The moon here looks like the one we shared." },
  { id: "a4", kind: "painting", title: "Two Brushes, One Sky",      date: "Apr 06, 2026", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&q=80", quote: "He painted the river. I painted us crossing it." },
  { id: "a5", kind: "movie",    title: "Snowfall in February",      date: "Feb 03, 2026", img: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=600&q=80", quote: "AI reel · 0:42 · piano scored." },
  { id: "a6", kind: "postcard", title: "Postcard from Kyoto",       date: "Jan 30, 2026", img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80", quote: "Lanterns over Gion. He bought one for our window." },
  { id: "a7", kind: "dance",    title: "Our First Tango",           date: "Jan 22, 2026", img: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&q=80", quote: "He stepped on my foot. Twice. I forgave him." },
  { id: "a8", kind: "song",     title: "La Vie en Rose · spun twice", date: "Jan 18, 2026", quote: "Gramophone · Édith Piaf · the needle still warm." },
  { id: "a9", kind: "photo",    title: "Sunrise Coffee",            date: "Jan 08, 2026", img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80", quote: "Same cup. Different time zone." },
  { id: "a10", kind: "letter",  title: "Two Years, James",          date: "Mar 14, 2026", quote: "Two whole years of choosing you across an ocean." },
];
