// src/lib/motion.js  (shared framer-motion variants)

export const ease = [0.22, 1, 0.36, 1];

// parent: reveals its children one after another
export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

// child: slides up while fading in
export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

// hover lift for cards
export const lift = { y: -4, transition: { type: "spring", stiffness: 400, damping: 30 } };

// animate once when scrolled into view
export const inView = { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.2 } };
