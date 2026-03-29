// data/work.jsx

/* ═══════════════════════════════════
   PROJECT CATEGORIES / FILTERS
   ═══════════════════════════════════ */

export const categories = [
  { id: "all", label: "All Work", count: 24 },
  { id: "web", label: "Web Apps", count: 9 },
  { id: "mobile", label: "Mobile", count: 5 },
  { id: "saas", label: "SaaS", count: 6 },
  { id: "ecommerce", label: "E-Commerce", count: 4 },
  { id: "branding", label: "Branding", count: 3 },
  { id: "ai", label: "AI / ML", count: 3 },
];

/* ═══════════════════════════════════
   FEATURED PROJECTS (Full Case Studies)
   ═══════════════════════════════════ */

export const featuredProjects = [
  {
    id: "helios-finance",
    num: "01",
    title: "Helios Finance",
    tagline: "Redefining personal wealth management",
    category: "saas",
    year: "2024",
    duration: "12 weeks",
    client: "Helios Finance Inc.",
    industry: "Fintech",
    description:
      "A comprehensive wealth management platform that combines AI-driven insights with an intuitive interface. We rebuilt their legacy system from the ground up, resulting in 340% revenue growth and 10K users within the first month.",
    challenge:
      "Legacy .NET monolith with 4-second load times, fragmented user experience across 3 separate portals, and zero mobile support.",
    solution:
      "Microservices architecture on AWS, React/Next.js frontend with real-time data streaming, native-quality PWA for mobile, and AI-powered portfolio recommendations.",
    gradient: "from-violet-600/20 via-indigo-600/15 to-blue-600/10",
    accentColor: "text-violet-400",
    accentBg: "bg-violet-400",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1563986768609-322da13575f2?w=800&h=500&fit=crop",
    ],
    tags: ["React", "Next.js", "Node.js", "AWS", "PostgreSQL", "AI/ML"],
    metrics: [
      { value: "+340%", label: "Revenue Growth", period: "6 months" },
      { value: "10K+", label: "Users Month 1", period: "Launch" },
      { value: "0.4s", label: "Load Time", period: "From 4s" },
      { value: "98", label: "NPS Score", period: "Post-launch" },
    ],
    testimonial: {
      quote:
        "Raccoon Studio didn't just build our product — they helped us rethink our entire business model. The results speak for themselves.",
      author: "Sarah Chen",
      role: "CEO, Helios Finance",
      avatar: "https://i.pravatar.cc/64?img=23",
    },
    awards: ["Webby Award 2024", "Fintech Innovation Award"],
    liveUrl: "https://heliosfinance.com",
    featured: true,
  },
  {
    id: "prism-labs",
    num: "02",
    title: "Prism Labs",
    tagline: "AI-powered content creation at scale",
    category: "ai",
    year: "2024",
    duration: "5 weeks",
    client: "Prism Labs Inc.",
    industry: "AI / Content Tech",
    description:
      "An AI-powered content creation platform that generates, optimizes, and distributes content across channels. Built from a 47-page requirements doc to a working MVP in just 19 days.",
    challenge:
      "Needed to launch before a competitor's funding announcement. 47-page spec, zero existing codebase, 3-week hard deadline.",
    solution:
      "Rapid prototyping with Next.js, GPT-4 integration via streaming APIs, real-time collaboration with CRDTs, and automated deployment pipeline.",
    gradient: "from-cyan-600/20 via-teal-600/15 to-emerald-600/10",
    accentColor: "text-cyan-400",
    accentBg: "bg-cyan-400",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1684163761555-25d4eef51553?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800&h=500&fit=crop",
    ],
    tags: ["Next.js", "GPT-4", "Python", "Redis", "WebSockets", "Vercel"],
    metrics: [
      { value: "19", label: "Days to MVP", period: "Record" },
      { value: "50K", label: "Docs Generated", period: "Month 1" },
      { value: "<200ms", label: "API Response", period: "P95" },
      { value: "$2.4M", label: "Seed Round", period: "Post-launch" },
    ],
    testimonial: {
      quote:
        "They delivered what other agencies quoted 3 months for — in 19 days. Not 19 business days. 19 calendar days.",
      author: "Marcus Webb",
      role: "CTO, Prism Labs",
      avatar: "https://i.pravatar.cc/64?img=12",
    },
    awards: ["Product Hunt #1 of the Day"],
    liveUrl: "https://prismlabs.ai",
    featured: true,
  },
  {
    id: "cloudvault",
    num: "03",
    title: "CloudVault",
    tagline: "Enterprise cloud storage, simplified",
    category: "saas",
    year: "2024",
    duration: "16 weeks",
    client: "CloudVault Inc.",
    industry: "Cloud Infrastructure",
    description:
      "A next-generation cloud storage platform built for enterprise teams. Zero-knowledge encryption, real-time collaboration, and seamless integrations with 50+ tools.",
    challenge:
      "Scale from 1K to 500K users without architecture changes. SOC 2 compliance required. Multi-region deployment with <50ms latency worldwide.",
    solution:
      "Distributed architecture on AWS with edge caching, end-to-end encryption at the application layer, and a plugin system for third-party integrations.",
    gradient: "from-emerald-600/20 via-green-600/15 to-teal-600/10",
    accentColor: "text-emerald-400",
    accentBg: "bg-emerald-400",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&h=500&fit=crop",
    ],
    tags: ["Go", "React", "AWS", "Terraform", "Redis", "gRPC"],
    metrics: [
      { value: "500K", label: "Users Scaled To", period: "12 months" },
      { value: "99.99%", label: "Uptime", period: "Since launch" },
      { value: "<42ms", label: "Global Latency", period: "P99" },
      { value: "SOC 2", label: "Certified", period: "Type II" },
    ],
    testimonial: {
      quote:
        "Went from 1K to 500K users with zero architecture changes. That's the kind of engineering foresight that's impossible to find.",
      author: "Priya Nair",
      role: "VP Eng, CloudVault",
      avatar: "https://i.pravatar.cc/64?img=47",
    },
    awards: ["Cloud Computing Excellence Award"],
    liveUrl: "https://cloudvault.io",
    featured: true,
  },
  {
    id: "nexus-ai",
    num: "04",
    title: "Nexus AI",
    tagline: "Intelligence dashboard for data teams",
    category: "ai",
    year: "2023",
    duration: "10 weeks",
    client: "Nexus AI Corp.",
    industry: "Data Analytics",
    description:
      "A real-time analytics dashboard that transforms raw data into actionable insights. Built with performance as the north star — every interaction under 100ms.",
    challenge:
      "Visualize 10M+ data points in real-time without lag. Complex filtering across 200+ dimensions. Needed to support both technical and non-technical users.",
    solution:
      "WebGL-powered data visualization, intelligent data aggregation pipeline, natural language query interface powered by GPT-4, and a progressive disclosure UI pattern.",
    gradient: "from-amber-600/20 via-orange-600/15 to-red-600/10",
    accentColor: "text-amber-400",
    accentBg: "bg-amber-400",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop",
    ],
    tags: ["React", "D3.js", "WebGL", "Python", "ClickHouse", "GPT-4"],
    metrics: [
      { value: "95+", label: "Lighthouse Score", period: "All pages" },
      { value: "10M+", label: "Data Points", period: "Real-time" },
      { value: "<100ms", label: "Interaction", period: "P95" },
      { value: "3x", label: "Team Velocity", period: "Client report" },
    ],
    testimonial: {
      quote:
        "The cleanest handoff we've ever received. Our internal team was productive from day one.",
      author: "David Kim",
      role: "VP Engineering, Nexus AI",
      avatar: "https://i.pravatar.cc/64?img=33",
    },
    awards: [],
    liveUrl: "https://nexus-ai.com",
    featured: true,
  },
];

/* ═══════════════════════════════════
   ADDITIONAL PROJECTS (Grid Display)
   ═══════════════════════════════════ */

export const gridProjects = [
  {
    id: "vertex-marketing",
    title: "Vertex Marketing",
    tagline: "Conversion-first marketing platform",
    category: "web",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    gradient: "from-rose-600/20 to-pink-600/10",
    accentColor: "text-rose-400",
    tags: ["Next.js", "Tailwind", "Vercel"],
    metric: { value: "3x", label: "Conversions" },
  },
  {
    id: "horizon-health",
    title: "Horizon Health",
    tagline: "Telehealth reimagined",
    category: "mobile",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop",
    gradient: "from-blue-600/20 to-indigo-600/10",
    accentColor: "text-blue-400",
    tags: ["React Native", "Node.js", "HIPAA"],
    metric: { value: "4.9★", label: "App Store" },
  },
  {
    id: "cipher-security",
    title: "Cipher Security",
    tagline: "Zero-trust security dashboard",
    category: "saas",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    gradient: "from-slate-600/20 to-zinc-600/10",
    accentColor: "text-slate-300",
    tags: ["Vue.js", "Go", "Docker"],
    metric: { value: "0", label: "Breaches" },
  },
  {
    id: "orbit-space",
    title: "Orbit Space",
    tagline: "Coworking management platform",
    category: "web",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
    gradient: "from-purple-600/20 to-violet-600/10",
    accentColor: "text-purple-400",
    tags: ["React", "Stripe", "PostgreSQL"],
    metric: { value: "200+", label: "Locations" },
  },
  {
    id: "atlas-logistics",
    title: "Atlas Logistics",
    tagline: "Real-time fleet management",
    category: "web",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
    gradient: "from-orange-600/20 to-amber-600/10",
    accentColor: "text-orange-400",
    tags: ["React", "Node.js", "MapboxGL"],
    metric: { value: "40%", label: "Cost Saved" },
  },
  {
    id: "nova-ecommerce",
    title: "Nova Store",
    tagline: "Luxury e-commerce experience",
    category: "ecommerce",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop",
    gradient: "from-yellow-600/20 to-amber-600/10",
    accentColor: "text-yellow-400",
    tags: ["Shopify Plus", "Next.js", "Sanity"],
    metric: { value: "+180%", label: "AOV" },
  },
  {
    id: "quantum-brand",
    title: "Quantum Labs",
    tagline: "Full brand identity system",
    category: "branding",
    year: "2023",
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    gradient: "from-fuchsia-600/20 to-pink-600/10",
    accentColor: "text-fuchsia-400",
    tags: ["Brand Strategy", "Design System", "Motion"],
    metric: { value: "12", label: "Touchpoints" },
  },
  {
    id: "apex-fitness",
    title: "Apex Fitness",
    tagline: "AI-powered workout platform",
    category: "mobile",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop",
    gradient: "from-lime-600/20 to-green-600/10",
    accentColor: "text-lime-400",
    tags: ["Flutter", "TensorFlow", "Firebase"],
    metric: { value: "250K", label: "Downloads" },
  },
];

/* ═══════════════════════════════════
   CLIENT RESULTS (Aggregate Stats)
   ═══════════════════════════════════ */

export const aggregateResults = [
  {
    value: "$48M+",
    label: "Revenue Generated",
    description: "Across all client projects",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6" />
      </svg>
    ),
  },
  {
    value: "2.4M+",
    label: "Users Reached",
    description: "Combined user base",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75M9 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
  },
  {
    value: "99.8%",
    label: "Avg Uptime",
    description: "Across production systems",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
  },
  {
    value: "4.9/5",
    label: "Client Rating",
    description: "Average across all engagements",
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
      </svg>
    ),
  },
];

/* ═══════════════════════════════════
   AWARDS & RECOGNITION
   ═══════════════════════════════════ */

export const awards = [
  {
    name: "Webby Awards",
    year: "2024",
    category: "Best Financial Services App",
    project: "Helios Finance",
    icon: "🏆",
  },
  {
    name: "Awwwards",
    year: "2024",
    category: "Site of the Day",
    project: "Vertex Marketing",
    icon: "🌟",
  },
  {
    name: "Product Hunt",
    year: "2024",
    category: "#1 Product of the Day",
    project: "Prism Labs",
    icon: "🚀",
  },
  {
    name: "CSS Design Awards",
    year: "2023",
    category: "Best UX Design",
    project: "Nexus AI Dashboard",
    icon: "🎨",
  },
  {
    name: "Clutch Top 100",
    year: "2024",
    category: "Top Development Agency",
    project: "Raccoon Studio",
    icon: "📋",
  },
  {
    name: "Cloud Excellence",
    year: "2024",
    category: "Best Cloud Architecture",
    project: "CloudVault",
    icon: "☁️",
  },
];

/* ═══════════════════════════════════
   INDUSTRIES SERVED
   ═══════════════════════════════════ */

export const industries = [
  { name: "Fintech", count: 8, icon: "💰" },
  { name: "Healthcare", count: 5, icon: "🏥" },
  { name: "SaaS / B2B", count: 12, icon: "☁️" },
  { name: "E-Commerce", count: 6, icon: "🛍" },
  { name: "AI / ML", count: 4, icon: "🤖" },
  { name: "Education", count: 3, icon: "📚" },
  { name: "Real Estate", count: 3, icon: "🏠" },
  { name: "Logistics", count: 2, icon: "🚛" },
];

/* ═══════════════════════════════════
   TECH STACK BREAKDOWN
   ═══════════════════════════════════ */

export const techStackUsed = [
  {
    category: "Frontend",
    tools: [
      { name: "React", projects: 38, color: "#61DAFB" },
      { name: "Next.js", projects: 28, color: "#ffffff" },
      { name: "TypeScript", projects: 42, color: "#3178C6" },
      { name: "Tailwind CSS", projects: 35, color: "#06B6D4" },
      { name: "Vue.js", projects: 6, color: "#4FC08D" },
      { name: "Framer Motion", projects: 22, color: "#FF0050" },
    ],
  },
  {
    category: "Backend",
    tools: [
      { name: "Node.js", projects: 30, color: "#339933" },
      { name: "Python", projects: 18, color: "#3776AB" },
      { name: "Go", projects: 8, color: "#00ADD8" },
      { name: "PostgreSQL", projects: 32, color: "#4169E1" },
      { name: "Redis", projects: 20, color: "#DC382D" },
      { name: "GraphQL", projects: 14, color: "#E10098" },
    ],
  },
  {
    category: "Cloud & DevOps",
    tools: [
      { name: "AWS", projects: 36, color: "#FF9900" },
      { name: "Vercel", projects: 22, color: "#ffffff" },
      { name: "Docker", projects: 28, color: "#2496ED" },
      { name: "Terraform", projects: 12, color: "#7B42BC" },
      { name: "GitHub Actions", projects: 40, color: "#2088FF" },
      { name: "Datadog", projects: 15, color: "#632CA6" },
    ],
  },
];

/* ═══════════════════════════════════
   CLIENT LOGOS / BRANDS
   ═══════════════════════════════════ */

export const clientBrands = [
  { name: "Helios", letters: "HELIOS" },
  { name: "Prism", letters: "PRISM" },
  { name: "Nexus", letters: "NEXUS" },
  { name: "CloudVault", letters: "CLOUDVAULT" },
  { name: "Orbit", letters: "ORBIT" },
  { name: "Vertex", letters: "VERTEX" },
  { name: "Horizon", letters: "HORIZON" },
  { name: "Apex", letters: "APEX" },
  { name: "Nova", letters: "NOVA" },
  { name: "Cipher", letters: "CIPHER" },
  { name: "Quantum", letters: "QUANTUM" },
  { name: "Atlas", letters: "ATLAS" },
];

/* ═══════════════════════════════════
   PROCESS METHODOLOGY
   ═══════════════════════════════════ */

export const methodology = [
  {
    phase: "Discover",
    duration: "Week 1",
    description: "Deep dive into your business, users, and market",
    deliverables: [
      "User Research Report",
      "Competitive Analysis",
      "Technical Spec",
    ],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.35-4.35" />
      </svg>
    ),
  },
  {
    phase: "Design",
    duration: "Week 2–3",
    description: "UI/UX design with iterative feedback loops",
    deliverables: ["Wireframes", "High-Fi Mockups", "Interactive Prototype"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    phase: "Develop",
    duration: "Week 3–10",
    description: "Agile sprints with weekly demos and feedback",
    deliverables: ["Production Code", "API Documentation", "Test Suite"],
    icon: (
      <svg
        className="w-5 h-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    phase: "Launch",
    duration: "Week 11–12",
    description: "Deployment, monitoring, and optimization",
    deliverables: [
      "Production Deploy",
      "Monitoring Setup",
      "Performance Report",
    ],
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
];

/* ═══════════════════════════════════
   TRUST SIGNALS FOR WORK PAGE
   ═══════════════════════════════════ */

export const workTrustSignals = {
  stats: [
    { value: "50+", label: "Projects Shipped" },
    { value: "93%", label: "Client Retention" },
    { value: "100%", label: "On-Time Delivery" },
    { value: "4.9/5", label: "Avg Rating" },
  ],
  certifications: [
    "SOC 2 Type II",
    "GDPR Compliant",
    "AWS Partner",
    "ISO 27001",
  ],
  guarantees: [
    {
      title: "On-Time Guarantee",
      description:
        "We've never missed a deadline. If we do, your next sprint is free.",
      icon: "⏱",
    },
    {
      title: "Code Ownership",
      description:
        "100% of source code, designs, and assets belong to you. No lock-in.",
      icon: "📦",
    },
    {
      title: "30-Day Warranty",
      description:
        "Free bug fixes for 30 days post-launch. Peace of mind included.",
      icon: "🛡",
    },
    {
      title: "Transparent Pricing",
      description:
        "No hidden fees. Every cost is documented before work begins.",
      icon: "💎",
    },
  ],
};
