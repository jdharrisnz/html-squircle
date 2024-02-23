const w = (a, p, m) => a / Math.min(p, m), f = ({
  curveLength: a = 0.3125,
  curveSharpness: p = -0.2,
  svgBackground: m = "#fff",
  svgStroke: k = "none",
  svgStrokeWidth: y = 1
} = {}) => {
  const M = (o, n, t) => Math.min(t, Math.max(o, n)), j = (o, n, t, s) => {
    const e = Math.min(o, n) * M(t, 0, 0.5), l = e * M(s, -1, 1);
    return [e, l];
  }, i = (o, n, t, s) => [
    "M",
    0,
    n - t,
    "C",
    0,
    n + s,
    -s,
    n,
    t,
    n,
    "L",
    o - t,
    n,
    "C",
    o + s,
    n,
    o,
    n + s,
    o,
    n - t,
    "L",
    o,
    t,
    "C",
    o,
    -s,
    o + s,
    0,
    o - t,
    0,
    "L",
    t,
    0,
    "C",
    -s,
    0,
    0,
    -s,
    0,
    t,
    "Z"
  ].join(" ");
  return [
    ({
      bgWidth: o,
      bgHeight: n,
      curveLength: t = a,
      curveSharpness: s = p
    }) => {
      const [c, e] = j(
        o,
        n,
        t,
        s
      );
      return `path('${i(o, n, c, e)}')`;
    },
    ({
      bgWidth: o,
      bgHeight: n,
      curveLength: t = a,
      curveSharpness: s = p,
      svgBackground: c = m,
      svgStroke: e = k,
      svgStrokeWidth: l = y
    }) => {
      const r = ($, C, ...T) => `<${$}${Object.entries(C).map(([U, Z]) => ` ${U}='${Z}'`).join("")}>${T.join("")}</${$}>`, I = () => `i${Math.random()}`, [A, O] = j(
        o,
        n,
        t,
        s
      ), q = i(o, n, A, O), d = e !== "none" && l !== 0, G = d ? I() : "", x = typeof c == "object", P = x ? I() : "", R = r(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: `${o}px`,
          height: `${n}px`
        },
        r(
          "defs",
          {},
          d ? r("clipPath", { id: G }, r("path", { d: q })) : "",
          x ? r(
            "linearGradient",
            {
              id: P,
              gradientTransform: `rotate(${c.gradientAngle ?? 0})`
            },
            ...c.stops.map(
              ({ stopOffset: $, gradientColor: C }) => r("stop", { offset: $, "stop-color": C })
            )
          ) : ""
        ),
        r("path", {
          ...d ? {
            "clip-path": `url(#${G})`,
            stroke: e,
            "stroke-width": `${l * 2}px`
          } : {},
          fill: x ? `url(#${P})` : c,
          d: q
        })
      );
      return `url("data:image/svg+xml,${encodeURIComponent(R)}") left top no-repeat`;
    }
  ];
}, [z, D] = f();
export {
  D as bgSquircle,
  z as clipSquircle,
  w as getConstantCurveLength,
  f as newSquirclers
};
