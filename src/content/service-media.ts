/** Exact service visuals for `/pages/[slug]` detail pages. */
export const servicePageMedia = {
  "housekeeping-services-in-hyderabad": {
    hero: "/images/services/housekeeping-team.jpg",
    heroAlt: "Hazel India housekeeping attendant wiping down a lobby counter beside a cleaning trolley",
    gallery: ["/images/services/housekeeping-team.jpg"],
  },
  "landscaping-services-in-hyderabad": {
    hero: "/images/services/landscaping-team.jpg",
    heroAlt: "Hazel India landscaping team pruning hedges, planting beds and mowing lawns on a corporate campus",
    gallery: ["/images/services/landscaping-team.jpg"],
  },
  "mailroom-services-in-hyderabad": {
    hero: "/images/services/mailroom-sorting.jpg",
    heroAlt: "Hazel India mailroom attendant sorting internal mail and parcels",
    gallery: [
      "/images/services/mailroom-sorting.jpg",
      "/images/services/concierge-desk.jpg",
    ],
  },
  "mechanical-electrical-plumbing-services-in-hyderabad": {
    hero: "/images/services/mep-panel.jpg",
    heroAlt: "Hazel India MEP technician testing an electrical distribution panel beside HVAC chillers",
    gallery: [
      "/images/services/mep-panel.jpg",
      "/images/services/mep-plantroom.jpg",
    ],
  },
  "pest-control-services-in-hyderabad": {
    hero: "/images/services/pest-control-team.jpg",
    heroAlt: "Hazel India pest control technician treating a corridor skirting with a pressure sprayer",
    gallery: ["/images/services/pest-control-team.jpg"],
  },
  "logistics-services-in-hyderabad": {
    hero: "/images/services/logistics-warehouse.jpg",
    heroAlt: "Hazel India logistics operator moving a loaded pallet with a pallet jack",
    gallery: [
      "/images/services/logistics-warehouse.jpg",
      "/images/services/logistics-team.jpg",
    ],
  },
  "waste-management-services-in-hyderabad": {
    hero: "/images/services/waste-segregation.jpg",
    heroAlt: "Hazel India waste management team sorting dry, wet, recyclable and hazardous waste",
    gallery: ["/images/services/waste-segregation.jpg"],
  },
  "food-and-beverage-services-in-hyderabad": {
    hero: "/images/services/food-service.jpg",
    heroAlt: "Hazel India food service team plating meals on a workplace cafeteria counter",
    gallery: ["/images/services/food-service.jpg"],
  },
  "ambulance-and-paramedic-services-in-hyderabad": {
    hero: "/images/services/emergency-preparedness.jpg",
    heroAlt: "Hazel India emergency response team running a CPR and first-aid drill",
    gallery: ["/images/services/emergency-preparedness.jpg"],
  },
  "employee-transportation-services-in-hyderabad": {
    hero: "/images/services/employee-transport.jpg",
    heroAlt: "Hazel India staff boarding an employee shuttle with a transport marshal on duty",
    gallery: ["/images/services/employee-transport.jpg"],
  },
  "ifm-services": {
    hero: "/images/services/ifm-team.jpg",
    heroAlt: "Hazel India IFM team — integrated facility management across every service line",
    gallery: [
      "/images/services/housekeeping-team.jpg",
      "/images/services/mep-panel.jpg",
      "/images/services/mep-plantroom.jpg",
      "/images/services/landscaping-team.jpg",
      "/images/services/pest-control-team.jpg",
      "/images/services/waste-segregation.jpg",
      "/images/services/food-service.jpg",
      "/images/services/emergency-preparedness.jpg",
      "/images/services/employee-transport.jpg",
      "/images/services/mailroom-sorting.jpg",
      "/images/services/concierge-desk.jpg",
      "/images/services/logistics-warehouse.jpg",
      "/images/services/logistics-team.jpg",
      "/images/services/ifm-team.jpg",
    ],
  },
} as const;

export type ServiceMediaSlug = keyof typeof servicePageMedia;
