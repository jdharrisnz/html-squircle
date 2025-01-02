import type { Types } from "../types.js";
type RequiredNullableOptionsSVG = {
    -readonly [K in keyof Types.SquircleOptionsBackground]-?: Types.SquircleOptionsBackground[K] | undefined;
};
/**
 * Returns a new object with all SVG options, filled by the input, ordered, and
 * restricted only to SVG options. Default value undefined.
 */
export declare const pickOptions: (input: Types.SquircleOptionsClip) => Readonly<RequiredNullableOptionsSVG>;
export {};
//# sourceMappingURL=pickOptions.d.ts.map