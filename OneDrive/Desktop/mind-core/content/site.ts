/**
 * All written content lives here so design and copy can evolve independently.
 */

export interface Service {
  id: string;
  index: string;
  name: string;
  tagline: string;
  detail: string;
  facets: string[];
  /** The violet accent is reserved for intelligence. */
  pulse?: boolean;
}

export const services: Service[] = [
  {
    id: "products",
    index: "I",
    name: "Digital products",
    tagline: "Software people feel before they understand.",
    detail:
      "End-to-end product design and engineering — from the first sketch to the moment it ships. Interfaces with the polish of consumer hardware and the depth of professional tools.",
    facets: ["Product strategy", "Interface design", "Native-feel web apps"],
  },
  {
    id: "ai",
    index: "II",
    name: "AI systems",
    tagline: "Intelligence, embedded where it matters.",
    detail:
      "Applied AI that disappears into the product: copilots, retrieval systems, and models tuned to your data. No demos that fall apart in production — systems that hold.",
    facets: ["LLM applications", "Retrieval & agents", "Model integration"],
    pulse: true, // the violet accent is reserved for intelligence
  },
  {
    id: "web",
    index: "III",
    name: "Web applications",
    tagline: "The browser, pushed to its ceiling.",
    detail:
      "High-performance applications built on modern frameworks. Sixty frames per second, instant navigation, and architecture your future team will thank you for.",
    facets: ["Next.js & React", "Design systems", "Performance engineering"],
  },
  {
    id: "automation",
    index: "IV",
    name: "Automation",
    tagline: "Your operation, running while you sleep.",
    detail:
      "Workflow systems that remove the repetitive layer of your business — integrations, pipelines, and internal tools that compound in value every week they run.",
    facets: ["Workflow systems", "Integrations", "Internal tooling"],
  },
] as const;

export const process = [
  {
    phase: "Signal",
    title: "We listen before we build",
    body: "A short, intense discovery: your users, your constraints, the one metric that matters. We leave with a thesis, not a backlog.",
  },
  {
    phase: "Form",
    title: "Design as the first prototype",
    body: "Interactive prototypes in days, not decks in weeks. You click the future of your product before a line of production code exists.",
  },
  {
    phase: "Build",
    title: "Engineering at product velocity",
    body: "Weekly shippable increments on a production-grade foundation. You watch the system come alive in real environments, not staging theatre.",
  },
  {
    phase: "Ignite",
    title: "Launch, measure, sharpen",
    body: "Launch is the midpoint. We instrument everything, watch real behaviour, and keep refining until the numbers agree with the vision.",
  },
] as const;

export const work = [
  {
    name: "Mind Core",
    field: "In-house · Application suite",
    outcome:
      "A growing tree of native applications we own end-to-end. One is live; the others are taking shape in the dark.",
    stat: "1 / 4",
    statLabel: "applications live",
  },
  {
    name: "Localis",
    field: "Local commerce · Discovery platform",
    outcome:
      "Neighborhood storefronts discovered, booked, and remembered — one quiet tap from the street to the seat.",
    stat: "3.2k",
    statLabel: "businesses live",
  },
] as const;

export const beliefs = [
  {
    key: "craft",
    line: "Most software is built. Very little is crafted.",
    sub: "We obsess over the last 5% — the easing curve, the empty state, the moment a screen first lights up — because that is where trust is won.",
  },
  {
    key: "future",
    line: "We build as if it's already five years from now.",
    sub: "Architecture, interaction, intelligence — every decision is made for where the industry is going, so your product arrives early.",
  },
  {
    key: "small",
    line: "Small core. No layers between you and the people building.",
    sub: "You talk to the designers and engineers shipping your product. Decisions take a conversation, not a committee.",
  },
] as const;

export const testimonials = [
  {
    quote:
      "It was the first time a vendor demo made our own roadmap look conservative. They didn't present the product — they handed us the keyboard.",
    name: "Lena Hartmann",
    role: "VP Product, Meridian",
  },
  {
    quote:
      "Mind Core works like an internal team that happens to be better than your internal team. The bar they set changed how we hire.",
    name: "David Okafor",
    role: "CTO, Northbeam",
  },
  {
    quote:
      "Every detail felt considered — down to how the interface behaves when things go wrong. Our patients noticed. Our board noticed.",
    name: "Dr. Sofia Reyes",
    role: "Founder, Halcyon",
  },
] as const;

export const nav = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Work", href: "#work" },
] as const;
