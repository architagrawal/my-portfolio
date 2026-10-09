"use client";

import { Children, isValidElement, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PageHeader, Shell } from "@/components/site/shell";
import { Points, Section as UiSection, Stats } from "@/components/site/ui";
import {
  AgentGraph,
  ToolBudget,
  ToolMatrix,
  AnswerPath,
  DataModel,
  SystemArchitecture,
  AiPipeline,
  SettlePath,
} from "./_diagrams";

const stats = [
  { value: "347k", label: "lines across 12 packages" },
  { value: "4,845", label: "tests in 546 files" },
  { value: "76", label: "registered tools" },
  { value: "2,435", label: "commits in seven weeks" },
];

const impact = [
  { value: "85%", label: "fewer wrong answers on 164 published figures" },
  { value: "93%", label: "right on the hardest benchmark questions, 0 wrong" },
  { value: "68%", label: "on StatQA, above GPT-4o's best reported 64.83%" },
  { value: "4×", label: "more headline findings, 13% to 52–59%" },
];

const highlights = [
  { name: "Every number from code", changed: "No figure is ever produced by a model. Each carries a fact id back to its rows, and an independent audit from the raw CSV matched 100% of figures." },
  { name: "Checked before shown", changed: "Every answer is read back in words and judged against the question. Wrong answers fell 85% on 164 published figures; the rest are refused with a reason or asked of the reader." },
  { name: "Statistics and causality", changed: "25 statistical tests checked against scipy and statsmodels, six causal effect estimators, and causal discovery that says \u201cunsettled\u201d rather than guess a direction." },
  { name: "Any table, read right", changed: "Survey weights, missing-value codes, crosstabs and codebooks applied on upload. Weights are found in 100% of files that ship one, up from 0%." },
  { name: "Agents where they win", changed: "An analyst agent quadrupled the headline findings a page recovers on surveys it had never seen. Where rules did as well, rules stayed: 93% fewer wrong charts came from better rules, not more model." },
  { name: "Reproducible and cheap", changed: "The same file draws the same 171 charts on every run, dashboards make zero model calls, and the analyst costs about $0.03 a survey." },
  { name: "Fast at scale", changed: "A 51,280-person federal survey with 220 columns publishes in 109 seconds, down from 19 minutes." },
];

const phases = [
  {
    phase: "01 Labelling",
    dates: "Aug 21 – Sep 8",
    question: "Can twelve agents code a survey better than a prompt?",
    verdict: "On accuracy, no. On reliability, yes.",
  },
  {
    phase: "02 Semantic layer",
    dates: "Aug 31 – Sep 14",
    question: "Can any survey become an askable question with cited numbers?",
    verdict: "Yes, and it is the durable part.",
  },
  {
    phase: "03 Product surface",
    dates: "Sep 9 – Sep 22",
    question: "Can those answers be drawn, restyled and shipped in an app?",
    verdict: "Mostly, with a long tail of legibility work.",
  },
  {
    phase: "04 Any survey",
    dates: "Sep 22 – Sep 24",
    question: "Does the page answer the questions a survey asked, on a file it has never seen?",
    verdict: "Not yet. 20% analysed on an unseen survey, and the gap is intake, not charts.",
  },
  {
    phase: "05 The analyst",
    dates: "Sep 24 – Sep 25",
    question: "Can an agent choose the analyses instead of a rule table choosing them?",
    verdict: "Yes, and it is the first place agency clearly won. 13% to 52–59% on held-out surveys.",
  },
  {
    phase: "06 Against Opus 5.5",
    dates: "Sep 25 – Oct 1",
    question: "Does it hold on unseen files, and against a strong model given only the raw file?",
    verdict: "Wrong charts cut 93%, level on BLADE. Focus still half of Opus's.",
  },
  {
    phase: "07 One semantic model",
    dates: "Oct 1 – Oct 2",
    question: "Can every reader take a column's meaning from one place, and does it change answers?",
    verdict: "Disagreements 30,405 to 263. Reference matches 16 to 21.",
  },
  {
    phase: "08 Any table",
    dates: "Oct 2 – Oct 4",
    question: "Can it answer statistical and causal questions on any table, and never show a wrong number?",
    verdict: "Wrong answers cut 85% on 164 published figures. StatQA 68% against GPT-4o's best of 64.83%.",
  },
  {
    phase: "09 Reading the file",
    dates: "Oct 4 – Oct 6",
    question: "Can it read a file the way its authors meant it, and ask a person when it cannot?",
    verdict: "Every reading recorded, asked when unsure. QRData and StatQA samples 0 wrong.",
  },
  {
    phase: "10 One semantic layer",
    dates: "Oct 7 – Oct 8",
    question: "Can the hardest questions be fixed by what every component is told?",
    verdict: "Hardest questions 60% to 93% right, 0 wrong. One run is good to about ±4.",
  },
];


const stages = [
  { stage: "frame", decides: "delimiter, header row, transpose", gate: "framing score below 0.65" },
  { stage: "repair", decides: "split a packed column, reshape a wide export", gate: "nothing to group by, or a wide export" },
  { stage: "retype", decides: "a column whose values fail its own predicate", gate: "typing score below 0.90" },
  { stage: "classify", decides: "is this column personal data", gate: "a column in the ambiguous band" },
  { stage: "review", decides: "does the finished profile make sense at all", gate: "nothing, it takes no action" },
];

const intakeNotes = [
  "Roughly seven in ten real survey exports hide their timestamp inside the identifier column, so a pipeline that trusts the header row reports no date column while holding the dates the whole time. Constant arity is what separates a compound key from prose, and recovering it turns every one of those files into a dataset with a time axis.",
  "Files that parse cleanly and are still wrong: UTF-16 headers full of null bytes, a duplicate header silently overwriting a whole column, a 0/1 flag typed as a rating scale, a report title sitting in the header row.",
  "A recovered date is usually the export stamp, not when anyone answered. Where one period holds over 90% of responses the tool refuses the time axis rather than drawing a collapse that is an artifact of when somebody ran an export.",
  "The review stage reads the finished profile instead of each decision, because per-decision gates are blind to upstream bugs. It was verified by reintroducing a sampler defect whose stride aliased against alternating data and silently halved a dimension's values on any file over ~200 rows.",
  "Codebook fit is measured before any labeling spend: question scope is embedded and 25 responses are sample-labeled. The right codebook scores mean best match 0.598 at a 4% abstain rate; the wrong one scores 0.316 at 88%, for about $0.001. Thresholds written from a guess before that calibration would have passed the wrong codebook with a warning.",
];

const reliability = [
  { metric: "Invalid / destroyed labels", ours: "0, unrepresentable by schema", theirs: "14 on gpt-4o, 3 on luna" },
  { metric: "Rows carrying a destroyed label", ours: "0, by construction", theirs: "13 of 102, 12.7%" },
  { metric: "Rows silently lost", ours: "0", theirs: "1, found only by our check" },
  { metric: "Rows with no label", ours: "0", theirs: "1" },
  { metric: "Correlation integrity", ours: "100%, joined per response", theirs: "unverifiable, index-keyed" },
  { metric: "Label churn across repeat runs", ours: "0.0%, 114 of 114 identical", theirs: "never measured" },
  { metric: "Failed tool calls", ours: "5.3%, then 0.0% after schema binding", theirs: "not applicable" },
  { metric: "Per-row triage", ours: "risk-scored, calibrated to capacity", theirs: "none" },
  { metric: "Numbers in the report", ours: "computed by tools, cited, verified", theirs: "computed by the model" },
  { metric: "Codebook mismatch", ours: "named in intake before spending", theirs: "presents later as an abstain spike" },
];

const destroyedTags = [
  { model: "gpt-4o", count: "40 / 579", rate: "6.9%" },
  { model: "gpt-5.6-luna", count: "3 / 263", rate: "1.1%" },
  { model: "gpt-5.5", count: "0 / 854", rate: "0.0%" },
];

const controls = [
  { arm: "Benchmark pipeline, gpt-4o", f1: "0.637", prec: "0.707", rec: "0.580", ours: false },
  { arm: "Naive single pass, no machinery", f1: "0.570", prec: "0.664", rec: "0.500", ours: false },
  { arm: "No declared graph, three agents choose their own order", f1: "0.561", prec: "0.753", rec: "0.447", ours: true },
  { arm: "Declared graph, agentic label stage", f1: "0.563", prec: "0.802", rec: "0.433", ours: true },
  { arm: "Declared graph, deterministic label stage", f1: "0.573", prec: "0.724", rec: "0.473", ours: true },
];

const controlNotes = [
  "0.573 against 0.570. On the metric the project had spent its life optimising, the pipeline is indistinguishable from a single prompt in a loop, at the same model.",
  "Building the control is the finding. The first naive build scored F1 0.000, abstaining on 97 of 102 rows, which would have been a spectacular and completely false vindication. The cause was a column-mapping bug: the header response_id met a substring test for \u201cresponse\u201d and matched first, so every row was sent as its own id. That is exactly what intake's validate_mapping exists to catch, and the control, having no intake stage, shipped it silently.",
  "Removing the graph cost nothing measurable in quality. It cost the deliverable: the run stopped after QA, analytics and conclude never ran, no facts were computed and no report exists. The graph buys completion, not quality, and it is 2.2x faster on a third of the model calls, because orchestration decisions are themselves inference.",
];

const costAtScale = [
  { model: "gpt-5.6-luna", codes: "1.82", f1: "0.685", cost: "$5.20", latency: "25s" },
  { model: "terra", codes: "2.24", f1: "0.734", cost: "$51.77", latency: "14s" },
  { model: "sol", codes: "2.50", f1: "0.745", cost: "$88.89", latency: "35s" },
];

const labelHarness = [
  { run: "AgentCore harness", rows: "102 / 102", turns: "13", cost: "$0.0080", time: "58s", f1: "0.694" },
  { run: "Naive single pass", rows: "102 / 102", turns: "3", cost: "$0.0052", time: "15s", f1: "0.699" },
  { run: "Full pipeline", rows: "102 / 102", turns: "5", cost: "$0.0053", time: "20s", f1: "0.685" },
  { run: "Our own agent loop", rows: "50 / 102", turns: "33", cost: "$0.0110", time: "87s", f1: "0.445" },
];

const answerLoops = [
  { arm: "Fixed sequence", outcomes: "6 / 5 / 6", calls: "9", cost: "$0.0014", time: "1.1s", ours: true },
  { arm: "Our agent loop", outcomes: "6 / 5 / 6", calls: "141", cost: "$0.0257", time: "16.9s", ours: false },
  { arm: "AgentCore harness", outcomes: "6 / 5 / 6", calls: "129", cost: "$0.0577", time: "22.5s", ours: false },
];

const orchestrationNotes = [
  "Against our own loop the managed harness wins outright, and it did two things ours never managed: it advanced startIndex from the coverage feedback, and it self-corrected a wrong questionId from the error text alone. Against the deterministic path it ties on quality at 4x the wall clock and 78x the input tokens, because it carries a growing conversation with no cache benefit while the pipeline sends one cached 5,020-token prefix and reuses it.",
  "Step Functions completed 3 of 3 executions where a local driver completed 1 of 5. Run-to-run F1 variance across those executions (0.624 to 0.647) is larger than the difference between the two paths. In the local run, half the bill is the agent loop thinking between tool calls: $0.0372 of $0.0765.",
  "Eight questions written to cover routes rather than answers, run twice through three orchestrations over the same tools. Every outcome column is identical in all three arms, both times. The fixed sequence is 18x cheaper than our loop and 41x cheaper than the harness, and it reversed a claim we had made: the routes do differ between questions, but they are differences two Choice branches handle, and the agentic arms rediscover the same route one expensive turn at a time.",
  "Agency buys reliability of completion, not accuracy and not efficiency. That put AgentCore's value at the stage level and not at the orchestration level, and the stage-level half of that claim did not survive being revisited either.",
  "Revisited two weeks later, both remaining harnesses were removed. The label stage took 65.4s on 102 rows, of which 49.8s was the AgentCore container booting, and all 26 recorded receipts show one tool call and then end_turn. The check stage spent ten turns choosing between ten sums in the same order every run, and the first identical call took 116s, 178s, 336s and 3.9s across four invocations, with 3 of 25 runs timing out at 600s. Both now call their tool directly.",
  "An agent that makes one call and stops is a function call with a boot time. What the harness had actually fixed was our own loop, and once the loop was gone there was nothing left for it to fix.",
  "Every arm on this page has the agent executing a known job, and on those it ties or loses. Section 18 is the counter-case: given a job with no enumerable right answer, the same kind of agent beat its rule baseline outright.",
];

const retrieval = [
  { arm: "BM25 over the whole sentence", r1: "11.3%", r10: "42.3%", p10: "18.3%", mrr: "0.415", ours: false },
  { arm: "Stripped subject terms, then cosine (shipped path)", r1: "20.6%", r10: "77.6%", p10: "34.8%", mrr: "0.852", ours: false },
  { arm: "Cosine over the whole sentence", r1: "22.1%", r10: "90.1%", p10: "41.9%", mrr: "0.944", ours: false },
  { arm: "Codebook-routed, then backfilled", r1: "22.1%", r10: "95.6%", p10: "45.7%", mrr: "0.944", ours: true },
  { arm: "Ceiling", r1: "25.3%", r10: "98.6%", p10: "n/a", mrr: "n/a", ours: false },
];

const retrievalNotes = [
  "Retrieval quality was unmeasured for the life of the project, and when it was finally scored the shipped product path was the worst arm of the five. Stripping the reader's sentence to subject words cost 11.4 points of R@10 across 12 labelling passes, and nothing surfaced it because every existing eval scored intents, status and cited fact ids.",
  "Gold comes from 120 human-coded rows, so a codebook-routed retriever is graded against a human coder rather than against the labels it was handed. Routing through the codebook is worth about 6 points of R@10, better on 12 of 12 runs.",
  "Backfill is not a tuning choice. Without it one query falls from 100% to 66.7%, because a gold row the labeller never coded is unreachable by routing no matter how well it matches, and flat cosine would have found it. Routing through structure a model inferred needs a path around it.",
  "Retrieve-wide-then-rerank is monotonically wrong here: reranking a page of 10 lifts R@5 from 36.1 to 40.1, and widening to 25, 50 and 100 drops R@10 to 50.9, 47.9 and 42.8. Rerank the page, never widen.",
];

const f1 = [
  { approach: "Benchmark pipeline, re-run on gpt-4o", score: "0.523", range: "0.462 – 0.581", ours: false },
  { approach: "This pipeline, 5 stages, on luna", score: "0.685", range: "0.673 – 0.699", ours: true },
  { approach: "Benchmark pipeline, on luna", score: "0.692", range: "0.663 – 0.706", ours: false },
  { approach: "Benchmark pipeline, on gpt-5.5", score: "0.753", range: "0.735 – 0.770", ours: false },
];

const measurementNotes = [
  "Model choice moves F1 by 0.230 on a fixed prompt. The architecture moves it by −0.007 at fixed model. Any conversation about accuracy should start with the model pin, not the pipeline.",
  "The pipeline costs roughly 8 times as much and takes about 6 times the wall clock of three plain API calls, for the same F1.",
  "The 0.637 baseline every earlier claim was anchored to turned out not to be reproducible. Fresh runs average 0.523, most likely because the delivered spreadsheet had been human-reviewed before it shipped.",
  "Batch size is a quality parameter, not a throughput knob. Sweeping it leaves F1 flat and moves the precision and recall split, so the escalation ladder is a dial with a known shape rather than a guess.",
  "Reasoning was published as structurally incompatible with constrained decoding, then corrected twice: the cause was an unbounded reasoning budget and a rules block. With that fixed, reasoning wins on F1 and loses on product behavior.",
  "One line of prompt moved F1 by 0.028 and precision by 0.118. Luna over-labels at 2.53 codes per row against gold's 1.92, and the density instruction it inherited had been written for a local 9B that under-labelled at 1.36. Density guidance has to be chosen from which side of gold a model sits on, which is measurable per model and not knowable in advance, so it is a switch rather than an edit.",
];

const analysisDecisions = [
  "The model never computes, never writes SQL and never sees the rows. Rows meet a model once, at labeling.",
  "Questions compile to plans in Metabase's MBQL shape, so one format serves both the agent and a UI query builder.",
  "Metrics bind to column kinds rather than column names, so an unseen survey works on arrival. A metric is minted by usage; a human blessing it is a trust label, never a gate.",
  "Facts are a cache, not a boundary: about ten bounded operators, unlimited composition, and 36 to 58 KB of facts per run that does not grow with responses, because a fact is a count per code per dimension value.",
  "Consistency comes from a binding cache. The first bind is stored, repeats are lookups, and the plan itself is hashed into the key so one question's plan is never served to another.",
  "Refusal is the last rung of a ladder: substitute, decompose, sample, extend, request, then refuse. A refusal names the column that is missing rather than inventing a reason.",
  "The catalog is the product. For every dataset it states what can be asked, what cannot and why, and which other datasets it cross-references, all computed at intake rather than at question time.",
  "Time buckets follow the academic calendar rather than the Gregorian one, because a month boundary falls mid-semester and term-to-term is the comparison a reader can act on.",
  "Respondent-level retrieval is a supported capability gated on entitlement, not a forbidden one. It refuses on entitlement and nothing else.",
  "Weight columns are typed and reported but never applied, so nothing silently rescales. Weighting stays a capability that appears when the column does.",
  "Cross-run comparison is guarded by what the runs are: 9 of 13 recorded runs are the same respondents, a pooled total is refused where a dimension is missing, and drift across unequal runs is reported as a share rather than a count.",
  "No database in the POC. DuckDB runs in-process over the run's JSON, and Lance serves vector and BM25 search straight from S3.",
];

const ours = [
  { name: "The question passport", changed: "Plan hash plus dataset, registry and skill versions on every answer, so any answer re-executes exactly and a stale one is detectable." },
  { name: "Metric lint in CI", changed: "Every declared metric must be computable on a stored run, so a definition cannot rot unnoticed between releases." },
  { name: "Shadow re-execution", changed: "When a definition changes, recent questions are re-run and diffed, so a moved number is found by us before a reader finds it." },
  { name: "Mappings that behave alike", changed: "A proposed cross-codebook mapping is checked against the co-occurrence and sentiment profiles of both codes before confirmation, rather than resting on the claim that a human once clicked yes." },
  { name: "The negative catalog", changed: "Publish what a scope cannot answer, so the interface grays out the control instead of refusing after the fact." },
  { name: "Deterministic tie-breaking", changed: "When two plans are equally valid a declared rule picks, so the same question cannot answer two ways on two days." },
  { name: "Codelist drift as a signal", changed: "Unmatched values accumulate with counts instead of failing the load, and the accumulation itself becomes the report." },
  { name: "Upload identity is content", changed: "A normalized content hash, so two people uploading the same export get one run rather than two conflicting sets of numbers, and the first sighting wins for the wave's date." },
  { name: "Lineage with four relations", changed: "relabel, recode, wave, wave_recoded. Only a new wave may claim topic movement, so a second labeling pass cannot present itself as a trend." },
  { name: "Extension points, not pluggable guarantees", changed: "Parsers, kinds, metrics, operators, marks and backends extend without touching existing code. The validator, the gate, provenance and grain enforcement do not, so a human review sits on every guarantee change." },
];

const chartFindings = [
  "One spec produces five outputs: the chart, an accessible data table, alt text, a CSV, and an ASCII rendering for the terminal. Repeatability is tested by diffing specs rather than images.",
  "Mark selection is deterministic, and the table is borrowed rather than invented. Accuracy ordering from Cleveland and McGill (1984), visual variables from Bertin (1967), expressiveness and effectiveness as criteria from Mackinlay's APT (1986), constraint shape from Draco (2019), task vocabulary reduced from Brehmer and Munzner (2013).",
  "The agent proposes a mark and an encoding, never data. Four gates accept or discard and the deterministic chart wins ties, so an eagerly invoked agent can cost a call but cannot damage a chart.",
  "0 of 36 proposals accepted: 34 refused because the rule table's chart scored the same or higher, and only 1 of 36 cases had any headroom at all. A later run at a fixed commit, with all four batches reachable, accepted 0 of 5 and captured 0 of 0.65 available legibility points and 0 of 1.55 fit points, for $0.0024 over 10 calls. Cases made worse: 0.",
  "That run was the first one that could have said otherwise, because three defects were fixed first: the gate's task was optional and none was passed, the live loop crashed on the batch built to break the fitness table, and the summary counted headroom over legibility only while that batch's headroom is entirely in fit.",
  "At temperature 0, one case scored 0.80, 0.40, 0.40, 0.40 and 0.64 across five identical runs. A single pass measures one draw, not the agent, which is why the rule table still wins ties.",
  "The gate was initially blind to the reader's task: nearly every proposal tied on legibility while the charts differed in ways legibility cannot see. Adding a task dimension broke most of those ties correctly and displaced none.",
  "Running an oracle over the agent's own search space found the scorer's exploits before the agent could. A word cloud sized by a free-text column scored a perfect 1.00, which is where the measure gate came from.",
  "75 chart properties are classified rather than opened up, each carrying a class that says how a refusal is reported. That classification is how three accepted-and-inert bugs were found, where a restyle answered a field no branch ever read.",
  "Capability menus are generated from the registry rather than hand-written, after the same staleness bug appeared three times, and a panel's advertised requirement is the same predicate the validator enforces.",
];

const awsFindings = [
  "Step Functions carries the orchestration: labeling fans out through a Distributed Map, merges, and reaches complete coverage on consecutive executions with no manual intervention.",
  "An execution reported SUCCEEDED with every slice green while quietly dropping part of the corpus: concurrent map iterations were writing the same slot. Fan-out needed partitioned writes and a real fan-in before green meant anything, and that class of defect only ever surfaces under real concurrency.",
  "The circuit breaker is the capability nothing else here has. ToleratedFailurePercentage halts the execution once 5% of batches fail; a sequential driver grinds through every remaining batch and pays for all of them.",
  "AgentCore looked like it earned its place at the stage level, where its harness took labeling from partial to complete coverage after our own agent loop stalled, and not at the orchestration level, where the one thing an agentic orchestrator was buying, repair, is a Choice state plus a counter. Repeating that benchmark after the hand-rolled loop was gone removed the stage-level half too: see section 09.",
  "Ten agent harnesses deployed with per-agent tool sets, and a tool withheld at runtime until its precondition exists after telemetry showed it never firing. The graph itself is data with load-time gates rather than a trusted stage list.",
  "Governance is deployed alongside: personal-data classification inside intake, Bedrock guardrails as their own stack, and spend caps on tokens and dollars checked inside a stage rather than only between stages, after an audit found the guard had been doing nothing.",
  "Deployment surfaced defects nothing else did: six in the Step Functions path, seven in the Flows path, none reachable by typecheck, unit tests or cdk synth.",
  "Storage is not the interesting cost. Facts and aggregates do not grow with responses, so 48 codes by 5 departments is 240 cells whether the survey holds 100 rows or 25,000. At 50 surveys of 25,000 rows the S3 payload is $0.20 a month, roughly 0.2% of the bill. The two lines that matter are an always-on database and model tokens, and neither is a storage decision.",
  "The harness was created through CloudFormation rather than the CLI, because create-harness authorizes iam:PassRole against the caller and the SSO permission set lacks it.",
];

const earningItsPlace = [
  "The control run was built late and it should have come first: at a fixed model, the pipeline adds essentially nothing to label accuracy. Building the control took four bug fixes, and those were the finding.",
  "A held-out batch scored 8 of 10 with and without the agent, and the reason was that the trigger never fired. A fixture that lies looks exactly like a null result.",
  "An eagerness sweep asks whether consulting the model more often ever hurts, so \"ask more\" is a measured setting rather than a preference.",
  "Thresholds are measured, never guessed. The codebook-fit separation is 0.598 against 0.316, and the guessed thresholds would have passed the wrong codebook.",
  "At temperature 0 the same chart case scored 0.80, 0.40, 0.40, 0.40, 0.64 across five identical runs, so any claim resting on one pass is a coin flip.",
  "Skills, written in the open Agent Skills standard and loaded into the cached system prefix, were held to the same bar: the first one changed no outcome on the batch and cost slightly less.",
  "The alignment rung chooser fires on 3 of 16 refusals and changes none of them. Its one disagreement was still worth it: it exposed a rung whose plan refuses on execution.",
  "The consensus signal is real and the risk score it replaced was not, measured on held-out data: consensus separates about 4 times better.",
  "A strong model working blind is the bar. Every gap Opus 5.5 exposed, codes, ids, pooled years and focus, was a general fault, not a fixture.",
  "Rules first, a judge second. One judge per arm flattered Opus; judge-free rules caught 41 wrong charts that no prompt tuning had.",
  "Every cycle is capped at $0.50: a 20-question sample per benchmark, or only the surveys a fix touches, about $0.45 cold and $0.10 rerun. Anything over $1 is asked first.",
  "Every failure gets one cause. A census of every answer that was not right, read one by one, then fixes in order: wrong answers first, then refusals.",
  "Reproduce the published figure first, in pandas or R, before blaming the engine or the benchmark. Three diagnoses were taken back that way, and one benchmark gold turned out to have its sign flipped.",
  "Comparisons run in a frozen worktree. The tree is shared, and a peer's edit to the binder's prompt once changed every cache key mid-run: 4 right, then 5, a minute apart.",
  "Snapshots before any refactor. Moving six components onto one layer had to change nothing, and diffs of 307 plan readings, 21 binder prompts and 307 validator verdicts proved it.",
];

const priorArt = [
  { name: "SSSOM", changed: "Mapping predicates. \"Advising wait times\" to \"Advising: access\" is a narrowMatch, and treating it as exact overstates the concept's share." },
  { name: "DDI", changed: "The survey metadata model already exists: question banks, concept libraries, instruments, and ex-post harmonization as normal practice." },
  { name: "Metabase MBQL", changed: "The plan format, copied rather than invented, because it is what a UI query builder already emits." },
  { name: "Vega-Lite", changed: "The chart contract, so a spec can be schema-validated, clicked, restyled and diffed instead of rendered and hoped over." },
  { name: "Draco, CompassQL, Voyager", changed: "The hard and soft constraint split for tie-breaking, and partial-spec completion as the model for chart editing." },
  { name: "Cleveland & McGill, Bertin, Mackinlay, Brehmer & Munzner", changed: "The mark-effectiveness table and the task vocabulary, so chart choice cites published research rather than taste." },
  { name: "Sato and Sherlock", changed: "Typing reads the header and neighbouring columns, not values alone. F1 0.89 values-only against 0.925 with context." },
  { name: "XLSForm, ODK", changed: "Accepting a form definition turns skip logic, codelists, question text and instrument version from inference into declaration." },
  { name: "GPTCache", changed: "Prior art for the binding cache, and the semantic drift signal that comes with it: falling hit similarity means the corpus moved." },
  { name: "QuickInsights, MetaInsight", changed: "The unprompted \"what stands out\" sweep after an upload, corrected for multiple comparisons, every claim resolving to a fact." },
  { name: "Cortex Analyst", changed: "Its verified query repository is the confirmed-binding tier, productized. Exports ship with a data contract." },
  { name: "LinkML, CEL, W3C reconciliation", changed: "Layer schemas modeled once, policies as versioned expressions, matching over a standard interface so OpenRefine becomes a free bulk-confirmation UI." },
  { name: "SDMX, SKOS", changed: "Dimensions that identify a cell separated from attributes that describe it, and a standard vocabulary for broader and narrower concepts." },
  { name: "CatLLM", changed: "Ensemble voting, tested on runs that were already on disk rather than on new spend." },
  { name: "Agent Skills standard", changed: "Skills authored as SKILL.md, so the same file works in Claude Code and in the pipeline's own loader." },
  { name: "Cube Core, dbt semantic layer", changed: "Deliberately not a dependency. Both model over a warehouse, and there is no warehouse here." },
  { name: "DDI-CDI, RDF Data Cube, PROV-O", changed: "The semantic model's vocabulary, borrowed by name so an export is a mapping rather than a translation." },
  { name: "Sequeda et al. 2023", changed: "GPT-4 went from 16% to 54% accurate on enterprise SQL with a knowledge graph. The evidence for one semantic model per run." },
  { name: "Self-consistency, Wang et al. 2022", changed: "The role call reads a survey three times, and a type correction applies on 3 of 3 and is asked on 2 of 3." },
  { name: "Position bias, Zheng et al. 2023", changed: "A model judge favours what it is shown first. Readings are taken in both orders and must name the item, never a position." },
  { name: "Kıcıman et al. 2023", changed: "Variable names carry causal knowledge. The causal prior is asked in both name orders and reported as an assumption beside the data's verdict." },
  { name: "R's svyglm and contrasts", changed: "A coefficient depends on the reference level and the intercept. Reproduced to 1e-5, and asked rather than guessed." },
  { name: "Horvitz 1999, mixed initiative", changed: "Reached independently: act when sure enough, ask when a wrong guess is costly. It is the decision policy in ADR 0004." },
  { name: "DAIL-SQL", changed: "Example selection by a question's form, here drawn only from other files' verified answers." },
];

const questionCoverage = [
  { stage: "At the start of phase 4", builtin: "6 of 32, 19%", unseen: "n/a" },
  { stage: "After questions were read as questions", builtin: "15 of 32, 47%", unseen: "n/a" },
  { stage: "After a deterministic method per type", builtin: "25 of 32, 78%", unseen: "10 of 51, 20%", ours: true },
  { stage: "Model names the method from the wording", builtin: "25 of 32, 78%", unseen: "43 of 51, 84%" },
  { stage: "Model also sees each column's shape", builtin: "88%", unseen: "n/a" },
];

const phase4Notes = [
  "Every instrument up to this point scored what the page drew: which marks, which recipes, which findings ranked where. None could notice that a survey asked eleven questions and the page said something about two of them. Across the Qualtrics, SurveyMonkey and Google Forms exports in the repo, 32 questions asked and 6 answered. The two types that worked were the two whose shape happened to fall out as a dimension the catalogue already understood.",
  "Three separate instruments agreed and all three were blind in the same way. Scored against its own brief, three of seven analyses reporting teams want scored 0% over 146 runs, including one that was built, working, and sitting behind a hardcoded false. Scored against fifteen cards from published Metabase survey templates, the mark agreed on 12 of 15 while only 4 of 15 questions were expressible in the grammar at all. Scored by two human raters, the chosen mark was right on 21 of 22 cases they agreed on. The drawing layer is sound; none of the three could say whether the page asked the right question.",
  "The structural cause is that a question is not a column. Intake read a survey column by column, so batteries, multi-selects and rankings were never one question. A Likert grid drew one chart per statement and nothing compared them, and its long table held each person once per statement, so every pair using it inflated n. Multi-selects were counted by combination, making \u201cLectures, Readings\u201d a category. \u201cStrongly agree\u201d was an unordered category and a rank of 1 was the bottom.",
  "NPS is the one where the arithmetic was visibly wrong rather than merely coarse: cut into thirds instead of into its declared bands, it read +72.6 on a survey that scores +67.6.",
  "The built-in exports are one survey written three ways, 32 questions that are really 11, so scoring on them measures that survey's wording. On a real unseen education export of 400 respondents over 51 questions, the page analysed 10 and the model named the right method for 43. Not like for like, because the page figure has to survive intake typing, panel generation and curation. Most of the 20% is upstream: 19 of 21 single-choice questions were the one-hot options of one multi-select intake never grouped.",
  "Showing the model each column's type, cardinality and sample values before it proposes anything, the step LIDA calls a summarizer, took 81% to 88% on the built-in exports and rankings from 0 of 3 to 2 of 3. One paragraph more input, same questions, same model. Tableau Pulse, InsightPilot and QuickInsights all ship the same split: arithmetic finds, the model selects and narrates.",
  "That became a type review, one model call per upload, cached: $0.0002 and 5.8s on first view, 459ms and free afterwards. On the unseen export it made two changes and both were right, one of them an NPS question intake had typed as a rating. Its own guard refused that correction first, because nobody among 385 respondents chose 0, 1 or 3, and an observed minimum is not a scale minimum.",
];

const relationshipNotes = [
  "The dashboard could break one number down by one group and nothing else. It could not relate two columns, and could not tell a real difference from noise. On a 307-row, 16-column student file it drew 10 panels, 6 of them a numeric column averaged by gender, and 5 of those 6 carried their own caveat saying the difference was noise. Average age by gender, 21.980 against 21.954, scored 60 of 100 and was selected.",
  "Every pair of columns is now screened once per run by scale, gated on Benjamini-Hochberg corrected significance, and written beside the run. All six planted-shape fixtures recover their relationship, and with every column shuffled at most one pair survives across all shapes.",
  "Columns that determine each other, city and country and latitude, are never paired against each other. That alone took the student file from 9 survivors to 1.",
  "Re-intaking the same file found two survivors from 55 pairs that had not been reachable before, because continuous numbers had been typed and never stored: 0 of 152 runs on disk had one, so every consumer written for them had never run.",
  "Across a 152-run census the screen changed 19 runs, 1,455 curated panels down to 1,410, each with a stated reason. \u201cNothing related\u201d is now a result with the strongest pair and its numbers attached, rather than an empty section.",
];

const removingAgents = [
  "A model per stage rather than one for the pipeline. Over 120 rows and three repetitions the cheaper model was indistinguishable on quality at 2.25x less cost and 53% more latency, so the saving stays opt-in on a stage people watch and each stage now names its own model.",
  "Suggested questions moved to a build stage. The first reader of an upload waited 82.2s; every reader afterwards waits 7.5ms.",
  "The chat agent behind the ask bar is hidden. The question box now draws one chart per sentence, and what replaced typing was direct manipulation: stack, swap, sort, top-N, a second shape over a chart, highlight one category, filters on more than one value, and undo with redo. Each had been reachable only by typing the right sentence.",
  "The agent was measured before it was hidden. A claim judge that checks whether a sentence is true, rather than whether a figure was produced, ran on 224 of 309 replayed reader questions and 41 answers were rewritten after it pushed back. Two of the 41 came back worse.",
  "Two heuristic screens meant to catch the same thing produced 27 flags and not one true positive, and were removed.",
  "Asking which parts of a question went unanswered doubled tool calls per question, 1.90 to 3.76, and took multi-intent coverage from 53% to 73% on two-part questions and 33% to 67% on three. It does nothing past four parts, because the tool-call cap is 8.",
  "Routing was the one place the model won on the numbers and lost on the clock: the keyword cascade scores 54 of 72 and the model scores 88%, at $0.0001 and 630ms a question. The milliseconds are the real cost, so the cascade stays and the model is the scored alternative.",
];

const analystScore = [
  { step: "Rule-built page, the baseline", dev: "22%", test: "13%" },
  { step: "Survey-model comparisons: roles, group-vs-rest tests, one correction family", dev: "41%", test: "n/a" },
  { step: "Analyst agent, one pass, typed intents compiled into plans", dev: "54%", test: "n/a", ours: true },
  { step: "Seven more surveys and five intake fixes", dev: "56–60%", test: "31–34%" },
  { step: "Derived columns: thresholds, bands, any-of", dev: "56–58%", test: "38–41%" },
  { step: "Counts across unequal groups drawn as shares", dev: "58%", test: "41%" },
  { step: "Analyst chooses unit, order and orientation", dev: "56–60%", test: "34–45%" },
  { step: "Population, battery and multi-select fixes", dev: "53–58%", test: "45–55%" },
  { step: "Analyst chooses the mark from the catalogue", dev: "60–67%", test: "48–59%" },
  { step: "Numbers banded at query time, correlations drawn", dev: "65–67%", test: "41–55%" },
  { step: "Questions on one scale drawn as one chart", dev: "65–70%", test: "52–59%", ours: true },
];

const referenceCharts = [
  { round: "Round 1, morning of Sep 25", ref: "7", ours: "0", ties: "0" },
  { round: "Round 2, end of Sep 25", ref: "3", ours: "1", ties: "3" },
];

const analystNotes = [
  "The page still chose itself from rules over column shapes, and it kept missing the figure every published write-up leads with. On the IBM attrition dataset it drew the share of leavers who worked overtime, 54%, where every notebook states the attrition rate among overtime workers, 30.5%. Same two columns, different question, and only one of them is the one a reader wants.",
  "The analyst is one model call per survey. It sees one line per question, the type, role, wording and answers, and never a row. It returns typed intents: figure, question, answers, group, population, a derived column where one is needed, and how to draw it. Code compiles each intent into a plan. A draw of 13 surveys costs about $0.05 over 25 to 35 calls and takes 35 to 50 seconds.",
  "Silent substitution was the loss, not refusal. Only 8 of 211 proposals were refused, 3.8%. But 13 of 31 plans from the old binder, 42%, used none of the columns the intent named and were drawn under the analyst's title: \u201cshare with one or more affairs\u201d came back as the share by children. Compiled intents got 36 of 40 right where the binder got 3 of 28. A plan that uses none of the named columns is now refused, and the refusal names the columns it actually used.",
  "The page had never seen the chart catalogue. The platform draws 17 marks with written requirements and the page drew 4: bar 41%, donut 26%, 100% bar 22%, number 8%. The catalogue lived inside a chart agent the dashboard never called, which is the reachability failure from rule 24 again, three months and one subsystem later. The analyst's menu is now generated from the catalogue.",
  "Measure choice had exactly one clear error worth vetoing: 33 of 54 group comparisons drew raw counts over groups more than twice apart in size, Titanic survival by sibling count being 121x, and 23 of those were titled \u201cwhat share\u201d. Counts across unequal groups are now drawn as each group's share, which moved percent charts from 38% to 54%.",
  "Intake shape decides the chart more than chart code does. Nine rudeness questions worded apart and interleaved drew nine donuts. Answers that state a size, heights and age ranges and incomes, were sorted by frequency and cut to the top ten. One answer set spelled two ways split a battery in half.",
  "A cached answer that was never cached. Pages took 16.7s on first load: every analyst draw republished its derived columns, recipes grew to 27 duplicates, every metric lookup rewrote a 20 KB register, and the remaining wait was a model call the advanced panels made on every load, beside a code comment saying none was made. First loads are now 0.7 to 2s and the 13-page scoring pass went from 16s to 3s.",
];

const alternatives = [
  {
    group: "Labelling",
    rows: [
      { approach: "Single forced tool call, enum-constrained", measured: "F1 0.685, 0 invalid codes", verdict: "shipped" },
      { approach: "Evidence grounding, one quote per row", measured: "precision 0.718 to 0.762", verdict: "shipped" },
      { approach: "Evidence per code rather than per row", measured: "worse on every axis", verdict: "rejected" },
      { approach: "shortlist_codes, narrow the codebook first", measured: "F1 0.683 to 0.556; 22 rows abstained where the control abstained none", verdict: "removed from the tool list" },
      { approach: "\u201cdistinguish from\u201d neighbours on every card", measured: "F1 0.685 to 0.633, density and both halves down", verdict: "rejected" },
      { approach: "Self-consistency sampling", measured: "more decorrelated arms and worse ones, specific to constrained decoding", verdict: "rejected" },
      { approach: "Model-reported confidence scores", measured: "built, measured as useless", verdict: "replaced by consensus" },
      { approach: "maxItems as a cap on codes per row", measured: "providers ignore array bounds; a cap of 2 produced rows of 8. Enforcing it in code moved precision 0.334 to 0.459", verdict: "enforce, never declare" },
      { approach: "Reasoning on", measured: "wins on F1, loses on product behaviour once the budget is bounded", verdict: "shipped then reverted" },
    ],
  },
  {
    group: "Orchestration",
    rows: [
      { approach: "Step Functions graph", measured: "3 of 3 completions, reviewable ASL hashed onto the manifest", verdict: "production path" },
      { approach: "Local driver over the same harnesses", measured: "1 of 5 completions", verdict: "development only" },
      { approach: "AgentCore harness at the stage level", measured: "fixed our worst loop defect, 102/102 against 50/102", verdict: "adopted for labelling" },
      { approach: "AgentCore harness at the orchestration level", measured: "4x wall clock, 78x input tokens, same quality", verdict: "rejected" },
      { approach: "AgentCore Gateway for data tools", measured: "5-minute hard cap, AWS names it an anti-pattern", verdict: "never used, tools run in process" },
      { approach: "Bedrock Flows for draft_summary", measured: "indistinguishable on latency, tokens and cost; verified rate swung 0/67 then 67/0 at n=3", verdict: "the reusable part is Prompt Management" },
      { approach: "Bedrock Batch", measured: "1,000-record minimum, hours per job", verdict: "not used, synchronous fan-out only" },
      { approach: "LangGraph", measured: "a deterministic orchestrator producing one replayable recipe covers it", verdict: "own orchestrator" },
      { approach: "AgentCore harness for the label stage, revisited", measured: "49.8s of a 65.4s stage was the container booting; all 26 receipts made one call and stopped", verdict: "tool run directly" },
      { approach: "AgentCore harness for the check stage", measured: "ten turns choosing between ten sums in a fixed order; 3 of 25 runs timed out at 600s", verdict: "tool run directly" },
      { approach: "One model for every stage", measured: "the cheaper model matched on quality at 2.25x less cost and 53% more latency", verdict: "a model per stage" },
    ],
  },
  {
    group: "Retrieval and grounding",
    rows: [
      { approach: "Codebook-routed retrieval", measured: "+6.1 to +6.3 points R@10 on 12 of 12 runs", verdict: "shipped" },
      { approach: "Backfill after routing", measured: "recovers a query routing cannot reach, 66.7% to 100%", verdict: "shipped, not optional" },
      { approach: "RRF fusion", measured: "loses to plain cosine on codebook search", verdict: "rejected" },
      { approach: "Model routing for text questions", measured: "won on 108 rows, gave up ~11 points R@10 on 1,691", verdict: "removed from the product path" },
      { approach: "Enriching bare codebook cards, four ways", measured: "all four lose against bare banded cards at R@10 65.1%: scoring by rows 56.3%, RRF 58.2%, folding responses in 58.9%, model-drafted differential definitions for all 201 cards at $0.0129 63.5%. Drafted definitions also lose on the codebook that had human ones, 95.6% to 92.9%", verdict: "rejected, and it supersedes the long-standing largest-lever claim" },
      { approach: "Conformal calibration of the refusal floor", measured: "understates the floor by ~0.07 off-topic; 19 of 24 near-domain questions overlap the on-topic range", verdict: "rejected, a margin you can defend beats a guarantee you cannot" },
      { approach: "One global refusal floor", measured: "0.24 answered a parking question with eight comments about professors", verdict: "measured per codebook at index time" },
      { approach: "verify_grounding as a gate", measured: "supported scores 0.070 to 1.000, unsupported 0.000 to 0.970. No threshold separates them", verdict: "demoted to advisory" },
      { approach: "check_meaning, a model judging each claim", measured: "catches 12 of 12 unsupported, wrongly blocks 0 to 1 of 8, ~$0.003 a draft", verdict: "shipped as the gate" },
      { approach: "check_wording, arithmetic on quantifiers", measured: "catches 2 of the 3 claims the guardrail passes, 0 false positives, no model call", verdict: "shipped" },
      { approach: "Jaro-Winkler for the substitute rung", measured: "0 of 18 real matches; ranked asteroid~question above tone~sentiment", verdict: "cosine at 0.40 instead" },
    ],
  },
  {
    group: "Analysis and question understanding",
    rows: [
      { approach: "One breakdown per panel, scored per panel", measured: "6 of 10 panels were a number by gender, 5 of them captioned as noise", verdict: "replaced by the relationship screen" },
      { approach: "Pair screen with corrected significance", measured: "all 6 planted shapes recovered, at most 1 false pair under full shuffle", verdict: "shipped" },
      { approach: "Written method table per question type", measured: "78% on the built-in exports, 20% on an unseen survey", verdict: "kept, but intake is the gap" },
      { approach: "Model names the method from the wording", measured: "78% built-in, 84% unseen", verdict: "shipped as the type review" },
      { approach: "Model sees column summaries first, LIDA's summarizer", measured: "81% to 88%, rankings 0 of 3 to 2 of 3", verdict: "shipped" },
      { approach: "Survey-analyst persona on the reviewer prompt", measured: "81% to 78% and 84% to 76%", verdict: "rejected, it made things worse" },
      { approach: "Keyword intent cascade", measured: "54 of 72; the model scores 88% but costs 630ms a question", verdict: "cascade kept, model scored as the alternative" },
      { approach: "Claim judge on every answer", measured: "41 rewrites over 309 questions, 2 came back worse", verdict: "shipped" },
      { approach: "Heuristic claim screens", measured: "27 flags, 0 true positives", verdict: "removed" },
      { approach: "Part coverage", measured: "tool calls 1.90 to 3.76; two-part coverage 53% to 73%", verdict: "shipped" },
      { approach: "Personal-data layer", measured: "withholding name-shaped columns from prompts and publishing", verdict: "removed by decision" },
      { approach: "Analyst agent choosing the analyses, one pass", measured: "54% of headlined claims against a 42% control, and 13% to 52-59% on held-out surveys over the phase", verdict: "shipped, on by default" },
      { approach: "Analyst loop that sees its results and chases them", measured: "worse than the single pass", verdict: "rejected" },
      { approach: "Union of three analyst draws", measured: "+1 point against a 12-point draw-to-draw range", verdict: "rejected" },
      { approach: "The old binder compiling the intent", measured: "3 of 28 rates the right way round; compiled intents 36 of 40", verdict: "demoted to a fallback" },
    ],
  },
  {
    group: "Answering and checking",
    rows: [
      { approach: "Read the plan back in words, judge the reading", measured: "stopped 49 of 52 wrong answers and 15 of 68 right ones", verdict: "shipped" },
      { approach: "Three correction rounds instead of one", measured: "same right answers, 2 more wrong", verdict: "one round" },
      { approach: "A bigger model as the check", measured: "stopped 4 right and passed 1 wrong for $0.093, against 2 and 1 for $0.010", verdict: "rejected" },
      { approach: "A second strict check on every pass", measured: "StatQA right 12 to 7, sjplot 9 to 5, and a wrong answer passed anyway", verdict: "reverted" },
      { approach: "A second judge on another model", measured: "stopped 26 of 46 right corrected plans, passed 1 of 3 wrong", verdict: "rejected" },
      { approach: "The relational core as the main path", measured: "112 of 129 with 6 wrong, against 117 with 1", verdict: "fallback and second opinion" },
      { approach: "Three candidate plans per question", measured: "114 of 129, 4 wrong, $1.81", verdict: "rejected" },
      { approach: "More reasoning and bigger models on the hard set", measured: "6, 6, 4 and 4 of 8 against 6 of 19 at no reasoning", verdict: "rejected, the failures were meaning, not capacity" },
      { approach: "Worked examples from verified answers", measured: "standing set 18 to 19 of 30, wrong 1 to 0", verdict: "shipped" },
      { approach: "Code labels read twice, the second time reversed", measured: "chocolate: 4 codes agreed, 3 asked, and one answer fixed the salt count", verdict: "shipped" },
      { approach: "Clustering a split's answers by how alike they answer", measured: "paired \u201cNone of these\u201d with Jewish and left atheists and agnostics apart", verdict: "rejected, answer families instead" },
      { approach: "The model's column labels deciding roles", measured: "reference matches 21 / 6 / 1 to 16 / 10 / 2", verdict: "labels name, rules cast" },
    ],
  },
  {
    group: "Charts",
    rows: [
      { approach: "Deterministic mark table, 16 ordered rules", measured: "first match wins, same request draws the same chart", verdict: "shipped" },
      { approach: "Agent proposes the mark", measured: "0 of 36 and 0 of 5 proposals accepted, 0 cases made worse", verdict: "kept behind improve-or-discard, ~$0.002 a pass" },
      { approach: "Agent authors Vega JSON directly", measured: "the rows live inside the spec, so authoring hands the model the data", verdict: "rejected, describeChart is the read-only form" },
      { approach: "Principled two-signal orientation rule", measured: "changed nothing over 3,822 shapes; the whole gain was letting faceted charts turn", verdict: "heuristic kept" },
      { approach: "Refusing charts on taste", measured: "taste is a caveat on the drawn chart; only a false statement is refused", verdict: "policy changed" },
      { approach: "Chat agent behind the ask bar", measured: "replaced by one chart per sentence plus direct controls in the builder", verdict: "agent hidden" },
      { approach: "Rules plus a narrow judge", measured: "140 of 179 for 38 calls, about $0.003; a judge on every chart 122 of 161 at 161 calls", verdict: "shipped" },
      { approach: "Learned Draco-style weights", measured: "98 and 104 against 137 of 167", verdict: "rejected" },
      { approach: "A model writing the headline", measured: "+2 held out, −1 and −2 on the references", verdict: "rejected" },
      { approach: "A critic loop over the page", measured: "no change, at $0.002 a survey", verdict: "rejected" },
      { approach: "The finding as the chart title", measured: "moved focus by at most 1 point", verdict: "reverted, descriptive titles" },
      { approach: "A model reading a table's shape", measured: "41 of 52 at $0.024, against a deterministic detector's 51 of 52", verdict: "rejected" },
    ],
  },
];

const lessons = [
  { rule: "A number in the model's context is an anchor, not a fact.", cost: "Only surface numbers the agent is supposed to act on. Cost: three separate regressions." },
  { rule: "A parameter with one valid value is a trap, not a reference.", cost: "Constrain it, default it, or do not ask for it. Cost: 100% of failed tool calls." },
  { rule: "Make the wrong answer unrepresentable, not merely rejected.", cost: "Better error text is measurably not a substitute." },
  { rule: "A tool's error message is part of its interface.", cost: "It does not just reject, it tells the agent what to try next. Listing options that do not exist is an instruction to go and try them." },
  { rule: "A tool must report what remains, not just what it did.", cost: "This took labelling from 50/102 to 102/102." },
  { rule: "Schema bounds are quotas, not filters.", cost: "maxItems 1 produced more output than maxItems 3. Measure every bound, never reason about one." },
  { rule: "Cut the net before you measure the fall.", cost: "A fallback that always catches hides how far the agent actually got." },
  { rule: "A check with no defensible threshold is worse than no check.", cost: "It lends a fixture's opinion the authority of a test." },
  { rule: "Verify from artifacts, not from new runs.", cost: "spend.jsonl and manifest.json answered nearly every \u201cdoes X work\u201d question in this project for free." },
  { rule: "A green execution is not a correct one.", cost: "A fully SUCCEEDED Distributed Map run reported 3/3 slices green while silently dropping 2% of the corpus." },
  { rule: "Fan-out multiplies waste and divides consistency.", cost: "Idempotence is a correctness property under fan-out, not an optimisation." },
  { rule: "A limit found on the first path tried is a limit of that path.", cost: "Three \u201climitations of Flows\u201d were limitations of its inline prompt node." },
  { rule: "A parser that does not throw is not a parser that is right.", cost: "Twelve intake defects, zero exceptions, every one a plausible table of the wrong thing." },
  { rule: "Any fixed-stride sample is a filter, and filters have passbands.", cost: "A stride sampler on a 1,000-row export alternating Tempe and Online saw only Tempe. Uniform random test data would never show it." },
  { rule: "An agent that keeps making the same correction is a rule waiting to be written.", cost: "The retype stage flagged the same id-typing bug on 3 of 30 files; fixing the rule halved the pipeline's model calls." },
  { rule: "A constant tuned on one corpus is a different instrument on the next.", cost: "Express the setting in terms of the thing it is cutting: a fraction, not a count." },
  { rule: "A hard top-N cut through near-ties is a random number generator.", cost: "A 0.009 difference between cards three and four decided the slice, and was the whole source of the routed arm's variance." },
  { rule: "Diagnosing a weak signal does not mean the fix is more signal.", cost: "Three attempts to enrich bare routing cards all lost. What worked was a band that stopped cutting through near-ties, which added no signal at all." },
  { rule: "Half of a language judgement is usually arithmetic.", cost: "A quantifier has a numeric range and the share is printed in the same sentence. Ask which part is actually a judgement before paying for one." },
  { rule: "A guardrail is a measurement, not a reassurance.", cost: "A gate whose accuracy is never measured reports confidence rather than provides it." },
  { rule: "\u201cOpt-in\u201d means the agent opts in.", cost: "A tool in the list is a tool that will be used, so the measurement that decides whether it helps has to happen before it is offered." },
  { rule: "An instruction is a request; an assertion in code is a guarantee.", cost: "Two checks named in an agent's objective were called by neither of two real runs. A check that must happen runs in assess()." },
  { rule: "A model call the ledger cannot see is a cost nobody prices.", cost: "When adding a call, update the estimate, the ledger, and the comment that says there is not one." },
  { rule: "Count the artifacts on disk before believing a feature is on.", cost: "Codebook routing shipped and reached 14 of 237 runs because building the index was a separate CLI. S3FactStore built its client in the constructor, so nothing in 2,300 passing tests ever constructed it, which is how a stubbed method shipped. A 17-mark chart catalogue lived inside an agent the dashboard never called, so the page drew 4 marks. No test and no typechecker can see any of this." },
  { rule: "The axis nobody scores is the axis that drifts.", cost: "Retrieval was unmeasured for the life of the project and the shipped path was the worst arm of five." },
  { rule: "Every borrowed prescription had to be measured before it helped.", cost: "Retrieve-wide-then-rerank, self-consistency sampling, conformal prediction and codebook enrichment are all good advice that lost on this data." },
  { rule: "Look at the rendered page.", cost: "A browser found what 2,000 tests could not, repeatedly: a chart that scored 1.00 and could not be read, labels the scorer credited upright and the renderer drew rotated, a delete prompt armed on every row." },
  { rule: "Run-to-run variance is a property to measure, not noise to ignore.", cost: "Temperature 0 and five identical runs gave five different chart scores. Single-sample numbers were quoted and later withdrawn more than once." },
  { rule: "Score what the survey asked, not what the page drew.", cost: "Every chart-level score was healthy while the page answered 6 of 32 questions. Four instruments measured the wrong unit at once." },
  { rule: "A question is not a column.", cost: "Batteries, multi-selects and rankings span columns, and every defect in that phase came from reading them one column at a time." },
  { rule: "Test on a file the code has never seen.", cost: "78% on the built-in exports was 20% on the first unseen survey. Three exports of one survey measure that survey's wording." },
  { rule: "A key keyed on the thing under test cannot measure it.", cost: "Grading the model against intake's type punished it for correcting intake." },
  { rule: "An agent that makes one call and stops is a function call with a boot time.", cost: "Two stages lost 49.8s and up to 336s a turn to harness overhead for decisions that never varied." },
  { rule: "An observed minimum is not a scale minimum.", cost: "It broke the rating floor, the top box and the NPS guard, three times in one day." },
  { rule: "Silent substitution is the failure to hunt, not refusal.", cost: "Only 3.8% of proposals were refused, while 42% of plans used none of the columns the request named and were drawn under the requester's title. A refusal is visible; a confident answer to a different question is not." },
  { rule: "Agency pays where the space of right answers is large and unenumerable.", cost: "The agent tied or lost at executing a chart, coding a response and sequencing a pipeline, and beat its rule baseline 13% to 52-59% at choosing which questions deserve a chart." },
  { rule: "A headline needs a group big enough to mean it.", cost: "Extremes from tiny groups led pages until headlines were made to prefer groups of 30 or more." },
  { rule: "Measure the draw-to-draw spread before believing a step helped.", cost: "One survey moves 2 of 9 claims between draws, so a change smaller than that cannot be read from three repeats." },
  { rule: "A strong blind model is the right bar.", cost: "Every gap it exposed was a general fault, not a fixture." },
  { rule: "Fewer charts beat more coverage.", cost: "135 charts to 40 held the reference matches and raised the exact ones." },
  { rule: "Judge noise is fixed in what the judge is shown, not by more judges.", cost: "A second strict check cost StatQA 5 right answers and still passed a wrong one." },
  { rule: "A model's stated confidence is not evidence.", cost: "\u201cKnown\u201d was wrong on cocoa liquor. Agreement between two differently framed readings, checked against the rows, is." },
  { rule: "Ask world-knowledge questions in both orders.", cost: "A causal judgement copied option A's order 16 times in 20." },
  { rule: "Disagreement should cost a question, never a wrong answer.", cost: "The reversed reading made its own mistakes, and because only agreement is applied, they became questions." },
  { rule: "Every loosening has a price.", cost: "Narrowing the check freed right answers and let a wrong one through 5 times in 6. Measure both directions every time." },
  { rule: "Caches and shared trees make old code look new.", cost: "Three \u201cno effect\u201d results over two days were cached plans." },
  { rule: "More model is not the lever.", cost: "More reasoning and bigger models scored the same or worse on the hard set." },
  { rule: "A fact must reach every component, or it reaches none that matters.", cost: "Each fix in one place left a flip in another until all of them read one layer." },
  { rule: "Disagreement is information.", cost: "Two computations that differ on one column say which column; refusing threw that away." },
  { rule: "One run is not a measurement.", cost: "Four identical runs at temperature 0 ranged from 20 to 24 of 29." },
];

const stillOpen = [
  { name: "Not the codebook descriptions", changed: "For most of the project the answer here was that the largest single lever is data, not code: all 201 cards in the ASU drop codebook define themselves as their own name, zero carry a description, 45 characters of embeddable text against 110 on the codebook where every card has one. That was finally tested and it does not hold. All four ways of strengthening the card signal lost against bare banded cards at R@10 65.1%: scoring entries by their rows 56.3%, reciprocal rank fusion 58.2%, folding responses into the card text 58.9%, and model-drafted differential definitions for all 201 cards at $0.0129, 63.5%. The last is what the platform plan and the published methods prescribe, and the drafts are good. Replacing the 54 human-written descriptions on the other codebook with drafted ones also lost, 95.6% to 92.9%." },
  { name: "What survives of it", changed: "Something narrower. Bare cards broke shortlist_codes at -0.12 F1, because that is BM25 and three words per card is nothing to retrieve on. That is lexical retrieval over cards, and shortlist_codes is deliberately out of the label agent's tool list, so no live path pays it. The earlier diagnosis had conflated two retrievers with different failure modes. Where the remaining gap points, as a hypothesis rather than a result: it is diffuse, the hard queries are hard for every arm, and where the routed arm is far off so is flat cosine, which implicates how the rows are embedded rather than the cards." },
  { name: "One labelling corpus", changed: "Three codebooks have been run, all against the same 102 responses. Analysis has now seen more: three survey-tool exports and one real unseen export, 400 respondents over 51 questions in a domain neither the code nor the playbook had met. No upload from an actual ASU team has been through any of this, which is still the most important gap on the list. When one arrives, add its shape to the novel-shapes corpus and score it before fixing anything." },
  { name: "Intake grouping is the bottleneck", changed: "On the unseen export, 19 of 21 questions typed single choice were the one-hot options of a single multi-select that intake never grouped, and 14 more were open text needing a codebook. Multi-select, NPS and boolean all still draw a count where the reader wants a rate." },
  { name: "Relationship floors are uncalibrated", changed: "The pair screen is gated on corrected significance, which controls false findings. The three effect-size floors that decide whether a real difference is worth a panel are still set by convention rather than from a census." },
  { name: "The analyst has only met public data", changed: "13 files of at most 31 columns, none of them a real team's survey. Its draws also vary: one survey can move 2 of 9 claims between draws, so any change smaller than that needs more than three repeats before it can be called an improvement." },
  { name: "Four chart forms still unbuilt", changed: "The share that ranked each item first, the top/middle/bottom thirds chart, one small-multiple of an outcome across groups in place of one chart per group, and dot charts carrying a second measure. Three of the four are why the published references still win their pairs." },
  { name: "Cross-round analysis is off", changed: "Switched off deliberately, because the page was comparing re-codings of one file as though they were rounds. It comes back when a survey has real ones." },
  { name: "One model", changed: "The architecture has only ever run on luna. Whether it gains the same +0.06 the benchmark gains on gpt-5.5 is unknown, and is the cheapest remaining experiment. The controlled claim is narrow, at equal model the two architectures are indistinguishable on F1, and should not be stretched into \u201carchitecture does not matter at any model.\u201d" },
  { name: "The deployed path is ungraded", changed: "Two Step Functions runs scored F1 0.703 and 0.637, n=1 each, a 0.066 spread against the ~0.026 seen locally. Three or more runs are needed before any deployed-path number means anything." },
  { name: "Self-graded accuracy", changed: "Every accuracy number on this page was scored against gold labelled by the author of the pipeline it grades. A grading pack with two independent graders is the fix, not a footnote." },
  { name: "Granularity, not collection", changed: "0 of 9 adjacent code pairs are separable at n=102 over 70 codes. The codebook may simply be too fine for the sample." },
  { name: "Known intake gaps", changed: "A file with no header row loses one row and names the columns after it. A packed column is read correctly as one column and never split. Multi-file, .xlsx and .zip uploads are refused with a note naming the format." },
  { name: "The personal-data layer was removed", changed: "By decision, not by accident: no column is withheld from publishing, prompts or the profile, and name-shaped columns became a descriptive attribute kind that is kept and not analysed, so they no longer reach the labeller as open text. Verbatims and name-shaped columns do reach prompts. That decision has to be revisited before any real upload." },
  { name: "Untried", changed: "Bedrock Batch (50% cheaper, the corpus qualifies), Advanced Prompt Optimization (does systematically what the density switch did by hand), Mantle's OpenAI-compatible endpoint (native reasoning effort and explicit cache control), and Automated Reasoning, which is a poor fit for a flat codebook with judgement underneath and a strong fit for eligibility, refund windows and academic standing." },
  { name: "Check misreadings", changed: "A right reading the check misreads, such as Norway's rank among every currency. Settling a claim against the plan's steps recovered 1 of 56 right stopped plans; rules that make a case impossible to misread have worked better." },
  { name: "The core as a second opinion", changed: "Its writers cannot express a streak, and one copies the check's wrong objection when shown it as a hint." },
  { name: "Tests under a survey weight", changed: "Every test reads rows unweighted. Weighted p-values and intervals are not built, and the answer has to say where a p-value is not design-based." },
  { name: "The S3 store", changed: "It cannot record a reader's answer or a remembered phrase yet, so asking only fully works locally." },
  { name: "Noise", changed: "One run measures a change to about \u00b14 of 29, and a run whose answers were mostly cached reads high." },
  { name: "Fixture-flavoured constants", changed: "ABSTAIN_WARN_THRESHOLD 0.3, CONTRADICTION_WARN_THRESHOLD 0.1, MIN_CODED_SHARE_FOR_CROSSTABS 0.2, ACCEPT_TIER unanimous, and the CHARS_PER_CODE halving factor. Each is a threshold measured on a corpus smaller than the one it will meet." },
];

const contracts = [
  { name: "Intent", what: "what the analyst writes, and code compiles", fields: "figure, about, answers, groupBy, among" },
  { name: "Plan", what: "one format for every source of a question", fields: "metric, by, filter, scope, compare, denominator, order, limit, test" },
  { name: "Fact", what: "the only source of a number", fields: "factId (hash of its plan), value, share, dimension, key, denominator, n" },
  { name: "Refusal", what: "cached like a plan", fields: "kind, reason, remedy, what can be asked instead" },
  { name: "Passport", what: "on every answer", fields: "plan hash, grammar version, dataset, registry, codebooks, freshness" },
  { name: "ChartSpec", what: "Vega-Lite terms plus provenance", fields: "mark, encoding, factId on every point, sparse, caveats, passport" },
];

const threeway = [
  { measure: "Charts on the page", before: "135", after: "115, then 40 after the outcome bar", opus: "23" },
  { measure: "Wrong charts", before: "41", after: "3", opus: "0" },
  { measure: "Oversized, over 40 categories", before: "12", after: "0", opus: "2" },
  { measure: "Shares off the CSV by over 1 point", before: "4", after: "3", opus: "0" },
  { measure: "Reference charts same / partial / none", before: "14 / 14 / 0", after: "16 / 11 / 1", opus: "3 / 12 / 13" },
];

const otherBenchmarks = [
  { measure: "BLADE: the expert's variable charted against the outcome", opus: "5 of 6, no goal given", ours: "5 of 6, and 6 of 6 given the goal" },
  { measure: "BLADE: charts on the page", opus: "18", ours: "120, then 38" },
  { measure: "InsightBench: planted findings shown", opus: "1 of 19", ours: "2 of 19" },
  { measure: "InsightBench: focus, out of 25", opus: "21", ours: "8" },
];

const recommenders = [
  { tool: "NL4DV", mark: "55 / 59 of 90", orient: "54 / 27 of 64", arrange: "63 / 52 of 82" },
  { tool: "LIDA", mark: "25 / 18 of 40", orient: "22 / 24 of 33", arrange: "21 / 5 of 36" },
  { tool: "Draco 2", mark: "109 / 75 of 148", orient: "100 / 79 of 124", arrange: "112 / 84 of 137" },
  { tool: "Data Formulator 0.7.0", mark: "28 / 20 of 31", orient: "23 / 19 of 27", arrange: "21 / 17 of 27" },
];

const opusNotes = [
  "Phase 5 tuned a page on 13 surveys. The yardstick for the next week was Claude Opus 5.5 working blind: data only, no references, one script per file. Ten survey files, 28 charts their own authors published.",
  "The benchmark was made trustworthy first. Two judges, one per arm, were too lenient on Opus, so one blinded judge now scores both arms as A and B. It was calibrated against VisJudge-Bench experts on 200 charts (Pearson 0.63, and 0.90 against itself on repeat), which makes it good for comparing and not for grading. Rules that need no judge catch averaged codes, ids drawn as variables, pooled years and shares that drift from the CSV, at precision 0.79 and recall 0.92 against the judge's wrong charts.",
  "What moved each step: opaque codes and ids typed as attributes (wrong charts 41 to 6), the five strongest splits within 24 bars (oversized to 0), a small-effect bar of Cohen's h 0.2 (75 charts to 47), and a rule that a chart must say something about an outcome (47 to 40, exact matches 15 to 19). Writing the finding as the title moved nothing and was reverted.",
  "Four unseen surveys first found 2 of 9, 1 of 16, 3 of 9 and 0 of 11 published findings. About half the misses were not understood and a third not computed. After general fixes only, sleep went 2 to 6 of 9 and masculinity 1 to 7 of 16.",
  "An independent audit recomputed every number from the raw CSV with none of the engine's code: 160 of 160, then 166 of 166 held out and 156 of 156 on the final set. The rule page drew 171 identical charts over two runs.",
  "Scale on the same pipeline: Household Pulse at 51,280 rows by 220 columns publishes in 109 s, from 19 minutes. GSS 75,699 weighted rows, BRFSS 438,694 values, with weights, codes and questionnaires applied.",
  "Where Opus still leads: focus, 48 against 25 of 50, and exact reference matches, 15 against 11. The gap is no longer clutter or wrong charts. The blind analyst writes the pattern and picks one chart per finding.",
];

const modelSteps = [
  { step: "Build the model and count disagreements, 411 runs", measured: "30,405 at first run" },
  { step: "Roles: one precedence, decided once", measured: "7,881 to 0" },
  { step: "Provenance: one rule, ten readers moved onto it", measured: "1,100 to 1" },
  { step: "Index parity: local and S3 stores share names and order", measured: "fields differing 558 to 29" },
  { step: "All disagreements, after every step", measured: "30,405 to 263", ours: true },
];

const modelNotes = [
  "A census of the code found eight facts about a column each decided in several places. A role came from three sources merged on every page view, a kind had four writers, provenance was re-derived by about eight name-suffix rules, and scale direction had two spellings. Most bugs of the week were this showing up as something else.",
  "The vocabulary is borrowed by name, so an export is a mapping: DDI-CDI (variable, category, question, universe), RDF Data Cube roles, CSVW titles, PROV-O derivation, SKOS concepts. The evidence for doing it came from enterprise SQL, not surveys: GPT-4 went from 16% to 54% accurate with a knowledge graph (Sequeda et al. 2023).",
  "A column plays more than one role. Age is background to “satisfaction by age” and the outcome of “do older students enrol part-time”. 7,920 of 22,218 columns now carry two or more, and keeping every role took reference matches from 16 / 11 / 1 to 21 / 6 / 1. Letting the model's column labels decide roles fell back to 16 / 10 / 2: it names columns well and casts them badly.",
  "The checks changed answers. “Average happiness by marital status” now answers each answer's share instead of a mean of a worded scale, and “average chimpanzee number” is refused instead of averaging an id.",
  "More benchmarks found more misreads. BLADE 5 of 6 to 7 of 9, DiscoveryBench 6 of 62 to 14 of 62, and VisEval's first run 23 of 60 to 33 of 60, after tables of records were found unpivoted with every count doubled or tripled.",
  "Comparisons without enumeration: one pass builds a cube per column and split, and every share, net and mean is a sum over its cells. Output is bit-identical and Stack Overflow 2019 compiles in 14 s, from 36. On 115 published claims over 12 held-out surveys, understood went 99 to 112, computed 84 to 99 and leading 30 to 43.",
  "The week's benchmark runs cost under $1 in all, at about $0.0015 a model call.",
];

const builtBenchmarks = [
  { bench: "Published toplines", has: "164 figures from GSS, ANES, RECS, Eurobarometer, FiveThirtyEight, scored within 0.5 points", first: "33 of 140", now: "57 of 140, 5 wrong" },
  { bench: "nvBench 2.0", has: "ambiguous chart requests, several valid gold specs, 150 sampled", first: "93 refused", now: "43 refused, chart type ~82% agreeing" },
  { bench: "StatQA", has: "which statistical test applies, over which columns, 100 sampled", first: "40%", now: "68%, against GPT-4o's best of 64.83%" },
  { bench: "QRData", has: "411 statistical and causal questions, numeric within 3%", first: "14 of 99", now: "22 of 99; 51 of 163 with causal" },
];

const anyTableNotes = [
  "The engine measured and never inferred: “a 95% confidence interval for p” was refused as no column called confidence interval. It now computes 25 tests exactly, checked against scipy 1.13.1 and statsmodels 0.14.6. Which test applies is decided by the data, the way StatQA's rules decide it: correlation by sample size, contingency by expected counts, variance by normality.",
  "Causal effects: regression adjustment, propensity weighting, nearest-neighbour matching with Abadie-Imbens bias adjustment, difference in differences and two-stage least squares, each matching statsmodels. IHDP's average treatment effect 8 of 10.",
  "Causal discovery reads the data first: local PC around the two variables, Fisher's z or G², alpha 0.01. No edge means no causal relationship, and an edge the data cannot orient is “unsettled”, never a guess. Only then a prior from the variable names, asked twice with the names in both orders and kept only when both agree. It named a direction 30 times in 50 and was right 29. Across 200 discovery questions, 105 to 137.",
  "The ceiling, measured: on the Neuropathic dataset half the true causal pairs are not even marginally dependent in the sample, so no method reading the data alone can find them.",
  "Any table, not only surveys: any column can be broken down by, a name or id is drawn one row per mark, and the variables a question names are matched to columns in one checked call before planning. nvBench had refused 62 of 150 as “no dimension called coach name”.",
  "Columns found by their values. NLSY97 names every column a code (R9793800), so “SAT scores” matched nothing. The model predicts from the words alone where the values would sit, 400 to 1,600, and the columns whose middle lies inside that span replace a link whose values cannot be the thing. NLSY97 refusals 6 to 0.",
];

const wrongAnswers = [
  { arm: "Before the check", right: "68", wrong: "52", asked: "0", refused: "44" },
  { arm: "Read back and judged, one correction", right: "61", wrong: "5", asked: "0", refused: "98" },
  { arm: "With the four fixes for what it stopped", right: "67", wrong: "8", asked: "1", refused: "88", ours: true },
];

const checkNotes = [
  "Of 52 wrong answers, about half computed a different question than the one asked, and said so plainly once read back. “The difference in median earnings between economics and general business majors” computed economics alone.",
  "Every field that changes the number is read back in words, with what execution selected and the weight, and a separate call judges that reading against the question. A failed check binds once more with the problems named, then refuses with “the closest computation does not answer this as asked”.",
  "What it stopped got four fixes: arithmetic across figures split into one-figure questions with the arithmetic in code; a choice only the reader can make became a question with the columns as options; binder misreads; and the check's own false alarms.",
  "Of the 8 still wrong, four differ from the published figure by under 2.5 points on the file as given, two are a measure stored in two forms, and two are a context the question omits.",
  "A longer loop and a stronger checker were measured and rejected. Three rounds against one: same right answers, two more wrong. A bigger model as the check stopped 4 right answers and passed 1 wrong for $0.093, against 2 and 1 for $0.010.",
];

const refusalTrace = [
  { start: "The planner was never told what one row is", example: "every table of published figures planned as respondents", measured: "figure-table surveys 1 to 7 right of 19, 0 wrong" },
  { start: "What an abbreviation means", example: "RECS's electricity bill bound to all energy", measured: "24 columns read for $0.0008; RECS 19 to 22 right, 0 wrong" },
  { start: "A kind named in the plural", example: "“the fake headlines” bound to one headline, 84.39 for 75, and the check passed it", measured: "2 right, 0 wrong" },
  { start: "A filter on a column's only value", example: "one level of study on all 7,836 rows", measured: "0 to 3 right of 7, 0 wrong" },
];

const phase9Results = [
  { bench: "QRData, 20 sampled", start: "6, 2, 12", end: "11, 0, 9" },
  { bench: "StatQA, 20 sampled", start: "7, 1, 12", end: "11, 0, 9" },
  { bench: "Toplines, RECS (29)", start: "19, 0, 10", end: "22, 0, 7" },
  { bench: "Women's clothing reviews (10)", start: "0, 0, 10", end: "6, 0, 4" },
  { bench: "Causal discovery (200), right and wrong", start: "62, 9", end: "58, 5" },
];

const readingNotes = [
  "Seven inference passes guessed what a file means and applied the guess with no record of how sure it was, which numbers it moved, or a way to ask. ADR 0004 replaced that with one decisions.json per run: each reading with its evidence, source (rule, model or reader), confidence, whether it changes numbers or only words, and a status of applied, asked, confirmed or rejected.",
  "The policy: applied where checked and its source knows, or where only words change; asked where it fails its check, two sources disagree, or a guess would move a number. Asking is lazy, so nothing blocks at upload. A pending reading becomes a question only when a question to the ask bar reads that column, and a reader's answer is never overwritten.",
  "A model's stated confidence is not evidence. One reading said it knew the chocolate code L was cocoa liquor; the codebook says lecithin. Meanings are now read twice, the codes in reverse order the second time, and applied only where both agree. Answering Sa = salt made the salt count right, 37.",
  "A rule that asks people questions is a product decision. The list rule first flagged 24 columns, 19 of them single answers containing commas (“Never, but open to it”). Two checks fixed it, and over about 6,500 benchmark columns it now asks on 5, all real lists the rules missed.",
  "The check is only as good as what it is shown. Wrong answers that passed had one thing in common: the reading never said the fact that made them wrong, such as a test's sign or what a share is out of. Each line added fixed a class. A judge that reasons talks itself into a plausible reading: one wrong plan passed 4 times in 6 with low reasoning and 0 in 6 without, so the check never reasons and every change to it is rerun six times against a known-wrong plan.",
  "The grammar grew where refusals were capabilities. A survey-weighted regression coefficient reproduces R's svyglm to 1e-5 relative. A CSV holds no factor order, and sorted levels gave 1,362.87 for a published 938.74, so an unstated reference level is a question back rather than a guess.",
  "A different kind of data: product reviews over 23,486 rows. Product ids were binned as amounts, short tag lists read as prose, and a date in a title filtered unrelated questions to May. Each became a rule, not a case.",
];

const moreModel = [
  { setting: "gpt-5.6-luna, no reasoning", right: "6 of 19", cost: "~$0" },
  { setting: "gpt-5.6-luna, low reasoning", right: "6 of 19", cost: "$0.44" },
  { setting: "GPT-6 Luna for everything", right: "4 of 19", cost: "$0.20" },
  { setting: "GPT-6 Sol as the binder only", right: "4 of 8", cost: "$0.62" },
];

const noise = [
  { run: "Right of 29", a: "24", b: "20", c: "23", d: "23" },
  { run: "Wrong", a: "1", b: "0", c: "0", d: "2" },
];

const layerNotes = [
  "Full runs cost $1.20 to $1.80 and moved up to 10 questions from rebinding alone, too noisy and too dear to judge a change by. So a hard set of 19 questions right at most a third of the time, plus 11 sentinels that were right in every run, became a standing set of 30 at under $0.50 a run.",
  "The flipping questions had one cause in common: a fact about the file reached one component and not another. A fish oil study's description defines myocardioal_infarction as a heart attack, and no component was told. A drug-use file's units reached the binder and not the check. Every component now reads one pull interface over the run's facts, each fact with its source, moved in six steps and proved by snapshot diffs of 307 plan readings, 21 binder prompts and 307 validator verdicts.",
  "Columns have capabilities, not one kind (ADR 0005): a 0/1 column could not be averaged into a rate, and a year written as a number read as summable.",
  "A relational core sits under the grammar (ADR 0006): steps a model writes and code compiles to SQL, every token looked up, never pasted. Tried as the main path it scored 112 of 129 with 6 wrong against 117 with 1, so it stays a fallback and a second opinion. A plan that passed only after a correction was wrong 2 times in 14, against 2 in 99 for a first pass, so a corrected plan is shown only where the core computes it again and agrees.",
  "A check's objection is a claim to settle (ADR 0007), checked against the file before it can stop a plan. When two computations disagree, both are read as the same ingredients (rows kept, measure, statistic, groups, weighting) and a side is chosen only where every difference points to it.",
  "Worked examples learned from verified answers, the same idea as DAIL-SQL's example selection: up to three past plans by the question's form, only from other files, each hand-authored one executed against the raw file before it went in. The store grew from 186 to 202.",
  "A second judge on another model was measured and rejected: over 56 corrected plans it stopped 26 of 46 right ones and still passed 1 of 3 wrong.",
  "Result: the standing set went from 18 of 30 (60%) at the start of the phase to 27 of 29 (93%) with 0 wrong, for $0.08, mostly cached and so probably a couple high. A full fresh run of all three benchmarks then scored toplines 117 of 129, QRData 14 of 20 and StatQA 17 of 20, with 5 wrong: 2 are benchmark golds and 3 are now refused and repaired in code. It cost $2.57 against a $1.50 estimate.",
];

const benchmarks = [
  { bench: "StatQA", measures: "which statistical test applies, over which columns", latest: "68% of 100, against GPT-4o's best of 64.83%; 17 of 20 in the last full run" },
  { bench: "QRData", measures: "statistical and causal questions over textbook and paper data", latest: "14 of 20; causal discovery 58 right, 5 wrong of 200" },
  { bench: "Published toplines", measures: "164 figures from GSS, ANES, RECS and others, within 0.5 points", latest: "117 of 129, 2 wrong" },
  { bench: "nvBench 2.0", measures: "ambiguous chart requests with several valid answers", latest: "refusals 93 to 43 of 150, chart type ~82%" },
  { bench: "VisEval", measures: "plain-language chart requests, gold data", latest: "33 of 60" },
  { bench: "BLADE", measures: "expert analyses of research datasets", latest: "7 of 9" },
  { bench: "DiscoveryBench", measures: "relationships a domain expert asked about", latest: "14 of 62, then 23 after stale runs were recompiled" },
  { bench: "InsightBench", measures: "planted findings shown on the page", latest: "2 of 19, Opus 5.5 blind 1" },
  { bench: "VisJudge-Bench", measures: "calibrates our judge, does not score us", latest: "Pearson 0.63 with experts, 0.90 with itself" },
  { bench: "Three-way, built", measures: "the charts a survey's own authors published, against Opus 5.5 blind", latest: "21 / 6 / 1 same / partial / none; Opus 3 / 12 / 13" },
  { bench: "Held-out, built", measures: "12 surveys, 115 published claims: understood, computed, shown, leading", latest: "112, 99, 62, 43" },
  { bench: "Standing set, built", measures: "the 19 hardest questions plus 11 sentinels", latest: "27 of 29 (93%), 0 wrong" },
];

const techniques = [
  { name: "Typed intent, compiled", changed: "The analyst writes a typed intent (figure, about, answers, groupBy, among) as one forced tool call, and code compiles it into a plan with no model in between. Rates came out the right way round 36 of 40 times, against 3 of 28 when a second model read a sentence back." },
  { name: "Refuse a different question", changed: "A plan must use a column the intent named, or it is refused with “the bound plan answers a different question: it uses X, not Y”. 13 of 31 old plans had silently used none of them." },
  { name: "The survey model", changed: "Profile, propose, verify, compile. A model proposes types and roles, voted three times, and each claim is verified on the rows: 95% of values on the scale, Cronbach's alpha 0.6 or more for a battery, a reversed item found by negative item-rest correlation. Where rules and model disagree, rules win and the evidence is shown. Types 25 of 29 to 29 of 29, $0.0012 to $0.0018 a survey." },
  { name: "An editable schema", changed: "Every answer with its n, position and kind (answer, off scale, missing), every field with its source. Marking religion's “None of these” as missing took the base from 1,039 to 797 and the opening chart from “None of these 23.3%” to “Protestant 29.4%”. Edits replay over every rebuild." },
  { name: "Banner table, drop reasons", changed: "Every question, item and option against up to 12 splits, tested by type (Welch t, two-proportion z, NPS z), never by a model, under two Benjamini-Hochberg families. Every row not drawn ships with its reason: not significant, reversed, drawn elsewhere and six more." },
  { name: "Derive recipes", changed: "Derived columns (thresholds, bands, any-of, quantiles) are tried on the rows first, stored as a recipe and replayed on every publish, so a derived column is an ordinary dimension in every chart, filter and audit. Publish had never replayed the recipe before." },
  { name: "Number-token valve", changed: "Every number in model prose must equal a computed fact, token for token. “About 18%” for 17.8% fails, and so does 13.0 for 13. A failing sentence is handed back once, then stripped." },
  { name: "Eliminate, then rank", changed: "The Draco 2 pattern. Rules remove every mark the data cannot honestly carry, each with a reason; a model ranks the survivors only for combo, heatmap, area or pie, guided by published style guides (UK Analysis Function, Datawrapper, Urban, Pew). A timeout or a bad answer keeps the rules' chart." },
  { name: "One mark catalogue", changed: "Each mark lists what it requires (direction, hierarchy, spread, series, pairs) and whether an unmet need refuses or caveats. Every menu, the analyst's included, is generated from it, and a missing mark fails the compile." },
  { name: "Shape detector", changed: "Respondent, long, entity, period, long table or crosstab, read over every row: 51 of 52 files, where a model shown headers and 20 rows got 41. A crosstab cell becomes its row's weight, so a share is cell over row." },
  { name: "Typing from evidence", changed: "Negative codes −1 to −9 among small positives are no answer (26 ANES columns), a code column that maps one to one onto a labelled one is a twin, and a weight is found by name plus shape: on 10 of 10 files that ship one, from 0." },
  { name: "Outcome-first page", changed: "One sentence of goal, parsed with no model, names the outcome. Charts that only describe who answered, or show a small effect (Cohen's h under 0.2), are held back with their reason, never deleted." },
  { name: "Checking the output", changed: "An audit recomputes every chart from the raw CSV with none of the engine's code; conservation re-reads the file with DuckDB's own parser and warns past 0.5% loss; contract checks fail on bare codes and packed tick-all answers. One command runs all three." },
  { name: "Cache and replay", changed: "Every model answer is cached by a hash of model and request, so an A/B test changes exactly one thing, and the intake recipe replays every model decision: 0 divergences over 30 export shapes." },
  { name: "Populations first", changed: "Up to 20 “among X who Y” groups from the questionnaire alone, kept if 50 or more people but under 95% fall in. Each becomes a split, never tested against the questions that define it." },
  { name: "Figures beyond the grammar", changed: "Share of answers, ranked first and correlation, computed over rows. Star Wars: Empire ranked first by 35.9% of the 471 who saw all six films, against a published 36%." },
];

const ruleChecks = [
  { rule: "R1", catches: "averaged codes" },
  { rule: "R2", catches: "unlabelled codes" },
  { rule: "R3", catches: "an id as a variable" },
  { rule: "R4", catches: "a column recoded into itself" },
  { rule: "R5", catches: "years pooled with no time axis" },
  { rule: "R6", catches: "over 40 categories" },
  { rule: "R7", catches: "shares off the CSV" },
  { rule: "R8", catches: "one variable cut twice" },
  { rule: "R9", catches: "overlapping bands" },
];

const trace = [
  { step: "1 Shape", what: "respondent, read over all 1,470 rows: no weight, no clock" },
  { step: "2 Typing", what: "43 questions (35 columns, 8 derived): 16 numeric, 12 rating, 7 yes/no, 7 single choice, 1 id, each with a reason. Over18 named a constant; 9 scales flagged with no declared direction" },
  { step: "3 Roles", what: "domain read as employee attrition: 11 segment, 11 behaviour, 9 outcome, 8 background, 4 identifier, for $0.0051" },
  { step: "4 Analyst", what: "12 analyses in one call, $0.0017. “What share of employees left, by whether they work overtime?” as figure share, about Attrition, answers Yes, groupBy OverTime" },
  { step: "5 Plan", what: "compiled from the intent, no binder call" },
  { step: "6 Banner", what: "5,444 comparisons tested, 386 significant. 1,436 not drawn, each with a reason; the same pair the wrong way round dropped as reversed" },
  { step: "7 Chooser", what: "the analyst asked for a dumbbell; 9 marks eliminated with reasons (“trend: needs a clock”), no ranking call needed" },
  { step: "8 Bars", what: "16 charts drawn; work-life balance by overtime held back as a small effect, 1.5% of the average" },
  { step: "9 Chart", what: "30.5% of overtime workers left against 10.4%, the published figure, every point carrying its fact id" },
  { step: "10 Audit", what: "from the raw CSV with none of the engine's code: 13 of 13 checkable charts match" },
];

const traceNotes = [
  "The trace found three defects. 12 republished runs held another run's analyst file, so 11 of 12 analyses were refused; a page whose plans name another run is now refused outright.",
  "The intent's percent unit never reached a dumbbell or a line, which plotted counts on an axis titled “Responses”. They now plot each group's share.",
  "A generic headline, “‘Yes’ is most common among Yes (30.5%)”, became “Attrition ‘Yes’: 31% among those with overtime work against 10% among those without”.",
];

const askEngines = [
  { engine: "Adaptive, a typed question graph", answered: "47%", numeric: "43%", charts: "25", cost: "$0.0770" },
  { engine: "Chat, a model calling tools", answered: "67%", numeric: "43%", charts: "7", cost: "$0.0326" },
];

const askLimits = [
  { limit: "Model calls", value: "24" },
  { limit: "Tokens", value: "40,000" },
  { limit: "Execution", value: "60,000 ms" },
  { limit: "Result cells", value: "10,000" },
  { limit: "Parts in one question", value: "32" },
  { limit: "Dollars", value: "$0.05" },
];

const substitute = [
  { signal: "Jaro-Winkler string similarity at 0.85", pass: "0 of 18", nonsense: "0 of 10" },
  { signal: "Embedding cosine at 0.40", pass: "14 of 18", nonsense: "1 of 10" },
];

const askNotes = [
  "Two paths, one live. Chart from a question is always on: the sentence becomes a plan, the model sees no rows, layout words like “stacked” become a preference, and a refusal gets one retry with a hint built from its own reason. The ask agent, with prose, parts and clarifications, sits behind a flag.",
  "The planner splits a question into a typed graph of parts in one forced-schema call, then code settles the routing by re-reading each part with the deterministic cascade. If a reader asked for causal inference and the split dropped it, a declined part is put back so it is refused by name. Regex alone caught 2 of 12 causal phrasings.",
  "Parts whose dependencies have settled run as a batch, and time is a maximum per batch, not a sum: the serial sum had deferred part 4 of every question. A dependency hands over its plan, never its numbers. Cascading failures had been 37.4% of gap reports.",
  "Every refusal carries its remedy: 731 of 731 cached refusals had one. Refusal is a ladder (substitute, decompose, sample, extend, request) where each rung must clear separate floors for safety, feasibility, cost and fidelity rather than one weighted total.",
  "Streaming sends server-sent events from the one funnel that all 11 ways a part can end go through, and the final event is exactly the non-streaming response. The plan arrives 1.7 to 3.0 s in.",
  "One deadline covers the whole question and every model call in it, after one Bedrock call held a socket for over seven minutes and nothing noticed.",
  "At most one clarifying question, ranked by how much the answer would swing minus its cost. Answers come back structured; appending “Answer: X” to the text had reached nothing. A question matching a panel already on screen is answered from that panel's plan for $0. The most any completed question has spent is 7 calls and $0.0058.",
];

const stageTimes = [
  { stage: "check", before: "180.3", after: "1.6" },
  { stage: "review", before: "142.4", after: "1.3" },
  { stage: "label", before: "105.2", after: "76.8" },
  { stage: "read", before: "68.1", after: "1.2" },
  { stage: "whole execution", before: "500", after: "84.6", ours: true },
];

const deployNotes = [
  "Pointer, not payload. Step Functions passes at most 256 KB between states, and 102 rows plus a 201-card codebook exceed it before any label exists, so state carries a run id and a bucket and each task loads its workspace from S3.",
  "Standard, not Express, because Express caps a run at 5 minutes and labelling a full corpus takes longer. Every task retries once with backoff, and a repair loop is a Choice state plus a counter.",
  "Four stages now call their tool directly because their tool order never varied. The check stage's one sum had taken 116 s, 178 s, 336 s and 3.9 s across four runs, and one attempt died on the agent runtime's 120 s initialisation limit while Lambda's own start took 641 ms.",
  "30 of 32 successful executions had no usable local run, because collecting results lived only at the tail of a poll loop that a dev-server reload killed. Runs are now recovered on read and at boot, and only by a process that owns no live poll. A tool that rebuilt the manifest was rejected: a wrong graph hash is worse than no run.",
  "Bundling traps: every stage died at load until the ESM bundle gained a createRequire banner, and a Mac-built DuckDB layer shipped no Linux binary until the arm64 binding was named outright.",
];

const dataClasses = [
  { kind: "Catalog: registry, codebook versions, index", size: "KB", grows: "surveys" },
  { kind: "Facts: the numbers a page reads", size: "36 to 108 KB a run", grows: "codebook by dimensions" },
  { kind: "Payload: verbatims, per-row labels", size: "560 B to 7.1 KB a row", grows: "rows" },
];

const formats = [
  { format: "JSON", size: "28,049 KB", agg: "31.6 ms", point: "27.7 ms", scan: "55.5 ms", fts: "n/a" },
  { format: "Parquet", size: "2,301 KB", agg: "1.5 ms", point: "3.2 ms", scan: "31.5 ms", fts: "n/a" },
  { format: "Lance", size: "7,596 KB", agg: "12.2 ms", point: "4.7 ms", scan: "9.4 ms", fts: "22.4 ms", ours: true },
];

const storageNotes = [
  "At 25,000 rows a survey holds 14 to 178 MB of payload against about 150 KB of facts, and 50 such surveys cost $0.20 a month in S3. A page only ever reads the facts.",
  "Lance over Parquet, measured on 114,000 real rows: Parquet wins aggregation, but this table is searched and drilled into, and 3.3 times Parquet's bytes buys full-text search, vector search, versioning and cheap new columns, read straight from S3. A count in 461 ms, vector search 798 ms cold.",
  "A run id is a hash of the content, the columns and the codebook, after two survey rounds both saved as export.csv minted the same id and the second overwrote the first.",
  "Only a new round may claim that topics moved. A relabel or a recode of the same rows cannot present itself as a trend, and comparison refuses across codebook versions that share a name.",
  "Caching was measured, not assumed. A 4.2 MB facts file was parsed 21 times per analysis; a parse cache took one analysis from 188 ms to 49 ms. One call now clears every cache for a run, after a reviewer's accept changed no number until a restart. A connection created without memoising its promise gave N callers N databases, and a seven-round comparison drew 3 timelines.",
  "A DuckDB fast path threw on 100% of calls behind an empty catch. Repaired, it was still slower than plain JSON parsing, 2.1 ms against 0.3, so it was deleted.",
];

const routes = [
  { route: "/upload", shows: "the four-step wizard: file, profile, codebook, label" },
  { route: "/analysis", shows: "the canvas, filters, ask dock and chart builder" },
  { route: "/data", shows: "every response with its codes and sentiment" },
  { route: "/schema", shows: "every answer of every column, its kind and position, editable" },
  { route: "/model", shows: "one role per question, editable" },
  { route: "/surveys", shows: "every instrument, its rounds and lineage" },
  { route: "/codebooks", shows: "every vocabulary, its versions, an editor" },
  { route: "/governance", shows: "codelists, typing overrides, the audit log" },
];

const appNotes = [
  "Nuxt 4 draws the pages and NestJS serves 70 routes in 11 modules, wrapping the same handlers the CLI calls. The web app takes types from the shared contract, never runtime values. Dashboards, filters, the builder and every chart post a plan and make 0 model calls.",
  "The upload wizard went from one 2,340-line page to 329 lines over one injected state. The codebook fit check used to print “PASS 0.648 mean coverage of 37 responses by 54 codes”; each signal now names its question and the line it had to clear.",
  "The dashboard is a 12-column drag-and-drop grid where arranging is a mode and every drag has a click equivalent. Gravity cut how far untouched panels travel from 272 rows to 123.",
  "The chart builder replaced the hidden ask agent as the way to make a chart: metric, breakdown, mark and style from menus, no model. Its style controls are reader problems, not Vega knobs: 84 Vega-Lite settings became 38 named faults.",
  "Clicking a mark opens the responses behind it, with codes as chips and verbatims as quotes. The full data table at 1,691 rows had put 24,684 nodes in the page; a 150-row window cut scroll height from 122,537 px to 10,556.",
  "Charts arrive as a spec, never an image, and render through a closed switch over the contract's marks, so an unknown mark explains itself instead of drawing blank. Exports cover PNG, JPG, SVG, CSV and PDF, and the printed report is assembled by the same code the CLI uses.",
  "Legibility was a contract field, not a CSS fix: labels had been scored for width at 1,076 px and drawn at 288, and panels of the same height had tops at six different positions. Seven browser checks guard it.",
  "One honest miss: the review queue held 55 rows and 0 were ever reviewed, because Keep sent an empty code list and was refused. It is not offered now.",
];

/* "01  Timeline" -> rail label "Timeline" with its ordinal, the title as the section's statement */
function Section({ eyebrow, title, children }: { eyebrow: string; title: string; children: React.ReactNode }) {
  const [, num, label] = eyebrow.match(/^(\d+)\s+(.+)$/) ?? [, undefined, eyebrow];
  return (
    <UiSection num={num} title={label} statement={title}>
      <div className="space-y-6">{children}</div>
    </UiSection>
  );
}

function Notes({ items }: { items: string[] }) {
  return <Points items={items} />;
}

function NamedList({ items }: { items: { name: string; changed: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          className="grid gap-x-6 gap-y-1 py-3 sm:grid-cols-[11rem_1fr]"
        >
          <span className="text-[15px] font-semibold leading-relaxed text-foreground">
            {item.name}
          </span>
          <span className="t-body text-muted-foreground">{item.changed}</span>
        </li>
      ))}
    </ul>
  );
}

function Rules({ items }: { items: { rule: string; cost: string }[] }) {
  return (
    <ol>
      {items.map((item, i) => (
        <li
          key={item.rule}
          className="grid grid-cols-[2rem_1fr] gap-x-3 py-3"
        >
          <span className="t-count !ml-0 pt-1 !align-baseline">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="t-body font-medium text-foreground">{item.rule}</span>{" "}
            <span className="t-body text-muted-foreground">{item.cost}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

// Count header cells so narrow tables wrap to fit and wide ones scroll with an edge fade
function headerCols(children: React.ReactNode): number {
  let n = 0;
  Children.forEach(children, (c) => {
    if (!isValidElement(c) || c.type !== "thead") return;
    Children.forEach((c.props as { children?: React.ReactNode }).children, (tr) => {
      if (isValidElement(tr)) n = Math.max(n, Children.count((tr.props as { children?: React.ReactNode }).children));
    });
  });
  return n;
}

function Table({ children }: { children: React.ReactNode }) {
  const fit = headerCols(children) <= 3;
  const ref = useRef<HTMLDivElement>(null);
  const [edge, setEdge] = useState({ l: false, r: false });
  useEffect(() => {
    const el = ref.current;
    if (!el || fit) return;
    const update = () =>
      setEdge({ l: el.scrollLeft > 2, r: el.scrollLeft + el.clientWidth < el.scrollWidth - 2 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [fit]);
  if (fit) return <table className="ui-table ui-table-fit">{children}</table>;
  return (
    <div ref={ref} className="ui-table-scroll" data-l={edge.l || undefined} data-r={edge.r || undefined}>
      <table className="ui-table">{children}</table>
    </div>
  );
}

function Th({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return <th className={accent ? "!text-primary" : ""}>{children}</th>;
}

export default function SurveyAgentsCaseStudy() {
  return (
    <Shell
      header={
        <PageHeader eyebrow="Case study, 2026, internal platform POC" title="Survey Agents" />
      }
    >
      <div className="pt-10">
            <p className="t-h3 max-w-[40rem] !font-semibold !leading-snug text-foreground">
              Ask any dataset a question in plain English and get an answer you can make a
              decision on.
            </p>
            <p className="t-lead mt-5 max-w-[40rem]">
              Every number is computed by code, cited back to the rows it came from, and read
              back in words to be checked before anyone sees it. When the platform is unsure, it
              asks instead of guessing. It reads files the way their authors meant them, from
              survey-tool exports to a 51,280-person federal survey, runs statistical tests and
              causal estimates that match scipy and statsmodels, and is held against public
              benchmarks and Claude Opus 5.5 working blind. Twelve agents and 2,435 commits in
              seven weeks, owned end to end from architecture to deployment.
            </p>

            <Stats className="mt-14" items={impact.map((x) => [x.value, x.label])} />

            <div className="mt-12">
              <NamedList items={highlights} />
            </div>

            <p className="t-meta mt-10 max-w-[40rem]">
              It began as one question, asked honestly rather than flatteringly: does agentic
              architecture beat three direct API calls, and what does the reliability actually
              cost? The answer turned out to depend entirely on what you give the agent to
              decide. Total Bedrock spend across the first AWS phase: $0.31. Every figure below
              comes from the project&apos;s own measurement logs, where each one names the run it
              was taken from.
            </p>

            <Stats className="mt-10" items={stats.map((x) => [x.value, x.label])} />

          <div>
            <Section eyebrow="01  Timeline" title="Ten phases, ten verdicts">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The labelling question was answered in about three weeks and the answer was
                largely negative about architecture. The project then moved up a layer to the
                question that was actually open: once responses are coded, how does anyone ask
                a question of them and get a consistent, cited, drawable answer. A fourth phase
                asked whether any of it survives a file the code has never seen, and a fifth
                handed the choice of analyses to an agent. The next five held it against a strong
                model working blind, gave every column one meaning in one place, opened it to any
                table with statistical tests and causal estimates, and made every answer pass a
                check before it is shown. Phases overlap, and the commit distribution is heavily
                back-loaded: 133 in August, 1,774 in September and 528 in the first eight days of
                October.
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Phase</Th>
                    <Th>Dates</Th>
                    <Th>The question</Th>
                    <Th accent>Verdict</Th>
                  </tr>
                </thead>
                <tbody>
                  {phases.map((ph) => (
                    <tr key={ph.phase}>
                      <td className="whitespace-nowrap">{ph.phase}</td>
                      <td className="whitespace-nowrap">{ph.dates}</td>
                      <td>{ph.question}</td>
                      <td className="!text-foreground">{ph.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="02  Design principle" title="The agent decides; the tool computes">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Each workflow stage is an agent, and every deterministic operation is a tool.
                Report figures come from code, never model arithmetic: the model chooses the
                operation, and the tool computes the result. This prevents unsupported
                model-generated figures from passing the verification boundary.
              </p>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                <span className="ui-code">verify_citations</span> is that
                rule executable. Every figure in drafted prose must resolve to a fact produced by
                the analytics stage. If it does not, the sentence is redrafted and then removed.
                The model writes the sentence; deterministic code verifies the number.
              </p>

              <ToolMatrix />

              <ToolBudget />

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Every loop declared its exit condition before it was written, and a global spend
                budget is checked before every stage and inside the long ones, so exceeding it
                halts with partial results instead of truncating in silence.
              </p>
            </Section>

            <Section eyebrow="03  Architecture" title="Where it runs, what it passes">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Two paths over one store. The write path turns an upload into facts on Step
                Functions in minutes; the read path turns a question into a cited chart in
                milliseconds to seconds. Ports keep the tools and agents identical on a laptop and
                on AWS.
              </p>
              <SystemArchitecture />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Inside, five layers pass typed JSON. A model chooses and words things; code
                computes, checks and replays. A dashboard panel posts the plan a model would have
                written, so it never calls one.
              </p>
              <AiPipeline />
              <Table>
                <thead>
                  <tr>
                    <Th>Contract</Th>
                    <Th>What it is</Th>
                    <Th>Fields</Th>
                  </tr>
                </thead>
                <tbody>
                  {contracts.map((c) => (
                    <tr key={c.name}>
                      <td className="whitespace-nowrap !text-foreground">{c.name}</td>
                      <td>{c.what}</td>
                      <td>{c.fields}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="04  Orchestration" title="The workflow graph is versioned data">
              <AgentGraph />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Nodes, edges, verdicts, capability gates and fan-out parameters are declared in
                one JSON file, and the Step Functions definition is generated from that source of
                truth. Two deployments compile from the same graph: one binds each
                node to a Lambda, and the other binds it to an AgentCore runtime. Both are gated at load
                time, so an edge to a node that does not exist fails before a run starts rather
                than halfway through one.
              </p>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Node ids in the graph are stage names bound to agent handlers, so{" "}
                <span className="ui-code">read</span> invokes intake,{" "}
                <span className="ui-code">check</span> invokes qa,{" "}
                <span className="ui-code">count</span> invokes analytics
                and <span className="ui-code">report</span> invokes
                conclude. One dispatch table holds the binding, so a rename cannot update the
                graph and miss the runtime. Curate, adjudicate, analysis and viz run outside this
                labelling graph, on the ask path.
              </p>
            </Section>

            <Section eyebrow="05  Intake" title="Five gated stages, one replayable recipe">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The orchestrator is ordinary code. A model is consulted only where the rules are
                visibly unsure, and every decision it makes lands in one JSON recipe that
                replays without it.
              </p>

              <Table>
                  <thead>
                    <tr>
                      <Th>Stage</Th>
                      <Th>Decides</Th>
                      <Th>Gated on</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {stages.map((s) => (
                      <tr key={s.stage}>
                        <td className="whitespace-nowrap">{s.stage}</td>
                        <td>{s.decides}</td>
                        <td>{s.gate}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Measured over 30 export shapes written by hand from what real tools emit:
                Qualtrics&apos; three header rows, an Excel merged-cell header, a Salesforce
                report with a title block and totals footer, pandas&apos; index column, CP1252
                smart quotes, UTF-16BE, a caret-delimited mainframe extract. Rules alone read 27
                of 30. Rules plus the agent read 30 of 30, asking on 4 files for $0.0015, with
                zero replay divergences.
              </p>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The case for the agent is one file. The one it fixed in the final, written-
                afterwards batch was delimited with a caret, which is not one of the four
                candidates the sniffer tries and never will be. Not that the model is cleverer
                than the rules, but that the rules are a list and a caret is not on it.
              </p>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The result worth keeping is the held-out batch&apos;s first run: 8 of 10 with and
                without the agent. It added nothing, not because it was wrong but because it was
                never asked. Both failures scored above the trigger, so the weak part was the
                gate, not the model, and only a held-out run shows that. Asking four times as
                often (27 files instead of 6, $0.0099 instead of $0.0023) produced identical
                results, because a proposal that does not raise the stage&apos;s score never
                reaches the recipe.
              </p>

              <Notes items={intakeNotes} />
            </Section>

            <Section eyebrow="06  Reliability" title="Where the architecture creates value">
              <Table>
                  <thead>
                    <tr>
                      <Th>Measure</Th>
                      <Th accent>This pipeline</Th>
                      <Th>The pipeline it was benchmarked against</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {reliability.map((r) => (
                      <tr key={r.metric}>
                        <td>{r.metric}</td>
                        <td className="!text-foreground">{r.ours}</td>
                        <td>{r.theirs}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                The mechanism is a per-response correlation token plus a schema enum. An
                out-of-codebook code is unrepresentable rather than discouraged: the prompt this
                replaced threatened a $1,000 penalty for inventing tags and got nine anyway.
                Early on essentially every batch of ten failed to echo its tokens, and each
                failing batch was discarded whole and re-labeled one row at a time, which is
                why correlation integrity is still 100%.
              </p>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                That check is the most transferable result here. Under a count-only check, a
                batch that returns the right number of results in the wrong order is
                indistinguishable from a correct one: every row silently mislabelled, zero
                discrepancies reported.
              </p>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                The flagship structural claim no longer needs us, and saying so is part of the
                finding. Out-of-list tags in raw model output, same prompt, three models:
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Model</Th>
                    <Th>Destroyed tags</Th>
                    <Th>Rate</Th>
                  </tr>
                </thead>
                <tbody>
                  {destroyedTags.map((r) => (
                    <tr key={r.model}>
                      <td className="whitespace-nowrap">{r.model}</td>
                      <td>{r.count}</td>
                      <td className="!text-foreground">{r.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Constrained decoding still guarantees what a current prompt now achieves. That
                distinction matters for a regulated pipeline, but it is a guarantee about a
                failure today&apos;s models do not commit rather than a fix for one they do.
              </p>
            </Section>

            <Section eyebrow="07  Controls" title="Three decisive control runs">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Each control was built after the thing it was meant to check, which is the wrong
                order, and each one moved the conclusion. Same corpus, same scorer, same model
                on every row below.
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Arm</Th>
                    <Th>F1</Th>
                    <Th>Precision</Th>
                    <Th>Recall</Th>
                  </tr>
                </thead>
                <tbody>
                  {controls.map((c) => (
                    <tr key={c.arm}>
                      <td className={c.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>
                        {c.arm}
                      </td>
                      <td className="!text-foreground">{c.f1}</td>
                      <td>{c.prec}</td>
                      <td>{c.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={controlNotes} />

              <p className="t-body max-w-[40rem] text-muted-foreground">
                The machinery&apos;s value showed up in how hard it was to build something
                without it that worked at all, which is not a claim F1 can express.
              </p>
            </Section>

            <Section eyebrow="08  Measurement" title="Model choice mattered more than architecture">
              <Table>
                  <thead>
                    <tr>
                      <Th>Same corpus, same scorer</Th>
                      <Th>F1</Th>
                      <Th>Range over 3 runs</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {f1.map((r) => (
                      <tr key={r.approach}>
                        <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>
                          {r.approach}
                        </td>
                        <td className="!text-foreground">{r.score}</td>
                        <td>{r.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              <Notes items={measurementNotes} />

              <Table>
                <thead>
                  <tr>
                    <Th>Model, baseline prompt</Th>
                    <Th>Codes / row</Th>
                    <Th>F1</Th>
                    <Th accent>Per 100k rows</Th>
                    <Th>Latency</Th>
                  </tr>
                </thead>
                <tbody>
                  {costAtScale.map((r) => (
                    <tr key={r.model}>
                      <td className="whitespace-nowrap">{r.model}</td>
                      <td>{r.codes}</td>
                      <td>{r.f1}</td>
                      <td className="!text-foreground">{r.cost}</td>
                      <td>{r.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Gold density is 1.92 codes per row. This should not be decided on cost: terra is
                both the cheapest of the two capable models and the fastest, and sol has lower
                precision than terra despite being the top tier.
              </p>

              <blockquote className="t-h3 max-w-[38rem] !font-semibold !leading-snug text-foreground">
                The adoption question is not whether the multi-agent pipeline is more accurate.
                It is whether zero destroyed labels, verified correlation, and per-row triage are
                worth the premium. For a handful of rows someone can eyeball, no. For a recurring
                pipeline feeding institutional reporting, where one silently overwritten label
                reaches a stakeholder deck and nothing flags it, several times over. The decision
                turns on consequences, not on F1 alone.
              </blockquote>
            </Section>

            <Section eyebrow="09  Agency" title="Agency's worth, layer by layer">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Three layers were compared over the same tools: a managed agent harness against
                our own loop at the label stage, a state machine against a local driver over
                both harnesses, and three orchestrations of the answering path.
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Label stage, 102 rows</Th>
                    <Th>Coverage</Th>
                    <Th>Turns</Th>
                    <Th>Cost</Th>
                    <Th>Time</Th>
                    <Th>F1</Th>
                  </tr>
                </thead>
                <tbody>
                  {labelHarness.map((r) => (
                    <tr key={r.run}>
                      <td>{r.run}</td>
                      <td className="whitespace-nowrap !text-foreground">{r.rows}</td>
                      <td>{r.turns}</td>
                      <td>{r.cost}</td>
                      <td>{r.time}</td>
                      <td>{r.f1}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Table>
                <thead>
                  <tr>
                    <Th>Answering path, 8 questions</Th>
                    <Th>Answered / traced / charted</Th>
                    <Th>Model calls</Th>
                    <Th>Cost</Th>
                    <Th>Median</Th>
                  </tr>
                </thead>
                <tbody>
                  {answerLoops.map((r) => (
                    <tr key={r.arm}>
                      <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>{r.arm}</td>
                      <td className="whitespace-nowrap">{r.outcomes}</td>
                      <td>{r.calls}</td>
                      <td>{r.cost}</td>
                      <td>{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={orchestrationNotes} />
            </Section>

            <Section eyebrow="10  Analysis" title="Semantic layer, not text-to-SQL">
              <AnswerPath />
              <Notes items={analysisDecisions} />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Scaling is demonstrated with five reproducible proofs rather than slides: 200x
                rows at unchanged ask latency, cross-scope queries over 216 runs in
                milliseconds, replays that call no model at all, namespace and entitlement
                checks, and byte-identical re-execution from a passport.
              </p>
            </Section>

            <Section eyebrow="11  Retrieval" title="The axis nobody scored">
              <Table>
                <thead>
                  <tr>
                    <Th>Arm, k = 10</Th>
                    <Th>R@1</Th>
                    <Th>R@10</Th>
                    <Th>P@10</Th>
                    <Th>MRR</Th>
                  </tr>
                </thead>
                <tbody>
                  {retrieval.map((r) => (
                    <tr key={r.arm}>
                      <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>
                        {r.arm}
                      </td>
                      <td>{r.r1}</td>
                      <td className="!text-foreground">{r.r10}</td>
                      <td>{r.p10}</td>
                      <td>{r.mrr}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={retrievalNotes} />
            </Section>

            <Section eyebrow="12  The data model" title="One narrow fact table">
              <DataModel />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                There is no respondent table on purpose. Cross-survey is an alignment ladder over{" "}
                <span className="ui-code">mapping</span>, never a row-level
                join, because two teams&apos; surveys do not share a respondent.{" "}
                <span className="ui-code">run.respondent_fingerprint</span>{" "}
                exists to prevent one: separate runs routinely carry the same respondents, and
                before that field a pooled breakdown double-counted every one of them while
                reporting a denominator that looked perfectly self-consistent.
              </p>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Stated as it stands, not as it is drawn: no DDL exists. The model is derived from
                the TypeScript interfaces the pipeline already writes, and facts live today as
                JSON per run plus S3 behind a{" "}
                <span className="ui-code">FactStore</span> port. Both
                implementations pass the same ten-test conformance suite, which is what makes the
                Postgres swap a CI run rather than a rewrite.
              </p>
            </Section>

            <Section eyebrow="13  Original mechanisms" title="Designed from first principles">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Recorded deliberately, so it is clear which parts stand on published work and
                which are ours to get wrong.
              </p>
              <NamedList items={ours} />
            </Section>

            <Section eyebrow="14  Visualization" title="Charts are specs, never images">
              <Notes items={chartFindings} />
            </Section>

            <Section eyebrow="15  Question coverage" title="Drew well, answered little">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Phase 4 replaced the question again. Everything up to here scored the chart.
                Nothing scored whether the page said anything about what the survey actually
                asked, which is how 6 of 32 went unnoticed for a month.
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Questions a survey asked, and what the page did with them</Th>
                    <Th accent>Built-in exports</Th>
                    <Th>Unseen survey</Th>
                  </tr>
                </thead>
                <tbody>
                  {questionCoverage.map((r) => (
                    <tr key={r.stage}>
                      <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>
                        {r.stage}
                      </td>
                      <td className="whitespace-nowrap !text-foreground">{r.builtin}</td>
                      <td className="whitespace-nowrap">{r.unseen}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={phase4Notes} />
            </Section>

            <Section eyebrow="16  Relationships" title="Telling a real difference from noise">
              <Notes items={relationshipNotes} />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The ask bar answers &ldquo;is X related to Y&rdquo; from the same screen, including
                the case where the honest answer is that it was tested and there is no difference.
              </p>
            </Section>

            <Section eyebrow="17  Subtraction" title="Cheaper with fewer agents">
              <Notes items={removingAgents} />
            </Section>

            <Section eyebrow="18  The analyst" title="The one place agency clearly won">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Every earlier comparison on this page had the agent tie or lose: same F1 as a
                single prompt, 0 of 41 chart proposals accepted, identical answering outcomes at
                18x the cost. Phase 5 moved agency to a different job. Instead of executing a
                fixed analysis, the agent decides <em>which analyses a survey deserves</em>, and
                deterministic code compiles, computes and guards. On that job it beat its own
                rule baseline by a wide margin, on surveys it had never been tuned on.
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Headlined claims recovered, three draws each</Th>
                    <Th accent>Dev</Th>
                    <Th>Held out</Th>
                  </tr>
                </thead>
                <tbody>
                  {analystScore.map((r) => (
                    <tr key={r.step}>
                      <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>
                        {r.step}
                      </td>
                      <td className="whitespace-nowrap !text-foreground">{r.dev}</td>
                      <td className="whitespace-nowrap">{r.test}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Scored by <span className="ui-code">eval:page</span>{" "}
                against claims recomputed from each file&apos;s published analysis: headlined,
                shown, or missing. 13 public surveys, 43 dev and 29 held-out claims. Held-out
                files are never tuned on, so their misses are read rather than fitted. Two
                variations on the winning arm were measured and rejected: an analyst loop that
                sees its own results and chases them was worse, and taking the union of three
                draws gained one point against a 12-point spread.
              </p>

              <Notes items={analystNotes} />

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Then the honest part. A 20-criterion chart review scored our pages head to head
                against seven published FiveThirtyEight charts, one defect losing the pair.
              </p>

              <Table>
                <thead>
                  <tr>
                    <Th>Head to head, 7 charts</Th>
                    <Th>Reference wins</Th>
                    <Th accent>Ours</Th>
                    <Th>Ties</Th>
                  </tr>
                </thead>
                <tbody>
                  {referenceCharts.map((r) => (
                    <tr key={r.round}>
                      <td>{r.round}</td>
                      <td>{r.ref}</td>
                      <td className="!text-foreground">{r.ours}</td>
                      <td>{r.ties}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Ours wins character favourability: one diverging chart of every answer, sorted,
                headlined with the top and bottom. The references still win the film ranking,
                because a share that ranked each item first beats an average rank, and they win
                the page: 21 charts against five.
              </p>

              <blockquote className="t-h3 max-w-[38rem] !font-semibold !leading-snug text-foreground">
                Read against the rest of this page, the result is not that agents work after
                all. It is that agency pays where the space of right answers is large and
                unenumerable, and does not pay where a rule table already covers it. Choosing
                which of a survey&apos;s questions deserve a chart is the first job here with
                that shape. Executing the chart, coding a response against a fixed codebook and
                sequencing a known pipeline are not, and the agent lost all three.
              </blockquote>
            </Section>

            <Section eyebrow="19  Against Opus 5.5" title="A strong model as the bar">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Judge-free rules over the same ten files, before and after the week&apos;s general
                fixes, against Opus 5.5 given only the raw file.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Ten files, 28 published charts</Th>
                    <Th>Platform, Sep 30</Th>
                    <Th accent>Platform, Oct 1</Th>
                    <Th>Opus 5.5 blind</Th>
                  </tr>
                </thead>
                <tbody>
                  {threeway.map((r) => (
                    <tr key={r.measure}>
                      <td>{r.measure}</td>
                      <td>{r.before}</td>
                      <td className="!text-foreground">{r.after}</td>
                      <td>{r.opus}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={opusNotes} />

              <Table>
                <thead>
                  <tr>
                    <Th>Other datasets, same two arms</Th>
                    <Th>Opus 5.5 blind</Th>
                    <Th accent>Platform</Th>
                  </tr>
                </thead>
                <tbody>
                  {otherBenchmarks.map((r) => (
                    <tr key={r.measure}>
                      <td>{r.measure}</td>
                      <td>{r.opus}</td>
                      <td className="!text-foreground">{r.ours}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Chart choice was also scored against a corpus of published charts from Makeover
                Monday, Our World in Data, The Pudding, NCES and others, and against open-source
                recommenders on the charts each one could answer. Ours first, theirs second.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Recommender</Th>
                    <Th>Mark</Th>
                    <Th>Orientation</Th>
                    <Th>Arrangement</Th>
                  </tr>
                </thead>
                <tbody>
                  {recommenders.map((r) => (
                    <tr key={r.tool}>
                      <td className="whitespace-nowrap">{r.tool}</td>
                      <td>{r.mark}</td>
                      <td>{r.orient}</td>
                      <td>{r.arrange}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="20  Semantic model" title="One place for a column's meaning">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                One <span className="ui-code">semantic-model.json</span> per run (ADR 0003, an
                architecture decision record), written at publish, and a check that counts every
                place today&apos;s code still decides differently from it.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Step</Th>
                    <Th accent>Measured</Th>
                  </tr>
                </thead>
                <tbody>
                  {modelSteps.map((r) => (
                    <tr key={r.step}>
                      <td className={r.ours ? "!text-primary" : ""}>{r.step}</td>
                      <td className="!text-foreground">{r.measured}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={modelNotes} />
            </Section>

            <Section eyebrow="21  Any table" title="Tests, causes, no wrong numbers">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Four more benchmarks, each binding a question with one cached model call and
                scored by code, no judge. Built, they showed the platform answered survey
                questions and little else. The gaps were closed without enumerating cases: no
                table of phrases to columns, no list of variable pairs.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Benchmark</Th>
                    <Th>What it has</Th>
                    <Th>First run</Th>
                    <Th accent>End of phase</Th>
                  </tr>
                </thead>
                <tbody>
                  {builtBenchmarks.map((r) => (
                    <tr key={r.bench}>
                      <td className="whitespace-nowrap">{r.bench}</td>
                      <td>{r.has}</td>
                      <td>{r.first}</td>
                      <td className="!text-foreground">{r.now}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={anyTableNotes} />

              <p className="t-body max-w-[40rem] text-muted-foreground">
                Then a rule: a refusal that says why is acceptable, a wrong number is not.
                Every answer is now read back in words and judged before it is shown.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Toplines, all 164 figures</Th>
                    <Th>Right</Th>
                    <Th accent>Wrong</Th>
                    <Th>Asked the reader</Th>
                    <Th>Refused</Th>
                  </tr>
                </thead>
                <tbody>
                  {wrongAnswers.map((r) => (
                    <tr key={r.arm}>
                      <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>{r.arm}</td>
                      <td>{r.right}</td>
                      <td className="!text-foreground">{r.wrong}</td>
                      <td>{r.asked}</td>
                      <td>{r.refused}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={checkNotes} />
            </Section>

            <Section eyebrow="22  Reading the file" title="Every reading is a decision">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Next, fewer refusals without adding wrong answers, at under $0.50 a cycle. Traced
                to where each refusal started, most began upstream of the stage that reported it:
                what intake decided a column was, what an abbreviation meant, what one row of the
                file stood for. So the work moved from fixing the planner to fixing what the
                planner is told.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Where it started</Th>
                    <Th>Example</Th>
                    <Th accent>Measured</Th>
                  </tr>
                </thead>
                <tbody>
                  {refusalTrace.map((r) => (
                    <tr key={r.start}>
                      <td>{r.start}</td>
                      <td>{r.example}</td>
                      <td className="!text-foreground">{r.measured}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={readingNotes} />
              <Table>
                <thead>
                  <tr>
                    <Th>Right, wrong, refused</Th>
                    <Th>Start of phase</Th>
                    <Th accent>End of phase</Th>
                  </tr>
                </thead>
                <tbody>
                  {phase9Results.map((r) => (
                    <tr key={r.bench}>
                      <td>{r.bench}</td>
                      <td className="whitespace-nowrap">{r.start}</td>
                      <td className="whitespace-nowrap !text-foreground">{r.end}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="23  Semantic layer" title="Fix what every component is told">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Every typed question now takes one settle path. Code computes, a model checks the
                reading, and a stopped plan is corrected once, then split, asked of the reader or
                refused. A plan the grammar cannot express goes to a relational core whose two
                writers must agree.
              </p>
              <SettlePath />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                More model was tried first, cheapest first, on the 19 hardest questions. None of it
                helped. The failures were what the file means and what the check was shown, plus
                two benchmark golds.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Hard set</Th>
                    <Th accent>Right</Th>
                    <Th>Cost</Th>
                  </tr>
                </thead>
                <tbody>
                  {moreModel.map((r) => (
                    <tr key={r.setting}>
                      <td>{r.setting}</td>
                      <td className="whitespace-nowrap !text-foreground">{r.right}</td>
                      <td>{r.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Then how noisy one run is: four standing runs from empty caches, identical code and
                prompts, temperature 0. 16 questions were right in every run and 11 flipped.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Standing set</Th>
                    <Th>A</Th>
                    <Th>B</Th>
                    <Th>C</Th>
                    <Th>D</Th>
                  </tr>
                </thead>
                <tbody>
                  {noise.map((r) => (
                    <tr key={r.run}>
                      <td>{r.run}</td>
                      <td>{r.a}</td>
                      <td>{r.b}</td>
                      <td>{r.c}</td>
                      <td>{r.d}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={layerNotes} />
            </Section>

            <Section eyebrow="24  Benchmarks" title="Scored by code, not by taste">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Every benchmark runs locally. What the plan grammar cannot express is recorded as
                a refusal and reported apart from accuracy, so coverage and correctness are never
                one number.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Benchmark</Th>
                    <Th>What it measures</Th>
                    <Th accent>Latest</Th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((r) => (
                    <tr key={r.bench}>
                      <td className="whitespace-nowrap">{r.bench}</td>
                      <td>{r.measures}</td>
                      <td className="!text-foreground">{r.latest}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="25  Techniques" title="The mechanisms under the scores">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                One rule runs through all of them: a model chooses and words things, code
                computes, checks and replays. Each row is one place that line is drawn.
              </p>
              <NamedList items={techniques} />
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The rule checker scores every arm the same way, with no judge.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Rule</Th>
                    <Th>Catches</Th>
                  </tr>
                </thead>
                <tbody>
                  {ruleChecks.map((r) => (
                    <tr key={r.rule}>
                      <td className="whitespace-nowrap">{r.rule}</td>
                      <td>{r.catches}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="26  Worked trace" title="One file, upload to chart">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                IBM&apos;s public attrition dataset, 1,470 rows by 35 columns, one real run replayed
                with every model answer from cache.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Step</Th>
                    <Th>What happened</Th>
                  </tr>
                </thead>
                <tbody>
                  {trace.map((r) => (
                    <tr key={r.step}>
                      <td className="whitespace-nowrap !text-foreground">{r.step}</td>
                      <td>{r.what}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={traceNotes} />
            </Section>

            <Section eyebrow="27  Ask path" title="A question, settled by code">
              <Table>
                <thead>
                  <tr>
                    <Th>Engine, 75 questions</Th>
                    <Th>Answered</Th>
                    <Th>Numbers right</Th>
                    <Th>Useful charts</Th>
                    <Th>Cost</Th>
                  </tr>
                </thead>
                <tbody>
                  {askEngines.map((r) => (
                    <tr key={r.engine}>
                      <td>{r.engine}</td>
                      <td>{r.answered}</td>
                      <td>{r.numeric}</td>
                      <td>{r.charts}</td>
                      <td>{r.cost}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={askNotes} />
              <Table>
                <thead>
                  <tr>
                    <Th>Budget per question</Th>
                    <Th accent>Limit</Th>
                  </tr>
                </thead>
                <tbody>
                  {askLimits.map((r) => (
                    <tr key={r.limit}>
                      <td>{r.limit}</td>
                      <td className="!text-foreground">{r.value}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <p className="t-body max-w-[40rem] text-muted-foreground">
                The substitute rung swaps a missing column for a close one. String similarity
                ranked it backwards, asteroid~question at 0.617 above tone~sentiment at 0.583.
              </p>
              <Table>
                <thead>
                  <tr>
                    <Th>Signal, 28 pairs</Th>
                    <Th accent>Real matches pass</Th>
                    <Th>Nonsense passes</Th>
                  </tr>
                </thead>
                <tbody>
                  {substitute.map((r) => (
                    <tr key={r.signal}>
                      <td>{r.signal}</td>
                      <td className="!text-foreground">{r.pass}</td>
                      <td>{r.nonsense}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="28  Storage" title="Facts small, payload searchable">
              <Table>
                <thead>
                  <tr>
                    <Th>Data class</Th>
                    <Th>Size</Th>
                    <Th>Grows with</Th>
                  </tr>
                </thead>
                <tbody>
                  {dataClasses.map((r) => (
                    <tr key={r.kind}>
                      <td>{r.kind}</td>
                      <td className="whitespace-nowrap !text-foreground">{r.size}</td>
                      <td>{r.grows}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Table>
                <thead>
                  <tr>
                    <Th>114,000 rows</Th>
                    <Th>Size</Th>
                    <Th>Aggregate</Th>
                    <Th>Point read</Th>
                    <Th>Scan search</Th>
                    <Th>Full text</Th>
                  </tr>
                </thead>
                <tbody>
                  {formats.map((r) => (
                    <tr key={r.format}>
                      <td className={r.ours ? "!text-primary" : "!font-normal !text-muted-foreground"}>{r.format}</td>
                      <td>{r.size}</td>
                      <td>{r.agg}</td>
                      <td>{r.point}</td>
                      <td>{r.scan}</td>
                      <td>{r.fts}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={storageNotes} />
            </Section>

            <Section eyebrow="29  The app" title="Every chart posts a plan">
              <Table>
                <thead>
                  <tr>
                    <Th>Page</Th>
                    <Th>Shows</Th>
                  </tr>
                </thead>
                <tbody>
                  {routes.map((r) => (
                    <tr key={r.route}>
                      <td className="whitespace-nowrap !text-foreground">{r.route}</td>
                      <td>{r.shows}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={appNotes} />
            </Section>

            <Section eyebrow="30  Deployment" title="Where managed services earn their place">
              <Notes items={awsFindings} />
              <Table>
                <thead>
                  <tr>
                    <Th>Seconds per stage, 102 rows</Th>
                    <Th>Through the agent harness</Th>
                    <Th accent>Tool called directly</Th>
                  </tr>
                </thead>
                <tbody>
                  {stageTimes.map((r) => (
                    <tr key={r.stage}>
                      <td className={r.ours ? "!text-primary" : ""}>{r.stage}</td>
                      <td>{r.before}</td>
                      <td className="!text-foreground">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Notes items={deployNotes} />
            </Section>

            <Section eyebrow="31  Method" title="Every component must prove its value">
              <Notes items={earningItsPlace} />
            </Section>

            <Section eyebrow="32  Alternatives" title="Every approach, scored">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Kept as a log rather than a highlight reel, because the rejected rows are the
                ones that cost something to learn.
              </p>

              {alternatives.map((g) => (
                <div key={g.group} className="space-y-3">
                  <p className="t-eyebrow">{g.group}</p>
                  <Table>
                    <thead>
                      <tr>
                        <Th>Approach</Th>
                        <Th>Measured</Th>
                        <Th accent>Verdict</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.rows.map((r) => (
                        <tr key={r.approach}>
                          <td>{r.approach}</td>
                          <td>{r.measured}</td>
                          <td className="whitespace-nowrap !text-primary">{r.verdict}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </Section>

            <Section eyebrow="33  Lessons" title="Fifty lessons that travel">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Most of these are about tool contracts, measurement discipline and reachability
                rather than about surveys, which is what makes them the part of the project that
                travels.
              </p>
              <Rules items={lessons} />
            </Section>

            <Section eyebrow="34  Prior art" title="Twelve passes, then a freeze">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Twelve passes were logged before the analysis code was written, and the phase was
                then closed on purpose: new references land in a parked list with a named trigger
                rather than changing direction mid-build. Later phases took one idea at a time from
                research and measured it here; those are the last eight rows.
              </p>
              <NamedList items={priorArt} />
            </Section>

            <Section eyebrow="35  Limits" title="What is still open">
              <p className="t-body max-w-[40rem] text-muted-foreground">
                Stated here rather than discovered later.
              </p>
              <NamedList items={stillOpen} />
              <p className="t-meta max-w-[40rem]">
                Internal work, so there is no public repository, and the charts on this page are
                redrawn schematics rather than real rendered outputs. Every figure comes from the
                project&apos;s own findings log, where each one names the run it was measured on.
              </p>
            </Section>
          </div>
      </div>
    </Shell>
  );
}
