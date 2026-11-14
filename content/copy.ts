/**
 * ALL on-site words, verbatim from docs/04-copy.md. Do not edit wording here without updating 04.
 * `**text**` = the one gold phrase. `{{TOKEN}}` = placeholder (lib/tokens.ts).
 * A trailing " →" on a button label means "render the ArrowRight icon" (stripped by <Button>).
 */

export const GLOBAL = {
  nav: ["Work", "Services", "AI Agents", "About", "Insights"],
  headerButton: "Book a free call →",
  mobileMenuFooter: "Talk to us",
  stickyCta: "Book a free call →",
  skipLink: "Skip to content",
  footer: {
    statement:
      "Pishon Digital Network builds websites, AI agents and digital products for ambitious businesses in Nigeria and around the world.",
    brandLine: "Because the future belongs to businesses built for it.",
    explore: { title: "Explore", links: ["Work", "Services", "AI Agents", "Digital University", "About", "Insights"] },
    services: { title: "Services", links: ["Websites", "Online stores", "AI agents", "Digital products"] },
    talk: { title: "Talk to us", whatsappLabel: "WhatsApp us" },
    askAi: {
      label: "Ask AI about PDN",
      buttons: ["ChatGPT", "Claude", "Perplexity"],
      prompt: "What does Pishon Digital Network ({{DOMAIN}}) do, and who is it best for?",
    },
    copyright: "© {year} Pishon Digital Network. All rights reserved.",
    madeIn: "Made in Lagos, for the world.",
    privacy: "Privacy",
    terms: "Terms",
  },
} as const;

export const HOME = {
  hero: {
    eyebrow: "Websites · AI agents · Digital products",
    headline: "Customers check you online before they pay you. **What are they seeing?**",
    lead: "PDN builds websites and AI agents that make people trust you, find you and contact you. Stop losing customers to businesses that simply look more serious.",
    primary: "Book a free call →",
    secondary: "See our work",
    microTrust: "Free 20-minute call. No pressure, no jargon.",
    ticks: ["Designed for phones first", "Found on Google", "Connected to WhatsApp", "You own everything"],
  },
  marquee: {
    label: "Trusted by businesses in Lagos, London and beyond",
    labelFallback: "Trusted by growing businesses",
  },
  pain: {
    eyebrow: "Sound familiar?",
    headline: "Things we hear **every single week**.",
    cards: [
      { quote: "\"When customers ask for my website, I send my Instagram link.\"", who: "Business owner" },
      { quote: "\"People say my prices are too high. Honestly, my brand just looks cheap.\"", who: "Fashion brand founder" },
      { quote: "\"I'm great at what I do. But when people Google me, nothing comes up.\"", who: "Lawyer, consultant, coach" },
      { quote: "\"We have a website. It hasn't brought in a single enquiry this year.\"", who: "Company director" },
      { quote: "\"My last developer took the money and stopped picking up my calls.\"", who: "Almost everyone" },
      { quote: "\"I'm abroad. I need a team I can trust without chasing them across time zones.\"", who: "Founder in the diaspora" },
    ],
    bridge:
      "None of this is about how good you are. It's about what people see before they meet you. **We fix that.**",
    textCta: "Let's fix it →",
  },
  showreel: {
    cursor: "Play",
    caption: "This is what we build. Now imagine it with your name on it.",
    soundOn: "Sound on",
    close: "Close",
  },
  shift: {
    eyebrow: "What changes",
    headline: "What changes when **PDN builds it**.",
    items: [
      {
        n: "01",
        label: "Trust",
        title: "People trust you before they talk to you.",
        body: "Your website does the convincing before the first message. Customers see a serious business, so they stop haggling and start buying.",
        asset: "ILL-03",
        icon: "trust",
      },
      {
        n: "02",
        label: "Found",
        title: "Customers find you, not your competitor.",
        body: "When someone searches for what you do, you show up. On Google, on Maps, and in the AI assistants people now ask for recommendations.",
        asset: "ILL-04",
        icon: "search",
      },
      {
        n: "03",
        label: "Paid",
        title: "Enquiries arrive while you sleep.",
        body: "Clear offers, a WhatsApp button, a booking form and an AI agent that answers at midnight. Visitors become conversations. Conversations become payments.",
        asset: "ILL-05",
        icon: "chat",
      },
    ],
  },
  audience: {
    eyebrow: "Who we build for",
    headline: "Built for people **like you**.",
    tabs: [
      {
        id: "business",
        tab: "Business owners",
        audience: "Business owner",
        title: "Look as good online as your product is in real life.",
        body: "Your customers already love what you sell. Give new customers that same confidence before they ever send a DM.",
        benefits: [
          "A website or store that sells beyond your followers",
          "Orders and enquiries straight to your WhatsApp",
          "A brand that justifies your price",
        ],
        button: "Book a call for my business →",
      },
      {
        id: "professionals",
        tab: "Professionals",
        audience: "Professional",
        title: "Be the name people find, and the one they choose.",
        body: "Referrals Google you before they call. Make sure what they find says expert.",
        benefits: [
          "A personal brand site that shows your expertise",
          "Show up when people search your name or your service",
          "Consultations booked without the back-and-forth",
        ],
        button: "Book a call for my practice →",
      },
      {
        id: "companies",
        tab: "Companies",
        audience: "Company / SME",
        title: "Turn your website into your best salesperson.",
        body: "If your website isn't bringing in leads, it's costing you money. We rebuild it around one goal: more qualified enquiries.",
        benefits: [
          "A redesign built for conversion, not decoration",
          "AI agents that answer, qualify and route enquiries 24/7",
          "Content your team can update without a developer",
        ],
        button: "Book a call for my company →",
      },
      {
        id: "abroad",
        tab: "Clients abroad",
        audience: "Client outside Nigeria",
        title: "Global quality. A team that answers.",
        body: "Work with a senior team that keeps you updated, hits deadlines and works with your time zone, wherever you are.",
        benefits: [
          "A clear timeline and written agreement before we start",
          "Regular progress updates and a live preview link",
          "Quotes in USD or naira",
        ],
        button: "Book a call from abroad →",
      },
    ],
  },
  work: {
    eyebrow: "Selected work",
    headline: "Real work for **real businesses**.",
    lead: "Websites, AI agents and digital products we've designed and built for clients who wanted more than a pretty page.",
    link: "See all work →",
    cardLink: "View project",
  },
  services: {
    eyebrow: "What we do",
    headline: "One partner for your **whole digital journey**.",
    rows: [
      { n: "01", title: "Websites", line: "Websites that win trust and bring in customers.", asset: "ILL-06", icon: "website", need: "New website" },
      { n: "02", title: "AI Agents", line: "An assistant that answers your customers 24/7, in your voice.", asset: "ILL-07", icon: "agent", need: "AI agent" },
      { n: "03", title: "Digital Products", line: "Apps, platforms and tools, designed and built to launch.", asset: "ILL-08", icon: "product", need: "Digital product" },
      { n: "04", title: "Digital University", line: "Practical courses and tools to grow your digital skills.", asset: "ILL-09", icon: "university", need: "" },
    ],
    hoverLabel: "Explore",
  },
  proof: {
    eyebrow: "Proof",
    headline: "Don't take our word **for it**.",
    stats: [
      { token: "STAT_PROJECTS", suffix: "+", label: "Projects delivered" },
      { token: "STAT_CLIENTS", suffix: "+", label: "Clients served" },
      { token: "STAT_COUNTRIES", suffix: "", label: "Countries" },
      { token: "STAT_YEARS", suffix: "", label: "Years building" },
    ],
    prev: "Previous",
    next: "Next",
  },
  process: {
    eyebrow: "How it works",
    headline: "From first call to launch in **3 steps**.",
    steps: [
      {
        title: "Book a free call",
        body: "Tell us about your business and your goals. In 20 minutes, we'll tell you exactly what you need, and what you don't.",
      },
      {
        title: "We design and build",
        body: "You get a clear plan, timeline and price in writing. Then we build, and you watch it come together on a live preview link.",
      },
      {
        title: "You launch and grow",
        body: "We launch, show you how to manage everything, and stay on hand after go-live. Your website keeps working while you work.",
      },
    ],
    stepLabel: "Step",
    note: "Most websites go live in {{DELIVERY_DAYS}} days.",
    button: "Start with step 1 →",
  },
  pricing: {
    eyebrow: "Packages",
    headline: "Clear packages. **No surprises.**",
    lead: "Every project is quoted in writing before we start. These are starting prices. Your free call tells us exactly what you need.",
    toggle: { ngn: "₦ NGN", usd: "$ USD", aria: "Show prices in" },
    from: "From",
    plans: [
      {
        id: "starter",
        name: "Starter",
        for: "For new businesses and personal brands that need to look legit, fast.",
        ngn: "{{PRICE_STARTER_NGN}}",
        usd: "{{PRICE_STARTER_USD}}",
        includes: [
          "A sharp one-page website",
          "Designed for phones first",
          "WhatsApp and contact buttons",
          "Google Business profile set up",
          "Domain and hosting set up for you",
        ],
        button: "Book a call about Starter →",
        featured: false,
      },
      {
        id: "business",
        name: "Business",
        badge: "Most popular",
        for: "For growing businesses ready to turn visitors into customers.",
        ngn: "{{PRICE_BUSINESS_NGN}}",
        usd: "{{PRICE_BUSINESS_USD}}",
        includes: [
          "Up to 6 custom-designed pages",
          "Copywriting that sells",
          "SEO foundations so customers find you",
          "Update your own content, no code",
          "Forms connected to your email and WhatsApp",
          "30 days of support after launch",
        ],
        button: "Book a call about Business →",
        featured: true,
      },
      {
        id: "premium",
        name: "Premium",
        for: "For companies that want a website, store and AI agent working as one system.",
        ngn: "{{PRICE_PREMIUM_NGN}}",
        usd: "{{PRICE_PREMIUM_USD}}",
        includes: [
          "Fully custom design, as many pages as you need",
          "Online store or web app features",
          "An AI agent trained on your business",
          "Advanced SEO and speed optimisation",
          "Priority support",
        ],
        button: "Book a call about Premium →",
        featured: false,
      },
    ],
    footnote:
      "If you want the cheapest website in town, we're not it. If you want one that pays for itself, let's talk.",
  },
  guarantee: {
    eyebrow: "Our promise",
    headline: "Working with us **feels different**.",
    promises: [
      { icon: "trust", title: "A written agreement before we start", line: "Scope, timeline and price, agreed and signed. No surprises." },
      { icon: "partner", title: "You're never chasing us", line: "Regular updates and a live preview link, so you always know where things stand." },
      { icon: "phone", title: "We stay after launch", line: "Questions, changes, growth. We're still here." },
    ],
    guaranteeLine: "{{GUARANTEE}}",
  },
  faq: {
    eyebrow: "Questions",
    headline: "What people ask **before they book**.",
    // Answers are arrays of sentences so a sentence that depends on an empty token can hide on its own.
    items: [
      {
        q: "How much does a website cost?",
        a: [
          "It depends on what you need.",
          "Our packages start from {{PRICE_STARTER_NGN}} ({{PRICE_STARTER_USD}}).",
          "On your free call, we'll recommend the smallest package that gets you results, then send a written quote.",
        ],
      },
      {
        q: "How long does it take?",
        a: [
          "Most websites go live in {{DELIVERY_DAYS}} days.",
          "Bigger builds, like online stores, web apps or AI agents, take longer.",
          "You'll get a clear timeline before we start.",
        ],
      },
      {
        q: "What do I need to prepare?",
        a: [
          "Not much.",
          "Your logo if you have one, photos of your work or products, and 20 minutes to tell us about your business.",
          "We help with the words, the structure and everything else.",
        ],
      },
      {
        q: "Can I update the website myself?",
        a: [
          "Yes.",
          "On the Business and Premium packages, you get a simple dashboard to change text, images, products and blog posts.",
          "No coding needed.",
        ],
      },
      {
        q: "Will my website show up on Google?",
        a: [
          "We build every site with what Google looks for: speed, mobile-friendly design, clean structure and proper page titles.",
          "We also set up your Google Business profile, so you can appear on Maps.",
        ],
      },
      {
        q: "Do I own my website?",
        a: ["Yes.", "Your domain, your design and your content belong to you."],
      },
      {
        q: "I'm not in Nigeria. Can we still work together?",
        a: [
          "Absolutely.",
          "We work across time zones with video calls, live preview links and regular updates, and we can quote in USD.",
        ],
      },
      {
        q: "What happens after launch?",
        a: [
          "We don't disappear.",
          "Every package includes support after launch, and we're here whenever you need changes or you're ready to grow.",
        ],
      },
    ],
  },
  book: {
    eyebrow: "Book a free call",
    headline: "Let's see what your business **could look like**.",
    lead: "Tell us a little about you. We'll get back to you within {{RESPONSE_TIME}} with honest advice, even if that means you don't need us yet.",
    nextTitle: "What happens next",
    next: [
      "We review your answers before we call, so we don't waste your time.",
      "We call you at a time that suits you.",
      "You get a clear plan and quote. No obligation.",
    ],
    altPrefix: "Prefer to talk now?",
    altPhone: "Call or WhatsApp {{PHONE}}",
    altEmail: "Email {{EMAIL_PUBLIC}}",
    cardTitle: "Book your free call",
    cardSubtitle: "Takes about 60 seconds.",
  },
  closer: {
    line: "Your next customer is already searching. **Make sure they find you.**",
    brandLine: "Because the future belongs to businesses built for it.",
    button: "Book a free call →",
  },
} as const;

export const THANK_YOU = {
  headlineNamed: "Thank you, {firstName}. **We've got it.**",
  headline: "Thank you. **We've got it.**",
  body: "Your request is in. Someone from the PDN team will reach out within {{RESPONSE_TIME}} on the number you gave us.",
  waitTitle: "While you wait",
  wait: [
    "Check your inbox for a confirmation email.",
    "Have your logo and a few photos handy, if you have them.",
    "Think about one thing: what should your website do for you?",
  ],
  button: "Explore our work →",
  vcard: "Save our number, so you know it's us when we call",
} as const;

export const FORM = {
  name: { label: "Your name", placeholder: "e.g. Adaeze Okafor", error: "Please tell us your name." },
  business: { label: "Business or brand name", placeholder: "Optional" },
  email: { label: "Email", placeholder: "you@business.com", error: "Please enter a valid email." },
  phone: {
    label: "Phone / WhatsApp",
    placeholder: "803 000 0000",
    help: "We'll call or WhatsApp you here.",
    error: "Please enter a valid phone number.",
  },
  audience: {
    label: "I am a…",
    options: ["Business owner", "Professional", "Company / SME", "Client outside Nigeria"],
    error: "Pick the one that fits best.",
  },
  need: {
    label: "I need… (choose all that apply)",
    options: ["New website", "Website redesign", "Online store", "AI agent", "Digital product", "Not sure yet"],
    error: "Choose at least one.",
  },
  budget: {
    label: "Budget",
    ngn: ["Under ₦500k", "₦500k–₦1.5m", "₦1.5m–₦5m", "₦5m+", "Not sure yet"],
    usd: ["Under $1,000", "$1,000–$3,000", "$3,000–$10,000", "$10,000+", "Not sure yet"],
    help: "Rough is fine. It helps us recommend the right package.",
  },
  timeline: {
    label: "When do you want to launch?",
    options: ["As soon as possible", "Within a month", "In 1–3 months", "Just exploring"],
  },
  message: {
    label: "Tell us about your project",
    placeholder: "What do you sell, and what should your website do for you?",
    help: "Optional",
  },
  source: {
    label: "How did you hear about us?",
    options: ["Instagram", "Facebook", "Google", "Referral", "LinkedIn", "TikTok", "An AI assistant", "Other"],
  },
  steps: { one: "Step 1 of 2 · About you", two: "Step 2 of 2 · Your project" },
  continue: "Continue →",
  back: "Back",
  submit: "Book my free call →",
  submitting: "Sending…",
  underSubmit: "We'll never share your details. No spam, ever.",
  serverError: "Something went wrong on our side. Please try again, or call us on {{PHONE}}.",
  /** Used when {{PHONE}} is empty on production: the clause that depends on it is dropped. */
  serverErrorNoPhone: "Something went wrong on our side. Please try again.",
  tooFast: "Please take a moment and try again.",
} as const;

export const MISC = {
  notFound: {
    headline: "This page **wandered off**.",
    body: "Like the River Pishon, some paths are hard to trace. Let's get you back on course.",
    home: "Back to home →",
    book: "Book a free call",
  },
  loading: "Loading…",
} as const;

export const META = {
  home: {
    title: "Pishon Digital Network · Websites & AI Agents That Bring In Customers",
    description:
      "PDN builds websites and AI agents that make customers trust you, find you and contact you. Lagos-based, working worldwide. Book a free call.",
  },
} as const;
