const WHATSAPP_NUMBER = "910000000000";
const WHATSAPP_MESSAGE =
  "Hello Hazel India, I'd like a free facility audit for my space.";

export const site = {
  name: "Hazel India",
  url: "https://hazelindia.com",
  title: "Hazel India — AI-Powered Green Facility Management",
  description:
    "Hazel India brings intelligent, eco-first facility management to every home, office, factory and community — powered by AI that predicts, optimises and proves a lighter footprint on the planet.",
  email: "hello@hazelindia.com",
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  emailHref: "mailto:hello@hazelindia.com",
  whatsapp: {
    number: WHATSAPP_NUMBER,
    message: WHATSAPP_MESSAGE,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  },
  tagline: "Green facility care · since 2022",
  footerBlurb:
    "India's first AI-native, sustainability-first facility management company. Cleaner spaces, greener planet, valued people — everywhere.",
} as const;

export const nav = {
  links: [
    { label: "Services", href: "#solutions" },
    { label: "Why Hazel", href: "#problem" },
    { label: "HazelAI", href: "#ai" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  ifm: {
    label: "IFM Services",
    eyebrow: "IFM Services",
    heading: "Integrated facility management for every space.",
    overview: { label: "See all IFM Services", href: "/pages/ifm-services" },
    items: [
      {
        label: "Housekeeping",
        href: "/pages/housekeeping-services-in-hyderabad",
        text: "Daily cleaning, sanitation and common-area upkeep with trained teams.",
      },
      {
        label: "MEP Services",
        href: "/pages/mechanical-electrical-plumbing-services-in-hyderabad",
        text: "HVAC, electrical and plumbing maintenance to keep systems reliable.",
      },
      {
        label: "Landscaping",
        href: "/pages/landscaping-services-in-hyderabad",
        text: "Native gardens, grounds care and water-conscious outdoor maintenance.",
      },
      {
        label: "Pest Control Services",
        href: "/pages/pest-control-services-in-hyderabad",
        text: "Safe, scheduled pest management for homes, offices and industry.",
      },
      {
        label: "Mailroom Services",
        href: "/pages/mailroom-services-in-hyderabad",
        text: "Receiving, sorting, courier coordination and parcel tracking.",
      },
      {
        label: "Concierge Services",
        href: "/pages/concierge-services-in-hyderabad",
        text: "Front-of-house reception, visitor assistance and guest support.",
      },
      {
        label: "Logistics Services",
        href: "/pages/logistics-services-in-hyderabad",
        text: "Material handling, receiving, dispatch and internal movement.",
      },
    ],
  },
  cta: { label: "Get a Free Audit", href: "#contact" },
} as const;

export const hero = {
  eyebrow: "AI-Powered Integrated Facility Management",
  headline: ["Smarter facilities.", "Cleaner spaces.", "Better India."],
  lede: "Complete facility management solutions combining people, technology and sustainable operations.",
  primary: { label: "Explore Our Services", href: "#solutions" },
  secondary: { label: "Get a Free Audit", href: "#contact" },
  trust: [
    { value: "2022", label: "Founded" },
    { value: "HYD", label: "Based in Hyderabad" },
    { value: "100%", label: "Green chemistry" },
  ],
  // The continuous facility tour, scrubbed by scroll position. Same 240 frames as the upload
  // (public/Continuous_tour_of_corporate_fac…mp4, kept untouched), re-encoded with a keyframe
  // every 4 frames so seeking stays cheap enough to show every frame while scrolling.
  video: "/video/hazel-india-hero.mp4",
  // The film's first frame: shown until the video can paint, and for reduced motion.
  poster: "/images/hazel-india-hero-poster.jpg",
} as const;

export const solutions = {
  eyebrow: "Our services",
  heading: "Complete facility solutions.",
  headingAccent: "One trusted partner.",
  lede: "One accountable partner for everything your building needs — trained Hazel India teams, green-certified operations and the HazelAI platform, under a single contract.",
  items: [
    {
      title: "Housekeeping & Cleaning",
      text: "Daily upkeep, deep cleaning and sanitation with biodegradable, low-toxicity products.",
      icon: "SprayCan",
      image: "/images/services/housekeeping.jpg",
      alt: "Professional housekeeping team cleaning a commercial office floor",
      href: "/pages/housekeeping-services-in-hyderabad",
    },
    {
      title: "Landscaping & Green Spaces",
      text: "Native-first gardens, vertical greenery and grounds care that cool your premises.",
      icon: "Trees",
      image: "/images/services/landscaping.jpg",
      alt: "Landscaping crew maintaining gardens at a commercial campus",
      href: "/pages/landscaping-services-in-hyderabad",
    },
    {
      title: "Mailroom & Concierge",
      text: "Front desk, visitor handling, mail and courier management by trained hosts.",
      icon: "ConciergeBell",
      image: "/images/services/mailroom.jpg",
      alt: "Organized office mailroom with sorted parcels and packages",
      href: "/pages/mailroom-services-in-hyderabad",
    },
    {
      title: "Integrated Security Services",
      text: "Trained guarding with AI-assisted surveillance, visitor management and smart access.",
      icon: "ShieldCheck",
      image: "/images/services/security.jpg",
      alt: "Security officer managing access at a modern building lobby",
      href: "/pages/ifm-services",
    },
    {
      title: "MEP Solutions",
      text: "HVAC, plumbing, electrical and machinery upkeep with predictive maintenance.",
      icon: "Wrench",
      image: "/images/services/mep.jpg",
      alt: "MEP plant room with HVAC, electrical and plumbing systems",
      href: "/pages/mechanical-electrical-plumbing-services-in-hyderabad",
    },
    {
      title: "Waste Management & Green Initiatives",
      text: "Segregation, composting and zero-to-landfill programmes with diversion reporting.",
      icon: "Recycle",
      image: "/images/services/waste.jpg",
      alt: "Color-coded recycling and waste segregation at a facility",
      href: "/pages/ifm-services",
    },
    {
      title: "Logistics & Support Services",
      text: "Pantry, moves, inventory and on-site support staff that keep operations running.",
      icon: "Truck",
      image: "/images/services/logistics.jpg",
      alt: "Facility logistics team moving materials with a pallet jack",
      href: "/pages/logistics-services-in-hyderabad",
    },
    {
      title: "Smart IFM Technology",
      text: "Sensors, dispatch and live dashboards for air, water, energy and ESG reporting.",
      icon: "Cpu",
      image: "/images/services/ifm.jpg",
      alt: "Smart facility control room with live building performance dashboards",
      href: "/pages/ifm-services",
    },
  ],
} as const;

export const cinema = {
  video: "/video/cinema-web.mp4",
  poster: "/images/cinema-poster.jpg",
  beats: [
    {
      at: 0,
      title: "Cleaner spaces.",
      text: "Every corridor, lobby and plant floor — kept with chemistry that belongs in a living world.",
    },
    {
      at: 0.34,
      title: "Greener India.",
      text: "Water reused, waste diverted, air held in the green band — site by site, city by city.",
    },
    {
      at: 0.68,
      title: "Smarter by design.",
      text: "HazelAI predicts the work, proves the footprint, and lets people do the care that machines cannot.",
    },
  ],
} as const;

export const marqueeItems = [
  { text: "AI-native facility management", tag: "AI", image: "/images/intelligence.jpg" },
  { text: "Green operations", tag: "GREEN", image: "/images/planet.jpg" },
  { text: "Smarter spaces", tag: "SMART", image: "/images/office.jpg" },
  { text: "Lower impact", tag: "IMPACT", image: "/images/solar.jpg" },
  { text: "Measurable ESG", tag: "ESG", image: "/images/architecture.jpg" },
  { text: "Predictive cleaning", tag: "PREDICT", image: "/images/cleaning.jpg" },
  { text: "Zero-waste protocols", tag: "WASTE", image: "/images/waste.jpg" },
  { text: "Real-time air & water", tag: "IoT", image: "/images/water.jpg" },
] as const;

export const about = {
  eyebrow: "Get to know us",
  heading: "Everything you want to know, in three tabs.",
  lede: "Hazel India is an AI-native, sustainability-first facility management company. We keep homes, offices, factories and communities clean, healthy and light on the planet — pairing trained, fairly-paid people with technology that measures every litre of water, gram of waste and breath of cleaner air we help create.",
  tabs: [
    {
      id: "planet",
      num: "01",
      label: "Planet",
      title: "The spaces we keep shouldn't cost the earth.",
      body: "Hazel India began with a simple belief: the spaces we live and work in shouldn't cost the earth. Rooted in our journey with IYCN and the Go Green, Live Green movement, we set out to reinvent facility management for a country — and a planet — that needs care more than ever. Planet-first is not a slogan. It is how we choose chemistry, water, waste and energy on every site.",
      image: "/images/planet.jpg",
      images: ["/images/planet.jpg", "/images/planet-2.jpg", "/images/landscape-2.jpg"],
      alt: "Sunlit forest canopy standing in for the planet we work to protect",
    },
    {
      id: "people",
      num: "02",
      label: "People",
      title: "Trained, respected people — on every badge.",
      body: "We are not just another housekeeping or security contractor. Clean, healthy spaces are delivered by people who are trained, fairly paid and treated with dignity. From a family apartment to a sprawling industrial campus, Hazel makes low-impact care accessible because a greener India is built one well-kept space — and one valued team — at a time.",
      image: "/images/people.jpg",
      images: ["/images/people.jpg", "/images/people-2.jpg", "/images/pledge-people.jpg"],
      alt: "A focused team collaborating in a bright, well-kept workspace",
    },
    {
      id: "intelligence",
      num: "03",
      label: "Intelligence",
      title: "AI that predicts, optimises and proves a lighter footprint.",
      body: "We are an AI-native, sustainability-first facility partner — combining trained, respected people with intelligent technology that measures every litre of water, every gram of waste and every breath of cleaner air we help create. Intelligence everywhere means you don't just trust that a space is cared for. You can see it.",
      image: "/images/intelligence.jpg",
      images: ["/images/intelligence.jpg", "/images/intelligence-2.jpg", "/images/sensors.jpg"],
      alt: "Robotics and sensors standing in for HazelAI's monitoring layer",
    },
  ],
} as const;

export const services = {
  eyebrow: "What we do",
  heading: "One partner for every space you care about.",
  lede: "Integrated, green-certified facility services — delivered to homes, businesses and communities alike, all orchestrated by the HazelAI platform.",
  items: [
    {
      num: "01",
      title: "Eco cleaning & sanitation",
      text: "Deep cleaning, disinfection and daily upkeep using biodegradable, low-toxicity products and reused water.",
      icon: "Sparkles",
      image: "/images/cleaning.jpg",
      images: ["/images/cleaning.jpg", "/images/cleaning-2.jpg", "/images/cleaning-3.jpg"],
      alt: "Editorial view of a carefully maintained interior surface",
    },
    {
      num: "02",
      title: "Technical & MEP upkeep",
      text: "HVAC, plumbing, electrical and machinery maintenance — with predictive servicing that prevents breakdowns.",
      icon: "Wrench",
      image: "/images/industrial.jpg",
      images: ["/images/industrial.jpg", "/images/industrial-2.jpg", "/images/industrial-3.jpg"],
      alt: "Industrial plant room and technical infrastructure",
    },
    {
      num: "03",
      title: "Landscaping & green spaces",
      text: "Native-first gardens, vertical greenery and rainwater systems that cool and beautify your premises.",
      icon: "Leaf",
      image: "/images/landscape.jpg",
      images: ["/images/landscape.jpg", "/images/landscape-2.jpg", "/images/landscape-3.jpg"],
      alt: "Lush native landscaping around a contemporary building",
    },
    {
      num: "04",
      title: "Waste & recycling",
      text: "Source segregation, composting and zero-to-landfill programmes with full diversion reporting.",
      icon: "Recycle",
      image: "/images/waste.jpg",
      images: ["/images/waste.jpg", "/images/waste-2.jpg", "/images/waste-3.jpg"],
      alt: "Organized recycling and material recovery environment",
    },
    {
      num: "05",
      title: "Security & smart access",
      text: "Trained guarding fused with AI-assisted surveillance and visitor management.",
      icon: "Shield",
      image: "/images/office.jpg",
      images: ["/images/office.jpg", "/images/office-2.jpg", "/images/architecture-3.jpg"],
      alt: "Contemporary commercial lobby with calm, precise lighting",
    },
    {
      num: "06",
      title: "AI monitoring & ESG",
      text: "Live air, water and energy dashboards plus audit-ready carbon and sustainability reports for every site.",
      icon: "Activity",
      image: "/images/architecture.jpg",
      images: ["/images/architecture.jpg", "/images/architecture-2.jpg", "/images/intelligence-2.jpg"],
      alt: "Green-certified commercial architecture at dusk",
    },
  ],
} as const;

export const impact = {
  eyebrow: "The opportunity",
  heading: "Built for India's next generation of spaces.",
  lede: "We're a young company in one of India's fastest-growing markets — Hyderabad, the country's second-largest office hub and our home turf. Here's the opportunity, and the targets we're building toward.",
  footnote:
    "Market figures from 2025–26 industry reports; our targets are working goals.",
  stats: [
    {
      n: "140M+",
      title: "sq ft of office space",
      text: "Hyderabad's commercial stock today — projected to reach ~200M sq ft by 2030.",
      image: "/images/city.jpg",
      images: ["/images/city.jpg", "/images/architecture.jpg", "/images/office-2.jpg"],
      alt: "Dense urban skyline representing India's commercial growth",
    },
    {
      n: "10%+",
      title: "FM market CAGR",
      text: "India's facility-management sector is growing double-digits, year on year.",
      image: "/images/architecture-2.jpg",
      images: ["/images/architecture-2.jpg", "/images/office.jpg", "/images/city-2.jpg"],
      alt: "Contemporary commercial towers in warm light",
    },
    {
      n: "18%",
      title: "of India's green offices",
      text: "Hyderabad leads the country on green-certified buildings — exactly our market.",
      image: "/images/architecture-3.jpg",
      images: ["/images/architecture-3.jpg", "/images/landscape-2.jpg", "/images/solar.jpg"],
      alt: "Glass architecture with planted surroundings",
    },
  ],
} as const;

export const roadmap = {
  eyebrow: "Our roadmap to 2030",
  heading: "A measured path from home turf to regional leader.",
  milestones: [
    {
      year: "2022",
      title: "Founded",
      text: "Started with an eco-first, people-first promise.",
      image: "/images/planet-2.jpg",
      alt: "Open landscape at the start of the Hazel journey",
    },
    {
      year: "2025",
      title: "Establish in Hyderabad",
      text: "Target: 15 managed sites · ~0.5M sq ft under care · 120 trained team members.",
      image: "/images/city-2.jpg",
      alt: "Indian civic architecture standing in for Hyderabad home turf",
    },
    {
      year: "2027",
      title: "Multi-city",
      text: "Goal: 100 sites across 3 cities · ~5M sq ft managed · 700+ green jobs.",
      image: "/images/city.jpg",
      alt: "A growing metropolitan skyline",
    },
    {
      year: "2030",
      title: "Regional leader",
      text: "Vision: 350+ sites · ~20M sq ft · 2,000+ jobs · 100M+ litres water reused/yr.",
      image: "/images/solar.jpg",
      alt: "Renewable infrastructure as a stand-in for regional scale",
    },
  ],
} as const;

export const machinery = {
  eyebrow: "Equipment",
  heading: "The machines behind a lighter footprint.",
  lede: "The AI-driven, water-smart equipment we build every Hazel site around — chosen to clean better while using a fraction of the water and chemicals of conventional cleaning.",
  items: [
    {
      id: "scrubbers",
      title: "AI autonomous scrubbers",
      text: "Self-driving floor-cleaning robots (Avidbots Neo / Tennant X-series class) navigate and clean large floors unattended, detecting obstacles in real time — freeing our people for detail work.",
      metric: "Unattended",
      metricLabel: "Large-floor coverage",
      image: "/images/robot.jpg",
      images: ["/images/robot.jpg", "/images/machine-floor.jpg", "/images/cleaning-3.jpg"],
      alt: "Automation hardware representing autonomous floor care",
    },
    {
      id: "nanobubble",
      title: "Nanobubble water cleaning",
      text: "Electrically-converted water (ec-H2O NanoClean–type tech): an on-board cell turns plain water into millions of cleaning nanobubbles — near-zero daily floor detergent, far less water.",
      metric: "Near-zero",
      metricLabel: "Daily floor detergent",
      image: "/images/machine-water.jpg",
      images: ["/images/machine-water.jpg", "/images/water.jpg", "/images/water-2.jpg"],
      alt: "Clear water standing in for nanobubble cleaning chemistry",
    },
    {
      id: "recycle-scrub",
      title: "Water-recycling scrubbers",
      text: "On-board multi-stage filtration recycles wash water as the machine runs, cutting fresh-water use by up to 80%.",
      metric: "80%",
      metricLabel: "Less fresh water",
      image: "/images/machine-plant.jpg",
      images: ["/images/machine-plant.jpg", "/images/industrial-2.jpg", "/images/water-2.jpg"],
      alt: "Plant-room infrastructure for recycled wash water",
    },
    {
      id: "iot-water",
      title: "IoT water & leak intelligence",
      text: "Smart meters with acoustic/ultrasonic and AI sensors flag leaks and waste the moment they start, with automatic shut-off valves and a live dashboard.",
      metric: "Live",
      metricLabel: "Leak & waste alerts",
      image: "/images/sensors.jpg",
      images: ["/images/sensors.jpg", "/images/intelligence-2.jpg", "/images/machine-plumb.jpg"],
      alt: "Sensor hardware for live leak and waste detection",
    },
    {
      id: "greywater",
      title: "Automated greywater recycling",
      text: "Filters and reuses water from sinks and showers for flushing and irrigation — up to 50% less water consumption per site.",
      metric: "50%",
      metricLabel: "Less site water use",
      image: "/images/machine-plumb.jpg",
      images: ["/images/machine-plumb.jpg", "/images/water.jpg", "/images/landscape-3.jpg"],
      alt: "Water infrastructure used in greywater reuse",
    },
    {
      id: "hepa",
      title: "HEPA + AI air quality",
      text: "HEPA-filter vacuums paired with IoT AQI & CO₂ sensors keep indoor air healthy and within the green band, automatically.",
      metric: "Green band",
      metricLabel: "AQI & CO₂ control",
      image: "/images/interior.jpg",
      images: ["/images/interior.jpg", "/images/office-3.jpg", "/images/sensors.jpg"],
      alt: "Calm interior air and light as a stand-in for green-band AQI",
    },
  ],
} as const;

export const hazelAI = {
  eyebrow: "The HazelAI platform",
  heading: "Intelligence that makes clean predictable, provable and lighter on Earth.",
  lede: "Every Hazel site runs on a connected layer of sensors, dispatch and analytics — so you don't just trust that a space is cared for, you can see it.",
  honesty:
    "Some of what is below is live on our managed sites today; some is part of the platform we're actively rolling out through 2026. We'll always tell you which is which.",
  demoNote: "Visual demonstration — not live site data.",
  image: "/images/intelligence.jpg",
  images: ["/images/intelligence.jpg", "/images/office-2.jpg", "/images/sensors.jpg"],
  alt: "Connected hardware representing the HazelAI sensing layer",
  states: [
    {
      id: "predict",
      num: "01",
      label: "Predict",
      title: "Predictive cleaning & maintenance",
      text: "Footfall, occupancy and IoT sensors tell HazelAI where and when attention is actually needed — ending wasteful fixed schedules.",
      items: [
        { text: "Dynamic task routing for staff", status: "roadmap" },
        { text: "Equipment failure flagged before breakdown", status: "roadmap" },
        { text: "Up to 30% less water & chemical use", status: "roadmap" },
      ],
      image: "/images/office-2.jpg",
      alt: "Occupied workplace that HazelAI would schedule around",
    },
    {
      id: "sense",
      num: "02",
      label: "Sense",
      title: "Live environment monitoring",
      text: "Air quality, humidity, water reuse and energy are tracked in real time and surfaced on a single dashboard for every facility.",
      items: [
        { text: "AQI & CO₂ green-band alerts", status: "roadmap" },
        { text: "Leak & wastage detection", status: "roadmap" },
        { text: "Healthier indoor spaces, automatically", status: "roadmap" },
      ],
      image: "/images/interior.jpg",
      alt: "A healthy indoor environment under live monitoring",
    },
    {
      id: "prove",
      num: "03",
      label: "Prove",
      title: "Carbon & ESG dashboards",
      text: "Auto-generated sustainability reports turn your facility into measurable climate action you can share with stakeholders.",
      items: [
        { text: "Carbon, water & waste diversion metrics", status: "roadmap" },
        { text: "Audit-ready ESG exports", status: "roadmap" },
        { text: "Benchmarks across your portfolio", status: "roadmap" },
      ],
      image: "/images/process-prove.jpg",
      alt: "Analytics work representing audit-ready ESG proof",
    },
    {
      id: "serve",
      num: "04",
      label: "Serve",
      title: "AI concierge & instant booking",
      text: "A conversational assistant lets residents and managers request, track and rate any service — no call centre, no waiting.",
      items: [
        { text: "Chat & voice service requests", status: "roadmap" },
        { text: "Live status and ETAs", status: "roadmap" },
        { text: "Quality scoring on every job", status: "roadmap" },
      ],
      image: "/images/people-2.jpg",
      alt: "People coordinating care through a live service layer",
    },
  ],
} as const;

export const problem = {
  eyebrow: "The problem",
  heading: "Tired of hoping your space is actually clean?",
  body: "Most facility vendors ask you to take their word for it. No proof a room was actually serviced. No warning before an AC unit fails. No real answer when your board asks for a carbon number. And every few months, a new set of untrained staff to break in all over again.",
  pains: [
    {
      icon: "ClipboardList",
      title: "No proof of work",
      text: "You pay for cleaning with no record it happened.",
    },
    {
      icon: "Wrench",
      title: "Reactive maintenance",
      text: "Breakdowns show up as emergencies, not warnings.",
    },
    {
      icon: "TrendingDown",
      title: "No sustainability data",
      text: "ESG reporting means chasing five vendors for numbers.",
    },
    {
      icon: "RefreshCw",
      title: "Staff churn",
      text: "A new, untrained team every few months.",
    },
  ],
  transition:
    "Hazel replaces guesswork with proof — one partner, one dashboard, everything accounted for.",
} as const;

export const trustStrip = {
  eyebrow: "Transparency",
  heading: "Where we are — and where we're headed.",
  today: {
    label: "Where we are today",
    items: [
      {
        value: "Launching",
        label: "First managed sites in Hyderabad",
        note: "We're onboarding our opening wave of sites — we'll publish a live count as contracts go live.",
      },
      {
        value: "100%",
        label: "Biodegradable, low-toxicity cleaning chemistry",
      },
      {
        value: "2022",
        label: "Operating in Hyderabad since founding",
      },
    ],
  },
  ahead: {
    label: "Where we're headed by 2030",
    items: [
      { value: "28", label: "States — expansion goal" },
      { value: "24/7", label: "AI monitoring — platform rollout target" },
      { value: "350+", label: "Sites · ~20M sq ft — regional leader vision" },
    ],
  },
} as const;

export const siteWalkthrough = {
  eyebrow: "How a Hazel site starts",
  heading: "See what a Hazel site actually looks like",
  lede: "Here's what changes in the first 30 days on a typical site:",
  weeks: [
    {
      label: "Week 1",
      title: "Baseline audit",
      text: "Water, waste, and air readings before we start.",
    },
    {
      label: "Week 2",
      title: "Sensors & team live",
      text: "Dashboard goes live; staff matched and onboarded.",
    },
    {
      label: "Week 3–4",
      title: "Predictive scheduling",
      text: "Fixed routines give way to demand-led work.",
    },
    {
      label: "Day 30",
      title: "First proof report",
      text: "Carbon & quality report, benchmarked against your baseline.",
    },
  ],
  cta: {
    text: "Want to see this on a real site? Ask for a live walkthrough during your free audit.",
    label: "Request a free audit",
    href: "#contact",
  },
} as const;

export const pricing = {
  eyebrow: "Engagement",
  heading: "Choose the model that fits your space",
  models: [
    {
      id: "per-visit",
      title: "Per-Visit",
      text: "For smaller homes and one-off deep cleans. Pay per service, no long-term commitment.",
      bestFor: "Apartments, small offices",
    },
    {
      id: "managed",
      title: "Managed Contract",
      text: "Monthly or annual coverage for ongoing housekeeping, MEP, and platform access. Staffing and scheduling handled end-to-end.",
      bestFor: "Offices, tech parks, gated communities",
      featured: true,
    },
    {
      id: "industrial",
      title: "Custom Industrial",
      text: "Scoped to your site's machinery, compliance, and water treatment needs, with a dedicated account team.",
      bestFor: "Factories, warehouses, labs",
    },
  ],
  footnote:
    "Exact pricing depends on site size and service mix — you'll get a real quote as part of your free audit, not a guess.",
} as const;

export const faq = {
  eyebrow: "FAQ",
  heading: "Straight answers before you buy.",
  items: [
    {
      q: "How long is a typical contract?",
      a: "Per-visit work has no lock-in. Managed contracts are usually annual, with month-to-month options after the first term where the site plan allows.",
    },
    {
      q: "Are your staff background-verified?",
      a: "Yes when a client contract requires it — identity checks and site induction are part of onboarding. Verification depth follows the compliance standard agreed for that facility.",
    },
    {
      q: "What chemicals do you use — are they safe around kids and pets?",
      a: "All core cleaning products are biodegradable and low-toxicity. We do not currently list third-party ecolabel certifications on this site; ask during your audit for the product sheet for your space.",
    },
    {
      q: "What happens if a scrubber or sensor breaks down on-site?",
      a: "We switch to backup equipment or interim manual methods so service continuity isn't paused while the unit is repaired or replaced.",
    },
    {
      q: "How fast do you respond to MEP emergencies?",
      a: "Priority MEP calls are acknowledged the same business day during operating hours. Exact emergency SLAs are written into each managed-site agreement.",
    },
    {
      q: "Can I pause or cancel service?",
      a: "Yes. Managed contracts typically need 30 days' written notice to pause or cancel. Per-visit bookings can be changed or cancelled before the scheduled slot.",
    },
    {
      q: "Do you provide ESG or carbon reports we can share with our board or tenants?",
      a: "Yes — every managed site gets a monthly dashboard report covering water, waste, and energy metrics, exportable for audits and stakeholder reporting.",
    },
    {
      q: "Which cities do you currently serve?",
      a: "Hyderabad today. Multi-city expansion is a 2027–2030 goal, not a current operating claim.",
    },
  ],
} as const;

export const promise = {
  eyebrow: "Our green promise",
  heading: "Facility management that gives back more than it takes.",
  lede: 'Targets we hold ourselves to on every contract — because "green" should be a number you can audit, not a slogan.',
  image: "/images/planet.jpg",
  images: ["/images/planet.jpg", "/images/landscape-2.jpg", "/images/solar.jpg"],
  alt: "A living canopy behind the numbers we hold ourselves to",
  stats: [
    { value: -40, suffix: "%", label: "Water use vs. conventional FM" },
    { value: 90, suffix: "%", label: "Waste diverted from landfill" },
    { value: 0, suffix: "", label: "Toxic chemicals in core kit" },
    { value: 100, suffix: "%", label: "Staff trained & fairly paid" },
  ],
} as const;

export const pledge = {
  eyebrow: "The Hazel Green Pledge",
  heading: "How we hold the line on every contract.",
  items: [
    {
      label: "Biodegradable chemistry",
      image: "/images/pledge-chem.jpg",
      alt: "Living green matter standing in for biodegradable chemistry",
    },
    {
      label: "Electric & manual equipment first",
      image: "/images/pledge-equip.jpg",
      alt: "Quiet infrastructure chosen ahead of diesel and noise",
    },
    {
      label: "Rainwater and greywater reuse",
      image: "/images/pledge-rain.jpg",
      alt: "Open water used for rain and greywater reuse",
    },
    {
      label: "A tree planted for every annual contract",
      image: "/images/pledge-tree.jpg",
      alt: "A forest stand for the tree planted on every annual contract",
    },
    {
      label: "Dignified, living-wage work for every person who wears our badge",
      image: "/images/pledge-people.jpg",
      alt: "People at work, treated as part of the contract",
    },
  ],
  cta: { label: "Partner with us", href: "#contact" },
} as const;

export const process = {
  eyebrow: "How it works",
  heading: "From first call to a measurably greener space.",
  steps: [
    {
      num: "01",
      title: "Free AI Audit",
      text: "We assess your space, baseline its resource use and map a tailored green plan — at no cost.",
      image: "/images/process-audit.jpg",
      alt: "Planning a facility audit at a working table",
    },
    {
      num: "02",
      title: "Smart Setup",
      text: "Sensors and the HazelAI platform go live; trained teams are matched and onboarded to your site.",
      image: "/images/process-setup.jpg",
      alt: "A team assembling the operating layer for a new site",
    },
    {
      num: "03",
      title: "Intelligent Delivery",
      text: "Predictive scheduling keeps your space spotless while cutting water, energy and waste daily.",
      image: "/images/process-delivery.jpg",
      alt: "A carefully kept workplace under intelligent delivery",
    },
    {
      num: "04",
      title: "Prove & Improve",
      text: "Monthly carbon and quality dashboards show your impact — and where we'll save even more.",
      image: "/images/process-prove.jpg",
      alt: "Dashboards used to prove and improve site impact",
    },
  ],
} as const;

export const story = {
  coreWord: "हरित",
  coreCaption: "A GREENER TOMORROW",
  eyebrow: "Who we are",
  heading: "Born from a promise to India's air, water and people.",
  images: [
    { src: "/images/planet.jpg", alt: "Canopy light — the air we work to keep clean" },
    { src: "/images/water-2.jpg", alt: "Open water — the resource we measure and reuse" },
    { src: "/images/people.jpg", alt: "People — the teams who wear the Hazel badge" },
  ],
  paragraphs: [
    "Hazel India began with a simple belief: the spaces we live and work in shouldn't cost the earth. Rooted in our journey with IYCN and the Go Green, Live Green movement, we set out to reinvent facility management for a country — and a planet — that needs care more than ever.",
    "We are not just another housekeeping or security contractor. We are an AI-native, sustainability-first facility partner — combining trained, respected people with intelligent technology that measures every litre of water, every gram of waste and every breath of cleaner air we help create.",
    "From a family apartment to a sprawling industrial campus, Hazel makes clean, healthy, low-impact spaces accessible to everyone — because a greener India is built one well-kept space at a time.",
  ],
} as const;

export const pillars = [
  {
    id: "planet",
    label: "Planet-first",
    text: "Chemistry, water, waste and energy chosen so every site leaves a lighter footprint than conventional facility care.",
    image: "/images/planet-2.jpg",
    alt: "Wild landscape for planet-first operations",
  },
  {
    id: "people",
    label: "People we value",
    text: "Trained, fairly paid teams whose dignity is part of the contract — not an afterthought.",
    image: "/images/people-2.jpg",
    alt: "Colleagues whose dignity is written into the contract",
  },
  {
    id: "intelligence",
    label: "Intelligence everywhere",
    text: "Sensors, dispatch and dashboards that make clean predictable, measurable and lighter on Earth.",
    image: "/images/intelligence-2.jpg",
    alt: "Control hardware for intelligence everywhere",
  },
  {
    id: "access",
    label: "Accessible to all",
    text: "From a family apartment to an industrial campus — green facility care should not be a luxury.",
    image: "/images/residential-2.jpg",
    alt: "A lived-in home that green care should still reach",
  },
] as const;

export const sectors = {
  eyebrow: "Who we serve",
  heading: "One partner for every space you care about.",
  lede: "Integrated, green-certified facility services — delivered to homes, businesses and communities alike, all orchestrated by the HazelAI platform.",
  items: [
    {
      title: "Home & Residential Care",
      tag: "For families",
      text: "Eco cleaning, deep-sanitisation, pest control, plumbing and electrical upkeep for apartments, villas and gated communities — booked in taps, not phone calls.",
      image: "/images/residential.jpg",
      images: ["/images/residential.jpg", "/images/residential-2.jpg", "/images/residential-3.jpg"],
      alt: "Calm residential interior with natural light",
    },
    {
      title: "Commercial & Office FM",
      tag: "For workplaces",
      text: "End-to-end housekeeping, front-of-house, pantry and soft services for offices, tech parks and co-working spaces, tuned to a healthy indoor environment.",
      image: "/images/office.jpg",
      images: ["/images/office.jpg", "/images/office-2.jpg", "/images/office-3.jpg"],
      alt: "Contemporary office interior",
    },
    {
      title: "Industrial & Technical",
      tag: "For industry",
      text: "HVAC, MEP, machinery upkeep, water treatment and high-care cleaning for factories, warehouses and labs — with predictive maintenance built in.",
      image: "/images/industrial.jpg",
      images: ["/images/industrial.jpg", "/images/industrial-2.jpg", "/images/industrial-3.jpg"],
      alt: "Industrial technical environment",
    },
    {
      title: "Landscaping & Green Spaces",
      tag: "For surroundings",
      text: "Native-first landscaping, vertical gardens, rainwater systems and grounds care that cools surroundings and brings biodiversity back to your premises.",
      image: "/images/landscape.jpg",
      images: ["/images/landscape.jpg", "/images/landscape-2.jpg", "/images/landscape-3.jpg"],
      alt: "Native landscaping and green grounds",
    },
    {
      title: "Waste & Sustainability",
      tag: "For the planet",
      text: "Source segregation, composting, recycling logistics and zero-to-landfill programmes — with full carbon and diversion reporting for every site.",
      image: "/images/waste.jpg",
      images: ["/images/waste.jpg", "/images/waste-2.jpg", "/images/waste-3.jpg"],
      alt: "Organized waste and recycling operations",
    },
    {
      title: "Security & Smart Access",
      tag: "For peace of mind",
      text: "Trained guarding fused with AI-assisted surveillance, visitor management and smart access — safety that's vigilant without being intrusive.",
      image: "/images/architecture.jpg",
      images: ["/images/architecture.jpg", "/images/architecture-2.jpg", "/images/architecture-3.jpg"],
      alt: "Secure contemporary building entrance",
    },
  ],
} as const;

export const contact = {
  eyebrow: "Start here",
  heading: "Let's build a greener India together.",
  text: "Tell us about your space. We'll send a free facility audit and a green plan within 48 hours.",
  formNote: "No spam. No obligation. Just a cleaner, greener plan for your space.",
  submit: "Request my free green audit",
  image: "/images/interior-2.jpg",
  images: ["/images/interior-2.jpg", "/images/residential.jpg", "/images/office-3.jpg"],
  alt: "A cared-for interior waiting on a greener operating plan",
  spaceTypes: [
    { value: "home", label: "Home / apartment" },
    { value: "office", label: "Office / commercial space" },
    { value: "factory", label: "Factory / industrial site" },
    { value: "community", label: "Community / housing society" },
  ],
} as const;

export const footer = {
  services: [
    { label: "Housekeeping", href: "/pages/housekeeping-services-in-hyderabad" },
    { label: "MEP Services", href: "/pages/mechanical-electrical-plumbing-services-in-hyderabad" },
    { label: "Landscaping", href: "/pages/landscaping-services-in-hyderabad" },
    { label: "IFM Services", href: "/pages/ifm-services" },
    { label: "Logistics", href: "/pages/logistics-services-in-hyderabad" },
  ],
  company: [
    { label: "Why Hazel", href: "#problem" },
    { label: "HazelAI Platform", href: "#ai" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ],
  portals: [
    {
      label: "Customer Portal",
      href: "https://hazelindia.com/myspace.html",
    },
    {
      label: "Operations Console",
      href: "https://hazelindia.com/ops.html",
    },
    {
      label: "Site Admin",
      href: "https://hazelindia.com/admin.html",
    },
  ],
  social: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
  ],
  assocLabel: "Serving India since 2022 · Proudly associated with",
  assocBadges: ["IYCN", "Go Green · Live Green"],
  copyright: "© 2026 Hazel India · Serving since 2022 · A greener tomorrow, today.",
  bottomRight: "In association with IYCN & the Go Green · Live Green movement",
  image: "/images/footer.jpg",
  alt: "City light under a quieter, greener operations layer",
} as const;

export type SpaceType = (typeof contact.spaceTypes)[number]["value"];
