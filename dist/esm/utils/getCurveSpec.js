import { clamp } from "./clamp.js";
/** Get the pixels shifts for curve length and roundness. */
export const getCurveSpec = (width, height, curveLength, roundness) => {
  const shortestSide = Math.min(width, height);
  // Matches Apple app icons when square
  const defaultCurveLength = 5 / 16 * shortestSide;
  const minCurveLength = 0;
  const maxCurveLength = shortestSide / 2;
  const curveLengthShift = clamp(curveLength ?? defaultCurveLength, minCurveLength, maxCurveLength);
  const roundnessShift = curveLengthShift * clamp(roundness, -1, 1);
  return [curveLengthShift, roundnessShift];
};