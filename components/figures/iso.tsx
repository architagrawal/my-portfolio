/* Isometric projection and the few solids every figure is drawn from.
   World axes: x runs down-right, y runs down-left, z runs up. Screen space is a 400x320 viewBox. */

export type Pt = [number, number];

const C30 = Math.cos(Math.PI / 6);

export function iso(ox: number, oy: number, k: number) {
  const p = (x: number, y: number, z = 0): Pt => [
    ox + (x - y) * C30 * k,
    oy + ((x + y) * 0.5 - z) * k,
  ];
  /* screen offset of a world vector, for moving parts with a CSS translate */
  const v = (dx: number, dy: number, dz = 0): Pt => [
    (dx - dy) * C30 * k,
    ((dx + dy) * 0.5 - dz) * k,
  ];
  return { k, p, v };
}
export type Iso = ReturnType<typeof iso>;

/* Scale and centre a scene of X by Y by Z world units inside the viewBox */
export function fit(X: number, Y: number, Z: number) {
  const k = Math.min(360 / ((X + Y) * C30), 270 / ((X + Y) * 0.5 + Z));
  const ox = 200 - ((X - Y) / 2) * C30 * k;
  const oy = 160 - (((X + Y) / 2 - Z) * k) / 2;
  return iso(ox, oy, k);
}

const r = (n: number) => Math.round(n * 100) / 100;
export const poly = (pts: Pt[]) =>
  "M" + pts.map((q) => `${r(q[0])} ${r(q[1])}`).join("L") + "Z";
export const path = (pts: Pt[]) =>
  "M" + pts.map((q) => `${r(q[0])} ${r(q[1])}`).join("L");

export const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const frac = (v: number) => v - Math.floor(v);
/* smoothstep from a to b */
export const ease = (a: number, b: number, v: number) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};

/* Write a translate (and optionally opacity) on a part. Transform and opacity only. */
export function mv(
  el: Element | null | undefined,
  [x, y]: Pt,
  o?: number,
) {
  if (!el) return;
  const s = (el as SVGElement).style;
  s.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`;
  if (o !== undefined) s.opacity = o.toFixed(3);
}
export function op(el: Element | null | undefined, o: number) {
  if (el) (el as SVGElement).style.opacity = o.toFixed(3);
}

type Cls = string;

/* A box with its three visible faces, painted as plates so it hides what is behind it */
export function Box({
  I,
  x,
  y,
  z = 0,
  w,
  d,
  h,
  top = "edge",
  side = "",
}: {
  I: Iso;
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  top?: Cls;
  side?: Cls;
}) {
  const P = I.p;
  return (
    <g>
      <path
        className={side}
        d={poly([P(x, y + d, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x, y + d, z + h)])}
      />
      <path
        className={side}
        d={poly([P(x + w, y, z), P(x + w, y + d, z), P(x + w, y + d, z + h), P(x + w, y, z + h)])}
      />
      <path className={top} d={topFace(I, x, y, z + h, w, d)} />
    </g>
  );
}

export const topFace = (I: Iso, x: number, y: number, z: number, w: number, d: number) =>
  poly([I.p(x, y, z), I.p(x + w, y, z), I.p(x + w, y + d, z), I.p(x, y + d, z)]);

/* A flat circle on a horizontal plane */
export function Disc({
  I,
  x,
  y,
  z = 0,
  r: rad,
  className = "",
}: {
  I: Iso;
  x: number;
  y: number;
  z?: number;
  r: number;
  className?: string;
}) {
  const [cx, cy] = I.p(x, y, z);
  return (
    <ellipse
      className={className}
      cx={cx}
      cy={cy}
      rx={rad * I.k * Math.SQRT2 * C30}
      ry={rad * I.k * Math.SQRT1_2}
    />
  );
}

/* Clip that keeps a box above its own footprint, so translating it down sinks it into the floor */
export function riseClip(I: Iso, x: number, y: number, z: number, w: number, d: number) {
  const L = I.p(x, y + d, z);
  const B = I.p(x + w, y + d, z);
  const R = I.p(x + w, y, z);
  return [L, B, R, [R[0], -400] as Pt, [L[0], -400] as Pt]
    .map((q) => `${r(q[0])},${r(q[1])}`)
    .join(" ");
}
