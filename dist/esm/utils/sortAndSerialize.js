import { pickOptions } from "./pickOptions.js";
const sortEntryByKey = ([a], [b]) => {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
};
const handleEntry = ([key, value]) => [key, sortAndSerializeOptions(value)].join(":");
const sortAndSerializeOptions = input => typeof input === "object" ? Object.entries(input).sort(sortEntryByKey).map(handleEntry).join(";") : `${input}`;
export const sortAndSerialize = input => sortAndSerializeOptions(pickOptions(input));