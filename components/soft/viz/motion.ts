/* Shared reveal props: fade or draw once in view; reduced motion starts at the end state */
const viewport = { once: true, margin: "-40px" } as const;

export const fade = (reduce: boolean | null, delay = 0) => ({
  initial: reduce ? false : { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport,
  transition: { duration: 0.5, delay: reduce ? 0 : delay },
});

export const draw = (reduce: boolean | null, delay = 0, duration = 1) => ({
  initial: reduce ? false : { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport,
  transition: { duration, delay: reduce ? 0 : delay, ease: "easeInOut" },
});

export const W = 320;
