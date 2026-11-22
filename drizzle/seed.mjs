import "dotenv/config";
import { randomUUID } from "node:crypto";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import { eq } from "drizzle-orm";
import ws from "ws";
import { blogs, productFaqs, productSpecifications, products } from "../src/db/schema.js";
import { INITIAL_BLOGS } from "../src/data/blogs.js";
import { PRODUCTS } from "../src/data/products.js";

neonConfig.webSocketConstructor = ws;

const INITIAL_PRODUCTS = [
  {
    slug: "plain-cork-sheets",
    name: "Plain Natural Cork Sheets & Rolls",
    categorySlug: "cork-products",
    badge: "Natural Agglomerated",
    imageUrl: "/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg",
    seoDescription:
      "Pure natural agglomerated cork sheets and continuous rolls engineered for thermal barriers, acoustic underlayment, and foundation expansion joints.",
    imageAlt: "Plain Natural Cork Sheets & Rolls from United Rubber Cork",
    introduction:
      "Pure natural agglomerated cork sheets and continuous rolls engineered for thermal barriers, acoustic underlayment, and foundation expansion joints.",
    features: [
      "Naturally cellular structure dampens high-frequency mechanical vibration and impact noise",
      "Low thermal conductivity (0.040 W/m·K) provides reliable thermal insulation",
      "Sustainably harvested raw material conforming to IS: 4253 and international standards",
      "Available in standard rectangular sheets or continuous rolls up to 10 meters",
    ],
    applications: [
      "Thermal Barrier & Acoustic Floor Underlayment",
      "Civil Engineering Foundation Pads & Dampproofing",
      "Industrial Friction Discs & Polish Wheels",
      "Laboratory Stoppers, Floats & Level Indicators",
    ],
    description:
      "<p>Manufactured from carefully selected natural raw cork granules bonded with food-grade polyurethane binders under controlled heat and hydraulic pressure. Conforming to IS: 4253 standards, these sheets exhibit outstanding acoustic dampening, low thermal conductivity, and superior dimensional stability under compression.</p><ul><li>Naturally cellular structure dampens high-frequency mechanical vibration and impact noise</li><li>Low thermal conductivity (0.040 W/m·K) provides reliable thermal insulation</li><li>Sustainably harvested raw material conforming to IS: 4253 and international standards</li><li>Available in standard rectangular sheets or continuous rolls up to 10 meters</li></ul>",
    faqs: [
      {
        question: "What are the standard dimensions for natural cork sheets?",
        answer: "Standard rectangular sheets are 915 × 610 mm (36\" × 24\"). Continuous rolls are manufactured in widths of 1.0 m or 1.2 m with lengths up to 10 meters.",
        sortOrder: 0,
      },
      {
        question: "What thickness options are available?",
        answer: "Thickness ranges from 1.0 mm up to 50.0 mm. Custom thicknesses are precision-sliced upon request.",
        sortOrder: 1,
      },
      {
        question: "Can these sheets be used for acoustic underlayment?",
        answer: "Yes, our low-density formulations (180–220 kg/m³) are engineered specifically for impact sound transmission reduction in flooring and building walls.",
        sortOrder: 2,
      },
    ],
    specifications: [
      { property: "Standard Sheet Dimensions", value: "915 × 610 mm / Rolls up to 10m", sortOrder: 0 },
      { property: "Thickness Range", value: "1.0 mm to 50.0 mm", sortOrder: 1 },
      { property: "Density Range", value: "180 to 280 kg/m³", sortOrder: 2 },
      { property: "Compressibility", value: "25% to 40%", sortOrder: 3 },
      { property: "Recovery", value: "Minimum 80%", sortOrder: 4 },
    ],
  },
  {
    slug: "rubber-cork-sheets",
    name: "Rubberised Cork Sheets (RC Sheets)",
    categorySlug: "rubberised-cork",
    badge: "IS: 4253 (Part II) Conformance",
    imageUrl: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    seoDescription:
      "NBR, Neoprene, and SBR bonded composite sheets engineered for hot oil sealing, power transformer covers, and automotive flange gaskets.",
    imageAlt: "Rubberised Cork Sheets (RC Sheets) from United Rubber Cork",
    introduction:
      "NBR, Neoprene, and SBR bonded composite sheets engineered for hot oil sealing, power transformer covers, and automotive flange gaskets.",
    features: [
      "Zero fluid seepage under continuous exposure to transformer mineral oils (-30°C to +120°C)",
      "Controlled compressibility (25%–40%) provides positive hermetic seal at low bolt torque",
      "High recovery (> 75%) prevents gasket stress relaxation and subsequent flange leaks",
      "Formulated strictly in conformance with IS: 4253 (Part II) Grade RC70C & RC80C",
    ],
    applications: [
      "Power & Distribution Transformer Tank Covers & Flanges",
      "Automotive Crankcases, Oil Pans & Valve Covers",
      "Industrial Gas Pipeline Flanges & Fuel Pumps",
      "Electric Motor End Shields & Fluid Pumps",
    ],
    description:
      "<p>Formulated by compounding prime granulated cork with specialized synthetic elastomer matrices (Nitrile NBR, Neoprene, or SBR) under high-tonnage hydraulic curing. These sheets combine the high compressibility of natural cork with the chemical resistance, mechanical resilience, and fluid impermeability of synthetic rubbers.</p><ul><li>Zero fluid seepage under continuous exposure to transformer mineral oils (-30°C to +120°C)</li><li>Controlled compressibility (25%–40%) provides positive hermetic seal at low bolt torque</li><li>Superior recovery (> 75%) accommodates continuous thermal expansion and contraction</li><li>Available in standard sheets, continuous rolls, and CNC-cut finished gasket profiles</li></ul>",
    faqs: [
      {
        question: "Which binder grade should I select for electrical power transformers?",
        answer: "For power transformers exposed to hot mineral transformer oil, Nitrile-bonded grades (RC70C or RC80C) conforming to IS: 4253 (Part II) are strongly recommended.",
        sortOrder: 0,
      },
      {
        question: "What is the maximum continuous operating temperature?",
        answer: "Our Nitrile-bonded composite gaskets operate continuously between -30°C and +120°C without loss of sealing elasticity.",
        sortOrder: 1,
      },
      {
        question: "Do you supply CNC pre-cut gaskets or dovetail frames?",
        answer: "Yes, we produce fully finished gaskets fabricated directly from your CAD drawings or physical samples, including seamless dovetail joints for large transformer covers.",
        sortOrder: 2,
      },
    ],
    specifications: [
      { property: "Standard Dimensions", value: "915 × 610 mm / 915 × 915 mm", sortOrder: 0 },
      { property: "Thickness Range", value: "1.0 mm to 25.0 mm", sortOrder: 1 },
      { property: "Hardness (Shore A)", value: "70 to 85", sortOrder: 2 },
      { property: "Compressibility at 28 kg/cm²", value: "25% to 40%", sortOrder: 3 },
      { property: "Recovery after Compression", value: "Minimum 75%", sortOrder: 4 },
    ],
  },
  {
    slug: "decorative-cork-tiles",
    name: "Acoustic Decorative Cork Wall Tiles",
    categorySlug: "decorative-cork",
    badge: "Architectural & Interior Design",
    imageUrl: "/images/industries-serve-images/cork-expansion-joints-construction-insulation-vapi-gujarat.jpeg",
    seoDescription:
      "Sound-dampening natural cork wall tiles with tactile texture, biophilic elegance, and acoustic reverberation control for offices, boardrooms, and studios.",
    imageAlt: "Acoustic Decorative Cork Wall Tiles from United Rubber Cork",
    introduction:
      "Sound-dampening natural cork wall tiles with tactile texture, biophilic elegance, and acoustic reverberation control for offices, boardrooms, and studios.",
    features: [
      "Effective acoustic absorption (NRC 0.25 to 0.45) dampening voice reverberation",
      "Self-healing fine-grain texture closes naturally after pin removal",
      "Hypoallergenic, anti-static surface that naturally repels airborne dust",
      "Available in natural sanded, bevelled, and geometric embossed textures",
    ],
    applications: [
      "Corporate Boardrooms & Conference Rooms",
      "Listening Studios & Home Theaters",
      "Hotel Lobbies & Executive Suites",
      "Educational Classrooms & Libraries",
    ],
    description:
      "<p>Transform commercial and residential spaces with tactile, sound-dampening natural cork tiles. Harvested sustainably from Quercus suber cork bark, these wall coverings bring organic warmth, biophilic elegance, and noticeable acoustic reverberation control to offices, boardrooms, and listening studios.</p><ul><li>Effective acoustic absorption (NRC 0.25 to 0.45) dampening voice reverberation</li><li>Self-healing fine-grain texture closes naturally after pin removal</li><li>Hypoallergenic, anti-static surface that naturally repels airborne dust</li><li>Available in natural sanded, bevelled, and geometric embossed textures</li></ul>",
    faqs: [
      {
        question: "How are decorative cork tiles installed on walls?",
        answer: "Tiles are installed using standard water-based contact adhesive or heavy-duty acrylic tile adhesive directly onto clean drywall, plywood, or masonry.",
        sortOrder: 0,
      },
      {
        question: "Do these tiles improve room acoustics?",
        answer: "Yes, the cellular honeycomb structure absorbs mid and high-frequency sound waves, reducing flutter echo and conversational noise in conference rooms and studios.",
        sortOrder: 1,
      },
    ],
    specifications: [
      { property: "Standard Tile Sizes", value: "300 × 300 mm / 600 × 300 mm", sortOrder: 0 },
      { property: "Standard Thicknesses", value: "3.0 mm, 4.5 mm, 6.0 mm, 10.0 mm", sortOrder: 1 },
      { property: "Surface Finish", value: "Natural Sanded / Wax Protective Coating", sortOrder: 2 },
    ],
  },
  {
    slug: "cork-desk-accessories",
    name: "Custom Cork Desk Mats & Office Accessories",
    categorySlug: "cork-gifts",
    badge: "Eco-Friendly Corporate Gifting",
    imageUrl: "/images/industries-serve-images/orthopedic-cork-shoe-soles-footwear-manufacturer-vapi-gujarat.jpeg",
    seoDescription:
      "Sustainable desk pads, mousepads, pen holders, and docking trays crafted from fine-grain natural cork.",
    imageAlt: "Custom Cork Desk Mats & Office Accessories from United Rubber Cork",
    introduction:
      "Sustainable desk pads, mousepads, pen holders, and docking trays crafted from fine-grain natural cork.",
    features: [
      "Silky-smooth, water-resistant surface compatible with optical and laser computer mice",
      "Naturally non-slip underside stays firmly positioned on glass, wood, and metal desks",
      "Supports precision corporate branding via laser engraving, debossing, or screen printing",
      "Crafted with rounded beveled edges and durable perimeter stitching or edge sealing",
    ],
    applications: [
      "Corporate Employee Onboarding Welcome Kits",
      "Sustainable Executive Desktop Upgrades",
      "Tech Company Conference Giveaways & PR Kits",
      "Retail Lifestyle & Co-working Space Merchandise",
    ],
    description:
      "<p>Crafted for organizations committed to sustainability, our premium cork desk accessories and executive gift sets showcase natural materials in modern corporate workspaces. Every piece is precision laser-cut and can be custom branded with debossed or engraved company logos.</p><ul><li>100% vegan, water-repellent, and naturally stain-resistant</li><li>Smooth precision mouse tracking surface with anti-slip backing</li><li>Custom logo laser engraving, debossing, and bespoke gift packaging</li><li>Lightweight, durable, and biodegradable at end of lifecycle</li></ul>",
    faqs: [
      {
        question: "Can we laser engrave our corporate logo?",
        answer: "Yes, our fine-grain cork surface provides crisp, high-definition laser engraving and hot-foil debossing for corporate branding.",
        sortOrder: 0,
      },
      {
        question: "What is the minimum order quantity (MOQ) for custom merchandise?",
        answer: "Standard items have an MOQ of 50 units for customized logo engraving, with volume tier discounts for larger corporate orders.",
        sortOrder: 1,
      },
    ],
    specifications: [
      { property: "Standard Desk Mat Size", value: "800 × 400 mm / 900 × 450 mm", sortOrder: 0 },
      { property: "Material Construction", value: "Natural agglomerated cork + natural rubber backing", sortOrder: 1 },
      { property: "Custom Branding Options", value: "Laser Engraving, Debossing, Screen Printing", sortOrder: 2 },
    ],
  },
];

// Seed the rest of the static catalog so every existing product has a DB row
// and therefore its own crawlable URL. No FAQs are invented for these entries.
const explicitlySeededSlugs = new Set(INITIAL_PRODUCTS.map((item) => item.slug));
const catalogSeedProducts = PRODUCTS.filter(
  (product) => !explicitlySeededSlugs.has(product.slug)
).map((product) => ({
  slug: product.slug,
  name: product.name,
  categorySlug: product.category,
  badge: product.badge || "",
  imageUrl: product.image,
  seoTitle: product.name,
  seoDescription: product.shortDescription,
  imageAlt: `${product.name} from United Rubber Cork`,
  introduction: product.shortDescription,
  features: product.features || [],
  applications: product.applications || [],
  benefits: [],
  relatedProductIds: [],
  visibility: "public",
  lifecycleStatus: "active",
  indexingStatus: "auto",
  description: product.fullDescription,
  faqs: [],
  specifications: (product.specifications || []).map((specification, sortOrder) => ({
    ...specification,
    sortOrder,
  })),
}));

const SEED_PRODUCTS = [...INITIAL_PRODUCTS, ...catalogSeedProducts];

async function main() {
  const connectionString =
    process.env.DATABASE_URL_POOLED?.trim() || process.env.DATABASE_URL?.trim();
  if (!connectionString) {
    throw new Error(
      "DATABASE_URL_POOLED or DATABASE_URL must be configured before seeding the database."
    );
  }

  const pool = new Pool({ connectionString });
  const db = drizzle(pool);

  try {
    console.log("Starting database seeding...");

    for (const item of SEED_PRODUCTS) {
      const { faqs, specifications, ...productData } = item;
      const [existing] = await db
        .select({ id: products.id })
        .from(products)
        .where(eq(products.slug, item.slug))
        .limit(1);
      const productId = existing?.id || randomUUID();

      const product = await db.transaction(async (tx) => {
        const [savedProduct] = existing
          ? await tx
              .update(products)
              .set({ ...productData, updatedAt: new Date() })
              .where(eq(products.id, productId))
              .returning()
          : await tx.insert(products).values({ ...productData, id: productId }).returning();

        await tx.delete(productFaqs).where(eq(productFaqs.productId, productId));
        await tx
          .delete(productSpecifications)
          .where(eq(productSpecifications.productId, productId));

        if (faqs.length) {
          await tx.insert(productFaqs).values(
            faqs.map((faq, sortOrder) => ({
              ...faq,
              id: randomUUID(),
              productId,
              sortOrder: faq.sortOrder ?? sortOrder,
            }))
          );
        }

        if (specifications.length) {
          await tx.insert(productSpecifications).values(
            specifications.map((specification, sortOrder) => ({
              ...specification,
              id: randomUUID(),
              productId,
              sortOrder: specification.sortOrder ?? sortOrder,
            }))
          );
        }

        return savedProduct;
      });

      console.log("Seeded product: " + product.name + " (" + product.slug + ")");
    }

    // Baseline engineering articles only. Existing rows are left untouched so
    // editorial changes made in the admin area are not overwritten by a seed.
    for (const article of INITIAL_BLOGS) {
      const [saved] = await db
        .insert(blogs)
        .values(article)
        .onConflictDoNothing()
        .returning({ id: blogs.id });

      console.log(
        saved
          ? "Seeded blog: " + article.title + " (" + article.slug + ")"
          : "Blog already present: " + article.slug
      );
    }

    console.log("Database seeding completed successfully!");
  } finally {
    await pool.end();
  }
}

main().catch((error) => {
  console.error("Seeding error:", error);
  process.exitCode = 1;
});
