interface SquircleOptionalParams {
    /**
     * How long the curve should be, expressed as a fraction of the shortest side. Minimum zero,
     * maximum 0.5.
     *
     * In SVG, affects the position of the point where the curve begins.
     */
    curveLength?: number;
    /**
     * How tightly the curve should take the corner, expressed as a fraction of the `curveLength`.
     * Positive numbers mean sharper, negative numbers mean smoother. Minimum -1, maximum 1. Values
     * above 0.3 usually result in right angles.
     *
     * In SVG, affects the length of the curve's control handle.
     */
    curveSharpness?: number;
    /**
     * Spec for the background. Pass a color string for a solid background, or an angle and an array
     * of stops for a linear gradient.
     */
    svgBackground?: string | {
        /** Angle of the gradient in degrees. */
        gradientAngle?: number;
        stops: {
            /** Percentage number. */
            stopOffset: number;
            /** Color string. */
            gradientColor: string;
        }[];
    };
    /** Stroke color string. */
    svgStroke?: string;
    /** Width of the stroke in pixels. */
    svgStrokeWidth?: number;
}
interface SquircleParams extends SquircleOptionalParams {
    /** Width of the background in pixels. */
    bgWidth: number;
    /** Height of the background in pixels. */
    bgHeight: number;
}
type ClipSquircler = (params: Omit<SquircleParams, "svgBackground" | "svgStroke" | "svgStrokeWidth">) => `path('${string}')`;
type BackgroundSquircler = (params: SquircleParams) => `url("data:image/svg+xml,${string}") left top no-repeat`;
/**
 * To get a constant curve length, supply the result of this function to the `curveLength` parameter
 * of either of the squircle functions. This is subject to the minimum and maximum lengths that stop
 * the SVG from going wonky.
 *
 * This length is defined in pixels, but bear in mind the length of the squircle's curve is visually
 * quite different to `border-radius` from CSS, which you might be more used to.
 */
export declare const getConstantCurveLength: (pixelLength: number, width: number, height: number) => number;
export declare const newSquirclers: ({ curveLength: defaultCurveLength, curveSharpness: defaultCurveSharpness, svgBackground: defaultSvgBackground, svgStroke: defaultSvgStroke, svgStrokeWidth: defaultSvgStrokeWidth }?: SquircleOptionalParams) => [ClipSquircler, BackgroundSquircler];
export declare const clipSquircle: ClipSquircler, bgSquircle: BackgroundSquircler;
export {};
