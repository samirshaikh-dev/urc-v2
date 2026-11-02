/**
 * Product catalog data schema
 * Note: Specifications match verified manufacturer data (IS: 4253 / ASTM / BS).
 */

export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "rubber-cork", name: "Rubberised Cork", slug: "rubber-cork" },
  { id: "gaskets", name: "Gaskets & Molded Parts", slug: "gaskets" },
  { id: "plain-cork", name: "Natural Cork & Granules", slug: "plain-cork" },
];

export const PRODUCTS = [
  {
    id: "rubber-cork-sheet",
    slug: "rubber-cork-sheets",
    name: "Rubberised Cork Sheets",
    category: "rubber-cork",
    badge: "Core Material",
    image: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    shortDescription:
      "High-resilience composite of granulated cork and synthetic elastomers engineered for industrial oil and gas sealing.",
    applications: [
      "Electrical Transformers & Switchgear",
      "Automotive Engine & Flange Gaskets",
      "Industrial Valve & Pipe Joints",
    ],
    features: [
      "Excellent hot oil and hydrocarbon resistance",
      "High compressibility and dimensional recovery",
      "Operating temperature from -30°C to +120°C",
    ],
    specifications: [
      { property: "Standard Dimensions", value: "915 × 610 mm / 915 × 915 mm" },
      { property: "Thickness Range", value: "1.0 mm to 25.0 mm" },
      { property: "Binder Matrix", value: "Nitrile (NBR) / Neoprene / SBR" },
      { property: "Tensile Strength", value: "Conforms to IS: 4253 / BS / ASTM" },
    ],
  },
  {
    id: "transformer-gaskets",
    slug: "transformer-gaskets",
    name: "Transformer Cork Gaskets & Frames",
    category: "gaskets",
    badge: "Power Sector",
    image: "/images/industries-serve-images/industrial-cork-transformer-gaskets-manufacturer-vapi-gujarat.jpg",
    shortDescription:
      "Precision-cut gasket strips, rings, and rectangular frames formulated for transformer oil resistance and hermetic seal integrity.",
    applications: [
      "Power & Distribution Transformers",
      "Bushing Mountings & Inspection Covers",
      "Conservator Tank & Radiator Flanges",
    ],
    features: [
      "Zero oil seepage under continuous thermal cycling",
      "Low bolt torque load requirement to prevent flange distortion",
      "Custom CNC profile cut or endless molded joints",
    ],
    specifications: [
      { property: "Thickness Range", value: "3.0 mm to 12.0 mm" },
      { property: "Oil Compatibility", value: "Mineral oil, synthetic esters, silicone oil" },
      { property: "Joint Type", value: "Endless molded / Dovetail lock / Beveled" },
      { property: "Dielectric Integrity", value: "High dielectric breakdown resistance" },
    ],
  },
  {
    id: "automotive-cork-gaskets",
    slug: "automotive-cork-gaskets",
    name: "Automotive & Heavy Equipment Gaskets",
    category: "gaskets",
    badge: "Automotive OEM",
    image: "/images/industries-serve-images/automotive-rubber-cork-gaskets-supplier-vapi-gujarat.jpg",
    shortDescription:
      "Resilient rubberised cork gaskets engineered for severe vibration damping, crankcase sealing, and fluid containment.",
    applications: [
      "Crankcase & Valve Cover Sealing",
      "Fuel Tank Flanges & Carburetor Joints",
      "Heavy Engine & Transmission Housings",
    ],
    features: [
      "Vibration absorption dampening mechanical shock",
      "Conforms seamlessly to stamped sheet-metal flanges",
      "Fuel, grease, and lubricant resistance",
    ],
    specifications: [
      { property: "Thickness Range", value: "1.5 mm to 8.0 mm" },
      { property: "Tensile Conformance", value: "ASTM F104 / IS: 4253 Part 2" },
      { property: "Compressibility", value: "25% to 40% under standard torque" },
      { property: "Form Factor", value: "Die-cut gaskets per CAD drawing" },
    ],
  },
  {
    id: "plain-cork-sheet",
    slug: "plain-cork-sheets",
    name: "Plain Natural Cork Sheets & Granules",
    category: "plain-cork",
    badge: "Acoustic & Insulation",
    image: "/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg",
    shortDescription:
      "Pure agglomerated cork material providing thermal barrier protection, acoustic dampening, and mechanical foundation pads.",
    applications: [
      "Structural Expansion Joints",
      "Foundation Vibration Isolation Pads",
      "Acoustic Wall Underlayment & Friction Parts",
    ],
    features: [
      "Naturally cellular structure dampens high-frequency noise",
      "Low thermal conductivity for insulation barriers",
      "Sustainably harvested raw material",
    ],
    specifications: [
      { property: "Standard Sheet Size", value: "915 × 610 mm / Rolls up to 10m" },
      { property: "Granule Mesh Size", value: "0.5 mm to 10.0 mm customizable" },
      { property: "Density Range", value: "180 to 280 kg/m³" },
      { property: "Fire Behavior", value: "Class B2 / Self-extinguishing" },
    ],
  },
];

