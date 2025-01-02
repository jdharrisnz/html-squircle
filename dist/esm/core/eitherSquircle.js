import { backgroundSquircleObj } from "./backgroundSquircle.js";
import { clipSquircleObj } from "./clipSquircle.js";
const isOptionsSVG = opts => "stroke" in opts || "strokeWidth" in opts || "background" in opts || "injectedDefs" in opts || "injectedBody" in opts;
export function eitherSquircleObj(options) {
  return isOptionsSVG(options) ? backgroundSquircleObj(options) : clipSquircleObj(options);
}