"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { UseInViewOptions } from "framer-motion";

type Margin = NonNullable<UseInViewOptions["margin"]>;

/**
 * Scroll-triggered reveal state with a hard safety net.
 *
 * Behaves like `whileInView` in the common case (content fades/slides in
 * once it scrolls into view), but if the IntersectionObserver-driven
 * `useInView` hook never fires for any reason, `visible` still flips to
 * `true` after `fallbackMs`. This guarantees content can never be stuck
 * permanently invisible — a broken trigger degrades to "no animation"
 * instead of "missing section".
 */
export function useReveal(margin: Margin = "-100px", fallbackMs = 1200) {
  const ref = useRef<any>(null);
  const inView = useInView(ref, { once: true, margin });
  const [forceVisible, setForceVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setForceVisible(true), fallbackMs);
    return () => clearTimeout(timer);
  }, [fallbackMs]);

  return { ref, visible: inView || forceVisible };
}
