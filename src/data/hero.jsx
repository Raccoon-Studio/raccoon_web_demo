// data/heroCarousel.jsx

export const carouselSlides = [
  {
    id: "strategy",
    badge: {
      text: "Accepting Projects",
      color: "emerald",
      pulse: true,
    },
    headline: {
      lines: [
        { text: "Turning Strategic Vision into", plain: true },
        {
          text: "Measurable Returns",
          gradient: true,
          from: "from-accent",
          via: "via-violet-400",
          to: "to-cyan",
        },
      ],
    },
    subtitle: (
      <>
        We design, build &amp; launch digital products.{" "}
        <span className="text-text-secondary/80">
          50+ shipped. MVPs in 3–5 weeks.
        </span>
      </>
    ),
    stats: [
      { value: "50+", label: "Projects" },
      { value: "93%", label: "Retention" },
      { value: "3–5wk", label: "Delivery" },
    ],
    cta: { primary: "Book a Call", secondary: "Case Studies" },
    card: {
      type: "metrics",
      title: "Client Results",
      kpis: [
        {
          label: "Revenue Growth",
          value: "+340%",
          sub: "YoY",
          color: "text-emerald",
        },
        {
          label: "User Acquisition",
          value: "10K+",
          sub: "Month 1",
          color: "text-accent",
        },
        {
          label: "Time to Market",
          value: "3wks",
          sub: "Avg",
          color: "text-cyan",
        },
      ],
      testimonial: {
        quote: "Shipped 3 weeks early. 10k users in month one.",
        author: "Sarah Chen",
        role: "CEO, Helios Finance",
        avatar: "https://i.pravatar.cc/32?img=23",
      },
      chart: [35, 42, 38, 55, 48, 62, 58, 72, 68, 85, 78, 95],
    },
    floats: [
      {
        position: "-left-8 top-[35%]",
        direction: "left",
        content: (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-white/80 font-semibold leading-none">
                3–5 <span className="text-accent">weeks</span>
              </p>
              <p className="font-mono text-[7px] text-white/25 uppercase tracking-wider mt-0.5">
                avg. delivery
              </p>
            </div>
          </div>
        ),
      },
      {
        position: "-right-6 bottom-[20%]",
        direction: "right",
        content: (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 rounded-full bg-emerald/40 animate-ping" />
              <span className="relative rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-emerald/80 font-medium">
              Q3 open
            </span>
          </div>
        ),
      },
    ],
  },
  {
    id: "speed",
    badge: {
      text: "Rapid Development",
      color: "cyan",
      pulse: true,
    },
    headline: {
      lines: [
        { text: "From Zero to Launch in", plain: true },
        {
          text: "Record Time",
          gradient: true,
          from: "from-cyan",
          via: "via-blue-400",
          to: "to-accent",
        },
      ],
    },
    subtitle: (
      <>
        Battle-tested frameworks. Parallel sprints.{" "}
        <span className="text-text-secondary/80">
          Ship your MVP before competitors ship wireframes.
        </span>
      </>
    ),
    stats: [
      { value: "21", label: "Day Avg" },
      { value: "100%", label: "On-Time" },
      { value: "0", label: "Missed" },
    ],
    cta: { primary: "Start Building", secondary: "See Timeline" },
    card: {
      type: "timeline",
      title: "Sprint Timeline",
      phases: [
        {
          name: "Discovery",
          days: "Day 1–3",
          status: "complete",
          items: ["User research", "Architecture", "Tech spec"],
        },
        {
          name: "Build",
          days: "Day 4–18",
          status: "active",
          items: ["Core features", "Integrations", "Testing"],
        },
        {
          name: "Launch",
          days: "Day 19–21",
          status: "upcoming",
          items: ["Deploy", "Monitor", "Iterate"],
        },
      ],
      testimonial: {
        quote:
          "They delivered what other agencies quoted 3 months for — in 19 days.",
        author: "Marcus Webb",
        role: "CTO, Prism Labs",
        avatar: "https://i.pravatar.cc/32?img=12",
      },
    },
    floats: [
      {
        position: "-left-6 top-[25%]",
        direction: "left",
        content: (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-cyan/10 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-cyan"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-white/80 font-semibold leading-none">
                19 <span className="text-cyan">days</span>
              </p>
              <p className="font-mono text-[7px] text-white/25 uppercase tracking-wider mt-0.5">
                fastest ship
              </p>
            </div>
          </div>
        ),
      },
      {
        position: "-right-8 bottom-[30%]",
        direction: "right",
        content: (
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-emerald"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 13l4 4L19 7" />
            </svg>
            <span className="font-mono text-[8px] uppercase tracking-widest text-emerald/80 font-medium">
              100% on-time
            </span>
          </div>
        ),
      },
    ],
  },
  {
    id: "scale",
    badge: {
      text: "Growth Engine",
      color: "violet",
      pulse: false,
    },
    headline: {
      lines: [
        { text: "Products That Scale to", plain: true },
        {
          text: "Millions of Users",
          gradient: true,
          from: "from-violet-400",
          via: "via-accent",
          to: "to-amber-400",
        },
      ],
    },
    subtitle: (
      <>
        Cloud-native architecture built for explosive growth.{" "}
        <span className="text-text-secondary/80">
          Auto-scaling infra. Zero-downtime deploys.
        </span>
      </>
    ),
    stats: [
      { value: "2.4M", label: "Users" },
      { value: "99.9%", label: "Uptime" },
      { value: "<50ms", label: "Latency" },
    ],
    cta: { primary: "Scale With Us", secondary: "Architecture" },
    card: {
      type: "scale",
      title: "Infrastructure",
      metrics: [
        { label: "Requests/sec", value: "12.4K", trend: "+18%", bar: 82 },
        { label: "Avg Response", value: "42ms", trend: "-23%", bar: 25 },
        { label: "Error Rate", value: "0.01%", trend: "-61%", bar: 3 },
        { label: "Cache Hit", value: "97.2%", trend: "+4%", bar: 97 },
      ],
      nodes: [
        { name: "US-East", status: "healthy", load: 34 },
        { name: "EU-West", status: "healthy", load: 28 },
        { name: "AP-South", status: "healthy", load: 41 },
      ],
      testimonial: {
        quote: "Went from 1K to 500K users with zero architecture changes.",
        author: "Priya Nair",
        role: "VP Eng, CloudVault",
        avatar: "https://i.pravatar.cc/32?img=47",
      },
    },
    floats: [
      {
        position: "-left-6 top-[40%]",
        direction: "left",
        content: (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-violet-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-white/80 font-semibold leading-none">
                Auto-<span className="text-violet-400">scaling</span>
              </p>
              <p className="font-mono text-[7px] text-white/25 uppercase tracking-wider mt-0.5">
                cloud native
              </p>
            </div>
          </div>
        ),
      },
      {
        position: "-right-6 top-[20%]",
        direction: "right",
        content: (
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="relative rounded-full h-2 w-2 bg-emerald" />
            </span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-emerald/80 font-medium">
              99.9% uptime
            </span>
          </div>
        ),
      },
    ],
  },
  {
    id: "tech",
    badge: {
      text: "Full Stack",
      color: "amber",
      pulse: false,
    },
    headline: {
      lines: [
        { text: "Built With Technology", plain: true },
        {
          text: "That Lasts Decades",
          gradient: true,
          from: "from-amber-400",
          via: "via-orange-400",
          to: "to-accent",
        },
      ],
    },
    subtitle: (
      <>
        No vendor lock-in. No tech debt shortcuts.{" "}
        <span className="text-text-secondary/80">
          Clean architecture you can maintain forever.
        </span>
      </>
    ),
    stats: [
      { value: "12+", label: "Stack" },
      { value: "A+", label: "Lighthouse" },
      { value: "0", label: "Tech Debt" },
    ],
    cta: { primary: "Explore Stack", secondary: "View Source" },
    card: {
      type: "techstack",
      title: "Tech Stack",
      categories: [
        {
          name: "Frontend",
          tools: [
            { name: "React", color: "#61DAFB" },
            { name: "Next.js", color: "#ffffff" },
            { name: "TypeScript", color: "#3178C6" },
            { name: "Tailwind", color: "#06B6D4" },
          ],
        },
        {
          name: "Backend",
          tools: [
            { name: "Node.js", color: "#339933" },
            { name: "Python", color: "#3776AB" },
            { name: "PostgreSQL", color: "#4169E1" },
            { name: "Redis", color: "#DC382D" },
          ],
        },
        {
          name: "Cloud",
          tools: [
            { name: "AWS", color: "#FF9900" },
            { name: "Vercel", color: "#ffffff" },
            { name: "Docker", color: "#2496ED" },
            { name: "K8s", color: "#326CE5" },
          ],
        },
      ],
      testimonial: {
        quote:
          "Cleanest codebase we've ever inherited. 95 Lighthouse across the board.",
        author: "David Kim",
        role: "Lead Dev, Nexus AI",
        avatar: "https://i.pravatar.cc/32?img=33",
      },
    },
    floats: [
      {
        position: "-left-8 bottom-[30%]",
        direction: "left",
        content: (
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-amber-400/10 flex items-center justify-center shrink-0">
              <svg
                className="w-3.5 h-3.5 text-amber-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-[11px] text-white/80 font-semibold leading-none">
                95+ <span className="text-amber-400">score</span>
              </p>
              <p className="font-mono text-[7px] text-white/25 uppercase tracking-wider mt-0.5">
                lighthouse
              </p>
            </div>
          </div>
        ),
      },
      {
        position: "-right-6 top-[25%]",
        direction: "right",
        content: (
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-emerald"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-mono text-[8px] uppercase tracking-widest text-emerald/80 font-medium">
              Zero debt
            </span>
          </div>
        ),
      },
    ],
  },
];

export const clientLogos = [
  { name: "Helios", letters: "HELIOS" },
  { name: "Prism", letters: "PRISM" },
  { name: "Nexus", letters: "NEXUS" },
  { name: "Vault", letters: "VAULT" },
  { name: "Orbit", letters: "ORBIT" },
];

export const heroTechStack = [
  { name: "React", color: "#61DAFB" },
  { name: "Node", color: "#339933" },
  { name: "AWS", color: "#FF9900" },
  { name: "Figma", color: "#A259FF" },
  { name: "TS", color: "#3178C6" },
];
