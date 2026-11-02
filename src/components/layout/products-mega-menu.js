"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const OPEN_DELAY_MS = 120; // 100–150ms opening delay to prevent accidental activation
const CLOSE_DELAY_MS = 300; // 250–350ms closing delay when cursor leaves navigation area

/**
 * Redesigned 2-column × 2-row mega menu for Products navigation.
 * Features intentional hover delays, accessible keyboard navigation,
 * touch screen compatibility, and Framer Motion transitions.
 */
export function ProductsMegaMenu({ item, isActive }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const containerRef = useRef(null);
  const triggerRef = useRef(null);
  const openTimerRef = useRef(null);
  const closeTimerRef = useRef(null);

  // Clear timers helper
  const clearOpenTimer = useCallback(() => {
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  // Hover enter: cancel close timer immediately; open after delay
  const handleMouseEnter = useCallback(() => {
    clearCloseTimer();
    if (isOpen) return;

    openTimerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, OPEN_DELAY_MS);
  }, [clearCloseTimer, isOpen]);

  // Hover leave: cancel open timer; close after delay
  const handleMouseLeave = useCallback(() => {
    clearOpenTimer();
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, CLOSE_DELAY_MS);
  }, [clearOpenTimer]);

  // Touch & click interaction
  const handleTriggerClick = (e) => {
    const isTouch =
      e.nativeEvent?.pointerType === "touch" ||
      (typeof window !== "undefined" &&
        "ontouchstart" in window &&
        window.matchMedia("(pointer: coarse)").matches);

    // On touch devices: first tap opens the menu, second tap navigates
    if (isTouch && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "Escape" && isOpen) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(false);
      triggerRef.current?.focus();
    } else if (e.key === "ArrowDown" && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  // Close when focus moves outside container
  const handleBlur = (e) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.relatedTarget)
    ) {
      setIsOpen(false);
    }
  };

  // Close when clicking outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Close dropdown on route change
  useEffect(() => {
    setIsOpen(false);
    clearOpenTimer();
    clearCloseTimer();
  }, [pathname, clearOpenTimer, clearCloseTimer]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearOpenTimer();
      clearCloseTimer();
    };
  }, [clearOpenTimer, clearCloseTimer]);

  const motionVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 6,
      scale: shouldReduceMotion ? 1 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.16,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 4,
      scale: shouldReduceMotion ? 1 : 0.985,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.12,
        ease: "easeOut",
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={handleKeyDown}
      onBlur={handleBlur}
    >
      {/* Trigger Link */}
      <Link
        ref={triggerRef}
        href={item.href}
        onClick={handleTriggerClick}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="products-mega-menu"
        className={cn(
          "flex items-center gap-1 rounded-full px-3.5 py-1.5 text-xs font-medium tracking-wide transition-all duration-150 sm:text-sm",
          isActive
            ? "bg-maroon/5 text-maroon font-semibold"
            : "text-ink/80 hover:bg-field hover:text-maroon"
        )}
      >
        <span>{item.label}</span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen ? "rotate-180 text-maroon" : "text-muted"
          )}
          aria-hidden="true"
        />
      </Link>

      {/* 2-Column × 2-Row Mega Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="products-mega-menu"
            variants={motionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-[-30px] lg:left-1/2 lg:-translate-x-1/2 pt-2.5 z-50 w-[420px] sm:w-[460px] max-w-[calc(100vw-2rem)]"
          >
            <div className="overflow-hidden rounded-2xl border border-line bg-white/98 p-2.5 shadow-xl shadow-ink/10 backdrop-blur-md">
              {/* 2×2 CSS Grid */}
              <div
                className="grid grid-cols-2 gap-2"
                style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}
                role="menu"
                aria-label="Product categories"
              >
                {item.children.map((child) => (
                  <Link
                    key={child.label}
                    href={child.href}
                    role="menuitem"
                    onClick={() => setIsOpen(false)}
                    className="group relative flex items-center justify-between rounded-xl border border-line/70 bg-white px-3.5 py-3 transition-all duration-150 hover:border-maroon/30 hover:bg-field hover:shadow-xs focus-visible:outline-2 focus-visible:outline-maroon"
                  >
                    <span className="text-xs sm:text-sm font-semibold tracking-tight text-ink transition-colors duration-150 group-hover:text-maroon">
                      {child.label}
                    </span>
                    <ChevronRight
                      className="size-3.5 shrink-0 text-muted/50 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-maroon ml-2"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
