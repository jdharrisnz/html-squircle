import { backgroundSquircleObj } from "./backgroundSquircle.js";
import { clipSquircleObj } from "./clipSquircle.js";
import type { Types } from "../types.js";
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export declare function eitherSquircleObj(options: Types.SquircleOptionsClip): ReturnType<typeof clipSquircleObj>;
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export declare function eitherSquircleObj(options: Types.SquircleOptionsBackground): ReturnType<typeof backgroundSquircleObj>;
//# sourceMappingURL=eitherSquircle.d.ts.map