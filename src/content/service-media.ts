/** Exact service visuals for `/pages/[slug]` detail pages. */
export const servicePageMedia = {
  "housekeeping-services-in-hyderabad": {
    hero: "/images/services/housekeeping-active.jpg",
    heroAlt: "Hazel India housekeeping staff cleaning a modern office lobby in navy and green uniforms",
    gallery: ["/images/services/housekeeping-active.jpg"],
  },
  "landscaping-services-in-hyderabad": {
    hero: "/images/services/landscaping.jpg",
    heroAlt: "Hazel India landscaping team in green uniforms with black trousers",
    gallery: ["/images/services/landscaping.jpg"],
  },
  "mailroom-services-in-hyderabad": {
    hero: "/images/services/mailroom.jpg",
    heroAlt: "Hazel India mailroom staff in green HI uniforms",
    gallery: ["/images/services/mailroom.jpg"],
  },
  "concierge-services-in-hyderabad": {
    hero: "/images/services/concierge.jpg",
    heroAlt: "Hazel India concierge hosts in green HI uniforms",
    gallery: ["/images/services/concierge.jpg"],
  },
  "mechanical-electrical-plumbing-services-in-hyderabad": {
    hero: "/images/services/mep-active.jpg",
    heroAlt: "Hazel India MEP technician servicing an electrical panel in a blue HI uniform",
    gallery: [
      "/images/services/mep-active.jpg",
      "/images/services/mep-plant.jpg",
    ],
  },
  "pest-control-services-in-hyderabad": {
    hero: "/images/services/pest.jpg",
    heroAlt: "Hazel India pest control specialists in green HI uniforms",
    gallery: ["/images/services/pest.jpg"],
  },
  "logistics-services-in-hyderabad": {
    hero: "/images/services/logistics.jpg",
    heroAlt: "Hazel India logistics support staff in green HI uniforms",
    gallery: ["/images/services/logistics.jpg"],
  },
  "ifm-services": {
    hero: "/images/services/ifm.jpg",
    heroAlt: "Hazel India IFM supervisors in green HI uniforms",
    gallery: [
      "/images/services/housekeeping-active.jpg",
      "/images/services/mep-active.jpg",
      "/images/services/landscaping.jpg",
      "/images/services/pest.jpg",
      "/images/services/mailroom.jpg",
      "/images/services/concierge.jpg",
      "/images/services/logistics.jpg",
    ],
  },
} as const;

export type ServiceMediaSlug = keyof typeof servicePageMedia;
