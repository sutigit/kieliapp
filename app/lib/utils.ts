import { RefObject } from "react";
import { ScrollView } from "react-native";

export const smoothScrollTo = (
  scrollRef: RefObject<ScrollView | null>,
  targetY: number
) => {
  const startTime = Date.now();
  const startY = 0; // Start from 0 or you can use a state to track current scroll position
  const duration = 1000;

  const scrollStep = () => {
    const now = Date.now();
    const elapsed = now - startTime;

    /**
     *
     * Elapsed / duration gives us a normalized value from 0 to 1, representing how far along we are in the animation.
     * progress = 0, animation started
     * progress = 1, animation finished
     */
    const progress = Math.min(elapsed / duration, 1);

    /**
     * ease-in-out-quad math funciton. No need to understand.
     */
    const easeInOutQuad =
      progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

    /**
     * Scroll to new position
     */
    const currentY = startY + (targetY - startY) * easeInOutQuad;
    scrollRef.current?.scrollTo({ y: currentY, animated: false });

    /**
     * Keep animating until done.
     * Termination condition
     */
    if (progress < 1) {
      requestAnimationFrame(scrollStep);
    }
  };

  requestAnimationFrame(scrollStep);
};
