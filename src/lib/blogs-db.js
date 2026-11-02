import { slugify } from "@/lib/utils";

export { slugify };

export const INITIAL_BLOGS = [
  {
    id: "blog-1",
    slug: "rubberised-cork-transformer-gasket-selection-guide",
    title: "Engineering Guide: Selecting the Right Rubberised Cork Grade for Oil-Immersed Transformers",
    category: "technical-guides",
    author: "URC Engineering Team",
    readTime: "6 min read",
    tags: "Transformer Gaskets, ASTM F104, High Voltage, NBR Cork",
    imageUrl: "/images/products/rubberised-cork-1.jpg",
    excerpt: "Detailed breakdown of ASTM F104 line callouts, oil immersion swelling thresholds, and bolting torque calculations for hermetically sealed distribution transformers.",
    content: `<h2>Understanding Gasket Behavior in Transformer Oils</h2>
<p>In high-voltage power and distribution transformers, transformer oil (mineral, silicone, or synthetic ester) operates under cyclic thermal stress ranging from -30°C to +115°C. Selecting the wrong gasket compound causes premature hardening, oil weepage, and costly un-tanking maintenance.</p>
<h3>Key Evaluation Criteria</h3>
<ul>
  <li><strong>Elastomer Base:</strong> High-acrylonitrile Nitrile (NBR) binder delivers superior resistance to dielectric transformer fluid.</li>
  <li><strong>Recovery Percentage:</strong> Must achieve >80% resilience according to ASTM F36 to accommodate thermal expansion of transformer flanges.</li>
  <li><strong>Compressibility Range:</strong> Standard 30% to 50% under nominal bolt torque prevents gasket crush while maintaining airtight sealing against moisture ingress.</li>
</ul>
<p>United Rubber Cork manufactures precision RC-grade sheets engineered strictly to IS:4253 Part II and ASTM F104 specifications.</p>`,
    published: true,
    createdAt: new Date("2026-09-15T10:00:00.000Z"),
    updatedAt: new Date("2026-10-01T14:30:00.000Z"),
  },
  {
    id: "blog-2",
    slug: "acoustic-soundproofing-architectural-cork-panels",
    title: "Acoustic Attenuation in Modern Commercial Architecture Using Natural Cork Tiles",
    category: "sustainability",
    author: "Design & Materials Desk",
    readTime: "4 min read",
    tags: "Acoustics, Interior Architecture, LEED, Wall Tiles",
    imageUrl: "/images/products/decorative-cork-1.jpg",
    excerpt: "How cellular honeycomb microstructures in pure agglomerated cork deliver NRC ratings up to 0.70 while achieving carbon-negative interior fitouts.",
    content: `<h2>Cellular Physics Behind Cork Acoustics</h2>
<p>Each cubic centimeter of natural cork contains roughly 40 million microscopic, air-filled 14-sided polyhedral cells. This dead-air matrix naturally traps sound wave vibrations across mid and high human speech frequencies (500 Hz – 4000 Hz).</p>
<h3>Architectural Benefits</h3>
<ul>
  <li><strong>Noise Reduction Coefficient (NRC):</strong> Tested values between 0.55 and 0.70 without fiberglass backing.</li>
  <li><strong>Zero Chemical Off-gassing:</strong> Certified low-VOC natural binding suitable for LEED Platinum educational and hospitality facilities.</li>
  <li><strong>Thermal R-Value:</strong> Natural thermal resistance of R-3.6 per inch reduces auxiliary building HVAC loads.</li>
</ul>`,
    published: true,
    createdAt: new Date("2026-08-20T08:30:00.000Z"),
    updatedAt: new Date("2026-09-10T11:15:00.000Z"),
  },
  {
    id: "blog-3",
    slug: "cork-expansion-joints-concrete-infrastructure",
    title: "Why Bridge Decks and Highway Runways Rely on Non-Extruding Cork Expansion Fillers",
    category: "industry-insights",
    author: "Technical Sales Division",
    readTime: "5 min read",
    tags: "Civil Infrastructure, ASTM D1752, Bridge Decks, Expansion Joints",
    imageUrl: "/images/products/cork-products-1.jpg",
    excerpt: "Comparing preformed cork filler boards against bitumen fiber: 90% elastic recovery, weather immunity, and prevention of concrete spalling.",
    content: `<h2>Non-Extruding Resilience in Civil Engineering</h2>
<p>Concrete slabs continuously expand and contract under diurnal thermal cycles. When traditional bituminous fiber fillers are compressed under peak summer slab expansion, the joint filler extrudes above the pavement line and is sheared by traffic. Upon winter contraction, an open gap remains, allowing water penetration and sub-base scouring.</p>
<h3>ASTM D1752 Type II Standard</h3>
<ul>
  <li>Recovers to 90% or more of original thickness within 1 hour after 50% compression.</li>
  <li>Cellular structure does not degrade, rot, or leach bitumen into ground water.</li>
  <li>Approved across Indian Railways, NHAI highway projects, and international airport aprons.</li>
</ul>`,
    published: true,
    createdAt: new Date("2026-07-12T09:00:00.000Z"),
    updatedAt: new Date("2026-08-05T16:45:00.000Z"),
  },
  {
    id: "blog-4",
    slug: "sustainable-corporate-merchandise-cork-lifestyle",
    title: "The B2B Shift Toward Circular Gifting: Eco-Friendly Cork Merchandise for Enterprises",
    category: "case-studies",
    author: "Merchandise & OEM Team",
    readTime: "3 min read",
    tags: "Corporate Gifts, Sustainable ESG, Laser Engraving, Lifestyle Cork",
    imageUrl: "/images/products/cork-gifts-1.jpg",
    excerpt: "How multinational enterprises replaced single-use plastic conference kits with custom laser-engraved cork organizers, desk pads, and tote bags.",
    content: `<h2>Responsible Brand Positioning Through Sustainable Materials</h2>
<p>Corporate ESG (Environmental, Social, and Governance) scorecards are extending to corporate gifting and conference collateral. Harvesting cork bark does not harm the tree; the Quercus Suber oak lives for over 200 years, with bark regenerated every 9 years.</p>
<h3>Custom OEM Options</h3>
<ul>
  <li>Precision CNC laser engraving for corporate identity and logos.</li>
  <li>Waterproof, antimicrobial, and naturally stain-resistant surfaces.</li>
  <li>Custom kit bundling: A5 journal notebook, desk mat, and thermal insulated sleeve.</li>
</ul>`,
    published: true,
    createdAt: new Date("2026-06-05T11:20:00.000Z"),
    updatedAt: new Date("2026-06-18T10:00:00.000Z"),
  },
];

// In-memory runtime cache for server operations
let blogsCache = [...INITIAL_BLOGS];

/**
 * Fetch all blogs
 */
export async function getAllBlogs() {
  try {
    if (process.env.DATABASE_URL) {
      // Blog records remain in the in-memory cache until a database model is added.
    }
  } catch (err) {
    console.warn("DB blog fetch fallback:", err.message);
  }

  return [...blogsCache].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * Fetch a single blog by ID
 */
export async function getBlogById(id) {
  return blogsCache.find((b) => b.id === id) || null;
}

/**
 * Fetch a single blog by slug
 */
export async function getBlogBySlug(slug) {
  return blogsCache.find((b) => b.slug === slug) || null;
}

/**
 * Save new blog to cache
 */
export async function createBlogRecord(data) {
  const newBlog = {
    id: `blog-${Date.now()}`,
    slug: data.slug || slugify(data.title),
    title: data.title,
    author: data.author || "URC Engineering Team",
    readTime: data.readTime || "4 min read",
    tags: data.tags || "",
    imageUrl: data.imageUrl || "/images/placeholder-product.jpg",
    excerpt: data.excerpt || "",
    content: data.content || "",
    published: data.published !== false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  blogsCache.unshift(newBlog);
  return newBlog;
}

/**
 * Update an existing blog record
 */
export async function updateBlogRecord(id, data) {
  const index = blogsCache.findIndex((b) => b.id === id);
  if (index === -1) return null;

  blogsCache[index] = {
    ...blogsCache[index],
    ...data,
    slug: data.slug || (data.title ? slugify(data.title) : blogsCache[index].slug),
    updatedAt: new Date(),
  };

  return blogsCache[index];
}

/**
 * Delete a blog record
 */
export async function deleteBlogRecord(id) {
  const prevLen = blogsCache.length;
  blogsCache = blogsCache.filter((b) => b.id !== id);
  return blogsCache.length < prevLen;
}
