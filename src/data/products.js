/**
 * Product catalog data schema
 * Note: Specifications match verified manufacturer data (IS: 4253 / ASTM / BS).
 * Exactly 4 flagship products matching the 4 primary categories.
 */

export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "cork-products", name: "Cork Products", slug: "cork-products" },
  { id: "rubberised-cork", name: "Rubberised Cork Products", slug: "rubberised-cork" },
  { id: "decorative-cork", name: "Decorative Cork", slug: "decorative-cork" },
  { id: "cork-gifts", name: "Cork Gifts", slug: "cork-gifts" },
];

export const PRODUCTS = [
  {
    id: "cork-products",
    slug: "plain-cork-sheets",
    name: "Cork Products",
    category: "cork-products",
    badge: "Natural Material",
    image: "/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg",
    shortDescription:
      "Pure natural agglomerated cork sheets, continuous rolls, blocks, and graded industrial granules engineered for thermal and acoustic insulation.",
    applications: [
      "Structural Expansion Joints & Foundation Pads",
      "Thermal Barrier & Acoustic Underlayment",
      "Industrial Stoppers, Floats & Friction Parts",
    ],
    features: [
      "Naturally cellular structure dampens high-frequency noise",
      "Low thermal conductivity with high dimensional stability",
      "Sustainably harvested raw material conforming to IS: 4253",
    ],
    specifications: [
      { property: "Standard Sheet Size", value: "915 × 610 mm / Rolls up to 10m" },
      { property: "Thickness Range", value: "1.0 mm to 50.0 mm" },
      { property: "Density Range", value: "180 to 280 kg/m³" },
      { property: "Granule Mesh Size", value: "0.5 mm to 10.0 mm customizable" },
    ],
  },
  {
    id: "rubberised-cork",
    slug: "rubber-cork-sheets",
    name: "Rubberised Cork Products",
    category: "rubberised-cork",
    badge: "Industrial Sealing",
    image: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    shortDescription:
      "High-resilience composite sheets, transformer gasket frames, and precision cut components formulated for hot oil resistance and hermetic sealing.",
    applications: [
      "Power & Distribution Transformer Covers & Flanges",
      "Automotive Engine & Crankcase Gaskets",
      "Heavy Machinery & Hydraulic Pipe Flanges",
    ],
    features: [
      "Zero oil seepage under continuous thermal cycling (-30°C to +120°C)",
      "Controlled compressibility (25%–40%) requiring low bolt torque",
      "Formulated with premium NBR, Neoprene, and SBR matrices",
    ],
    specifications: [
      { property: "Standard Dimensions", value: "915 × 610 mm / 915 × 915 mm" },
      { property: "Thickness Range", value: "1.0 mm to 25.0 mm" },
      { property: "Binder Polymers", value: "Nitrile (NBR) / Neoprene / SBR" },
      { property: "Tensile Conformance", value: "Conforms to IS: 4253 / ASTM F104" },
    ],
  },
  {
    id: "decorative-cork",
    slug: "decorative-cork-tiles",
    name: "Decorative Cork",
    category: "decorative-cork",
    badge: "Acoustic & Interior",
    image: "/images/industries-serve-images/cork-expansion-joints-construction-insulation-vapi-gujarat.jpeg",
    shortDescription:
      "Acoustic wall tiles, decorative cork panels, and textured natural cork coverings designed for architectural spaces, offices, and studios.",
    applications: [
      "Commercial Office & Studio Acoustic Walls",
      "Architectural Feature Wall Coverings",
      "Sustainable Bulletin & Display Installations",
    ],
    features: [
      "Natural warmth and acoustic reverberation reduction",
      "Lightweight, flexible, and easy adhesive installation",
      "100% natural, renewable, and eco-friendly material",
    ],
    specifications: [
      { property: "Standard Tile Sizes", value: "300 × 300 mm / 600 × 300 mm" },
      { property: "Thickness Range", value: "3.0 mm to 12.0 mm" },
      { property: "Surface Finish", value: "Natural wax, matte seal, or raw texture" },
      { property: "Sound Absorption", value: "NRC 0.25 to 0.45 rating" },
    ],
  },
  {
    id: "cork-gifts",
    slug: "cork-gifts-accessories",
    name: "Cork Gifts",
    category: "cork-gifts",
    badge: "Eco-Friendly Gifts",
    image: "/images/industries-serve-images/orthopedic-cork-shoe-soles-footwear-manufacturer-vapi-gujarat.jpeg",
    shortDescription:
      "Sustainable promotional corporate gifts, customized lifestyle accessories, desk stationery, and eco-friendly branded cork products.",
    applications: [
      "Corporate Executive & Client Gifting",
      "Sustainable Desk & Office Organizers",
      "Custom Embossed Branding Merchandise",
    ],
    features: [
      "Water-resistant, stain-resistant natural surface",
      "Compatible with laser engraving, foil stamping, and UV printing",
      "Organic aesthetic with durable, tactile grain finish",
    ],
    specifications: [
      { property: "Customization", value: "Laser engraved logo, foil stamp, screen print" },
      { property: "Material Grade", value: "Fine-grain agglomerated natural cork" },
      { property: "Order Volume", value: "Custom OEM batches and bulk corporate supply" },
      { property: "Packaging", value: "Custom eco-friendly presentation boxes" },
    ],
  },
];