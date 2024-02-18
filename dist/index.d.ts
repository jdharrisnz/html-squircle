interface SquircleOptionalParams {
    /**
     * How long the curve should be, expressed as a fraction of the shortest side. Minimum zero,
     * maximum 0.5.
     */
    curveLength?: number;
    /**
     * How tightly the curve should take the corner, expressed as a fraction of the `curveLength`.
     * Positive numbers mean sharper, negative numbers mean smoother.
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
export declare const newSquirclers: ({ curveLength: defaultCurveLength, curveSharpness: defaultCurveSharpness, svgBackground: defaultSvgBackground, svgStroke: defaultSvgStroke, svgStrokeWidth: defaultSvgStrokeWidth }?: SquircleOptionalParams) => [ClipSquircler, BackgroundSquircler];
export declare const clipSquircle: ClipSquircler, bgSquircle: BackgroundSquircler;
export {};
