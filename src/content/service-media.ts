/** Exact service visuals for `/pages/[slug]` detail pages. */
export const servicePageMedia = {
  "housekeeping-services-in-hyderabad": {
    hero: "/images/services/housekeeping-hazel.jpg",
    heroAlt: "Hazel India housekeeping attendant wiping down a lobby counter beside a cleaning trolley",
    gallery: ["/images/services/housekeeping-hazel.jpg"],
  },
  "security-services-in-hyderabad": {
    hero: "/images/services/security-gate.jpg",
    heroAlt: "Hazel India security guards checking a vehicle at a corporate entrance boom barrier",
    gallery: ["/images/services/security-gate.jpg"],
  },
  "landscaping-services-in-hyderabad": {
    hero: "/images/services/landscaping-grounds.jpg",
    heroAlt: "Hazel India landscaping team trimming hedges and raking leaves on a corporate campus lawn",
    gallery: ["/images/services/landscaping-grounds.jpg"],
  },
  "mailroom-services-in-hyderabad": {
    hero: "/images/services/mailroom-team.jpg",
    heroAlt: "Hazel India mailroom attendant sorting internal mail and parcels",
    gallery: [
      "/images/services/mailroom-team.jpg",
      "/images/services/concierge-desk.jpg",
    ],
  },
  "mechanical-electrical-plumbing-services-in-hyderabad": {
    hero: "/images/services/mep-hvac-panel.jpg",
    heroAlt: "Hazel India MEP technician servicing an electrical distribution panel beside HVAC units",
    gallery: [
      "/images/services/mep-hvac-panel.jpg",
      "/images/services/mep-plantroom.jpg",
    ],
  },
  "hvac-services-in-hyderabad": {
    hero: "/images/services/hvac-plant.jpg",
    heroAlt: "HVAC chiller plant room with water-cooled chillers, insulated chilled-water pipes, pumps and overhead ductwork",
    gallery: ["/images/services/hvac-plant.jpg"],
  },
  "water-treatment-plant-services-in-hyderabad": {
    hero: "/images/services/wtp-plant.jpg",
    heroAlt: "Water treatment plant room with pressure sand and carbon filters, an RO membrane skid and control panel",
    gallery: ["/images/services/wtp-plant.jpg"],
  },
  "sewage-treatment-plant-services-in-hyderabad": {
    hero: "/images/services/stp-plant.jpg",
    heroAlt: "Sewage treatment plant with aeration tanks, a circular clarifier, blowers and safety walkways on a corporate campus",
    gallery: ["/images/services/stp-plant.jpg"],
  },
  "pest-control-services-in-hyderabad": {
    hero: "/images/services/pest-control-fogging.jpg",
    heroAlt: "Hazel India pest control technician fogging garden beds along a walkway",
    gallery: ["/images/services/pest-control-fogging.jpg"],
  },
  "logistics-services-in-hyderabad": {
    hero: "/images/services/logistics-hub.jpg",
    heroAlt: "Organised logistics warehouse with pallet racking, a forklift, pallet jack and loading dock bays",
    gallery: ["/images/services/logistics-hub.jpg"],
  },
  "waste-management-services-in-hyderabad": {
    hero: "/images/services/waste-bins.jpg",
    heroAlt: "Hazel India waste management lead explaining food, paper and plastic segregation bins to staff",
    gallery: [
      "/images/services/waste-bins.jpg",
      "/images/services/waste-collection.jpg",
    ],
  },
  "food-and-beverage-services-in-hyderabad": {
    hero: "/images/services/food-cafeteria.jpg",
    heroAlt: "Hazel India food service team serving meals at a workplace cafeteria counter",
    gallery: ["/images/services/food-cafeteria.jpg"],
  },
  "ambulance-and-paramedic-services-in-hyderabad": {
    hero: "/images/services/ambulance-emergency.jpg",
    heroAlt: "Hazel India paramedic team moving a patient on a stretcher from an ambulance into emergency",
    gallery: ["/images/services/ambulance-emergency.jpg"],
  },
  "employee-transportation-services-in-hyderabad": {
    hero: "/images/services/employee-shuttle.jpg",
    heroAlt: "Hazel India staff boarding an employee shuttle with a transport marshal on duty",
    gallery: ["/images/services/employee-shuttle.jpg"],
  },
  "ifm-services": {
    hero: "/images/services/hazel-team.jpg",
    heroAlt: "Hazel India IFM team — integrated facility management across every service line",
    gallery: [
      "/images/services/housekeeping-hazel.jpg",
      "/images/services/security-gate.jpg",
      "/images/services/mep-hvac-panel.jpg",
      "/images/services/mep-plantroom.jpg",
      "/images/services/hvac-plant.jpg",
      "/images/services/wtp-plant.jpg",
      "/images/services/stp-plant.jpg",
      "/images/services/landscaping-grounds.jpg",
      "/images/services/pest-control-fogging.jpg",
      "/images/services/waste-bins.jpg",
      "/images/services/waste-collection.jpg",
      "/images/services/food-cafeteria.jpg",
      "/images/services/ambulance-emergency.jpg",
      "/images/services/employee-shuttle.jpg",
      "/images/services/mailroom-team.jpg",
      "/images/services/concierge-desk.jpg",
      "/images/services/logistics-hub.jpg",
      "/images/services/logistics-team.jpg",
      "/images/services/hazel-team.jpg",
    ],
  },
} as const;

export type ServiceMediaSlug = keyof typeof servicePageMedia;
