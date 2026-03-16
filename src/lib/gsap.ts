'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Hook: Fade-up reveal on scroll.
 * Attach the returned ref to any element you want to animate in.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   return <div ref={ref}>Content</div>
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
  }
) {
  const ref = useRef<T>(null);
  const { y = 40, duration = 0.8, delay = 0, start = 'top 85%' } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start,
      onEnter: () => {
        gsap.to(el, { opacity: 1, y: 0, duration, delay, ease: 'power2.out' });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [y, duration, delay, start]);

  return ref;
}

/**
 * Hook: Staggered reveal for a group of children.
 * Attach the returned ref to the PARENT container.
 * Children should have a shared selector (default: '[data-reveal]').
 *
 * Usage:
 *   const ref = useStaggerReveal();
 *   return (
 *     <div ref={ref}>
 *       <div data-reveal>Item 1</div>
 *       <div data-reveal>Item 2</div>
 *       <div data-reveal>Item 3</div>
 *     </div>
 *   )
 */
export function useStaggerReveal<T extends HTMLElement = HTMLDivElement>(
  options?: {
    selector?: string;
    stagger?: number;
    y?: number;
    duration?: number;
    start?: string;
  }
) {
  const ref = useRef<T>(null);
  const {
    selector = '[data-reveal]',
    stagger = 0.12,
    y = 30,
    duration = 0.6,
    start = 'top 85%',
  } = options ?? {};

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const children = container.querySelectorAll(selector);
    if (!children.length) return;

    gsap.set(children, { opacity: 0, y });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease: 'power2.out',
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [selector, stagger, y, duration, start]);

  return ref;
}

/**
 * Hook: Card hover lift effect (used on lot cards).
 * Returns ref + event handlers.
 *
 * Usage:
 *   const { ref, onMouseEnter, onMouseLeave } = useHoverLift();
 *   return <div ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>...</div>
 */
export function useHoverLift<T extends HTMLElement = HTMLDivElement>(
  options?: {
    y?: number;
    duration?: number;
    childSelector?: string; // optional child to fade in on hover
  }
) {
  const ref = useRef<T>(null);
  const { y = -12, duration = 0.4, childSelector } = options ?? {};

  const onMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { y, duration, ease: 'power2.out' });
    if (childSelector) {
      const child = el.querySelector(childSelector);
      if (child) {
        gsap.to(child, { opacity: 1, y: 0, duration: 0.3, delay: 0.1, ease: 'power2.out' });
      }
    }
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { y: 0, duration, ease: 'power2.out' });
    if (childSelector) {
      const child = el.querySelector(childSelector);
      if (child) {
        gsap.to(child, { opacity: 0, y: 10, duration: 0.2, ease: 'power2.in' });
      }
    }
  };

  return { ref, onMouseEnter, onMouseLeave };
}

/**
 * Hook: Floating header logo — shrinks on scroll.
 * Attach ref to the logo element.
 */
export function useFloatingLogo<T extends HTMLElement = HTMLDivElement>(
  options?: {
    scrollThreshold?: number;
    scaleFrom?: number;
    scaleTo?: number;
  }
) {
  const ref = useRef<T>(null);
  const { scrollThreshold = 100, scaleFrom = 1, scaleTo = 0.7 } = options ?? {};

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: scrollThreshold,
      onUpdate: (self) => {
        const progress = self.progress;
        const scale = gsap.utils.interpolate(scaleFrom, scaleTo, progress);
        gsap.set(el, { scale });
      },
    });

    return () => trigger.kill();
  }, [scrollThreshold, scaleFrom, scaleTo]);

  return ref;
}

// Re-export for convenience
export { gsap, ScrollTrigger };
