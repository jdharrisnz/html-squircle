const T = (o, t, n) => o / Math.min(t, n), f = (o, t, n, s) => {
  const r = (m, p, $) => Math.min($, Math.max(m, p)), e = Math.min(o, t) * r(n, 0, 0.5), l = e * r(s, -1, 1);
  return [e, l];
}, v = (o, t, n, s) => [
  "M",
  0,
  t - n,
  "C",
  0,
  t + s,
  -s,
  t,
  n,
  t,
  "L",
  o - n,
  t,
  "C",
  o + s,
  t,
  o,
  t + s,
  o,
  t - n,
  "L",
  o,
  n,
  "C",
  o,
  -s,
  o + s,
  0,
  o - n,
  0,
  "L",
  n,
  0,
  "C",
  -s,
  0,
  0,
  -s,
  0,
  n,
  "Z"
].join(" "), A = ({
  curveLength: o = 0.3125,
  curveSharpness: t = -0.2
} = {}) => ({
  bgWidth: n,
  bgHeight: s,
  curveLength: r = o,
  curveSharpness: a = t
}) => {
  const [e, l] = f(
    n,
    s,
    r,
    a
  );
  return `path('${v(n, s, e, l)}')`;
}, O = ({
  curveLength: o = 0.3125,
  curveSharpness: t = -0.2,
  svgBackground: n = "#fff",
  svgStroke: s = "none",
  svgStrokeWidth: r = 1
} = {}) => ({
  bgWidth: a,
  bgHeight: e,
  curveLength: l = o,
  curveSharpness: m = t,
  svgBackground: p = n,
  svgStroke: $ = s,
  svgStrokeWidth: u = r
}) => {
  const c = (d, i, ...k) => `<${d}${Object.entries(i).map(([w, y]) => ` ${w}='${y}'`).join("")}>${k.join("")}</${d}>`, M = () => `i${Math.random()}`, [G, L] = f(
    a,
    e,
    l,
    m
  ), j = v(a, e, G, L), C = $ !== "none" && u !== 0, q = C ? M() : "", x = typeof p == "object", I = x ? M() : "", P = c(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: `${a}px`,
      height: `${e}px`
    },
    c(
      "defs",
      {},
      C ? c("clipPath", { id: q }, c("path", { d: j })) : "",
      x ? c(
        "linearGradient",
        {
          id: I,
          gradientTransform: `rotate(${p.gradientAngle ?? 0})`
        },
        ...p.stops.map(
          ({ stopOffset: d, gradientColor: i }) => c("stop", { offset: d, "stop-color": i })
        )
      ) : ""
    ),
    c("path", {
      ...C ? {
        "clip-path": `url(#${q})`,
        stroke: $,
        "stroke-width": `${u * 2}px`
      } : {},
      fill: x ? `url(#${I})` : p,
      d: j
    })
  );
  return `url("data:image/svg+xml,${encodeURIComponent(P)}") left top no-repeat`;
}, U = A(), Z = O();
export {
  Z as bgSquircle,
  U as clipSquircle,
  T as getConstantCurveLength,
  O as newBgSquircler,
  A as newClipSquircler
};
