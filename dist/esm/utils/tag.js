import { isObject } from "./isObject.js";
const handleStringTuple = input => input.join(":");
const handleEntry = ([key, value]) => value === true ? ` ${key}` : ` ${key}='${isObject(value) ? Object.entries(value).map(handleStringTuple).join(";") : value}'`;
/**
 * @param tagName A HTML or SVG element tag name.
 * @param attributes A `string`-keyed record of `string`, `number`, `true`, or
 *   `string`-keyed record of strings (like CSS properties).
 * @param children Any number of strings to add as children between the tag open
 *   and close.
 * @returns XML tag as string.
 */
export const tag = (tagName, attributes, ...children) => `<${tagName}${Object.entries(attributes).map(handleEntry).join("")}>${children.join("")}</${tagName}>`;