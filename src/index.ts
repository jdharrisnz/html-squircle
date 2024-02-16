/* eslint-disable typescript-sort-keys/interface */
interface SquircleOptionalParams {
    /**
     * How long the curve should be, expressed as a fraction of the shortest side. Minimum zero,
     * maximum 0.5.
     */
    curveLength?: number

    /**
     * How tightly the curve should take the corner, expressed as a fraction of the `curveLength`.
     * Positive numbers mean sharper, negative numbers mean smoother.
     */
    curveSharpness?: number

    /**
     * Spec for the background. Pass a color string for a solid background, or an angle and an array
     * of stops for a linear gradient.
     */
    svgBackground?:
        | string
        | {
              /** Angle of the gradient in degrees. */
              gradientAngle?: number
              stops: {
                  /** Percentage number. */
                  stopOffset: number

                  /** Color string. */
                  gradientColor: string
              }[]
          }

    /** Stroke color string. */
    svgStroke?: string

    /** Width of the stroke in pixels. */
    svgStrokeWidth?: number
}

interface SquircleParams extends SquircleOptionalParams {
    /** Width of the background in pixels. */
    bgWidth: number

    /** Height of the background in pixels. */
    bgHeight: number
}

type ClipSquircler = (
    params: Omit<SquircleParams, "svgBackground" | "svgStroke" | "svgStrokeWidth">
) => `path('${string}')`

type BackgroundSquircler = (
    params: SquircleParams
) => `url("data:image/svg+xml,${string}") left top no-repeat`

// eslint-disable-next-line no-restricted-properties
const { min, max, random } = Math

const getCurveSpec = (
    width: number,
    height: number,
    curveLength: number,
    curveSharpness: number
): [number, number] => {
    const shortestSide = min(width, height)
    const curveLengthShift = shortestSide * min(0.5, max(0, curveLength))
    const curveSharpnessShift = curveLengthShift * curveSharpness

    return [curveLengthShift, curveSharpnessShift]
}

const getPath = (
    width: number,
    height: number,
    curveLengthShift: number,
    curveSharpnessShift: number
): string =>
    // eslint-disable-next-line no-restricted-properties
    [
        "M",
        0,
        height - curveLengthShift,

        "C",
        0,
        height + curveSharpnessShift,
        -curveSharpnessShift,
        height,
        curveLengthShift,
        height,

        "L",
        width - curveLengthShift,
        height,

        "C",
        width + curveSharpnessShift,
        height,
        width,
        height + curveSharpnessShift,
        width,
        height - curveLengthShift,

        "L",
        width,
        curveLengthShift,

        "C",
        width,
        -curveSharpnessShift,
        width + curveSharpnessShift,
        0,
        width - curveLengthShift,
        0,

        "L",
        curveLengthShift,
        0,

        "C",
        -curveSharpnessShift,
        0,
        0,
        -curveSharpnessShift,
        0,
        curveLengthShift,

        "Z"
    ].join(" ")

export const newSquirclers = ({
    curveLength: defaultCurveLength = 5 / 16,
    curveSharpness: defaultCurveSharpness = -0.2,
    svgBackground: defaultSvgBackground = "#fff",
    svgStroke: defaultSvgStroke = "none",
    svgStrokeWidth: defaultSvgStrokeWidth = 1
}: SquircleOptionalParams = {}): [ClipSquircler, BackgroundSquircler] => [
    ({
        bgWidth,
        bgHeight,
        curveLength = defaultCurveLength,
        curveSharpness = defaultCurveSharpness
    }) => {
        const [curveLengthShift, curveSharpnessShift] = getCurveSpec(
            bgWidth,
            bgHeight,
            curveLength,
            curveSharpness
        )

        return `path('${getPath(bgWidth, bgHeight, curveLengthShift, curveSharpnessShift)}')`
    },
    ({
        bgWidth,
        bgHeight,
        curveLength = defaultCurveLength,
        curveSharpness = defaultCurveSharpness,
        svgBackground = defaultSvgBackground,
        svgStroke = defaultSvgStroke,
        svgStrokeWidth = defaultSvgStrokeWidth
    }) => {
        const [curveLengthShift, curveSharpnessShift] = getCurveSpec(
            bgWidth,
            bgHeight,
            curveLength,
            curveSharpness
        )

        const d = getPath(bgWidth, bgHeight, curveLengthShift, curveSharpnessShift)

        const isStroked = svgStroke !== "none" && svgStrokeWidth !== 0
        const clipId = isStroked ? `i${random()}` : ""
        const clip = isStroked ? `<clipPath id='${clipId}'><path d='${d}'/></clipPath>` : ""

        const isGradient = typeof svgBackground === "object"
        const gradientId = isGradient ? `i${random()}` : ""
        const gradient = isGradient
            ? // eslint-disable-next-line no-restricted-properties
              `<linearGradient id='${gradientId}' gradientTransform='rotate(${svgBackground.gradientAngle ?? 0})'>${svgBackground.stops
                  .map(
                      (stop) =>
                          `<stop offset='${stop.stopOffset}' stop-color='${stop.gradientColor}' />`
                  )
                  .join("")}</linearGradient>`
            : ""

        const defs = `<defs>${clip}${gradient}</defs>`

        const applyClip = isStroked ? `clip-path='url(#${clipId})'` : ""
        const applyFill = `fill='${isGradient ? `url(#${gradientId})` : svgBackground}'`
        const applyStroke = isStroked
            ? `stroke='${svgStroke}' stroke-width='${svgStrokeWidth * 2}px'`
            : ""

        const path = `<path ${applyClip} ${applyFill} ${applyStroke} d='${d}'/>`
        const svg = `<svg width='${bgWidth}px' height='${bgHeight}px' xmlns='http://www.w3.org/2000/svg'>${defs}${path}</svg>`
        const encodedSvg = encodeURIComponent(svg)

        return `url("data:image/svg+xml,${encodedSvg}") left top no-repeat`
    }
]

export const [clipSquircle, bgSquircle] = newSquirclers()
