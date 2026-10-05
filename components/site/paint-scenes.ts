/* Painted scenes behind the page headers. Each pairs a primitive painting (public/paint,
   made by scripts/paint-backgrounds.sh) with a hand-drawn foreground in three depth layers
   that sit where the hills used to. Foregrounds are SVG markup in a 1600x900 frame,
   anchored to the bottom. Motion classes (.fg-*) live in globals.css: transform and
   opacity only, paused offscreen, off under reduced motion. */

export type SceneId =
  | "mesas"
  | "saguaros"
  | "aurora"
  | "ocean"
  | "blackhole"
  | "canyon"
  | "flock"
  | "reef";
export type Layers = [far: string, mid: string, near: string];

type Palette = { dark: [string, string, string]; hi: string };

export const SCENE_IDS: SceneId[] = [
  "mesas",
  "saguaros",
  "aurora",
  "ocean",
  "blackhole",
  "canyon",
  "flock",
  "reef",
];

// sampled from the bottom third of each photo, darkest first
const PALETTES: Record<SceneId, Palette> = {
  mesas: { dark: ["#100303", "#190405", "#210507"], hi: "#bfb8b6" },
  saguaros: { dark: ["#0b1523", "#473b55", "#575a6e"], hi: "#b9c7d3" },
  aurora: { dark: ["#0b0d0a", "#304038", "#416954"], hi: "#78bc94" },
  ocean: { dark: ["#476691", "#6182a9", "#678db6"], hi: "#e9ead4" },
  blackhole: { dark: ["#000000", "#190000", "#6d0000"], hi: "#eb5d0b" },
  canyon: { dark: ["#2a2e1c", "#3b4428", "#554935"], hi: "#b7a791" },
  flock: { dark: ["#1d0402", "#290b04", "#3c1707"], hi: "#f8c15b" },
  reef: { dark: ["#0a120f", "#382010", "#33392d"], hi: "#9ebaaf" },
};

/* seeded, so the server and every visit draw the same foreground */
function rng(seed: number) {
  let s = seed;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

function ground(
  r: () => number,
  y: number,
  amp: number,
  fill: string,
  k = 6,
  extra = "",
) {
  const pts = Array.from({ length: k + 1 }, (_, i) => [
    i * (1600 / k),
    y + (r() - 0.5) * amp,
  ]);
  let d = `M0 900L0 ${pts[0][1].toFixed(0)}`;
  for (let i = 1; i < pts.length; i++) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    d += `C${(x0 + x1) / 2} ${y0.toFixed(0)} ${(x0 + x1) / 2} ${y1.toFixed(0)} ${x1} ${y1.toFixed(0)}`;
  }
  return `<path d="${d}L1600 900Z" fill="${fill}"${extra}/>`;
}

const saguaro = (x: number, b: number, h: number, c: string) =>
  `<g fill="${c}"><rect x="${x - 9}" y="${b - h}" width="18" height="${h}" rx="9"/><rect x="${x - 36}" y="${b - h * 0.62}" width="12" height="${h * 0.3}" rx="6"/><rect x="${x - 36}" y="${b - h * 0.36}" width="34" height="11" rx="5"/><rect x="${x + 24}" y="${b - h * 0.75}" width="12" height="${h * 0.32}" rx="6"/><rect x="${x + 2}" y="${b - h * 0.47}" width="34" height="11" rx="5"/></g>`;

const shrub = (r: () => number, x: number, b: number, rad: number, c: string) =>
  `<g fill="${c}">${[0, 1, 2, 3]
    .map(
      (i) =>
        `<circle cx="${(x + (i - 1.5) * rad * 0.8).toFixed(0)}" cy="${(b - rad * (0.5 + (i % 2) * 0.35)).toFixed(0)}" r="${(rad * (0.6 + r() * 0.3)).toFixed(0)}"/>`,
    )
    .join("")}</g>`;

const bird = (s: number, c: string) =>
  `<path class="fg-flap" d="M${-10 * s} ${-3 * s}Q${-4 * s} ${-6 * s} 0 0Q${4 * s} ${-6 * s} ${10 * s} ${-3 * s}" fill="none" stroke="${c}" stroke-width="${(2.4 * s).toFixed(1)}" stroke-linecap="round"/>`;

const pine = (x: number, b: number, h: number, c: string) =>
  `<path d="M${x.toFixed(0)} ${(b - h).toFixed(0)}l${(h * 0.22).toFixed(0)} ${(h * 0.45).toFixed(0)}h${(-h * 0.1).toFixed(0)}l${(h * 0.18).toFixed(0)} ${(h * 0.55).toFixed(0)}h${(-h * 0.6).toFixed(0)}l${(h * 0.18).toFixed(0)} ${(-h * 0.55).toFixed(0)}h${(-h * 0.1).toFixed(0)}z" fill="${c}"/>`;

const wave = (y: number, fill: string, amp: number, len: number) => {
  let d = `M-200 ${y}`;
  for (let x = -200; x < 1900; x += len)
    d += `q${len / 4} ${-amp} ${len / 2} 0t${len / 2} 0`;
  return `<path d="${d}V900H-200Z" fill="${fill}"/>`;
};

const glints = (
  r: () => number,
  n: number,
  y0: number,
  y1: number,
  c: string,
) =>
  Array.from({ length: n }, () => {
    const x = r() * 1600;
    const y = y0 + r() * (y1 - y0);
    const w = 10 + r() * 40;
    return `<rect class="fg-glint" style="animation-delay:${(-r() * 2.4).toFixed(2)}s" x="${x.toFixed(0)}" y="${y.toFixed(0)}" width="${w.toFixed(0)}" height="3" rx="1.5" fill="${c}"/>`;
  }).join("");

/* Humpback, facing right, about 250 x 70 around its tail stock at 0,0: long pectoral fin,
   a small dorsal hump, and throat pleats along the underside. */
const whale = (body: string, line: string) =>
  `<path d="M0 0C30-24 90-36 160-32C200-29 232-18 250-4C238 8 206 18 160 21C100 25 40 18 0 0Z" fill="${body}"/>` +
  `<path d="M78-30c6-8 12-10 18-6z" fill="${body}"/>` +
  `<path d="M-2 0C-14-6-30-18-46-22C-38-10-32-4-26 0C-32 4-38 10-46 22C-30 18-14 6-2 0Z" fill="${body}"/>` +
  `<path d="M168 14C158 42 126 62 104 66C120 50 138 32 148 16Z" fill="${body}"/>` +
  `<path d="M176 12C206 8 228 2 246-2M180 17C208 13 228 7 244 2M186 21C210 17 226 11 240 6" fill="none" stroke="${line}" stroke-width="2" stroke-linecap="round"/>`;

/* the whale's fluke as it dives: two lobes on a stock, rooted at the waterline */
const fluke = (c: string) =>
  `<path d="M0 0V-34C-8-46-30-58-58-60C-40-50-20-42-6-30H6C20-42 40-50 58-60C30-58 8-46 0-34Z" fill="${c}"/>`;

const BUILDERS: Record<SceneId, (p: Palette, r: () => number) => Layers> = {
  mesas: (p, r) => desert(p, r),
  saguaros: (p, r) => desert(p, r),
  aurora: (p, r) => [
    Array.from({ length: 34 }, (_, i) =>
      pine(i * 50 + r() * 20, 704, 90 + r() * 90, p.dark[0]),
    ).join("") +
      `<rect x="0" y="700" width="1600" height="200" fill="${p.dark[0]}"/>`,
    glints(r, 20, 720, 860, p.hi),
    `<g class="fg-walk"><path d="M300 870c10-20 40-26 60-20l10-14 6 12c18 4 26 12 30 22h-12l-4-8-30 2-4 8h-10l2-10c-16 0-30-2-38 8z" fill="${p.dark[0]}"/></g>` +
      ground(r, 890, 10, p.dark[0], 2),
  ],
  ocean: (p) => [
    `<g class="fg-swell">${wave(720, p.dark[2], 6, 160)}</g>`,
    `<g class="fg-drift">${wave(780, p.dark[1], 9, 140)}</g>` +
      // whale and its fluke only show above the waterline
      `<clipPath id="fg-sea"><rect x="-200" y="0" width="2000" height="806"/></clipPath>` +
      `<g clip-path="url(#fg-sea)"><g transform="translate(980 800)"><g class="fg-whale">${whale("#1b2a3e", "#33475f")}</g></g>` +
      `<g transform="translate(1430 806)"><g class="fg-fluke">${fluke("#1b2a3e")}</g></g></g>` +
      `<g transform="translate(1300 774)">${Array.from({ length: 9 }, (_, i) => { const k = i / 8; const d = (i % 2 ? 1 : -1) * k; return `<circle class="fg-puff" style="--d:${d.toFixed(2)};--h:${(40 + k * 90).toFixed(0)}px;animation-delay:${(k * 0.35).toFixed(2)}s" r="${(5 + k * 7).toFixed(1)}" fill="#f2f4ee"/>`; }).join("")}</g>` +
      `<g transform="translate(1430 806)"><ellipse class="fg-ring" cx="0" cy="0" rx="70" ry="10" fill="none" stroke="#e9ead4" stroke-width="3"/></g>`,
    `<g class="fg-swell">${wave(850, p.dark[0], 12, 120)}</g>`,
  ],
  blackhole: (_, r) => [
    `<g class="fg-swirl">${Array.from({ length: 140 }, () => `<circle cx="${(r() * 1600).toFixed(0)}" cy="${(r() * 900).toFixed(0)}" r="${(0.8 + r() * 1.8).toFixed(1)}" fill="#fff" opacity="${(0.3 + r() * 0.6).toFixed(2)}"/>`).join("")}</g>`,
    "",
    "",
  ],
  canyon: (p, r) => [
    `<path d="M0 900V420L120 460L180 600L260 640L300 900Z" fill="${p.dark[1]}"/><path d="M1600 900V380L1460 430L1400 590L1320 660L1280 900Z" fill="${p.dark[1]}"/>`,
    `<path d="M300 900C500 820 700 820 800 780S1100 760 1300 900Z" fill="#3c5664"/>` +
      glints(r, 22, 790, 880, p.hi),
    `<path d="M0 900V700L140 760L240 900Z" fill="${p.dark[0]}"/><path d="M1600 900V680L1440 770L1360 900Z" fill="${p.dark[0]}"/>`,
  ],
  flock: (p, r) => [
    `<g class="fg-flock">${Array.from({ length: 22 }, () => `<g transform="translate(${(r() * 520).toFixed(0)} ${(380 + r() * 200).toFixed(0)})"><g class="fg-bob" style="animation-delay:${(-r() * 3).toFixed(2)}s">${bird(1.6 + r() * 1.2, p.dark[0])}</g></g>`).join("")}</g>`,
    `<rect x="0" y="790" width="1600" height="110" fill="${p.dark[2]}" opacity="0.45"/>` +
      glints(r, 24, 800, 880, p.hi),
    ground(r, 870, 14, p.dark[2], 4, ' opacity="0.8"'),
  ],
  reef: (p, r) => [
    `<g class="fg-glide"><g transform="translate(0 330) scale(-2.4 2.4)" opacity="0.75">${whale("#0d2a30", "#1f4a50")}</g></g>`,
    Array.from(
      { length: 12 },
      () =>
        `<circle class="fg-rise" style="animation-delay:${(-r() * 6).toFixed(2)}s" cx="${(200 + r() * 1200).toFixed(0)}" cy="${(820 + r() * 60).toFixed(0)}" r="${(3 + r() * 5).toFixed(0)}" fill="none" stroke="#cfe" stroke-width="1.5"/>`,
    ).join(""),
    Array.from(
      { length: 16 },
      (_, i) =>
        `<path d="M${(i * 105 + r() * 40).toFixed(0)} 900c-20-60 10-90 0-${(120 + r() * 80).toFixed(0)}c20 40 40 60 30 ${(80 + r() * 40).toFixed(0)}" fill="${p.dark[0]}"/>`,
    ).join(""),
  ],
};

function desert(p: Palette, r: () => number): Layers {
  return [
    ground(r, 700, 60, p.dark[2]),
    ground(r, 770, 50, p.dark[1]) +
      saguaro(1250, 790, 190, p.dark[1]) +
      shrub(r, 300, 800, 26, p.dark[1]),
    ground(r, 840, 30, p.dark[0]) +
      shrub(r, 1450, 870, 40, p.dark[0]) +
      shrub(r, 700, 880, 30, p.dark[0]) +
      `<g transform="translate(1100 220)"><g class="fg-circle"><g transform="translate(120 0)">${bird(2.2, p.dark[0])}</g></g></g>`,
  ];
}

/* The foreground sits on the frame's bottom edge, as a thin strip under the painting.
   The near layer gets a sliver of solid floor so no sky shows below it (space has none). */
const LIFT = 0;

export function foreground(id: SceneId): Layers {
  const p = PALETTES[id];
  const [far, mid, near] = BUILDERS[id](p, rng(7));
  const fill = id === "flock" ? p.dark[1] : p.dark[0];
  // scenes without a full-width ground (canyon walls, reef fronds) fade into the floor instead of meeting it at a hard line
  const soft = id === "canyon" || id === "reef";
  const floor =
    id === "blackhole"
      ? ""
      : (soft
          ? `<linearGradient id="fg-floor" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${fill}" stop-opacity="0"/><stop offset="1" stop-color="${fill}"/></linearGradient>`
          : "") +
        `<rect x="-200" y="${900 - LIFT - 4}" width="2000" height="${LIFT + 8}" fill="${soft ? "url(#fg-floor)" : fill}"/>`;
  const lift = (markup: string) =>
    markup ? `<g transform="translate(0 ${-LIFT})">${markup}</g>` : "";
  return [lift(far), lift(mid), lift(near) + floor];
}
