import { backgroundSquircle, backgroundSquircleObj } from "./backgroundSquircle.js";
import { clipSquircle, clipSquircleObj } from "./clipSquircle.js";
import type { Types } from "../types.js";
/**
 * Overloaded function for getting either the background or clip squircle
 * strings. Returns a result based on whether any background options are present
 * in the options object.
 */
export declare function eitherSquircle(options: Types.SquircleOptionsBackground): ReturnType<typeof backgroundSquircle>;
export declare function eitherSquircle(options: Types.SquircleOptionsClip): ReturnType<typeof clipSquircle>;
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export declare function eitherSquircleObj(options: Types.SquircleOptionsBackground): ReturnType<typeof backgroundSquircleObj>;
export declare function eitherSquircleObj(options: Types.SquircleOptionsClip): ReturnType<typeof clipSquircleObj>;
//# sourceMappingURL=eitherSquircle.d.ts.map