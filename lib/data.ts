// ✏️ Edit everything about the portfolio here.

export const profile = {
  name: "MOHAMMAD ADIB",
  fullName: "Mohammad Adib Armouch",
  shortName: "M.ADIB",
  title: "Software Engineer — Full-Stack, Mobile & LLM Applications",
  roles: ["FULL-STACK", "MOBILE", "LLM APPS", "AI-ASSISTED"],
  intro:
    "Software engineer and Computer Engineering graduate who builds complete products end to end — web platforms, Flutter apps and LLM-powered features — shipped fast with AI-assisted development and verified with tests.",
  location: "Riyadh, Saudi Arabia",
  education: "B.Sc. Computer Engineering · Jan 2026",
  languages: "Arabic · Turkish · English",
  email: "eng.mohammad.adib@gmail.com",
  socials: [
    { label: "GitHub", href: "https://github.com/m07adee" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mohammadadib102" },
    { label: "Email", href: "mailto:eng.mohammad.adib@gmail.com" },
  ],
};

export const about = [
  "I build complete products end to end — from Next.js platforms with role-based access and audit trails, to offline-first Flutter apps with live RTL switching, to multimodal LLM pipelines with schema-validated output.",
  "I ship quickly with AI-assisted workflows (Claude Code, Cursor) while reviewing and testing every line. I'm also a hands-on PC hardware troubleshooter, and fluent in Arabic and Turkish.",
];

export const nav = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

export const stats = [
  { value: 3000, suffix: "+", label: "Lines of Dart shipped" },
  { value: 15, suffix: "", label: "CV automation modules" },
  { value: 12, suffix: "", label: "REST endpoints designed" },
  { value: 3, suffix: "", label: "Languages spoken" },
];

export const skillRows = [
  [
    "Python", "TypeScript", "JavaScript", "Dart", "SQL", "Next.js", "Node.js", "REST APIs",
    "Prisma", "PostgreSQL", "Supabase (RLS)", "JWT / RBAC", "Streamlit", "Tailwind CSS",
  ],
  [
    "Gemini API", "Structured Outputs", "Pydantic", "Prompt Design", "OpenCV", "OCR", "Claude Code",
    "Cursor", "Flutter", "Riverpod", "Firebase", "Docker", "GitHub Actions", "Linux",
  ],
];

export type Project = {
  title: string;
  tag: string;
  description: string;
  highlights: string[];
  stack: string[];
  href?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    title: "AI Meal Analyzer",
    tag: "LLM · Vision",
    description:
      "Multimodal pipeline that estimates portion weight, calories and macros from a single meal photo.",
    highlights: [
      "Schema-constrained JSON, validated & auto-corrected with Pydantic",
      "Calorie ↔ macro reconciliation (4/4/9 kcal/g) post-check",
      "Handles non-food images, 429 rate limits & caches per session",
    ],
    stack: ["Python", "Gemini 2.5 Flash", "Pydantic", "Streamlit"],
    href: "https://github.com/m07adee/ai-calorie-meal-scanner",
    gradient: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
  },
  {
    title: "Calorie Tracker App",
    tag: "Mobile · Flutter",
    description:
      "The companion Flutter app — 4 screens, ~3,000 lines of Dart and 11 Riverpod providers.",
    highlights: [
      "Arabic, English & Turkish (187 strings) with live RTL switching",
      "Offline-first Firestore sync & Firebase Auth incl. Google Sign-In",
      "Widget tests running in GitHub Actions CI",
    ],
    stack: ["Flutter", "Riverpod", "Firebase", "CI"],
    href: "https://github.com/m07adee/calorie-tracker-flutter",
    gradient: "from-emerald-400/40 via-teal-500/20 to-transparent",
  },
  {
    title: "TOGÜ IT Asset System",
    tag: "Web · Full-Stack",
    description:
      "7-page platform for Tokat Gaziosmanpaşa University's AI & Digital Transformation Coordination to track hardware, servers and staff custody.",
    highlights: [
      "12 REST endpoints over 3 Prisma models with JWT-based RBAC",
      "Full audit trail for assignments, returns & damage reports",
      "QR labels with direct thermal printing; Docker Compose stack",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
    href: "https://github.com/m07adee/togu-it-demirbas-sistemi",
    gradient: "from-cyan-400/40 via-sky-500/20 to-transparent",
  },
  {
    title: "SkySimple",
    tag: "Computer Vision · Licensing",
    description:
      "15-module Python automation engine for Android emulators, with its own licensing platform.",
    highlights: [
      "OpenCV template matching, custom digit OCR & ADB input control",
      "Supabase licensing backend with RLS & hardware-fingerprint binding",
      "SkyAdmin tool to issue, revoke & track licenses and stamp builds",
    ],
    stack: ["Python", "OpenCV", "Supabase", "CustomTkinter"],
    href: "https://github.com/m07adee/SkySimple",
    gradient: "from-pink-500/40 via-rose-500/20 to-transparent",
  },
];

export const journey = [
  {
    period: "2026 — Now",
    title: "Software Engineer",
    place: "Riyadh, Saudi Arabia · Open to opportunities",
    text: "Building full-stack, mobile and LLM-powered products end to end with AI-assisted development and tests.",
  },
  {
    period: "January 2026",
    title: "B.Sc. Computer Engineering",
    place: "Tokat Gaziosmanpaşa University, Turkey",
    text: "Graduated after building the university's IT asset & custody management system for its AI & Digital Transformation Coordination.",
  },
  {
    period: "Aug 2025 — Sep 2025",
    title: "IT Hardware Summer Intern",
    place: "Tokat Gaziosmanpaşa University · Hardware Department",
    text: "Diagnosed PC faults at component level (motherboard, PSU, RAM, storage, GPU), repaired and upgraded lab systems, and resolved lab network issues.",
  },
];
