import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const PRODUCT_CAPABILITIES = [
  {
    title: "Transformer & Switchgear Sealing",
    category: "Rubberised Cork Sheets & Frames",
    description:
      "Engineered rubber cork sheets, endless rectangular frames, and precision strips formulated specifically for hot dielectric transformer oil resistance and high-voltage switchgear flange containment.",
    image: "/images/industries-serve-images/industrial-cork-transformer-gaskets-manufacturer-vapi-gujarat.jpg",
    alt: "Industrial rubber cork transformer gasket sheets and endless frames",
    applications: "Transformers • Switchgear • High-voltage bushings • Tank covers",
    href: "/products#rubber-cork",
  },
  {
    title: "Automotive & Industrial Gaskets",
    category: "Clutch Plates & Precision Components",
    description:
      "High-friction clutch plate materials, automotive engine gaskets, and custom die-cut components engineered to withstand sustained mechanical vibration, petroleum fuels, and lubricating oils.",
    image: "/images/industries-serve-images/automotive-rubber-cork-gaskets-supplier-vapi-gujarat.jpg",
    alt: "Automotive rubber cork clutch plates and cut gasket components",
    applications: "Clutch plates • Automotive gaskets • Strips & seals • Flanges",
    href: "/products#gaskets",
  },
  {
    title: "Heavy Machinery Slabs & Packaging Closures",
    category: "Foundation Slabs & PP Cap Wads",
    description:
      "High-density cork slabs engineered for structural vibration isolation under heavy generators and industrial machinery, alongside precision cork sheets for PP cap wads and bottle caps.",
    image: "/images/carousel-images/custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg",
    alt: "Generator foundation cork slabs and molded cork components",
    applications: "Generator foundation slabs • Heavy machinery • PP cap wads • Bottle caps",
    href: "/products#foundation-slabs",
  },
];

export function AboutWhatWeDo() {
  return (
    <section className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              What We Do
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Engineered material grades for critical applications
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              United Rubber Cork offers diverse grades of cork sheets and rubberised cork products, manufactured to exact customer specifications for sealing, damping, and packaging.
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-maroon hover:text-maroon-deep group"
          >
            <span>View complete catalogue</span>
            <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 3 Visual Product Highlights */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {PRODUCT_CAPABILITIES.map((product) => (
            <div
              key={product.title}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-page/40 p-3 transition-all duration-300 hover:border-maroon/30 hover:bg-white hover:shadow-xs"
            >
              <div>
                <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-field sm:aspect-16/9">
                  <Image
                    src={product.image}
                    alt={product.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-ink shadow-xs backdrop-blur-xs">
                    {product.category}
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <h3 className="text-lg font-semibold text-ink sm:text-xl">
                    {product.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                    {product.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-line">
                    <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                      Applications
                    </span>
                    <span className="mt-1 block text-xs font-medium text-ink">
                      {product.applications}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link
                  href={product.href}
                  className="inline-flex w-full items-center justify-between rounded-xl border border-line bg-white px-4 py-2.5 text-xs font-semibold text-maroon transition-colors hover:border-maroon hover:bg-maroon hover:text-white"
                >
                  <span>Explore specifications</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

