import { backgroundSquircleObj } from "../core/backgroundSquircle.js";
import type { RefObject } from "react";
import type { Types } from "../types.js";
/**
 * Pass a ref for the observed element and options for the squircle computation
 * function.
 *
 * Note this will NOT work properly if you apply the style to an element your
 * component manages which may leave the DOM without your component unmounting.
 * Apply it only to elements which will be rendered unconditionally with your
 * component.
 */
export declare const useBackgroundSquircle: (ref: RefObject<Element | null>, options?: Types.SquircleOptionsBackgroundReact) => ReturnType<typeof backgroundSquircleObj>;
//# sourceMappingURL=useBackgroundSquircle.d.ts.map