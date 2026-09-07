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
  tagline: "Green facility care · since 2022",
  footerBlurb:
    "India's first AI-native, sustainability-first facility management company. Cleaner spaces, greener planet, valued people — everywhere.",
} as const;

export const nav = {
  links: [
    { label: "About", href: "#about" },
    { label: "What we do", href: "#services" },
    { label: "HazelAI", href: "#ai" },
    { label: "Impact", href: "#impact" },
    { label: "Machinery", href: "#machinery" },
  ],
  greenImpact: { label: "Green Impact", href: "#promise" },
  cta: { label: "Get a Free Audit", href: "#contact" },
} as const;

export const hero = {
  tag: "India's first AI-native green facility company",
  headline: ["Cleaner spaces.", "Greener India.", "Smarter by design."],
  lede: "Hazel India brings intelligent, eco-first facility management to every home, office, factory and community — powered by AI that predicts, optimises and proves a lighter footprint on the planet.",
  primary: { label: "Get a Free Audit", href: "#contact" },
  secondary: { label: "Watch Our Story", href: "#story" },
  visual: "/images/hero-arch.jpg",
  visualAlt: "Sunlit green interior with plants and calm architectural space",
  features: [
    { label: "AI-Powered", icon: "leaf" },
    { label: "Sustainable", icon: "chart" },
    { label: "Trusted Across India", icon: "shield" },
  ],
  video: "/video/hero.mp4",
  poster: "/images/hero-poster.jpg",
  stats: [
    { value: 100, suffix: "%", label: "Green-certified chemistry" },
    { value: 28, suffix: "", label: "States we aim to serve" },
    { value: 24, suffix: "/7", label: "AI monitoring & dispatch" },
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
        "Dynamic task routing for staff",
        "Equipment failure flagged before breakdown",
        "Up to 30% less water & chemical use",
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
        "AQI & CO₂ green-band alerts",
        "Leak & wastage detection",
        "Healthier indoor spaces, automatically",
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
        "Carbon, water & waste diversion metrics",
        "Audit-ready ESG exports",
        "Benchmarks across your portfolio",
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
        "Chat & voice service requests",
        "Live status and ETAs",
        "Quality scoring on every job",
      ],
      image: "/images/people-2.jpg",
      alt: "People coordinating care through a live service layer",
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
    { label: "Home Care", href: "#sectors" },
    { label: "Commercial FM", href: "#sectors" },
    { label: "Industrial", href: "#sectors" },
    { label: "Landscaping", href: "#sectors" },
    { label: "Waste & Sustainability", href: "#sectors" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "HazelAI Platform", href: "#ai" },
    { label: "Green Pledge", href: "#pledge" },
    { label: "Careers", href: "#contact" },
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
