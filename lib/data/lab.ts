// The hardest problems across the projects, each with the number that says it is solved.
// Every figure already appears in the project write-ups.
import type { VizKey } from "@/components/site/lab-viz";

export interface Experiment {
  project: string;
  /** the headline result */
  stat: string;
  /** what the stat measures, a few words */
  unit: string;
  title: string;
  body: string;
  /** optional animated drawing of the result */
  viz?: VizKey;
}

export const experiments: Experiment[] = [
  {
    project: "Survey Agents",
    stat: "290k",
    unit: "lines, 4,077 tests",
    title: "Twelve agents in production, owned end to end",
    body: "Architecture through deployment on AWS: 76 tools, a state machine generated from a declarative graph, parallel fan-out with a failure circuit breaker, and a Nuxt and NestJS app on one shared TypeScript contract.",
  },
  {
    project: "Survey Agents",
    stat: "4.5×",
    unit: "more headline findings found",
    title: "An agent that decides what is worth charting",
    viz: "findings",
    body: "Instead of charting every question, an agent picks the ones that matter. Headline findings recovered went from 13% to 52–59% on surveys it had never seen, for about $0.05 per 13 surveys.",
  },
  {
    project: "Survey Agents",
    stat: "0",
    unit: "rows lost. The old pipeline: 1 in 8",
    title: "Labels that cannot be wrong by construction",
    viz: "rows",
    body: "The output schema only allows real codebook labels, and every response carries a token that proves it came back to the right row. The pipeline it replaced lost about one row in eight without noticing.",
  },
  {
    project: "Survey Agents",
    stat: "200×",
    unit: "more rows, same answer speed",
    title: "Ask a question, get a chart, in plain English",
    viz: "latency",
    body: "Questions compile to a query plan, pass seven checks, and run on DuckDB. Queries across 216 survey runs return in milliseconds, and no number is ever computed by a model.",
  },
  {
    project: "Survey Agents",
    stat: "1:1",
    unit: "byte-identical replays",
    title: "Every answer can be re-run and proven",
    viz: "replay",
    body: "Each answer carries a passport of plan, data and version hashes, so it re-executes exactly. When a definition changes, recent answers are re-run in the background and a moved number is caught first.",
  },
  {
    project: "Survey Agents",
    stat: "<1¢",
    unit: "to read 30 messy file formats",
    title: "Intake that handles real exports",
    body: "UTF-16 headers full of null bytes, duplicate columns, dates hidden inside IDs. Rules handle what they can and a model is asked only where they are unsure: 11 model calls across 30 formats, and every run replays with zero differences.",
  },
  {
    project: "Survey Agents",
    stat: "1.00",
    unit: "score a word cloud should not get",
    title: "Broke my own grader before trusting it",
    viz: "grader",
    body: "Before letting a chart agent near users, I searched for ways to cheat the scoring. A useless word cloud scored perfectly, so I added a gate that catches it. Then I measured whether the agent was worth keeping at all.",
  },
  {
    project: "AiJockey",
    stat: "192 GB",
    unit: "GPU, ported off CUDA",
    title: "A model that hears a mix before it is rendered",
    body: "Trained a reward head on MERT music embeddings to predict four audio-quality scores, so the DJ can rank options without running the slow critic on every render. Runs on an AMD MI300X, ported off CUDA to ROCm.",
  },
  {
    project: "AiJockey",
    stat: "25+",
    unit: "DSP transitions, one pipeline",
    title: "An AI DJ, from raw songs to a mastered set",
    viz: "crossfade",
    body: "Stem separation, beat and key analysis, an LLM that plans the set, 25+ hand-built transitions and multiband mastering, all in one FastAPI service. Rendered mixes feed preference training for the planner.",
  },
  {
    project: "PrismSplit",
    stat: "0¢",
    unit: "rounding drift",
    title: "Split any bill down to the item",
    viz: "split",
    body: "Integer-cent money math, transactional Postgres functions for every balance, and a debt-graph reduction that settles a group in the fewest payments. Works offline and syncs in real time.",
  },
  {
    project: "PrismSplit",
    stat: "Release",
    unit: "only bug, found and fenced",
    title: "A sign-in failure no test could see",
    body: "Google Sign-In broke only in production Android builds: the code shrinker stripped classes it needed. I traced it, wrote keep rules, and added a preflight plus end-to-end runs on the real release build.",
  },
];
