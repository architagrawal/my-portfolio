"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/* prefers-reduced-motion, hydration safe. framer-motion's useReducedMotion reads the media
   query on the client's first render, so the client's first markup differs from the server's
   and React throws the whole tree away (taking <html data-scene> with it). This reports false
   for the server render and the hydration pass, then the real value. */
export function useReduce(): boolean {
  return useSyncExternalStore(subscribe, () => window.matchMedia(QUERY).matches, () => false);
}
