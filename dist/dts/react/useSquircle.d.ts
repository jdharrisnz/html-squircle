import type { RefObject } from "react";
import type { backgroundSquircleObj } from "../core/backgroundSquircle.js";
import type { clipSquircleObj } from "../core/clipSquircle.js";
import type { Types } from "../types.js";
/**
 * Pass a ref for the observed element and options for the squircle computation
 * function. The returned type will depend on the options used.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export declare function useSquircle(ref: RefObject<Element | null>, options?: Types.SquircleOptionsClipReact): ReturnType<typeof clipSquircleObj>;
/**
 * Pass a ref for the observed element and options for the squircle computation
 * function. The returned type will depend on the options used.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export declare function useSquircle(ref: RefObject<Element | null>, options?: Types.SquircleOptionsBackgroundReact): ReturnType<typeof backgroundSquircleObj>;
//# sourceMappingURL=useSquircle.d.ts.map