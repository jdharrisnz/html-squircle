import { backgroundSquircleObj } from "./backgroundSquircle.js";
import { clipSquircleObj } from "./clipSquircle.js";
const isOptionsBackground = opts => "stroke" in opts || "strokeWidth" in opts || "background" in opts || "injectedDefs" in opts || "injectedBody" in opts;
/**
 * Overloaded function for getting either the background or clip squircle
 * objects. Returns a result based on whether any background options are present
 * in the options object.
 */
export function eitherSquircleObj(options) {
  return isOptionsBackground(options) ? backgroundSquircleObj(options) : clipSquircleObj(options);
}