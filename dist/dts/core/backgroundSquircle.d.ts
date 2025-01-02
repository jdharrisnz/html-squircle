import type { Types } from "../types.js";
/** Produces a URI-encoded squircle SVG to be used in `background` inline styles. */
export declare const backgroundSquircle: ({ width, height, curveLength, roundness, stroke, strokeWidth, background, injectedDefs, injectedBody, }: Types.SquircleOptionsBackground) => `url("data:image/svg+xml,${string}") left top no-repeat`;
/** Same as {@link backgroundSquircle}, but wrapped in an object. */
export declare const backgroundSquircleObj: (options: Types.SquircleOptionsBackground) => {
    readonly background: ReturnType<typeof backgroundSquircle>;
};
//# sourceMappingURL=backgroundSquircle.d.ts.map