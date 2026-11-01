/**
 * Product catalog data schema
 * Note: Specifications must match verified manufacturer data.
 */

export const PRODUCT_CATEGORIES = [
  { id: "rubber-cork", name: "Rubberised Cork", slug: "rubber-cork" },
  { id: "plain-cork", name: "Plain Natural Cork", slug: "plain-cork" },
  { id: "gaskets", name: "Gaskets & Molded Parts", slug: "gaskets" },
];

export const PRODUCTS = [
  {
    id: "rubber-cork-sheet",
    slug: "rubber-cork-sheets",
    name: "Rubberised Cork Sheets",
    category: "rubber-cork",
    shortDescription:
      "High-resilience composite of granulated cork and synthetic elastomers engineered for industrial sealing.",
    applications: [
      "Electrical Transformers & Switchgear",
      "Automotive Engine Gaskets",
      "Flange Sealing in Fuel & Oil Systems",
    ],
    features: [
      "Excellent oil and solvent resistance",
      "High compressibility and recovery",
      "Operating temperature up to 120°C",
    ],
    specifications: [
      { property: "Standard Dimensions", value: "915 mm × 610 mm / 915 mm × 915 mm" },
      { property: "Thickness Range", value: "1.0 mm to 25.0 mm" },
      { property: "Binder Matrix", value: "Nitrile (NBR) / Neoprene / SBR" },
      { property: "Tensile Strength", value: "Conforms to IS: 4253 / BS / ASTM standards" },
    ],
  },
  {
    id: "transformer-gaskets",
    slug: "transformer-gaskets",
    name: "Transformer Cork Gaskets",
    category: "gaskets",
    shortDescription:
      "Precision-cut gasket strips, rings, and frames formulated for transformer oil resistance and hermetic seal integrity.",
    applications: [
      "Power & Distribution Transformers",
      "Bushing Mountings & Inspection Covers",
    ],
    features: [
      "Zero oil leakage under continuous thermal cycling",
      "Low bolt torque load requirement",
      "Custom CNC profile cut or molded joints",
    ],
    specifications: [
      { property: "Thickness Range", value: "3.0 mm to 12.0 mm" },
      { property: "Oil Compatibility", value: "Mineral oil, synthetic esters, silicone oil" },
      { property: "Joint Type", value: "Endless molded / Dovetail lock / Beveled" },
    ],
  },
];

