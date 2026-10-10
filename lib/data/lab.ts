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
    stat: "347k",
    unit: "lines, 4,845 tests",
    title: "Twelve production agents",
    body: "Architecture through deployment on AWS: 76 tools, a state machine generated from a declarative graph, parallel fan-out with a failure circuit breaker, and a Nuxt and NestJS app on one shared TypeScript contract.",
  },
  {
    project: "Survey Agents",
    stat: "4×",
    unit: "more headline findings found",
    title: "4× the headline findings",
    viz: "findings",
    body: "Instead of charting every question, an agent picks the ones that matter. Headline findings recovered went from 13% to 52–59% on surveys it had never seen, for about $0.05 per 13 surveys.",
  },
  {
    project: "Survey Agents",
    stat: "85%",
    unit: "fewer wrong answers. StatQA 68%, GPT-4o's best 64.83%",
    title: "Answers checked before shown",
    body: "Answers statistical and causal questions on any table: 25 tests checked against scipy and statsmodels, and causal estimators that match statsmodels. Every answer is read back in words and judged before a reader sees it, which cut wrong answers on 164 published figures by 85%.",
  },
  {
    project: "Survey Agents",
    stat: "93%",
    unit: "right on the hardest questions, 0 wrong",
    title: "Zero wrong on the hardest questions",
    body: "Accuracy on the hardest benchmark questions rose from 60% to 93%, with zero wrong answers. More reasoning and bigger models were tried first and helped none; giving every component one shared layer of facts about the file did.",
  },
  {
    project: "Survey Agents",
    stat: "100%",
    unit: "of charts match a raw-CSV audit",
    title: "File to chart, audited",
    body: "IBM's public attrition data traced through every step, from shape detection to the chart: 30.5% of overtime workers left against 10.4%, the published figure, and an audit with none of the engine's code matched 100% of checkable charts.",
  },
  {
    project: "Survey Agents",
    stat: "0",
    unit: "rows lost. The old pipeline: 1 in 8",
    title: "Labels correct by construction",
    viz: "rows",
    body: "The output schema only allows real codebook labels, and every response carries a token that proves it came back to the right row. The pipeline it replaced lost about one row in eight without noticing.",
  },
  {
    project: "Survey Agents",
    stat: "200×",
    unit: "more rows, same answer speed",
    title: "Plain-English charts",
    viz: "latency",
    body: "Questions compile to a query plan, pass seven checks, and run on DuckDB. Queries across 216 survey runs return in milliseconds, and no number is ever computed by a model.",
  },
  {
    project: "Survey Agents",
    stat: "1:1",
    unit: "byte-identical replays",
    title: "Replayable answers",
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
    title: "Breaking my own grader",
    viz: "grader",
    body: "Before letting a chart agent near users, I searched for ways to cheat the scoring. A useless word cloud scored perfectly, so I added a gate that catches it. Then I measured whether the agent was worth keeping at all.",
  },
  {
    project: "Survey Agents",
    stat: "33×",
    unit: "more accuracy from the model than the pipeline",
    title: "The control that changed the plan",
    body: "Built the control the architecture could lose: at a fixed model, the 12-agent pipeline tied a single prompt on accuracy, while switching models moved it 33 times more. The team's recommendation moved from accuracy to reliability, where the pipeline does win.",
  },
  {
    project: "Survey Agents",
    stat: "93%",
    unit: "fewer wrong charts",
    title: "Held against Opus 5.5 working blind",
    body: "Benchmarked the platform against Claude Opus 5.5 given only the raw file, scored by rules that need no judge plus one blinded LLM judge calibrated to expert ratings. General fixes, none written for a single survey, cut wrong charts 93% and oversized charts 100%. Opus still leads on focus, and the case study says so.",
  },
  {
    project: "Survey Agents",
    stat: "99%",
    unit: "fewer conflicting column meanings",
    title: "One place for what a column means",
    body: "A census of the code found eight facts about each column decided in several places that could disagree. One semantic model per run, written at publish and read by everything, took disagreements across 411 runs from 30,405 to 263.",
  },
  {
    project: "Survey Agents",
    stat: "6×",
    unit: "faster AWS pipeline",
    title: "Faster by removing agents",
    body: "Re-benchmarked two stages that ran inside a managed agent runtime: both made one tool call and stopped, and most of their time was the container booting. Calling the tool directly took a full run from 500 to 85 seconds.",
  },
  {
    project: "Survey Agents",
    stat: "97%",
    unit: "right when it names a cause",
    title: "Causal direction, asked both ways",
    body: "Causal discovery reads the data first and says \u201cunsettled\u201d rather than guess. Only then does a model judge direction from the variable names, asked twice in opposite orders and kept only when both readings agree. When it named a direction, it was right 29 times in 30.",
  },
  {
    project: "Survey Agents",
    stat: "98%",
    unit: "of tables read right, no model needed",
    title: "Rules beat the model at reading tables",
    body: "Public data arrives as respondent files, long tables, crosstabs and period tables. A deterministic shape detector reads 98% of them correctly; a model shown the headers and 20 rows managed 79% and cost money every time. The rules shipped.",
  },
  {
    project: "Survey Agents",
    stat: "96%",
    unit: "recall, up from 78% on the shipped path",
    title: "The search path nobody had scored",
    body: "Retrieval quality had never been measured. Scored against human-coded rows, the search path in production was the worst of five approaches; routing through the codebook, with a backfill for what routing misses, lifted recall at 10 from 78% to 96%.",
  },
  {
    project: "AiJockey",
    stat: "192 GB",
    unit: "GPU, ported off CUDA",
    title: "Predicting mix quality",
    body: "Trained a reward head on MERT music embeddings to predict four audio-quality scores, so the DJ can rank options without running the slow critic on every render. Runs on an AMD MI300X, ported off CUDA to ROCm.",
  },
  {
    project: "AiJockey",
    stat: "25+",
    unit: "DSP transitions, one pipeline",
    title: "Raw songs to mastered set",
    viz: "crossfade",
    body: "Stem separation, beat and key analysis, an LLM that plans the set, 25+ hand-built transitions and multiband mastering, all in one FastAPI service. Rendered mixes feed preference training for the planner.",
  },
  {
    project: "PrismSplit",
    stat: "0¢",
    unit: "rounding drift",
    title: "Item-level bill splitting",
    viz: "split",
    body: "Integer-cent money math, transactional Postgres functions for every balance, and a debt-graph reduction that settles a group in the fewest payments. Works offline and syncs in real time.",
  },
  {
    project: "PrismSplit",
    stat: "Release",
    unit: "only bug, found and fenced",
    title: "A release-only sign-in bug",
    body: "Google Sign-In broke only in production Android builds: the code shrinker stripped classes it needed. I traced it, wrote keep rules, and added a preflight plus end-to-end runs on the real release build.",
  },
];
