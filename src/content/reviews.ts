import { Review } from "@/lib/types";

/**
 * GUEST REVIEWS CONTENT
 * 
 * In strict compliance with business guidelines and positioning rules:
 * - We never display invented statistics, placeholder names, or fake reviews.
 * - This array is initialized empty.
 * - When empty, any component consuming this list (such as the Home Reviews Section)
 *   will automatically hide itself and render nothing in the DOM.
 * - When real, verified client testimonials are received, add them to this typed array.
 */
export const reviews: Review[] = [];
