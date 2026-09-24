const WHATSAPP_NUMBER = "919505553855";
const WHATSAPP_MESSAGE =
  "Hello Hazel India, I'd like a free facility audit for my space.";

export const site = {
  name: "Hazel India",
  url: "https://hazelindia.com",
  title: "Hazel India — AI-Powered Green Facility Management",
  description:
    "Hazel India brings intelligent, eco-first facility management to every home, office, factory and community — powered by AI that predicts, optimises and proves a lighter footprint on the planet.",
  email: "sulochana.b@hazelindia.com",
  phone: "+91 95055 53855",
  phoneHref: "tel:+919505553855",
  emailHref: "mailto:sulochana.b@hazelindia.com",
  address:
    "320 Fifth Floor, East Avenue, Ayyappa Society Main Rd, near YSR Statue, SBH Officers Colony, Mega Hills, Madhapur, Hyderabad, Telangana",
  addressHref:
    "https://www.google.com/maps/search/?api=1&query=320+Fifth+Floor+East+Avenue+Ayyappa+Society+Main+Rd+Madhapur+Hyderabad",
  whatsapp: {
    number: WHATSAPP_NUMBER,
    message: WHATSAPP_MESSAGE,
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  },
  tagline: "Green facility care · since 2022",
  logo: "/brand/hazel-india-logo.png",
  footerBlurb:
    "India's first AI-native, sustainability-first facility management company. Cleaner spaces, greener planet, valued people — everywhere.",
} as const;

export const nav = {
  links: [
    { label: "Why Hazel", href: "#problem" },
    { label: "Transparency", href: "#trust" },
    { label: "FAQ", href: "#faq" },
    { label: "Career", href: "/careers" },
    { label: "Contact Us", href: "#contact" },
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
        category: "non-technical",
        text: "Daily cleaning, sanitation and common-area upkeep with trained teams.",
      },
      {
        label: "Security Services",
        href: "/pages/security-services-in-hyderabad",
        category: "non-technical",
        text: "Trained guards, access control, patrols and CCTV-backed site security.",
      },
      {
        label: "MEP Services",
        href: "/pages/mechanical-electrical-plumbing-services-in-hyderabad",
        category: "technical",
        text: "HVAC, electrical and plumbing maintenance to keep systems reliable.",
      },
      {
        label: "HVAC Services",
        href: "/pages/hvac-services-in-hyderabad",
        category: "technical",
        text: "Chiller, AHU, VRF and split AC maintenance for efficient, comfortable air.",
      },
      {
        label: "WTP Services",
        href: "/pages/water-treatment-plant-services-in-hyderabad",
        category: "technical",
        text: "Water treatment plant operation, softeners, RO and water-quality testing.",
      },
      {
        label: "STP Services",
        href: "/pages/sewage-treatment-plant-services-in-hyderabad",
        category: "technical",
        text: "Sewage treatment plant O&M, effluent testing and treated-water reuse.",
      },
      {
        label: "Landscaping",
        href: "/pages/landscaping-services-in-hyderabad",
        category: "non-technical",
        text: "Native gardens, grounds care and water-conscious outdoor maintenance.",
      },
      {
        label: "Pest Control Services",
        href: "/pages/pest-control-services-in-hyderabad",
        category: "non-technical",
        text: "Safe, scheduled pest management for homes, offices and industry.",
      },
      {
        label: "Waste Management",
        href: "/pages/waste-management-services-in-hyderabad",
        category: "non-technical",
        text: "Segregation, recycling, composting and diversion reporting.",
      },
      {
        label: "Food & Beverage",
        href: "/pages/food-and-beverage-services-in-hyderabad",
        category: "non-technical",
        text: "Pantry, cafeteria and F&B support that keeps workplaces running.",
      },
      {
        label: "Ambulance & Emergency Preparedness",
        href: "/pages/ambulance-and-paramedic-services-in-hyderabad",
        category: "non-technical",
        text: "EMS standby, ambulance response, fire/evac plans and emergency drills.",
      },
      {
        label: "Employee Transportation",
        href: "/pages/employee-transportation-services-in-hyderabad",
        category: "non-technical",
        text: "Staff commute, shift shuttles and campus transport coordination.",
      },
      {
        label: "Mailroom & Concierge",
        href: "/pages/mailroom-services-in-hyderabad",
        category: "non-technical",
        text: "Front desk, visitor handling, mail, courier and parcel coordination.",
      },
      {
        label: "Logistics Services",
        href: "/pages/logistics-services-in-hyderabad",
        category: "non-technical",
        text: "Material handling, receiving, dispatch and internal movement.",
      },
    ],
  },
  cta: { label: "Get a Free Audit", href: "#contact" },
} as const;

/** Service groupings used by the IFM menu, footer, home cards and IFM page. */
export const serviceCategories = [
  {
    id: "non-technical",
    label: "Non-Technical Services",
    text: "Soft services that keep people, spaces and daily operations running smoothly.",
  },
  {
    id: "technical",
    label: "Technical Services",
    text: "Engineering, plant operations and building systems run by certified technicians.",
  },
] as const;

export type ServiceCategory = (typeof serviceCategories)[number]["id"];

export function groupByServiceCategory<T extends { category: ServiceCategory }>(
  items: readonly T[],
) {
  return serviceCategories.map((category) => ({
    ...category,
    items: items.filter((item) => item.category === category.id),
  }));
}

/** Group portrait mosaic of IFM service teams — kept in line with `nav.ifm.items`. */
export const ifmGroup = {
  eyebrow: "IFM Services team",
  heading: "One group. Every service line.",
  lede: "Hazel India’s integrated facility teams — the people behind housekeeping, technical care, soft services and emergency readiness.",
  portraits: [
    {
      label: "Housekeeping",
      href: "/pages/housekeeping-services-in-hyderabad",
      image: "/images/services/housekeeping-hazel.jpg",
      alt: "Hazel India housekeeping attendant wiping down a lobby counter beside a cleaning trolley",
    },
    {
      label: "Security",
      href: "/pages/security-services-in-hyderabad",
      image: "/images/services/security-gate.jpg",
      alt: "Hazel India security guards checking a vehicle at a corporate entrance boom barrier",
    },
    {
      label: "MEP Services",
      href: "/pages/mechanical-electrical-plumbing-services-in-hyderabad",
      image: "/images/services/mep-hvac-panel.jpg",
      alt: "Hazel India MEP technician servicing an electrical distribution panel beside HVAC units",
    },
    {
      label: "HVAC Services",
      href: "/pages/hvac-services-in-hyderabad",
      image: "/images/services/hvac-plant.jpg",
      alt: "HVAC chiller plant room with water-cooled chillers, insulated chilled-water pipes, pumps and overhead ductwork",
    },
    {
      label: "WTP Services",
      href: "/pages/water-treatment-plant-services-in-hyderabad",
      image: "/images/services/wtp-plant.jpg",
      alt: "Water treatment plant room with pressure sand and carbon filters, an RO membrane skid and control panel",
    },
    {
      label: "STP Services",
      href: "/pages/sewage-treatment-plant-services-in-hyderabad",
      image: "/images/services/stp-plant.jpg",
      alt: "Sewage treatment plant with aeration tanks, a circular clarifier, blowers and safety walkways on a corporate campus",
    },
    {
      label: "Landscaping",
      href: "/pages/landscaping-services-in-hyderabad",
      image: "/images/services/landscaping-grounds.jpg",
      alt: "Hazel India landscaping team trimming hedges and raking leaves on a corporate campus lawn",
    },
    {
      label: "Pest Control",
      href: "/pages/pest-control-services-in-hyderabad",
      image: "/images/services/pest-control-fogging.jpg",
      alt: "Hazel India pest control technician fogging garden beds along a walkway",
    },
    {
      label: "Waste Management",
      href: "/pages/waste-management-services-in-hyderabad",
      image: "/images/services/waste-bins.jpg",
      alt: "Hazel India waste management lead explaining food, paper and plastic segregation bins to staff",
    },
    {
      label: "Food & Beverage",
      href: "/pages/food-and-beverage-services-in-hyderabad",
      image: "/images/services/food-cafeteria.jpg",
      alt: "Hazel India food service team serving meals at a workplace cafeteria counter",
    },
    {
      label: "Emergency Preparedness",
      href: "/pages/ambulance-and-paramedic-services-in-hyderabad",
      image: "/images/services/ambulance-emergency.jpg",
      alt: "Hazel India paramedic team moving a patient on a stretcher from an ambulance into emergency",
    },
    {
      label: "Employee Transport",
      href: "/pages/employee-transportation-services-in-hyderabad",
      image: "/images/services/employee-shuttle.jpg",
      alt: "Hazel India staff boarding an employee shuttle with a transport marshal on duty",
    },
    {
      label: "Mailroom & Concierge",
      href: "/pages/mailroom-services-in-hyderabad",
      image: "/images/services/mailroom-team.jpg",
      alt: "Hazel India mailroom attendant sorting internal mail and parcels",
    },
    {
      label: "Logistics",
      href: "/pages/logistics-services-in-hyderabad",
      image: "/images/services/logistics-hub.jpg",
      alt: "Organised logistics warehouse with pallet racking, a forklift, pallet jack and loading dock bays",
    },
  ],
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
  // Continuous facility tour (10s / 240 frames), scrubbed by scroll. 720p all-intra encode
  // so every frame is a keyframe and seeking stays smooth while scrolling.
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
      title: "Housekeeping",
      text: "Daily cleaning, sanitation and common-area upkeep with trained teams and green chemistry.",
      icon: "SprayCan",
      image: "/images/services/housekeeping-hazel.jpg",
      alt: "Hazel India housekeeping attendant wiping down a lobby counter beside a cleaning trolley",
      href: "/pages/housekeeping-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Security Services",
      text: "Trained guards, access control, patrols and CCTV monitoring that keep people and property safe.",
      icon: "Shield",
      image: "/images/services/security-gate.jpg",
      alt: "Hazel India security guards checking a vehicle at a corporate entrance boom barrier",
      href: "/pages/security-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "MEP Services",
      text: "HVAC, electrical and plumbing maintenance to keep building systems reliable.",
      icon: "Wrench",
      image: "/images/services/mep-hvac-panel.jpg",
      alt: "Hazel India MEP technician servicing an electrical distribution panel beside HVAC units",
      href: "/pages/mechanical-electrical-plumbing-services-in-hyderabad",
      category: "technical",
    },
    {
      title: "HVAC Services",
      text: "Chiller, AHU, VRF and split AC operation and maintenance that keeps air comfortable and energy use in check.",
      icon: "Thermometer",
      image: "/images/services/hvac-plant.jpg",
      alt: "HVAC chiller plant room with water-cooled chillers, insulated chilled-water pipes, pumps and overhead ductwork",
      href: "/pages/hvac-services-in-hyderabad",
      category: "technical",
    },
    {
      title: "WTP Services",
      text: "Water treatment plant operation, softeners, RO systems and routine water-quality testing.",
      icon: "Droplets",
      image: "/images/services/wtp-plant.jpg",
      alt: "Water treatment plant room with pressure sand and carbon filters, an RO membrane skid and control panel",
      href: "/pages/water-treatment-plant-services-in-hyderabad",
      category: "technical",
    },
    {
      title: "STP Services",
      text: "Sewage treatment plant O&M, effluent testing and treated-water reuse that meets PCB norms.",
      icon: "Recycle",
      image: "/images/services/stp-plant.jpg",
      alt: "Sewage treatment plant with aeration tanks, a circular clarifier, blowers and safety walkways on a corporate campus",
      href: "/pages/sewage-treatment-plant-services-in-hyderabad",
      category: "technical",
    },
    {
      title: "Landscaping",
      text: "Native gardens, grounds care and water-conscious outdoor maintenance.",
      icon: "Trees",
      image: "/images/services/landscaping-grounds.jpg",
      alt: "Hazel India landscaping team trimming hedges and raking leaves on a corporate campus lawn",
      href: "/pages/landscaping-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Pest Control Services",
      text: "Safe, scheduled pest management for homes, offices, factories and communities.",
      icon: "Bug",
      image: "/images/services/pest-control-fogging.jpg",
      alt: "Hazel India pest control technician fogging garden beds along a walkway",
      href: "/pages/pest-control-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Waste Management",
      text: "Segregation, composting and diversion programmes with clear reporting.",
      icon: "Recycle",
      image: "/images/services/waste-bins.jpg",
      alt: "Hazel India waste management lead explaining food, paper and plastic segregation bins to staff",
      href: "/pages/waste-management-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Food & Beverage",
      text: "Pantry, cafeteria and F&B support that keeps workplaces running.",
      icon: "UtensilsCrossed",
      image: "/images/services/food-cafeteria.jpg",
      alt: "Hazel India food service team serving meals at a workplace cafeteria counter",
      href: "/pages/food-and-beverage-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Ambulance & Emergency Preparedness",
      text: "EMS standby, ambulance response, fire and evacuation plans, and emergency drills.",
      icon: "Ambulance",
      image: "/images/services/ambulance-emergency.jpg",
      alt: "Hazel India paramedic team moving a patient on a stretcher from an ambulance into emergency",
      href: "/pages/ambulance-and-paramedic-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Employee Transportation",
      text: "Staff commute, shift shuttles and campus transport coordination.",
      icon: "Bus",
      image: "/images/services/employee-shuttle.jpg",
      alt: "Hazel India staff boarding an employee shuttle with a transport marshal on duty",
      href: "/pages/employee-transportation-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Mailroom & Concierge",
      text: "Front desk, visitor handling, mail, courier and parcel coordination.",
      icon: "ConciergeBell",
      image: "/images/services/mailroom-team.jpg",
      alt: "Hazel India mailroom attendant sorting internal mail and parcels",
      href: "/pages/mailroom-services-in-hyderabad",
      category: "non-technical",
    },
    {
      title: "Logistics Services",
      text: "Material handling, receiving, dispatch and internal movement.",
      icon: "Truck",
      image: "/images/services/logistics-hub.jpg",
      alt: "Organised logistics warehouse with pallet racking, a forklift, pallet jack and loading dock bays",
      href: "/pages/logistics-services-in-hyderabad",
      category: "non-technical",
    },
  ],
} as const;

export const whoWeServe = {
  eyebrow: "Who we serve",
  heading: "Built for every kind of space.",
  lede: "We serve residential, corporate, hospitality, industrial, healthcare, and educational sectors.",
  items: [
    {
      title: "Residential",
      text: "Apartments, villas and gated communities that need reliable day-to-day care.",
    },
    {
      title: "Corporate",
      text: "Offices, tech parks and workplaces where presentation and uptime matter.",
    },
    {
      title: "Hospitality",
      text: "Hotels, clubs and guest spaces that run on polish and consistency.",
    },
    {
      title: "Industrial",
      text: "Factories, warehouses and plants that demand technical, safety-led FM.",
    },
    {
      title: "Healthcare",
      text: "Clinics, hospitals and care facilities where hygiene standards are non-negotiable.",
    },
    {
      title: "Educational",
      text: "Schools, colleges and campuses that need safe, well-kept learning environments.",
    },
  ],
} as const;

export const meetTeam = {
  eyebrow: "Meet the team",
  heading: "The people behind every Hazel site.",
  lede: "Trained, fairly paid Hazel India teams — one accountable group across housekeeping, technical care, soft services and emergency readiness.",
  image: "/images/services/hazel-team.jpg",
  alt: "Hazel India team in branded uniforms posing together at a managed facility",
  caption: "One team. Every service line.",
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

export const problem = {
  eyebrow: "The problem",
  heading: "Tired of hoping your space is actually clean?",
  body: "Most facility vendors ask you to take their word for it. No proof a room was actually serviced. No warning before an AC unit fails. No real answer when your board asks for a carbon number. And every few months, a new set of untrained staff to break in all over again.",
  pains: [
    {
      icon: "ClipboardList",
      title: "No proof of work",
      text: "You pay for cleaning with no record it happened.",
      image: "/images/services/housekeeping-hazel.jpg",
      alt: "Housekeeping attendant wiping a lobby counter — cleaning that usually goes unrecorded",
    },
    {
      icon: "Wrench",
      title: "Reactive maintenance",
      text: "Breakdowns show up as emergencies, not warnings.",
      image: "/images/services/hvac-plant.jpg",
      alt: "HVAC chiller plant room whose breakdowns surface as emergencies without predictive maintenance",
    },
    {
      icon: "TrendingDown",
      title: "No sustainability data",
      text: "ESG reporting means chasing five vendors for numbers.",
      image: "/images/services/esg-dashboard.jpg",
      alt: "Laptop showing a reporting dashboard — sustainability numbers pieced together from multiple vendors",
    },
    {
      icon: "RefreshCw",
      title: "Staff churn",
      text: "A new, untrained team every few months.",
      image: "/images/services/hazel-team.jpg",
      alt: "Hazel India facility team in uniform — a stable, trained crew instead of constant turnover",
    },
  ],
  transition:
    "Hazel replaces guesswork with proof — one partner, one dashboard, everything accounted for.",
} as const;

export const trustStrip = {
  eyebrow: "Transparency",
  heading: "Where we are — and where we're headed.",
  image: "/images/architecture-2.jpg",
  alt: "Managed commercial building exterior in Hyderabad",
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
  lede: "Offices, residences, plants and outdoor grounds — tap any frame to expand. Drag down to close.",
  images: [
    {
      id: "office-lobby",
      src: "/images/office.jpg",
      alt: "Managed commercial office lobby",
    },
    {
      id: "clean-interior",
      src: "/images/interior.jpg",
      alt: "Bright interior after facility care",
    },
    {
      id: "residential",
      src: "/images/residential.jpg",
      alt: "Residential space under Hazel care",
    },
    {
      id: "landscape",
      src: "/images/landscape.jpg",
      alt: "Maintained landscaped grounds",
    },
    {
      id: "industrial",
      src: "/images/industrial.jpg",
      alt: "Industrial floor with green facility systems",
    },
    {
      id: "sensors",
      src: "/images/sensors.jpg",
      alt: "On-site sensors and monitoring gear",
    },
    {
      id: "office-floor",
      src: "/images/office-2.jpg",
      alt: "Open office floor kept ready for work",
    },
    {
      id: "architecture",
      src: "/images/architecture.jpg",
      alt: "Contemporary building exterior",
    },
    {
      id: "cleaning",
      src: "/images/cleaning.jpg",
      alt: "Trained team delivering site cleaning",
    },
    {
      id: "interior-detail",
      src: "/images/interior-2.jpg",
      alt: "Detail of a finished interior space",
    },
    {
      id: "residential-lounge",
      src: "/images/residential-2.jpg",
      alt: "Residential lounge and common area",
    },
    {
      id: "audit",
      src: "/images/process-audit.jpg",
      alt: "Baseline facility audit in progress",
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
  lede: "From ongoing managed coverage to a full industrial program — pick the plan that matches how your site actually runs. Every engagement starts with a free facility audit.",
  image: "/images/office.jpg",
  alt: "Commercial workspace suited to managed facility coverage",
  promises: [
    {
      title: "Start with a free audit",
      text: "We walk the site first, then quote — no guessing from a brochure price list.",
    },
    {
      title: "Scale without re-tendering",
      text: "Add floors, shifts or service lines as the building grows; one accountable partner.",
    },
    {
      title: "Green chemistry, always",
      text: "Safer products and measurable water use come standard — not as an upgrade tier.",
    },
  ],
  models: [
    {
      id: "managed",
      title: "Managed Contract",
      text: "Monthly or annual coverage for ongoing housekeeping, MEP, and platform access. Staffing and scheduling handled end-to-end.",
      bestFor: "Offices, tech parks, gated communities",
      featured: true,
      image: "/images/interior.jpg",
      alt: "Managed commercial interior under ongoing coverage",
    },
    {
      id: "industrial",
      title: "Custom Industrial",
      text: "Scoped to your site's machinery, compliance, and water treatment needs, with a dedicated account team.",
      bestFor: "Factories, warehouses, labs",
      image: "/images/industrial.jpg",
      alt: "Industrial facility for custom site programs",
    },
  ],
  footnote:
    "Exact pricing depends on site size and service mix — you'll get a real quote as part of your free audit, not a guess.",
} as const;

export const faq = {
  eyebrow: "FAQ",
  heading: "Straight answers before you buy.",
  image: "/images/interior.jpg",
  alt: "Calm interior of a professionally managed space",
  items: [
    {
      q: "How long is a typical contract?",
      a: "Managed contracts are usually annual, with month-to-month options after the first term where the site plan allows.",
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
      a: "Yes. Managed contracts typically need 30 days' written notice to pause or cancel.",
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
    { src: "/images/people.jpg", alt: "Hazel India housekeeping team in navy and green uniforms" },
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

export const careers = {
  eyebrow: "Careers at Hazel India",
  heading: "Build cleaner spaces. Grow with purpose.",
  lede: "We're hiring people who care about service quality, sustainability, and the teams behind every well-run facility. If that sounds like you, we'd like to hear from you.",
  highlights: [
    {
      title: "People-first culture",
      text: "Fair pay, clear roles, and respect for the teams who keep facilities running every day.",
    },
    {
      title: "Green operations",
      text: "Work on programmes that cut waste, protect water, and raise hygiene standards across India.",
    },
    {
      title: "Room to grow",
      text: "From site operations to supervision and specialised services — paths to build real skill.",
    },
  ],
  rolesHeading: "Who we look for",
  roles: [
    "Sales and Operations Head",
    "IFM Operations Lead",
    "Facilities Manager",
    "Technical Lead (MEP)",
    "Transport Lead",
    "Transport Managers",
    "Food and Beverage Lead",
    "Procurement Head",
  ],
  ctaHeading: "Be A Part Of Our Team",
  ctaText: "Share your details and upload your resume. Our team will get back to you if there's a match.",
  ctaLabel: "Apply now",
} as const;

export const footer = {
  // Services column is rendered from `nav.ifm.items` in Footer.tsx (same as navbar).
  company: [
    { label: "Why Hazel", href: "#problem" },
    { label: "Transparency", href: "#trust" },
    { label: "FAQ", href: "#faq" },
    { label: "Career", href: "/careers" },
    { label: "Contact Us", href: "#contact" },
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
  copyright: "© 2026 Hazel India. All rights reserved.",
  credit: {
    label: "Website by editcomedia.com",
    href: "https://editcomedia.com",
  },
  image: "/images/footer.jpg",
  alt: "City light under a quieter, greener operations layer",
} as const;

export type SpaceType = (typeof contact.spaceTypes)[number]["value"];
