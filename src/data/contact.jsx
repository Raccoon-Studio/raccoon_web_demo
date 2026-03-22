// data/contact.jsx

/* ───────── Contact Methods ───────── */
export const contactMethods = [
  {
    label: "Email",
    value: "hello@raccoonstudio.com",
    href: "mailto:hello@raccoonstudio.com",
    description: "Best for detailed project briefs",
    responseTime: "< 24 hours",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="4" width="20" height="16" rx="3" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    copyable: true,
  },
  {
    label: "Phone",
    value: "+1 (415) 555-0132",
    href: "tel:+14155550132",
    description: "Mon–Fri, 9AM–6PM PST",
    responseTime: "Immediate",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.362 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    copyable: true,
  },
  {
    label: "WhatsApp",
    value: "+1 (415) 555-0132",
    href: "https://wa.me/14155550132",
    description: "Quick questions & updates",
    responseTime: "< 2 hours",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
      </svg>
    ),
    copyable: true,
  },
  {
    label: "Calendly",
    value: "Book a 30-min call",
    href: "https://calendly.com/raccoonstudio",
    description: "Schedule directly on our calendar",
    responseTime: "Instant booking",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
      </svg>
    ),
    copyable: false,
  },
];

/* ───────── Services ───────── */
export const serviceCategories = [
  {
    category: "Strategy",
    color: "accent",
    services: [
      {
        label: "Brand Strategy",
        icon: "◆",
        description: "Positioning, messaging & identity",
      },
      {
        label: "Product Strategy",
        icon: "⟐",
        description: "Roadmapping & market fit",
      },
      {
        label: "Growth Strategy",
        icon: "△",
        description: "Scaling & market expansion",
      },
      {
        label: "Digital Transformation",
        icon: "⬡",
        description: "Legacy modernization",
      },
    ],
  },
  {
    category: "Design",
    color: "cyan",
    services: [
      {
        label: "UI/UX Design",
        icon: "○",
        description: "Interfaces & experiences",
      },
      {
        label: "Web Design",
        icon: "◇",
        description: "Marketing & product sites",
      },
      { label: "Mobile Design", icon: "□", description: "iOS & Android apps" },
      {
        label: "Design Systems",
        icon: "⊞",
        description: "Scalable component libraries",
      },
      {
        label: "Motion Design",
        icon: "◎",
        description: "Animation & micro-interactions",
      },
    ],
  },
  {
    category: "Development",
    color: "emerald",
    services: [
      { label: "Frontend Dev", icon: "⟨⟩", description: "React, Next.js, Vue" },
      { label: "Backend Dev", icon: "⚙", description: "Node, Python, Go" },
      { label: "Mobile Dev", icon: "📱", description: "React Native, Flutter" },
      {
        label: "E-Commerce",
        icon: "🛒",
        description: "Shopify, custom stores",
      },
      { label: "API Development", icon: "⇌", description: "REST & GraphQL" },
      { label: "Cloud & DevOps", icon: "☁", description: "AWS, GCP, CI/CD" },
    ],
  },
  {
    category: "Growth",
    color: "violet",
    services: [
      {
        label: "SEO & Content",
        icon: "📈",
        description: "Organic traffic growth",
      },
      {
        label: "Analytics Setup",
        icon: "📊",
        description: "Tracking & attribution",
      },
      {
        label: "Performance Audit",
        icon: "⚡",
        description: "Speed & core web vitals",
      },
      {
        label: "Conversion Optimization",
        icon: "🎯",
        description: "A/B testing & CRO",
      },
    ],
  },
];

/* ───────── Budget ───────── */
export const budgetRanges = [
  { label: "Under $10k", value: "<10k", description: "Small projects & MVPs" },
  { label: "$10k – $25k", value: "10k-25k", description: "Standard projects" },
  {
    label: "$25k – $50k",
    value: "25k-50k",
    description: "Complex applications",
  },
  {
    label: "$50k – $100k",
    value: "50k-100k",
    description: "Enterprise solutions",
  },
  { label: "$100k+", value: "100k+", description: "Large-scale platforms" },
];

export const currencies = [
  { code: "USD", symbol: "$", label: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", symbol: "€", label: "Euro", flag: "🇪🇺" },
  { code: "GBP", symbol: "£", label: "British Pound", flag: "🇬🇧" },
  { code: "INR", symbol: "₹", label: "Indian Rupee", flag: "🇮🇳" },
  { code: "JPY", symbol: "¥", label: "Japanese Yen", flag: "🇯🇵" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar", flag: "🇦🇺" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar", flag: "🇨🇦" },
  { code: "CHF", symbol: "Fr", label: "Swiss Franc", flag: "🇨🇭" },
  { code: "AED", symbol: "د.إ", label: "UAE Dirham", flag: "🇦🇪" },
  { code: "SGD", symbol: "S$", label: "Singapore Dollar", flag: "🇸🇬" },
  { code: "RUB", symbol: "₽", label: "Russian Ruble", flag: "🇷🇺" },
  { code: "CNY", symbol: "¥", label: "Chinese Yuan", flag: "🇨🇳" },
  { code: "KWD", symbol: "د.ك", label: "Kuwaiti Dinar", flag: "🇰🇼" },
  { code: "IQD", symbol: "د.ع", label: "Iraqi Dinar", flag: "🇮🇶" },
  { code: "BRL", symbol: "R$", label: "Brazilian Real", flag: "🇧🇷" },
];

/* ───────── Timeline Preferences ───────── */
export const timelines = [
  { label: "ASAP", value: "asap", icon: "⚡" },
  { label: "1–2 weeks", value: "1-2w", icon: "🏃" },
  { label: "1 month", value: "1m", icon: "📅" },
  { label: "2–3 months", value: "2-3m", icon: "🗓" },
  { label: "Flexible", value: "flexible", icon: "🕐" },
  { label: "Not sure yet", value: "unsure", icon: "🤔" },
];

/* ───────── How They Found Us ───────── */
export const referralSources = [
  { label: "Google Search", value: "google" },
  { label: "Social Media", value: "social" },
  { label: "Referral", value: "referral" },
  { label: "Clutch / Dribbble", value: "platform" },
  { label: "Blog / Article", value: "content" },
  { label: "Previous Client", value: "returning" },
  { label: "Conference / Event", value: "event" },
  { label: "Other", value: "other" },
];

/* ───────── Office Locations ───────── */
export const offices = [
  {
    city: "San Francisco",
    country: "United States",
    flag: "🇺🇸",
    address: "548 Market St, Suite 72",
    zip: "San Francisco, CA 94104",
    timezone: "PST (UTC-8)",
    phone: "+1 (415) 555-0132",
    email: "sf@raccoonstudio.com",
    type: "Headquarters",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    hours: "Mon–Fri · 9AM–6PM",
    image:
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=250&fit=crop",
  },
  {
    city: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    address: "71 Great Russell St",
    zip: "London WC1B 3BN",
    timezone: "GMT (UTC+0)",
    phone: "+44 20 7946 0958",
    email: "london@raccoonstudio.com",
    type: "European Office",
    coordinates: { lat: 51.5074, lng: -0.1278 },
    hours: "Mon–Fri · 9AM–6PM",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop",
  },
  {
    city: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    address: "1 Raffles Pl, #20-61",
    zip: "Singapore 048616",
    timezone: "SGT (UTC+8)",
    phone: "+65 6823 4567",
    email: "sg@raccoonstudio.com",
    type: "Asia-Pacific Office",
    coordinates: { lat: 1.3521, lng: 103.8198 },
    hours: "Mon–Fri · 9AM–6PM",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=400&h=250&fit=crop",
  },
];

/* ───────── Process Steps ───────── */
export const processSteps = [
  {
    step: 1,
    title: "You Reach Out",
    description:
      "Fill out the form or book a call. Share your vision, goals, and timeline.",
    duration: "Today",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    step: 2,
    title: "Discovery Call",
    description:
      "A 30-minute deep dive into your requirements, target audience, and success metrics.",
    duration: "Within 24h",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    step: 3,
    title: "Custom Proposal",
    description:
      "Detailed scope, timeline, tech stack, and transparent pricing tailored to your project.",
    duration: "2–3 days",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    step: 4,
    title: "Kick-Off Sprint",
    description:
      "Align on milestones, set up tooling, and begin the first sprint cycle.",
    duration: "Week 1",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    step: 5,
    title: "Build & Iterate",
    description:
      "Weekly demos, continuous feedback loops, and transparent progress tracking.",
    duration: "3–12 weeks",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    step: 6,
    title: "Launch & Scale",
    description:
      "Production deployment, monitoring setup, and ongoing support retainer.",
    duration: "Launch day+",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
  },
];

/* ───────── FAQ ───────── */
export const faqs = [
  {
    category: "Process",
    items: [
      {
        q: "What's the typical project timeline?",
        a: "Most projects take 4–12 weeks depending on complexity. MVPs typically ship in 3–5 weeks, while full platforms take 8–16 weeks. We provide a detailed timeline in our proposal.",
      },
      {
        q: "How does your development process work?",
        a: "We follow an agile methodology with weekly sprints. You get demos every Friday, a dedicated Slack channel, and real-time progress tracking via our client dashboard.",
      },
      {
        q: "Do you work with existing codebases?",
        a: "Absolutely. We regularly take over existing projects, perform code audits, refactor architectures, and extend functionality. We'll assess your codebase health during the discovery phase.",
      },
      {
        q: "What happens after the project launches?",
        a: "We offer flexible retainer packages for ongoing maintenance, feature development, and performance optimization. Most clients continue working with us post-launch.",
      },
    ],
  },
  {
    category: "Pricing",
    items: [
      {
        q: "How do you handle pricing?",
        a: "We offer both fixed-price and time & materials models. Fixed-price works best for well-defined scopes, while T&M is ideal for evolving requirements. We're transparent about costs from day one.",
      },
      {
        q: "Do you require a deposit?",
        a: "Yes, we typically require a 30% deposit to begin work, with remaining payments tied to milestone deliveries. This ensures alignment and commitment from both sides.",
      },
      {
        q: "Can you work within my budget?",
        a: "We're flexible. If your budget is limited, we'll help prioritize features for an MVP and plan a phased rollout. Every dollar should deliver measurable value.",
      },
    ],
  },
  {
    category: "Technical",
    items: [
      {
        q: "What tech stack do you use?",
        a: "Our core stack includes React/Next.js, TypeScript, Node.js, Python, PostgreSQL, and AWS. However, we choose the best tools for each project's specific requirements.",
      },
      {
        q: "Do I own the code?",
        a: "100%. You receive full ownership of all source code, designs, and assets upon final payment. No lock-in, no proprietary frameworks — clean, maintainable code you can take anywhere.",
      },
      {
        q: "How do you handle security?",
        a: "Security is built into our process from day one. We follow OWASP guidelines, implement proper authentication/authorization, conduct security audits, and offer SOC 2 compliance guidance.",
      },
    ],
  },
  {
    category: "Working Together",
    items: [
      {
        q: "What timezone do you operate in?",
        a: "Our team spans US, EU, and APAC timezones. We ensure at least 4 hours of overlap with your team for real-time collaboration, regardless of your location.",
      },
      {
        q: "How do you handle communication?",
        a: "Slack for daily communication, weekly video demos, and a shared project dashboard. You'll have direct access to your project lead — no account managers in between.",
      },
      {
        q: "Can I meet the team before starting?",
        a: "Absolutely. During the discovery phase, you'll meet your dedicated project lead, lead designer, and lead developer. Chemistry matters to us as much as capability.",
      },
    ],
  },
];

/* ───────── Team Members ───────── */
export const teamMembers = [
  {
    name: "Alex Rivera",
    role: "Founder & Creative Director",
    avatar: "https://i.pravatar.cc/120?img=68",
    bio: "15+ years leading digital projects for Fortune 500s and high-growth startups.",
    linkedin: "#",
    calendly: "#",
  },
  {
    name: "Sarah Chen",
    role: "Head of Engineering",
    avatar: "https://i.pravatar.cc/120?img=47",
    bio: "Ex-Google, specializing in scalable architectures and cloud infrastructure.",
    linkedin: "#",
    calendly: "#",
  },
  {
    name: "Marcus Webb",
    role: "Design Lead",
    avatar: "https://i.pravatar.cc/120?img=12",
    bio: "Award-winning designer with a focus on conversion-driven UI/UX.",
    linkedin: "#",
    calendly: "#",
  },
  {
    name: "Priya Nair",
    role: "Project Director",
    avatar: "https://i.pravatar.cc/120?img=23",
    bio: "PMP certified. Ensures every project ships on time and on budget.",
    linkedin: "#",
    calendly: "#",
  },
];

/* ───────── Social Links ───────── */
export const socialLinks = [
  {
    name: "Twitter / X",
    href: "https://twitter.com/raccoonstudio",
    followers: "12.4K",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/company/raccoonstudio",
    followers: "8.2K",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "Dribbble",
    href: "https://dribbble.com/raccoonstudio",
    followers: "5.8K",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.045-5.055 8.332-6.765.135-.045.27-.084.405-.12-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.955c.46.008 4.683.026 9.477-1.248-1.698-3.018-3.53-5.558-3.8-5.928-2.868 1.35-5.01 3.99-5.676 7.17zM9.6 2.052c.282.38 2.145 2.914 3.822 6 3.645-1.365 5.19-3.44 5.373-3.702C16.86.985 14.545 0 12.003 0c-.84 0-1.653.107-2.404.306v-.003zm10.335 3.483c-.218.29-1.91 2.478-5.678 4.025.242.49.477.99.702 1.492.08.18.155.36.23.54 3.41-.43 6.8.26 7.14.33-.02-2.42-.88-4.64-2.4-6.39z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    href: "https://github.com/raccoonstudio",
    followers: "3.1K",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/raccoonstudio",
    followers: "15.6K",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@raccoonstudio",
    followers: "2.3K",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

/* ───────── Testimonials ───────── */
export const testimonials = [
  {
    quote:
      "Raccoon Studio didn't just build our product — they helped us rethink our entire approach. Shipped 3 weeks early with 10K users in month one.",
    author: "Sarah Chen",
    role: "CEO",
    company: "Helios Finance",
    avatar: "https://i.pravatar.cc/64?img=23",
    rating: 5,
    metric: "+340%",
    metricLabel: "Revenue Growth",
  },
  {
    quote:
      "The cleanest handoff we've ever received. Our internal team was productive from day one. Their documentation alone was worth the investment.",
    author: "David Kim",
    role: "VP Engineering",
    company: "Nexus AI",
    avatar: "https://i.pravatar.cc/64?img=33",
    rating: 5,
    metric: "95+",
    metricLabel: "Lighthouse Score",
  },
  {
    quote:
      "They turned our 47-page requirements doc into a working MVP in 19 days. What other agencies quoted 3 months for.",
    author: "Marcus Webb",
    role: "CTO",
    company: "Prism Labs",
    avatar: "https://i.pravatar.cc/64?img=12",
    rating: 5,
    metric: "19",
    metricLabel: "Days to Launch",
  },
  {
    quote:
      "Working with Raccoon felt like having an in-house team. The weekly demos, the proactive communication — it set a new standard for us.",
    author: "Priya Nair",
    role: "Product Director",
    company: "CloudVault",
    avatar: "https://i.pravatar.cc/64?img=47",
    rating: 5,
    metric: "500K",
    metricLabel: "Users Scaled To",
  },
];

/* ───────── Trust Signals ───────── */
export const trustStats = [
  { value: "50+", label: "Projects Delivered", icon: "🚀" },
  { value: "93%", label: "Client Retention", icon: "🔄" },
  { value: "100%", label: "On-Time Delivery", icon: "⏱" },
  { value: "4.9/5", label: "Average Rating", icon: "⭐" },
  { value: "<24h", label: "Response Time", icon: "💬" },
  { value: "12+", label: "Countries Served", icon: "🌍" },
];

export const trustedBrands = [
  "Helios",
  "Prism",
  "Nexus",
  "CloudVault",
  "Orbit",
  "Vertex",
  "Horizon",
  "Apex",
  "Nova",
  "Cipher",
  "Quantum",
  "Atlas",
];

export const certifications = [
  { name: "SOC 2 Compliant", icon: "🛡" },
  { name: "GDPR Ready", icon: "🇪🇺" },
  { name: "AWS Partner", icon: "☁" },
  { name: "ISO 27001", icon: "✓" },
];
