// ✏️ Edit everything about the portfolio here — English (en) and Arabic (ar).

export type Lang = "en" | "ar";

const EMAIL = "eng.mohammad.adib@gmail.com";
const GITHUB = "https://github.com/m07adee";
const LINKEDIN = "https://www.linkedin.com/in/mohammadadib102";

export const shared = {
  email: EMAIL,
  skillRows: [
    [
      "Python", "TypeScript", "JavaScript", "Dart", "SQL", "Next.js", "Node.js", "REST APIs",
      "Prisma", "PostgreSQL", "Supabase (RLS)", "JWT / RBAC", "Streamlit", "Tailwind CSS",
    ],
    [
      "Gemini API", "Structured Outputs", "Pydantic", "Prompt Design", "OpenCV", "OCR", "Claude Code",
      "Cursor", "Flutter", "Riverpod", "Firebase", "Docker", "GitHub Actions", "Linux",
    ],
  ],
  statValues: [
    { value: 3000, suffix: "+" },
    { value: 15, suffix: "" },
    { value: 12, suffix: "" },
    { value: 3, suffix: "" },
  ],
  projectMeta: [
    {
      stack: ["Python", "Gemini 2.5 Flash", "Pydantic", "Streamlit"],
      href: "https://github.com/m07adee/ai-calorie-meal-scanner",
      gradient: "from-violet-500/40 via-fuchsia-500/20 to-transparent",
    },
    {
      stack: ["Flutter", "Riverpod", "Firebase", "CI"],
      href: "https://github.com/m07adee/calorie-tracker-flutter",
      gradient: "from-emerald-400/40 via-teal-500/20 to-transparent",
    },
    {
      stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Docker"],
      href: "https://github.com/m07adee/togu-it-demirbas-sistemi",
      gradient: "from-cyan-400/40 via-sky-500/20 to-transparent",
    },
    {
      stack: ["Python", "OpenCV", "Supabase", "CustomTkinter"],
      href: "https://github.com/m07adee/SkySimple",
      gradient: "from-pink-500/40 via-rose-500/20 to-transparent",
    },
  ],
};

export type ProjectText = { title: string; tag: string; description: string; highlights: string[] };

export type Content = {
  profile: {
    name: string;
    fullName: string;
    shortName: string;
    title: string;
    roles: string[];
    intro: string;
    location: string;
    education: string;
    languages: string;
    socials: { label: string; href: string }[];
  };
  about: string[];
  nav: { label: string; href: string }[];
  statLabels: string[];
  projects: ProjectText[];
  journey: { period: string; title: string; place: string; text: string }[];
  ui: {
    badge: string;
    iam: string;
    viewWork: string;
    talk: string;
    scroll: string;
    scrollAria: string;
    aboutKicker: string;
    aboutTitle: string;
    workKicker: string;
    workTitle: string;
    journeyKicker: string;
    journeyTitle: string;
    contactKicker: string;
    contactTitle: string;
    contactText: string;
    onGithub: string;
    rights: string;
    builtWith: string;
    switchTo: string;
    switchAria: string;
  };
};

const navHrefs = ["#home", "#about", "#work", "#journey", "#contact"];

export const content: Record<Lang, Content> = {
  en: {
    profile: {
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
      socials: [
        { label: "GitHub", href: GITHUB },
        { label: "LinkedIn", href: LINKEDIN },
        { label: "Email", href: `mailto:${EMAIL}` },
      ],
    },
    about: [
      "I build complete products end to end — from Next.js platforms with role-based access and audit trails, to offline-first Flutter apps with live RTL switching, to multimodal LLM pipelines with schema-validated output.",
      "I ship quickly with AI-assisted workflows (Claude Code, Cursor) while reviewing and testing every line. I'm also a hands-on PC hardware troubleshooter, and fluent in Arabic and Turkish.",
    ],
    nav: ["Home", "About", "Work", "Journey", "Contact"].map((label, i) => ({ label, href: navHrefs[i] })),
    statLabels: ["Lines of Dart shipped", "CV automation modules", "REST endpoints designed", "Languages spoken"],
    projects: [
      {
        title: "AI Meal Analyzer",
        tag: "LLM · Vision",
        description: "Multimodal pipeline that estimates portion weight, calories and macros from a single meal photo.",
        highlights: [
          "Schema-constrained JSON, validated & auto-corrected with Pydantic",
          "Calorie ↔ macro reconciliation (4/4/9 kcal/g) post-check",
          "Handles non-food images, 429 rate limits & caches per session",
        ],
      },
      {
        title: "Calorie Tracker App",
        tag: "Mobile · Flutter",
        description: "The companion Flutter app — 4 screens, ~3,000 lines of Dart and 11 Riverpod providers.",
        highlights: [
          "Arabic, English & Turkish (187 strings) with live RTL switching",
          "Offline-first Firestore sync & Firebase Auth incl. Google Sign-In",
          "Widget tests running in GitHub Actions CI",
        ],
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
      },
      {
        title: "SkySimple",
        tag: "Computer Vision · Licensing",
        description: "15-module Python automation engine for Android emulators, with its own licensing platform.",
        highlights: [
          "OpenCV template matching, custom digit OCR & ADB input control",
          "Supabase licensing backend with RLS & hardware-fingerprint binding",
          "SkyAdmin tool to issue, revoke & track licenses and stamp builds",
        ],
      },
    ],
    journey: [
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
    ],
    ui: {
      badge: "Open to opportunities · Riyadh",
      iam: "I'm a",
      viewWork: "View my work",
      talk: "Let's talk",
      scroll: "Scroll",
      scrollAria: "Scroll down",
      aboutKicker: "01 — About",
      aboutTitle: "Crafting digital experiences with code & care.",
      workKicker: "02 — Selected work",
      workTitle: "Products I've built end to end.",
      journeyKicker: "03 — Journey",
      journeyTitle: "Where I've been.",
      contactKicker: "04 — Contact",
      contactTitle: "Let's build something remarkable together.",
      contactText: "Hiring for a full-stack, mobile or LLM role — or have a product in mind? My inbox is always open.",
      onGithub: "on GitHub",
      rights: "All rights reserved.",
      builtWith: "Built with Next.js, Framer Motion &",
      switchTo: "عربي",
      switchAria: "التبديل إلى العربية",
    },
  },

  ar: {
    profile: {
      name: "محمد أديب",
      fullName: "محمد أديب",
      shortName: "محمد أديب",
      title: "مهندس برمجيات — تطبيقات الويب المتكاملة والجوال ونماذج اللغة الكبيرة",
      roles: ["مطوّر ويب متكامل", "مطوّر تطبيقات جوال", "مهندس تطبيقات LLM", "تطوير بالذكاء الاصطناعي"],
      intro:
        "مهندس برمجيات وخريج هندسة الحاسوب، أبني منتجات متكاملة من البداية إلى النهاية — منصات ويب وتطبيقات Flutter وميزات مدعومة بنماذج اللغة الكبيرة — أُنجزها بسرعة بأدوات التطوير بمساعدة الذكاء الاصطناعي وأتحقق منها بالاختبارات.",
      location: "الرياض، المملكة العربية السعودية",
      education: "بكالوريوس هندسة الحاسوب · يناير 2026",
      languages: "العربية · التركية · الإنجليزية",
      socials: [
        { label: "GitHub", href: GITHUB },
        { label: "LinkedIn", href: LINKEDIN },
        { label: "البريد الإلكتروني", href: `mailto:${EMAIL}` },
      ],
    },
    about: [
      "أبني منتجات كاملة من الألف إلى الياء — من منصات Next.js بصلاحيات حسب الدور وسجلات تدقيق، إلى تطبيقات Flutter تعمل دون اتصال مع تبديل فوري لاتجاه الكتابة، وصولًا إلى خطوط معالجة متعددة الوسائط بنماذج اللغة الكبيرة ومخرجات مُتحقَّق منها.",
      "أعمل بسرعة باستخدام أدوات الذكاء الاصطناعي (Claude Code و Cursor) مع مراجعة واختبار كل سطر. ولديّ خبرة عملية في تشخيص أعطال أجهزة الحاسوب، وأتحدث العربية والتركية بطلاقة.",
    ],
    nav: ["الرئيسية", "نبذة عني", "أعمالي", "المسيرة", "تواصل"].map((label, i) => ({ label, href: navHrefs[i] })),
    statLabels: ["سطر برمجي بلغة Dart", "وحدة أتمتة بالرؤية الحاسوبية", "واجهة REST مصمَّمة", "لغات أتحدثها"],
    projects: [
      {
        title: "محلّل الوجبات بالذكاء الاصطناعي",
        tag: "LLM · رؤية حاسوبية",
        description: "خط معالجة متعدد الوسائط يقدّر وزن الحصة والسعرات والمغذيات الكبرى من صورة واحدة للوجبة.",
        highlights: [
          "مخرجات JSON مقيّدة بمخطط، يُتحقَّق منها وتُصحَّح تلقائيًا عبر Pydantic",
          "فحص لاحق يطابق السعرات مع المغذيات الكبرى (4/4/9 سعرة لكل غرام)",
          "معالجة الصور غير الغذائية وحدود الطلبات (429) وتخزين النتائج مؤقتًا لكل جلسة",
        ],
      },
      {
        title: "تطبيق تتبّع السعرات",
        tag: "جوال · Flutter",
        description: "تطبيق Flutter المرافق — 4 شاشات، ونحو 3,000 سطر Dart، و11 مزوّد Riverpod.",
        highlights: [
          "العربية والإنجليزية والتركية (187 نصًا) مع تبديل فوري لاتجاه RTL",
          "مزامنة Firestore تعمل دون اتصال، ومصادقة Firebase تشمل تسجيل الدخول بـ Google",
          "اختبارات Widget تعمل ضمن GitHub Actions CI",
        ],
      },
      {
        title: "نظام إدارة الأصول التقنية – TOGÜ",
        tag: "ويب · Full-Stack",
        description:
          "منصة من 7 صفحات لمنسقية الذكاء الاصطناعي والتحول الرقمي في جامعة توكات غازي عثمان باشا، لتتبّع الأجهزة والخوادم وعُهد الموظفين.",
        highlights: [
          "12 واجهة REST فوق 3 نماذج Prisma مع صلاحيات حسب الدور عبر JWT",
          "سجل تدقيق كامل لعمليات التسليم والإرجاع وبلاغات التلف",
          "ملصقات QR مع طباعة حرارية مباشرة، والنظام كاملًا ضمن Docker Compose",
        ],
      },
      {
        title: "SkySimple",
        tag: "رؤية حاسوبية · تراخيص",
        description: "محرّك أتمتة بلغة Python من 15 وحدة لمحاكيات Android، مع منصة تراخيص خاصة به.",
        highlights: [
          "مطابقة القوالب عبر OpenCV، وOCR مخصص للأرقام، والتحكم بالإدخال عبر ADB",
          "خادم تراخيص على Supabase مع RLS وربط ببصمة الجهاز لمنع مشاركة المفاتيح",
          "أداة SkyAdmin لإصدار التراخيص وإلغائها وتتبّعها وتصدير نسخ مختومة",
        ],
      },
    ],
    journey: [
      {
        period: "2026 — الآن",
        title: "مهندس برمجيات",
        place: "الرياض، السعودية · متاح لفرص العمل",
        text: "أبني منتجات ويب متكاملة وتطبيقات جوال ومنتجات مدعومة بنماذج اللغة الكبيرة من البداية إلى النهاية، بأدوات الذكاء الاصطناعي ومع الاختبارات.",
      },
      {
        period: "يناير 2026",
        title: "بكالوريوس هندسة الحاسوب",
        place: "جامعة توكات غازي عثمان باشا، تركيا",
        text: "تخرّجت بعد بناء نظام إدارة الأصول التقنية والعُهد لمنسقية الذكاء الاصطناعي والتحول الرقمي في الجامعة.",
      },
      {
        period: "أغسطس 2025 — سبتمبر 2025",
        title: "متدرّب صيفي في الأجهزة التقنية",
        place: "جامعة توكات غازي عثمان باشا · قسم الأجهزة",
        text: "شخّصت أعطال الحواسيب على مستوى المكوّنات (اللوحة الأم، مزوّد الطاقة، الذاكرة، التخزين، كرت الشاشة)، وأصلحت وطوّرت أجهزة المعامل، وحللت مشكلات شبكة المعامل.",
      },
    ],
    ui: {
      badge: "متاح لفرص العمل · الرياض",
      iam: "أنا",
      viewWork: "شاهد أعمالي",
      talk: "لنتحدث",
      scroll: "مرّر",
      scrollAria: "مرّر للأسفل",
      aboutKicker: "01 — نبذة عني",
      aboutTitle: "أصنع تجارب رقمية بالكود والشغف.",
      workKicker: "02 — أعمال مختارة",
      workTitle: "منتجات بنيتها من البداية إلى النهاية.",
      journeyKicker: "03 — المسيرة",
      journeyTitle: "محطات في رحلتي.",
      contactKicker: "04 — تواصل",
      contactTitle: "لنبنِ معًا شيئًا استثنائيًا.",
      contactText: "تبحث عن مطوّر ويب متكامل أو تطبيقات جوال أو تطبيقات LLM — أو لديك فكرة منتج؟ بريدي مفتوح دائمًا.",
      onGithub: "على GitHub",
      rights: "جميع الحقوق محفوظة.",
      builtWith: "بُني باستخدام Next.js و Framer Motion و",
      switchTo: "EN",
      switchAria: "Switch to English",
    },
  },
};
