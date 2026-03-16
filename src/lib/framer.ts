'use client';

/**
 * Framer Motion presets for Coffee Five.
 *
 * USE FRAMER MOTION FOR:
 * - Component mount/unmount transitions (modals, drawers, dropdowns)
 * - Layout animations (cart item add/remove, filter transitions)
 * - Route transitions (page enter/exit)
 * - Carousel slide transitions
 * - Shared layout animations (product card → product page)
 *
 * USE GSAP FOR:
 * - Scroll-triggered reveals
 * - Hover effects with timeline control
 * - Floating logo on scroll
 * - Any animation tied to scroll position
 */

import { type Variants, type Transition } from 'framer-motion';

// ─── Transitions ────────────────────────────────────────────────

export const springSmooth: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 400,
  damping: 25,
};

export const easeFade: Transition = {
  duration: 0.3,
  ease: [0.25, 0.1, 0.25, 1],
};

export const easeSmooth: Transition = {
  duration: 0.5,
  ease: [0.25, 0.1, 0.25, 1],
};

// ─── Variant Presets ────────────────────────────────────────────

/** Fade in/out — for modals, overlays, dropdowns */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Slide up from bottom — for drawers, toasts */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

/** Slide in from right — for cart drawer, side panels */
export const slideRightVariants: Variants = {
  hidden: { x: '100%' },
  visible: { x: 0 },
  exit: { x: '100%' },
};

/** Scale up — for modals, image lightbox */
export const scaleVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/** Carousel slide — horizontal transition between slides */
export const carouselVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
  }),
};

/** Stagger children — for lists, grids */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

/** Mobile nav overlay */
export const mobileNavVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
  exit: { opacity: 0, y: -10 },
};

export const mobileNavItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 },
};

// ─── Usage Examples ─────────────────────────────────────────────
//
// Cart Drawer:
//   <AnimatePresence>
//     {isOpen && (
//       <motion.div
//         variants={slideRightVariants}
//         initial="hidden"
//         animate="visible"
//         exit="exit"
//         transition={springSmooth}
//       >
//         ...cart contents
//       </motion.div>
//     )}
//   </AnimatePresence>
//
// Carousel:
//   <AnimatePresence custom={direction} mode="wait">
//     <motion.div
//       key={currentSlide}
//       custom={direction}
//       variants={carouselVariants}
//       initial="enter"
//       animate="center"
//       exit="exit"
//       transition={easeSmooth}
//     >
//       {slides[currentSlide]}
//     </motion.div>
//   </AnimatePresence>
//
// Mobile Nav:
//   <AnimatePresence>
//     {menuOpen && (
//       <motion.nav variants={mobileNavVariants} initial="hidden" animate="visible" exit="exit">
//         {links.map(link => (
//           <motion.a key={link.href} variants={mobileNavItem}>{link.label}</motion.a>
//         ))}
//       </motion.nav>
//     )}
//   </AnimatePresence>
