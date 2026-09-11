/** Exact service visuals for `/pages/[slug]` detail pages. */
export const servicePageMedia = {
  "housekeeping-services-in-hyderabad": {
    hero: "/images/services/housekeeping.jpg",
    heroAlt: "Professional housekeeping team cleaning a commercial office floor",
    gallery: ["/images/services/housekeeping.jpg"],
  },
  "landscaping-services-in-hyderabad": {
    hero: "/images/services/landscaping.jpg",
    heroAlt: "Landscaping crew maintaining gardens at a commercial campus",
    gallery: ["/images/services/landscaping.jpg"],
  },
  "mailroom-services-in-hyderabad": {
    hero: "/images/services/mailroom.jpg",
    heroAlt: "Organized office mailroom with sorted parcels and packages",
    gallery: ["/images/services/mailroom.jpg"],
  },
  "concierge-services-in-hyderabad": {
    hero: "/images/services/concierge.jpg",
    heroAlt: "Concierge welcoming a visitor at a modern office reception",
    gallery: ["/images/services/concierge.jpg"],
  },
  "mechanical-electrical-plumbing-services-in-hyderabad": {
    hero: "/images/services/mep.jpg",
    heroAlt: "MEP plant room with HVAC, electrical and plumbing systems",
    gallery: ["/images/services/mep.jpg"],
  },
  "pest-control-services-in-hyderabad": {
    hero: "/images/services/pest.jpg",
    heroAlt: "Pest control technician treating a commercial facility",
    gallery: ["/images/services/pest.jpg"],
  },
  "logistics-services-in-hyderabad": {
    hero: "/images/services/logistics.jpg",
    heroAlt: "Facility logistics team moving materials with a pallet jack",
    gallery: ["/images/services/logistics.jpg"],
  },
  "ifm-services": {
    hero: "/images/services/ifm.jpg",
    heroAlt: "Smart facility control room with live building performance dashboards",
    gallery: [
      "/images/services/housekeeping.jpg",
      "/images/services/mep.jpg",
      "/images/services/landscaping.jpg",
      "/images/services/pest.jpg",
      "/images/services/mailroom.jpg",
      "/images/services/concierge.jpg",
      "/images/services/logistics.jpg",
    ],
  },
} as const;

export type ServiceMediaSlug = keyof typeof servicePageMedia;
