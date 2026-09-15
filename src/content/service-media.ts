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
    hero: "/images/services/mailroom-active.jpg",
    heroAlt: "Hazel India mailroom staff sorting parcels in a green HI uniform",
    gallery: ["/images/services/mailroom-active.jpg"],
  },
  "concierge-services-in-hyderabad": {
    hero: "/images/services/concierge-active.jpg",
    heroAlt: "Hazel India concierge assisting a visitor at reception in a green HI uniform",
    gallery: ["/images/services/concierge-active.jpg"],
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
    hero: "/images/services/pest-active.jpg",
    heroAlt: "Hazel India pest control technician treating a facility corridor in a green HI uniform",
    gallery: ["/images/services/pest-active.jpg"],
  },
  "logistics-services-in-hyderabad": {
    hero: "/images/services/logistics-active.jpg",
    heroAlt: "Hazel India logistics staff moving materials with a pallet jack in a green HI uniform",
    gallery: ["/images/services/logistics-active.jpg"],
  },
  "ifm-services": {
    hero: "/images/services/ifm.jpg",
    heroAlt: "Hazel India IFM supervisors in green HI uniforms",
    gallery: [
      "/images/services/housekeeping-active.jpg",
      "/images/services/mep-active.jpg",
      "/images/services/landscaping.jpg",
      "/images/services/pest-active.jpg",
      "/images/services/mailroom-active.jpg",
      "/images/services/concierge-active.jpg",
      "/images/services/logistics-active.jpg",
    ],
  },
} as const;

export type ServiceMediaSlug = keyof typeof servicePageMedia;
