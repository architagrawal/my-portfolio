/* One visual per role or project, picked for what that item needs to explain.
   Numbers marked real come from the copy; captions on invented values end in "illustrative". */

interface Base {
  caption: string;
}

/* Two unit grids: hits out of a total, before and after */
export interface Waffle extends Base {
  kind: "waffle";
  rows: { label: string; hit: number; total: number; value: string }[];
}

/* Before/after slope between two measurements on one scale */
export interface Slope extends Base {
  kind: "slope";
  from: { tag: string; value: number; label: string };
  to: { tag: string; value: number; label: string };
}

/* One long bar cut into equal parts, the new duration is one part */
export interface Ratio extends Base {
  kind: "ratio";
  parts: number;
  before: string;
  after: string;
}

/* Left-to-right pipeline, with an optional note under each stage */
export interface Flow extends Base {
  kind: "flow";
  stages: { label: string; note?: string }[];
}

/* Two-axis score: each sample lands on its own axis instead of an average */
export interface Quadrant extends Base {
  kind: "quadrant";
  x: string;
  y: string;
  points: { x: number; y: number; label: string; accent?: boolean }[];
}

/* Poll ticks along a route, closer together near the end */
export interface Cadence extends Base {
  kind: "cadence";
  start: string;
  end: string;
  ticks: number[]; // positions 0..1 along the route
}

/* Map step fanning out to workers, a repair loop and a breaker */
export interface Fanout extends Base {
  kind: "fanout";
  workers: number;
}

/* Receipt lines, each split among the people who had it */
export interface Receipt extends Base {
  kind: "receipt";
  people: string[];
  items: { name: string; cents: number; who: number[] }[];
}

/* Load and capacity over time, capacity as a step that follows load */
export interface Scaling extends Base {
  kind: "scaling";
  load: number[];
  perInstance: number;
}

/* Small computation graph, forward values then gradients flowing back */
export interface CompGraph extends Base {
  kind: "compgraph";
}

/* Sequenced layers as a staircase: each starts only when the last passes its exit gate */
export interface Gates extends Base {
  kind: "gates";
  layers: string[];
}

export type Visual =
  | Waffle
  | Slope
  | Ratio
  | Flow
  | Quadrant
  | Cadence
  | Fanout
  | Receipt
  | Scaling
  | CompGraph
  | Gates;
