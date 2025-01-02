const optionKeys = ["width", "height", "curveLength", "roundness", "stroke", "strokeWidth", "background", "injectedDefs", "injectedBody"];
/**
 * Returns a new object with all SVG options, filled by the input, ordered, and
 * restricted only to SVG options. Default value undefined.
 */
export const pickOptions = input => {
  const out = {};
  for (const key of optionKeys) {
    if (key in input) {
      // @ts-expect-error Doesn't refine and can't handle the union of values
      out[key] = input[key];
    } else {
      out[key] = undefined;
    }
  }
  return out;
};