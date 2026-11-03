export const PRODUCT_NAV_ITEMS = [
  {
    label: "Cork Products",
    href: "/products/cork-products",
    description: "Pure natural cork sheets, rolls, blocks, and graded industrial granules",
  },
  {
    label: "Rubberised Cork Products",
    href: "/products/rubberised-cork",
    description: "High-recovery sheets, transformer gaskets, continuous rolls, and endless rings",
  },
  {
    label: "Decorative Cork",
    href: "/products/decorative-cork",
    description: "Acoustic wall tiles, architectural decorative panels, and bulletin cork",
  },
  {
    label: "Cork Gifts",
    href: "/products/cork-gifts",
    description: "Customized sustainable corporate gifts and desktop lifestyle accessories",
  },
];

export const MAIN_NAV = [
  { label: "Home", href: "/" },
  {
    label: "Products",
    href: "/products",
    children: PRODUCT_NAV_ITEMS,
  },
  { label: "Industries", href: "/industries" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  products: [
    { label: "Cork Products", href: "/products/cork-products" },
    { label: "Rubberised Cork Products", href: "/products/rubberised-cork" },
    { label: "Decorative Cork", href: "/products/decorative-cork" },
    { label: "Cork Gifts", href: "/products/cork-gifts" },
  ],
  industries: [
    { label: "Transformers & Switchgear", href: "/industries#electrical" },
    { label: "Automotive & Engines", href: "/industries#automotive" },
    { label: "Railways & Transit", href: "/industries#railway" },
    { label: "Aerospace & Defense", href: "/industries#aerospace" },
    { label: "Marine & Shipbuilding", href: "/industries#marine" },
    { label: "Construction & Expansion", href: "/industries#construction" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Industries Overview", href: "/industries" },
    { label: "Contact & Location", href: "/contact" },
    { label: "Request a Quote", href: "/contact#enquiry-form" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-and-conditions" },
  ],
};
