/**
 * Product Catalog Data Schema & Verified Specifications
 * Conforms to verified manufacturer standards (IS: 4253 / ASTM F104 / BS Specifications).
 * 3-Level Product Architecture:
 * - Level 1: All Products (/products)
 * - Level 2: 4 Primary Categories (/products/[category])
 * - Level 3: Individual Product Detail Pages (/products/[category]/[slug])
 */

export const PRODUCT_CATEGORIES = [
  { id: "all", name: "All Products", slug: "all", href: "/products" },
  { id: "cork-products", name: "Cork Products", slug: "cork-products", href: "/products/cork-products" },
  { id: "rubberised-cork", name: "Rubberised Cork", slug: "rubberised-cork", href: "/products/rubberised-cork" },
  { id: "decorative-cork", name: "Decorative Cork", slug: "decorative-cork", href: "/products/decorative-cork" },
  { id: "cork-gifts", name: "Cork Gifts", slug: "cork-gifts", href: "/products/cork-gifts" },
];

export const CATEGORY_DETAILS = {
  "cork-products": {
    id: "cork-products",
    slug: "cork-products",
    name: "Cork Products",
    tagline: "Natural Cork Materials & Solutions",
    heroImage: "/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg",
    badge: "100% Natural Raw Material",
    standard: "Conforms to IS: 4253 / ASTM Standards",
    shortDescription:
      "Pure natural agglomerated cork sheets, continuous rolls, blocks, and graded industrial granules engineered for thermal barrier, acoustic underlayment, and foundation expansion joints.",
    metaDescription:
      "Explore United Rubber Cork's natural cork sheets, rolls, blocks, and industrial granules. High-density acoustic and thermal insulation manufactured in Vapi, Gujarat.",
    applications: [
      {
        title: "Structural Expansion Joints",
        description: "High-recovery filler boards for concrete highway pavements, airport aprons, bridges, and damp proofing.",
      },
      {
        title: "Thermal & Acoustic Insulation",
        description: "Floor underlayments and ceiling panels reducing impact sound transmission and high-frequency vibrations.",
      },
      {
        title: "Industrial Components & Stoppers",
        description: "Specialized friction discs, clutch facing compositions, floats, and laboratory-grade stoppers.",
      },
      {
        title: "Railway Track Vibration Pads",
        description: "Resilient ballast and rail pad damping layers mitigating ground-borne mechanical shock.",
      },
    ],
    benefits: [
      {
        title: "Natural Honeycomb Cell Structure",
        description: "Millions of microscopic air-filled cells absorb mechanical vibration and attenuate airborne sound.",
      },
      {
        title: "Low Thermal Conductivity",
        description: "Exceptional thermal barrier properties that resist temperature fluctuations without dimensional shrinkage.",
      },
      {
        title: "High Compression Resilience",
        description: "Recovers up to 90% of original thickness after severe compression cycles without crumbling.",
      },
      {
        title: "Renewable & Sustainable",
        description: "Responsibly harvested cork bark from Quercus suber trees with zero synthetic petrochemical binders.",
      },
    ],
    selectionGuide: {
      headline: "How to specify natural cork materials",
      content:
        "When specifying natural agglomerated cork, density is the primary design parameter. Higher densities (220–280 kg/m³) are engineered for structural foundation pads and mechanical vibration damping under heavy loads. Lower densities (160–200 kg/m³) provide superior acoustic attenuation and thermal insulation for architectural underlayments.",
    },
  },

  "rubberised-cork": {
    id: "rubberised-cork",
    slug: "rubberised-cork",
    name: "Rubberised Cork",
    tagline: "Cork and Rubber Composite Materials",
    heroImage: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    badge: "Industrial Sealing Matrix",
    standard: "Conforms to IS: 4253 (Part II) / ASTM F104",
    shortDescription:
      "High-resilience composite sheets, transformer gasket frames, and precision cut components formulated with Nitrile (NBR), Neoprene, and SBR matrices for hot oil resistance and hermetic sealing.",
    metaDescription:
      "High-recovery rubberised cork sheets, continuous rolls, and CNC-cut transformer gaskets by United Rubber Cork. Superior hot oil resistance conforming to IS: 4253 (Part II).",
    applications: [
      {
        title: "Power & Distribution Transformers",
        description: "Hermetic sealing for transformer tank covers, radiator headers, conservators, and bushing turrets.",
      },
      {
        title: "Automotive Engines & Transmissions",
        description: "Crankcase, oil pan, valve cover, timing belt covers, and fuel pump flange gaskets.",
      },
      {
        title: "High-Voltage Switchgears",
        description: "Gasket frames and endless molded circular rings preventing dielectric fluid leakage under thermal cycling.",
      },
      {
        title: "Industrial Flanges & Hydraulic Lines",
        description: "Low bolt-torque flange sealing for mineral oils, coolants, fuels, and industrial hydraulic systems.",
      },
    ],
    benefits: [
      {
        title: "Zero Seepage under Hot Mineral Oil",
        description: "Specially formulated polymer matrices resist mineral transformer oils and fuels from -30°C to +120°C.",
      },
      {
        title: "Controlled Compressibility (25%–40%)",
        description: "Achieves an effective hermetic seal under relatively low bolt torque without flange distortion.",
      },
      {
        title: "Superior Recovery (> 75%)",
        description: "Maintains active sealing pressure across thousands of thermal expansion and contraction cycles.",
      },
      {
        title: "Custom CNC Fabrication & Dovetails",
        description: "Supplied as standard sheets, continuous rolls, or CNC-cut gaskets with seamless interlocking dovetail joints.",
      },
    ],
    selectionGuide: {
      headline: "How to specify rubberised cork grades",
      content:
        "For transformer applications conforming to IS: 4253 (Part II), grade selection depends on operating temperature, bolt load, and contact media. Grade RC70C / RC80C with Nitrile (NBR) binder is recommended for continuous exposure to hot transformer mineral oils. For general engineering and mild outdoor exposure, Neoprene or SBR-bonded grades provide an optimal balance of flexibility and cost.",
    },
  },

  "decorative-cork": {
    id: "decorative-cork",
    slug: "decorative-cork",
    name: "Decorative Cork",
    tagline: "Decorative & Acoustic Cork Materials",
    heroImage: "/images/industries-serve-images/cork-expansion-joints-construction-insulation-vapi-gujarat.jpeg",
    badge: "Architectural & Interior Design",
    standard: "Eco-Friendly Renewable Material",
    shortDescription:
      "Acoustic wall tiles, decorative cork panels, and textured natural cork coverings designed for architectural spaces, corporate offices, recording studios, and residences.",
    metaDescription:
      "Transform interior spaces with United Rubber Cork decorative cork tiles and acoustic wall panels. Natural sound absorption and organic warmth for modern architecture.",
    applications: [
      {
        title: "Corporate Offices & Meeting Pods",
        description: "Acoustic feature walls that absorb ambient conversational chatter and eliminate echo.",
      },
      {
        title: "Recording Studios & Listening Rooms",
        description: "Reverberation control and flutter echo reduction with textured organic cork panels.",
      },
      {
        title: "Architectural Feature Installations",
        description: "Tactile, warm geometric wall surfaces combining modern aesthetics with biophilic natural textures.",
      },
      {
        title: "Bulletin & Pinning Boards",
        description: "Self-healing fine-grain natural cork surfaces for commercial bulletin displays and studio mood boards.",
      },
    ],
    benefits: [
      {
        title: "Acoustic Reverberation Reduction",
        description: "Noise Reduction Coefficient (NRC 0.25 to 0.45) effectively dampens mid-to-high frequency airborne sounds.",
      },
      {
        title: "Organic Biophilic Aesthetic",
        description: "Authentic cork bark texture introduces visual warmth and natural elegance into modern minimalist spaces.",
      },
      {
        title: "Self-Healing Cellular Matrix",
        description: "Fine-grain surface closes naturally after pin removal without leaving visible puncture marks.",
      },
      {
        title: "Hypoallergenic & Anti-Static",
        description: "Does not attract dust, resists mildew and insect degradation, and emits zero harmful VOCs.",
      },
    ],
    selectionGuide: {
      headline: "How to specify decorative cork installations",
      content:
        "Tile thickness directly influences acoustic absorption: 6mm to 12mm tiles provide optimal sound dampening for busy conference rooms and studios, whereas 3mm to 4mm tiles offer a lightweight decorative wall finish. Choose between natural sanded, wax-protected, or raw tactile surface textures depending on wall maintenance requirements.",
    },
  },

  "cork-gifts": {
    id: "cork-gifts",
    slug: "cork-gifts",
    name: "Cork Gifts",
    tagline: "Cork-Based Gift & Lifestyle Products",
    heroImage: "/images/industries-serve-images/orthopedic-cork-shoe-soles-footwear-manufacturer-vapi-gujarat.jpeg",
    badge: "Eco-Friendly Corporate Gifting",
    standard: "100% Vegan & Recyclable",
    shortDescription:
      "Sustainable promotional corporate gifts, customized lifestyle accessories, desk stationery, and eco-friendly branded cork products crafted from natural cork.",
    metaDescription:
      "Custom sustainable corporate gifts and desk accessories by United Rubber Cork. Laser engraved, embossed, and tailored for premium OEM corporate gifting programs.",
    applications: [
      {
        title: "Executive Corporate Gifting",
        description: "Curated premium welcome kits, milestone anniversary hampers, and client appreciation sets.",
      },
      {
        title: "Desk & Office Stationery",
        description: "Ergonomic cork desk mats, precision mousepads, desktop pen organizers, and note covers.",
      },
      {
        title: "Hospitality & Dining Accessories",
        description: "Branded bar coasters, bottle sleeves, hot pot trivets, and restaurant menu folders.",
      },
      {
        title: "Custom OEM Branded Merchandise",
        description: "Bespoke product development manufactured to corporate branding guidelines and packaging specs.",
      },
    ],
    benefits: [
      {
        title: "Tangible Environmental Statement",
        description: "Gifts crafted from 100% natural, renewable cork visibly showcase your organization's sustainability commitment.",
      },
      {
        title: "Water & Stain Resistant",
        description: "Suberin within cork naturally repels liquids, oils, and stains for effortless wipe-clean maintenance.",
      },
      {
        title: "Precision Laser & Foil Branding",
        description: "Fine-grain surface delivers razor-sharp corporate logo laser engraving, debossing, and foil stamping.",
      },
      {
        title: "Lightweight & Travel-Friendly",
        description: "Flexible, ultra-lightweight, and durable construction designed for long-lasting daily professional use.",
      },
    ],
    selectionGuide: {
      headline: "How to plan custom corporate cork orders",
      content:
        "For corporate gifting programs, consider batch volume, customization method (precision laser engraving, debossing, or multi-color screen printing), and custom gift packaging. We accommodate OEM specifications and supply physical pre-production samples prior to full production runs.",
    },
  },
};

export const PRODUCTS = [
  // --- Category: Cork Products ---
  {
    id: "plain-cork-sheets",
    slug: "plain-cork-sheets",
    name: "Plain Natural Cork Sheets & Rolls",
    category: "cork-products",
    badge: "Natural Agglomerated",
    image: "/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg",
    shortDescription:
      "Pure natural agglomerated cork sheets and continuous rolls engineered for thermal barriers, acoustic underlayment, and foundation expansion joints.",
    fullDescription:
      "Manufactured from carefully selected natural raw cork granules bonded with food-grade polyurethane binders under controlled heat and hydraulic pressure. Conforming to IS: 4253 standards, these sheets exhibit outstanding acoustic dampening, low thermal conductivity, and superior dimensional stability under compression.",
    features: [
      "Naturally cellular structure dampens high-frequency mechanical vibration and impact noise",
      "Low thermal conductivity (0.040 W/m·K) provides reliable thermal insulation",
      "Sustainably harvested raw material conforming to IS: 4253 and international standards",
      "Available in standard rectangular sheets or continuous rolls up to 10 meters",
    ],
    specifications: [
      { property: "Standard Sheet Dimensions", value: "915 × 610 mm (36\" × 24\") / Rolls up to 10m" },
      { property: "Thickness Range", value: "1.0 mm to 50.0 mm" },
      { property: "Density Range", value: "180 to 280 kg/m³ (Customizable)" },
      { property: "Tensile Strength", value: "Minimum 3.5 kg/cm²" },
      { property: "Compressibility at 70 kg/cm²", value: "25% to 40%" },
      { property: "Recovery after Compression", value: "Minimum 80%" },
      { property: "Standard Conformance", value: "IS: 4253 / ASTM Compliant" },
    ],
    applications: [
      "Thermal Barrier & Acoustic Floor Underlayment",
      "Civil Engineering Foundation Pads & Dampproofing",
      "Industrial Friction Discs & Polish Wheels",
      "Laboratory Stoppers, Floats & Level Indicators",
    ],
    howToSpecify:
      "Specify required sheet thickness (mm), overall dimensions (sheet vs continuous roll), and target density (kg/m³) based on whether your application prioritizes sound insulation or structural load bearing.",
  },
  {
    id: "industrial-cork-granules",
    slug: "industrial-cork-granules",
    name: "Industrial Cork Granules & Graded Cork",
    category: "cork-products",
    badge: "Graded Milled Cork",
    image: "/images/carousel-images/bulk-cork-raw-material-storage-warehouse-india-02.jpg",
    shortDescription:
      "Clean, dry, graded raw cork granules used in clutch plates, brake shoes, batteries, foundries, and insulation compositions.",
    fullDescription:
      "Processed from 100% natural cork bark through multi-stage milling, air-separation, and precise mechanical sifting. Our industrial cork granules are free from dust, foreign particles, and excessive moisture, ensuring consistent bulk density and optimal resin absorption in composite molding.",
    features: [
      "Strict mesh size grading from 0.5 mm to 10.0 mm with minimal fine dust",
      "Low moisture content (< 7%) ensuring stable binder adhesion during composite molding",
      "Controlled bulk density tailored for friction materials and battery insulation",
      "High chemical neutrality, resisting acid electrolyte attack and hot foundry sands",
    ],
    specifications: [
      { property: "Available Mesh Sizes", value: "0.5 mm to 10.0 mm (Custom mesh grading available)" },
      { property: "Bulk Density Range", value: "60 to 120 kg/m³" },
      { property: "Moisture Content", value: "Less than 7.0% by weight" },
      { property: "Ash Content", value: "Less than 2.5%" },
      { property: "Origin & Purity", value: "100% Natural Cork Bark, virgin processed" },
      { property: "Packaging", value: "25 kg moisture-barrier multiwall woven bags" },
    ],
    applications: [
      "Automotive Clutch Plates & Brake Lining Compounds",
      "Lead-Acid Battery Plate Separators & Insulators",
      "Foundry Hot Tops & Refractory Casting Compositions",
      "Sports Goods Core Fillers (Cricket Balls, Softballs)",
    ],
    howToSpecify:
      "Specify the required particle size / mesh range (e.g. 10–20 mesh, 20–40 mesh), target bulk density, and intended binder system.",
  },
  {
    id: "cork-expansion-joints",
    slug: "cork-expansion-joints",
    name: "Cork Expansion Joint Filler Boards",
    category: "cork-products",
    badge: "Structural Joint Filler",
    image: "/images/carousel-images/sustainable-raw-cork-bark-harvesting-supplier-india-01.jpg",
    shortDescription:
      "High-density natural cork boards designed for structural expansion joints in concrete construction, bridges, and highways.",
    fullDescription:
      "Engineered to absorb the thermal expansion and contraction of adjacent concrete slabs without extruding from the joint. When the concrete contracts during cold weather, the cork filler board expands back to fill the void, preventing soil and water infiltration into the structural subgrade.",
    features: [
      "Recovers to over 90% of original thickness after repeated 50% compression cycles",
      "Zero bitumen extrusion under severe summer heat and heavy vehicle wheel loads",
      "Resistant to soil acids, alkalis, rot, and continuous moisture saturation",
      "Conforms strictly to highway authorities and civil engineering specifications",
    ],
    specifications: [
      { property: "Standard Sheet Dimensions", value: "915 × 610 mm / Custom cut strips" },
      { property: "Thickness Range", value: "10.0 mm, 12.5 mm, 19.0 mm, 25.0 mm" },
      { property: "Compressive Recovery", value: "Minimum 90% after compression to 50%" },
      { property: "Extrusion Value", value: "Maximum 1.5 mm under standard test" },
      { property: "Water Absorption", value: "Less than 10% by volume" },
      { property: "Standard Conformance", value: "IS: 1838 / ASTM D1752 / BS 2630" },
    ],
    applications: [
      "Highway Concrete Pavements & Airport Runway Aprons",
      "Bridge Abutments & Retaining Wall Expansion Gaps",
      "Water Treatment Plants, Reservoirs & Canal Linings",
      "Industrial Plant Concrete Foundation Isolation",
    ],
    howToSpecify:
      "Specify joint width (board thickness in mm), joint depth (strip width in mm), and required project footage.",
  },

  // --- Category: Rubberised Cork ---
  {
    id: "rubber-cork-sheets",
    slug: "rubber-cork-sheets",
    name: "Rubberised Cork Sheets (RC Sheets)",
    category: "rubberised-cork",
    badge: "IS: 4253 (Part II) Conformance",
    image: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    shortDescription:
      "NBR, Neoprene, and SBR bonded composite sheets engineered for hot oil sealing, power transformer covers, and automotive flange gaskets.",
    fullDescription:
      "Formulated by compounding prime granulated cork with specialized synthetic elastomer matrices (Nitrile NBR, Neoprene, or SBR) under high-tonnage hydraulic curing. These sheets combine the high compressibility of natural cork with the chemical resistance, mechanical resilience, and fluid impermeability of synthetic rubbers.",
    features: [
      "Zero fluid seepage under continuous exposure to transformer mineral oils (-30°C to +120°C)",
      "Controlled compressibility (25%–40%) provides positive hermetic seal at low bolt torque",
      "High recovery (> 75%) prevents gasket stress relaxation and subsequent flange leaks",
      "Formulated strictly in conformance with IS: 4253 (Part II) Grade RC70C & RC80C",
    ],
    specifications: [
      { property: "Standard Sheet Sizes", value: "915 × 610 mm / 915 × 915 mm" },
      { property: "Thickness Range", value: "1.0 mm to 25.0 mm" },
      { property: "Binder Polymers", value: "Nitrile (NBR), Neoprene (CR), SBR" },
      { property: "Hardness (Shore A)", value: "70 ± 5 / 80 ± 5" },
      { property: "Compressibility at 28 kg/cm²", value: "25% to 40%" },
      { property: "Tensile Strength", value: "Minimum 14.0 kg/cm²" },
      { property: "Operating Temperature", value: "-30°C to +120°C" },
      { property: "Standard Conformance", value: "IS: 4253 (Part II) / ASTM F104 / BS 2F67" },
    ],
    applications: [
      "Power & Distribution Transformer Tank Covers & Flanges",
      "Automotive Crankcases, Oil Pans & Valve Covers",
      "Industrial Gas Pipeline Flanges & Fuel Pumps",
      "Electric Motor End Shields & Fluid Pumps",
    ],
    howToSpecify:
      "State contact fluid (e.g. transformer mineral oil, gasoline, diesel), maximum operating temperature, flange dimensions, and required sheet thickness.",
  },
  {
    id: "rubber-cork-rolls",
    slug: "rubber-cork-rolls",
    name: "Continuous Rubber Cork Rolls",
    category: "rubberised-cork",
    badge: "Seamless Stamping",
    image: "/images/industries-serve-images/automotive-rubber-cork-gaskets-supplier-vapi-gujarat.jpg",
    shortDescription:
      "Continuous length rubber-cork rolls offering seamless gasket fabrication, reduced scrap rates, and uniform thickness across large spans.",
    fullDescription:
      "Manufactured using continuous rotary curing technology to produce uniform, defect-free rolls in widths up to 1000 mm. Ideal for high-speed automated die-cutting, roll feeding, and stamping operations, cutting down material waste compared to sheet-based fabrication.",
    features: [
      "Continuous length eliminates intermediate dovetail joints in perimeter gaskets",
      "Precision thickness tolerance across entire roll width for uniform seal compression",
      "Highly pliable and crack-resistant during die-cutting and high-speed stamping",
      "Formulated with oil-resistant Nitrile and weather-resistant Neoprene polymers",
    ],
    specifications: [
      { property: "Roll Width", value: "Up to 1000 mm (1.0 meter)" },
      { property: "Roll Length", value: "10 meters to 25 meters continuous" },
      { property: "Thickness Range", value: "1.0 mm to 6.0 mm" },
      { property: "Polymer Matrix", value: "Nitrile (NBR) / Neoprene / SBR" },
      { property: "Elongation at Break", value: "> 40%" },
      { property: "Oil Immersion Swell (ASTM Oil No. 1)", value: "-2% to +10%" },
    ],
    applications: [
      "High-Volume Automated Die-Cut Automotive Gaskets",
      "Enclosure Weatherproofing & Electronic Cabinet Sealing",
      "Continuous Flange Strip Gaskets for Ducting & Pipe Lines",
      "Vibration Isolation Tape & Anti-Squeak Liners",
    ],
    howToSpecify:
      "Specify roll width (mm), roll length (m), thickness (mm), and desired elastomer binder based on environmental exposure.",
  },
  {
    id: "transformer-cork-gaskets",
    slug: "transformer-cork-gaskets",
    name: "Transformer Gaskets, Strips & Endless Rings",
    category: "rubberised-cork",
    badge: "Custom CNC Fabricated",
    image: "/images/industries-serve-images/industrial-cork-transformer-gaskets-manufacturer-vapi-gujarat.jpg",
    shortDescription:
      "Precision-cut transformer tank gaskets, rectangular frames with dovetail joints, and endless molded circular rings for electrical power transformers.",
    fullDescription:
      "Fabricated to exact OEM customer drawings and electrical utility specifications. Using precision CNC oscillatory knife cutters and custom vulcanized tooling, we manufacture rectangular frames with precision interlocking dovetail joints and seamless circular rings for transformer bushings and tap changers.",
    features: [
      "Hermetic sealing preventing dielectric degradation from moisture ingress or oil leaks",
      "Interlocking dovetail corner joints vulcanized or precision-machined for zero gap leakage",
      "Zero copper corrosion and zero oil discoloration under high electrical fields",
      "Proven performance in 11kV, 33kV, 132kV, and 400kV power transmission equipment",
    ],
    specifications: [
      { property: "Available Geometries", value: "Rectangular frames, circular rings, dovetail strips" },
      { property: "Joint Type", value: "Precision dovetail interlocking or endless molded" },
      { property: "Working Temperature Range", value: "-30°C to +120°C in mineral transformer oil" },
      { property: "Dielectric Safety", value: "Zero conductive contaminants, non-corrosive" },
      { property: "Custom Tooling", value: "Manufactured from CAD drawings (.DXF, .DWG, .PDF) or physical samples" },
      { property: "Standard Conformance", value: "IS: 4253 (Part II) RC70C / RC80C" },
    ],
    applications: [
      "Power & Distribution Transformer Main Tank Covers",
      "Radiator Header Flanges, Conservator Tanks & Valves",
      "High-Voltage Bushing Turrets & Tap Changer Enclosures",
      "Outdoor SF6 and Oil-Immersed Switchgear Flanges",
    ],
    howToSpecify:
      "Provide your technical CAD drawing or outline dimensions (Inner Diameter, Outer Diameter, Pitch Circle Diameter, bolt hole layout, and thickness in mm).",
  },

  // --- Category: Decorative Cork ---
  {
    id: "acoustic-cork-wall-tiles",
    slug: "acoustic-cork-wall-tiles",
    name: "Acoustic Cork Wall Tiles",
    category: "decorative-cork",
    badge: "NRC 0.25–0.45 Rating",
    image: "/images/industries-serve-images/cork-expansion-joints-construction-insulation-vapi-gujarat.jpeg",
    shortDescription:
      "Textured natural cork tiles providing superior acoustic absorption, reverberation reduction, and organic warmth for modern interiors.",
    fullDescription:
      "Engineered to resolve flutter echo and excessive reverberation in architectural spaces without compromising aesthetics. Crafted from high-density natural agglomerated cork, these modular tiles can be arranged in geometric patterns to create functional acoustic feature walls.",
    features: [
      "Significantly reduces ambient conversational reverberation and room echo",
      "Natural warm texture introduces biophilic design into corporate and residential spaces",
      "Modular square and rectangular formats allow creative tessellation and layout designs",
      "Simple surface installation using water-based contact adhesives directly on drywall",
    ],
    specifications: [
      { property: "Standard Tile Sizes", value: "300 × 300 mm / 600 × 300 mm" },
      { property: "Thickness Range", value: "3.0 mm to 12.0 mm" },
      { property: "Noise Reduction Coefficient (NRC)", value: "0.25 to 0.45 rating" },
      { property: "Surface Finish", value: "Raw sanded natural cork, matte seal, or wax coated" },
      { property: "VOC Emissions", value: "Zero harmful VOCs, hypoallergenic" },
      { property: "Edge Treatment", value: "Square edge or beveled perimeter" },
    ],
    applications: [
      "Corporate Conference Rooms & Collaborative Workspaces",
      "Recording Studios, Podcast Rooms & Home Theaters",
      "Hotel Lobbies, Executive Suites & Restaurant Dining Areas",
      "Educational Classrooms & Library Quiet Zones",
    ],
    howToSpecify:
      "Indicate required tile dimension (e.g. 300×300 mm), desired thickness (for target acoustic absorption), and total wall area in square meters.",
  },
  {
    id: "decorative-cork-panels",
    slug: "decorative-cork-panels",
    name: "Architectural Decorative Cork Panels",
    category: "decorative-cork",
    badge: "Biophilic Wall Cladding",
    image: "/images/carousel-images/sustainable-raw-cork-bark-harvesting-supplier-india-01.jpg",
    shortDescription:
      "Large-format natural cork panels with geometric, fluted, and organic bark textures for corporate offices, recording studios, and homes.",
    fullDescription:
      "Large-format wall panels combining raw virgin cork bark with dense acoustic backing. These statement panels celebrate the rich, varied topography of natural cork oak bark, creating organic accent walls with dramatic shadows and acoustic performance.",
    features: [
      "Large-format panels minimize visible seams across extensive architectural walls",
      "Unique natural variations in grain, tone, and texture ensure every installation is one-of-a-kind",
      "Excellent thermal insulation properties help regulate indoor wall temperatures",
      "100% natural, renewable, and biodegradable architectural surface material",
    ],
    specifications: [
      { property: "Standard Panel Dimensions", value: "915 × 610 mm / Custom panels up to 1200 × 600 mm" },
      { property: "Thickness Range", value: "4.0 mm to 15.0 mm" },
      { property: "Texture Profiles", value: "Fluted 3D, Virgin Bark Topography, Sanded Grain" },
      { property: "Density", value: "220 to 260 kg/m³" },
      { property: "Installation Method", value: "Polyurethane adhesive or mechanical mounting clips" },
    ],
    applications: [
      "Commercial Reception Backdrops & Boardrooms",
      "Luxury Retail Showrooms & Hospitality Feature Walls",
      "Modern Residential Living Areas & Headboards",
      "Acoustic Wall Cladding for Auditoriums",
    ],
    howToSpecify:
      "Specify panel dimensions, surface texture preference, and wall area requirements.",
  },
  {
    id: "bulletin-board-cork",
    slug: "bulletin-board-cork",
    name: "Bulletin Board & Pinning Cork Sheets",
    category: "decorative-cork",
    badge: "Self-Healing Surface",
    image: "/images/carousel-images/industrial-cork-granules-processing-manufacturer-vapi-gujarat-01.jpg",
    shortDescription:
      "Self-healing fine-grain agglomerated cork rolls and sheets designed for architectural bulletin boards and notice displays.",
    fullDescription:
      "Specially formulated with resilient fine-grain cork particles that maintain high surface elasticity. When pushpins, map tacks, or staples are removed, the surrounding cellular cork structure rebounds immediately, keeping the board looking pristine through years of intensive use.",
    features: [
      "Immediate self-healing puncture recovery leaves no unsightly pinholes or crumbling",
      "High flexibility permits wrapping around curved edges without surface cracking",
      "Supplied in large continuous rolls for wall-to-wall architectural pinning surfaces",
      "Resistant to drying out, cracking, or crumbling in climate-controlled environments",
    ],
    specifications: [
      { property: "Standard Sheet Dimensions", value: "915 × 610 mm / Continuous rolls up to 10m" },
      { property: "Thickness Range", value: "2.0 mm to 10.0 mm (6.0 mm standard for pins)" },
      { property: "Granule Grade", value: "Fine-grain agglomerate (0.5 mm to 1.5 mm)" },
      { property: "Surface Resilience", value: "High elastic rebound after pin puncture" },
      { property: "Backing Compatibility", value: "Easily bonded to MDF, plywood, or drywall" },
    ],
    applications: [
      "Educational Notice Boards & University Lecture Halls",
      "Design Studio Pinup Walls & Mood Board Surfaces",
      "Corporate Office Notice Boards & Project War Rooms",
      "Home Office Organizing & Task Management Displays",
    ],
    howToSpecify:
      "Specify sheet size or roll length, required thickness (6mm recommended for standard pushpins), and substrate backing requirements.",
  },

  // --- Category: Cork Gifts ---
  {
    id: "cork-desk-accessories",
    slug: "cork-desk-accessories",
    name: "Cork Desk Organizers & Office Accessories",
    category: "cork-gifts",
    badge: "Ergonomic & Sustainable",
    image: "/images/industries-serve-images/orthopedic-cork-shoe-soles-footwear-manufacturer-vapi-gujarat.jpeg",
    shortDescription:
      "Sustainable desk pads, mousepads, pen holders, and docking trays crafted from fine-grain natural cork.",
    fullDescription:
      "Elevate modern workspaces with sustainable desktop accessories that replace synthetic plastics with natural cork. Each piece offers a warm, tactile feel that is naturally non-slip, anti-static, and water-repellent, ideal for laptop setups and executive desks.",
    features: [
      "Silky-smooth, water-resistant surface compatible with optical and laser computer mice",
      "Naturally non-slip underside stays firmly positioned on glass, wood, and metal desks",
      "Supports precision corporate branding via laser engraving, debossing, or screen printing",
      "Crafted with rounded beveled edges and durable perimeter stitching or edge sealing",
    ],
    specifications: [
      { property: "Available Items", value: "Desk mats, mousepads, pen stands, valet trays" },
      { property: "Standard Desk Mat Sizes", value: "800 × 400 mm / 900 × 450 mm / Custom" },
      { property: "Thickness", value: "2.5 mm to 4.0 mm" },
      { property: "Branding Methods", value: "Laser engraving, foil debossing, UV color printing" },
      { property: "Packaging", value: "Eco-friendly kraft presentation box or roll tube" },
    ],
    applications: [
      "Corporate Employee Onboarding Welcome Kits",
      "Sustainable Executive Desktop Upgrades",
      "Tech Company Conference Giveaways & PR Kits",
      "Retail Lifestyle & Co-working Space Merchandise",
    ],
    howToSpecify:
      "Specify item type, dimensions, corporate branding artwork file, batch quantity, and packaging preferences.",
  },
  {
    id: "cork-lifestyle-gifts",
    slug: "cork-lifestyle-gifts",
    name: "Eco-Friendly Lifestyle Cork Gifts",
    category: "cork-gifts",
    badge: "Premium Corporate Gifting",
    image: "/images/industries-serve-images/marine-shipbuilding-cork-decking-gaskets-india.jpg",
    shortDescription:
      "Corporate drinkware sleeves, coasters, notebooks, and travel accessories manufactured from 100% natural renewable cork.",
    fullDescription:
      "A distinctive collection of everyday lifestyle goods crafted from soft, flexible cork fabric and solid cork composites. These premium products demonstrate authentic environmental responsibility, making them highly prized by recipients at corporate events, shareholder meetings, and conferences.",
    features: [
      "Naturally water-repellent and thermal-insulating, protecting surfaces from hot beverage rings",
      "Flexible cork fabric resists creasing, tearing, and surface abrasions",
      "Elegant natural texture conveys sophistication and conscious brand leadership",
      "Custom branded with laser etched corporate logos and personalized recipient names",
    ],
    specifications: [
      { property: "Product Range", value: "Coaster sets, notebook journals, passport sleeves, travel tags" },
      { property: "Material Construction", value: "Natural cork fabric bonded to vegan substrate" },
      { property: "Branding Capabilities", value: "Laser engraving, heat debossing, metallic foil stamping" },
      { property: "Minimum Order Volume", value: "OEM batch orders starting from 100 units" },
      { property: "Packaging Options", value: "Custom branded unbleached kraft gift boxes" },
    ],
    applications: [
      "Annual Shareholder Meeting & Corporate Milestone Gifts",
      "Hospitality Coasters & Hotel Room Accessories",
      "Brand Ambassador Welcome Packages & Event Swag",
      "Eco-Conscious Retail & Museum Gift Stores",
    ],
    howToSpecify:
      "Select desired gift categories, supply vector logo artwork, and indicate order quantity and delivery timeline.",
  },
  {
    id: "custom-promotional-cork",
    slug: "custom-promotional-cork",
    name: "Custom OEM Corporate Cork Merchandise",
    category: "cork-gifts",
    badge: "Bespoke OEM Fabrication",
    image: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    shortDescription:
      "Custom-manufactured cork promotional products tailored to corporate brand specifications and geometric designs.",
    fullDescription:
      "For brands seeking unique promotional products, our engineering and fabrication team turns custom concepts into production reality. We handle custom CNC shape cutting, molded 3D cork forms, multi-color UV printing, and custom eco-packaging from our facility in Vapi, Gujarat.",
    features: [
      "End-to-end OEM product development from initial sketch to production delivery",
      "Precision CNC profile cutting creates custom geometric shapes and corporate silhouettes",
      "Multi-color UV direct print delivers vibrant brand color reproduction",
      "Physical pre-production prototypes provided for executive approval prior to bulk runs",
    ],
    specifications: [
      { property: "Manufacturing Capabilities", value: "CNC contour cutting, compression molding, UV print, deboss" },
      { property: "Material Grades", value: "Fine-grain agglomerate, cork-rubber composites, cork fabric" },
      { property: "Sample Turnaround", value: "3 to 5 business days for prototypes" },
      { property: "Production Capacity", value: "Scalable from 250 units to 50,000+ units" },
      { property: "Quality Control", value: "100% visual inspection and dimensional verification" },
    ],
    applications: [
      "Custom Shape Promotional Giveaways & Keychains",
      "Specialty Packaging Inserts & Cork Bottle Closures",
      "Bespoke Consumer Product Housings & Cork Bases",
      "International Exhibition & Trade Show Merchandise",
    ],
    howToSpecify:
      "Provide your vector product concept drawing (.AI, .PDF, .DXF), target dimensions, branding requirements, and projected quantity.",
  },
];

// Helper Functions
export function getProductByCategory(categoryId) {
  if (!categoryId || categoryId === "all") return PRODUCTS;
  return PRODUCTS.filter((p) => p.category === categoryId);
}

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getCategoryBySlug(slug) {
  return CATEGORY_DETAILS[slug] || null;
}
