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
    heroAlt: "Hazel India mailroom and concierge staff supporting workplace operations",
    gallery: [
      "/images/services/mailroom-active.jpg",
      "/images/services/concierge-active.jpg",
    ],
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
  "waste-management-services-in-hyderabad": {
    hero: "/images/services/waste.jpg",
    heroAlt: "Hazel India waste management team in green HI uniforms",
    gallery: ["/images/services/waste.jpg", "/images/waste-2.jpg", "/images/waste-3.jpg"],
  },
  "food-and-beverage-services-in-hyderabad": {
    hero: "/images/interior.jpg",
    heroAlt: "Workplace pantry and hospitality space ready for food and beverage service",
    gallery: ["/images/interior.jpg", "/images/interior-2.jpg", "/images/office-3.jpg"],
  },
  "ambulance-and-paramedic-services-in-hyderabad": {
    hero: "/images/people.jpg",
    heroAlt: "Trained emergency response team ready to support workplace safety and preparedness",
    gallery: ["/images/people.jpg", "/images/people-2.jpg"],
  },
  "employee-transportation-services-in-hyderabad": {
    hero: "/images/city.jpg",
    heroAlt: "Urban commute routes supporting employee transportation programmes",
    gallery: ["/images/city.jpg", "/images/city-2.jpg", "/images/services/logistics-active.jpg"],
  },
  "ifm-services": {
    hero: "/images/services/ifm.jpg",
    heroAlt: "Hazel India IFM team — integrated facility management across every service line",
    gallery: [
      "/images/services/housekeeping-active.jpg",
      "/images/services/mep-active.jpg",
      "/images/services/landscaping.jpg",
      "/images/services/pest-active.jpg",
      "/images/services/waste.jpg",
      "/images/services/mailroom-active.jpg",
      "/images/services/concierge-active.jpg",
      "/images/services/logistics-active.jpg",
      "/images/services/security.jpg",
      "/images/people.jpg",
    ],
  },
} as const;

export type ServiceMediaSlug = keyof typeof servicePageMedia;
