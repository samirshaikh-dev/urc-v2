"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import { INDUSTRIES } from "@/data/industries";
import { Container } from "@/components/ui/container";

export function IndustrySlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
    setPrevBtnDisabled(!api.canScrollPrev());
    setNextBtnDisabled(!api.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="border-t border-line bg-white py-16 sm:py-24">
      <Container>
        {/* Header with Navigation Controls */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-ink">
              Applications & Sectors
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-ink sm:text-3xl lg:text-4xl">
              Where our materials solve critical sealing challenges
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
              Engineered for demanding equipment subject to continuous vibration, high temperatures, and hot oil exposure.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollPrev}
              disabled={prevBtnDisabled}
              aria-label="Previous slide"
              className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-maroon hover:text-maroon disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={scrollNext}
              disabled={nextBtnDisabled}
              aria-label="Next slide"
              className="flex size-10 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-maroon hover:text-maroon disabled:opacity-40 disabled:hover:border-line disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* Embla Carousel Viewport */}
        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 touch-pan-y">
            {INDUSTRIES.map((ind) => (
              <div
                key={ind.id}
                className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]"
              >
                <div className="group flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-line bg-page/40 transition-all duration-200 hover:border-maroon/30 hover:bg-white hover:shadow-xs">
                  <div>
                    {/* Industry Image */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-field">
                      <Image
                        src={ind.image}
                        alt={ind.title}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-maroon shadow-2xs backdrop-blur-xs">
                          {ind.tagline}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-semibold tracking-tight text-ink group-hover:text-maroon transition-colors">
                        {ind.title}
                      </h3>

                      <p className="mt-2.5 text-xs leading-relaxed text-muted sm:text-sm">
                        {ind.description}
                      </p>

                      {/* Critical Requirement */}
                      <div className="mt-4 rounded-xl border border-line/60 bg-white p-3 text-[11px] leading-tight text-ink/80">
                        <span className="font-semibold text-maroon">Key Requirement:</span>{" "}
                        {ind.keyRequirement}
                      </div>

                      {/* Typical Components */}
                      <div className="mt-4">
                        <span className="text-[11px] font-semibold text-muted uppercase tracking-wider">
                          Typical Components:
                        </span>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {ind.typicalComponents.map((comp) => (
                            <span
                              key={comp}
                              className="rounded-full bg-page border border-line px-2.5 py-0.5 text-[11px] text-ink/80"
                            >
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-line/70 bg-white px-6 py-3.5 text-right">
                    <a
                      href="#quote"
                      className="text-xs font-semibold text-maroon hover:underline"
                    >
                      Discuss application requirements →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="mt-8 flex justify-center gap-1.5">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`size-2.5 rounded-full transition-all duration-200 cursor-pointer ${
                index === selectedIndex
                  ? "w-8 bg-maroon"
                  : "bg-line hover:bg-muted/50"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
