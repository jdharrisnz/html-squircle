import type { Types } from "../types.js";
/** Produces a squircle path to be used in `background-clip` inline styles. */
export declare const clipSquircle: ({ width, height, curveLength, roundness, }: Types.SquircleOptionsClip) => `path('${string}')`;
/** Same as {@link clipSquircle}, but wrapped in an object. */
export declare const clipSquircleObj: (options: Types.SquircleOptionsClip) => {
    readonly clipPath: ReturnType<typeof clipSquircle>;
};
//# sourceMappingURL=clipSquircle.d.ts.map