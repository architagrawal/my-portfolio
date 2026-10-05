"use client";

import Link from "next/link";
import { PageHeader, Shell } from "@/components/site/shell";
import { AgentGraph, ToolBudget, ToolMatrix, AnswerPath, DataModel } from "./_diagrams";

const stats = [
  { value: "290k", label: "lines across 12 packages" },
  { value: "4,077", label: "tests in 412 files" },
  { value: "76", label: "registered tools" },
  { value: "1,307", label: "commits in five weeks" },
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
  "Every arm on this page has the agent executing a known job, and on those it ties or loses. Section 17 is the counter-case: given a job with no enumerable right answer, the same kind of agent beat its rule baseline outright.",
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
  "AgentCore looked like it earned its place at the stage level, where its harness took labeling from partial to complete coverage after our own agent loop stalled, and not at the orchestration level, where the one thing an agentic orchestrator was buying, repair, is a Choice state plus a counter. Repeating that benchmark after the hand-rolled loop was gone removed the stage-level half too: see section 16.",
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
    group: "Charts",
    rows: [
      { approach: "Deterministic mark table, 16 ordered rules", measured: "first match wins, same request draws the same chart", verdict: "shipped" },
      { approach: "Agent proposes the mark", measured: "0 of 36 and 0 of 5 proposals accepted, 0 cases made worse", verdict: "kept behind improve-or-discard, ~$0.002 a pass" },
      { approach: "Agent authors Vega JSON directly", measured: "the rows live inside the spec, so authoring hands the model the data", verdict: "rejected, describeChart is the read-only form" },
      { approach: "Principled two-signal orientation rule", measured: "changed nothing over 3,822 shapes; the whole gain was letting faceted charts turn", verdict: "heuristic kept" },
      { approach: "Refusing charts on taste", measured: "taste is a caveat on the drawn chart; only a false statement is refused", verdict: "policy changed" },
      { approach: "Chat agent behind the ask bar", measured: "replaced by one chart per sentence plus direct controls in the builder", verdict: "agent hidden" },
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
  { name: "Fixture-flavoured constants", changed: "ABSTAIN_WARN_THRESHOLD 0.3, CONTRADICTION_WARN_THRESHOLD 0.1, MIN_CODED_SHARE_FOR_CROSSTABS 0.2, ACCEPT_TIER unanimous, and the CHARS_PER_CODE halving factor. Each is a threshold measured on a corpus smaller than the one it will meet." },
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-tech text-[10px] text-primary mb-4">
      {children}
    </p>
  );
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] text-foreground">
        {title}
      </h2>
      <div className="mt-6 space-y-6">{children}</div>
    </section>
  );
}

function Notes({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-2 w-1.5 h-1.5 bg-primary shrink-0" />
          <span className="text-sm text-foreground/80 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NamedList({ items }: { items: { name: string; changed: string }[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li
          key={item.name}
          className="py-3 grid sm:grid-cols-[15rem_1fr] gap-x-6 gap-y-1"
        >
          <span className="font-tech text-xs text-primary">
            {item.name}
          </span>
          <span className="text-sm text-muted-foreground leading-relaxed">{item.changed}</span>
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
          className="py-3 grid sm:grid-cols-[2rem_1fr] gap-x-4 gap-y-1"
        >
          <span className="font-tech text-[10px] tabular-nums text-primary pt-1">
            {String(i + 1).padStart(2, "0")}
          </span>
          <span>
            <span className="text-sm text-foreground font-medium leading-relaxed">{item.rule}</span>{" "}
            <span className="text-sm text-muted-foreground leading-relaxed">{item.cost}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[36rem] text-left border-collapse">{children}</table>
    </div>
  );
}

function Th({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <th
      className={`font-tech text-[10px] p-3 ${
        accent ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {children}
    </th>
  );
}

export default function SurveyAgentsCaseStudy() {
  return (
    <Shell
      header={
        <PageHeader eyebrow="Case study, 2026, internal platform POC" title="Survey Agents" />
      }
    >
      <div className="pt-6">
            <p className="max-w-2xl text-lg leading-relaxed text-foreground/85">
              Upload any structured dataset and get verified facts, accessible charts and answers
              that re-execute exactly, with no per-dataset pipeline for anyone to build or
              maintain. A reader asks a question in plain English, gets a chart back, and edits
              it directly: stack, sort, top-N, filter, undo. It has since been run on public datasets it was never designed for,
              from Titanic to IBM attrition to FiveThirtyEight&apos;s survey data. Twelve agents,
              five weeks, 1,307 commits, owned end to end from architecture to deployment, and
              built to answer one question honestly rather than flatteringly. Does agentic
              architecture beat three direct API calls, and what does the reliability actually
              cost? The answer turned out to depend entirely on what you give the agent to decide.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80 leading-relaxed max-w-2xl">
              Total Bedrock spend across the first AWS phase: $0.31. Every figure below comes
              from the project&apos;s own measurement logs, where each one names the run it was
              taken from.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-foreground">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-tech text-[10px] text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>

          <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
            <Section eyebrow="01  Timeline" title="Three phases, three verdicts">
              <p className="text-base text-muted-foreground leading-relaxed">
                The labelling question was answered in about three weeks and the answer was
                largely negative about architecture. The project then moved up a layer to the
                question that was actually open: once responses are coded, how does anyone ask
                a question of them and get a consistent, cited, drawable answer. A fourth phase
                asked whether any of it survives a file the code has never seen, and a fifth
                handed the choice of analyses to an agent. Phases overlap, and the commit
                distribution is heavily back-loaded: 124 in August against 1,183 in September,
                with the two heaviest days both in the last week.
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Phase</Th>
                    <Th>Dates</Th>
                    <Th>The question</Th>
                    <Th accent>Verdict</Th>
                  </tr>
                </thead>
                <tbody>
                  {phases.map((ph) => (
                    <tr key={ph.phase} className="border-b border-border last:border-0">
                      <td className="p-3 font-tech text-xs text-primary whitespace-nowrap align-top">{ph.phase}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground whitespace-nowrap align-top">{ph.dates}</td>
                      <td className="p-3 text-xs text-muted-foreground leading-relaxed align-top">{ph.question}</td>
                      <td className="p-3 text-xs text-foreground font-medium leading-relaxed align-top">{ph.verdict}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Section>

            <Section eyebrow="02  Design principle" title="The agent decides; the tool computes">
              <p className="text-base text-muted-foreground leading-relaxed">
                Each workflow stage is an agent, and every deterministic operation is a tool.
                Report figures come from code, never model arithmetic: the model chooses the
                operation, and the tool computes the result. This prevents unsupported
                model-generated figures from passing the verification boundary.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="font-tech text-sm text-primary">verify_citations</span> is that
                rule executable. Every figure in drafted prose must resolve to a fact produced by
                the analytics stage. If it does not, the sentence is redrafted and then removed.
                The model writes the sentence; deterministic code verifies the number.
              </p>

              <ToolMatrix />

              <ToolBudget />

              <p className="text-base text-muted-foreground leading-relaxed">
                Every loop declared its exit condition before it was written, and a global spend
                budget is checked before every stage and inside the long ones, so exceeding it
                halts with partial results instead of truncating in silence.
              </p>
            </Section>

            <Section eyebrow="03  Orchestration" title="The workflow graph is versioned data">
              <AgentGraph />
              <p className="text-base text-muted-foreground leading-relaxed">
                Nodes, edges, verdicts, capability gates and fan-out parameters are declared in
                one JSON file, and the Step Functions definition is generated from that source of
                truth. Two deployments compile from the same graph: one binds each
                node to a Lambda, and the other binds it to an AgentCore runtime. Both are gated at load
                time, so an edge to a node that does not exist fails before a run starts rather
                than halfway through one.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Node ids in the graph are stage names bound to agent handlers, so{" "}
                <span className="font-tech text-sm text-primary">read</span> invokes intake,{" "}
                <span className="font-tech text-sm text-primary">check</span> invokes qa,{" "}
                <span className="font-tech text-sm text-primary">count</span> invokes analytics
                and <span className="font-tech text-sm text-primary">report</span> invokes
                conclude. One dispatch table holds the binding, so a rename cannot update the
                graph and miss the runtime. Curate, adjudicate, analysis and viz run outside this
                labelling graph, on the ask path.
              </p>
            </Section>

            <Section eyebrow="04  Intake" title="Five gated stages, one replayable recipe">
              <p className="text-base text-muted-foreground leading-relaxed">
                The orchestrator is ordinary code. A model is consulted only where the rules are
                visibly unsure, and every decision it makes lands in one JSON recipe that
                replays without it.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <Th>Stage</Th>
                      <Th>Decides</Th>
                      <Th>Gated on</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {stages.map((s) => (
                      <tr key={s.stage} className="border-b border-border last:border-0">
                        <td className="p-3 font-tech text-xs text-primary whitespace-nowrap align-top">{s.stage}</td>
                        <td className="p-3 text-xs text-foreground/80 leading-relaxed">{s.decides}</td>
                        <td className="p-3 text-xs text-muted-foreground leading-relaxed">{s.gate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Measured over 30 export shapes written by hand from what real tools emit:
                Qualtrics&apos; three header rows, an Excel merged-cell header, a Salesforce
                report with a title block and totals footer, pandas&apos; index column, CP1252
                smart quotes, UTF-16BE, a caret-delimited mainframe extract. Rules alone read 27
                of 30. Rules plus the agent read 30 of 30, asking on 4 files for $0.0015, with
                zero replay divergences.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                The case for the agent is one file. The one it fixed in the final, written-
                afterwards batch was delimited with a caret, which is not one of the four
                candidates the sniffer tries and never will be. Not that the model is cleverer
                than the rules, but that the rules are a list and a caret is not on it.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
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

            <Section eyebrow="05  Reliability" title="Where the architecture creates value">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <Th>Measure</Th>
                      <Th accent>This pipeline</Th>
                      <Th>The pipeline it was benchmarked against</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {reliability.map((r) => (
                      <tr key={r.metric} className="border-b border-border last:border-0">
                        <td className="p-3 text-xs text-muted-foreground align-top">{r.metric}</td>
                        <td className="p-3 text-xs text-foreground font-medium align-top">{r.ours}</td>
                        <td className="p-3 text-xs text-muted-foreground align-top">{r.theirs}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                The mechanism is a per-response correlation token plus a schema enum. An
                out-of-codebook code is unrepresentable rather than discouraged: the prompt this
                replaced threatened a $1,000 penalty for inventing tags and got nine anyway.
                Early on essentially every batch of ten failed to echo its tokens, and each
                failing batch was discarded whole and re-labeled one row at a time, which is
                why correlation integrity is still 100%.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                That check is the most transferable result here. Under a count-only check, a
                batch that returns the right number of results in the wrong order is
                indistinguishable from a correct one: every row silently mislabelled, zero
                discrepancies reported.
              </p>

              <p className="text-base text-muted-foreground leading-relaxed">
                The flagship structural claim no longer needs us, and saying so is part of the
                finding. Out-of-list tags in raw model output, same prompt, three models:
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Model</Th>
                    <Th>Destroyed tags</Th>
                    <Th>Rate</Th>
                  </tr>
                </thead>
                <tbody>
                  {destroyedTags.map((r) => (
                    <tr key={r.model} className="border-b border-border last:border-0">
                      <td className="p-3 font-tech text-xs text-primary align-top whitespace-nowrap">{r.model}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.count}</td>
                      <td className="p-3 text-sm tabular-nums text-foreground font-medium align-top">{r.rate}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="text-base text-muted-foreground leading-relaxed">
                Constrained decoding still guarantees what a current prompt now achieves. That
                distinction matters for a regulated pipeline, but it is a guarantee about a
                failure today&apos;s models do not commit rather than a fix for one they do.
              </p>
            </Section>

            <Section eyebrow="06  Controls" title="The three runs that changed the reading">
              <p className="text-base text-muted-foreground leading-relaxed">
                Each control was built after the thing it was meant to check, which is the wrong
                order, and each one moved the conclusion. Same corpus, same scorer, same model
                on every row below.
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Arm</Th>
                    <Th>F1</Th>
                    <Th>Precision</Th>
                    <Th>Recall</Th>
                  </tr>
                </thead>
                <tbody>
                  {controls.map((c) => (
                    <tr key={c.arm} className="border-b border-border last:border-0">
                      <td className={`p-3 text-xs align-top leading-relaxed ${c.ours ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {c.arm}
                      </td>
                      <td className="p-3 text-sm tabular-nums text-foreground font-medium align-top">{c.f1}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{c.prec}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{c.rec}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={controlNotes} />

              <p className="text-base text-muted-foreground leading-relaxed">
                The machinery&apos;s value showed up in how hard it was to build something
                without it that worked at all, which is not a claim F1 can express.
              </p>
            </Section>

            <Section eyebrow="07  Measurement" title="Model choice mattered more than architecture">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[36rem] text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <Th>Same corpus, same scorer</Th>
                      <Th>F1</Th>
                      <Th>Range over 3 runs</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {f1.map((r) => (
                      <tr key={r.approach} className="border-b border-border last:border-0">
                        <td className={`p-3 text-xs align-top ${r.ours ? "text-primary font-medium" : "text-muted-foreground"}`}>
                          {r.approach}
                        </td>
                        <td className="p-3 text-sm tabular-nums text-foreground font-medium align-top">{r.score}</td>
                        <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Notes items={measurementNotes} />

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Model, baseline prompt</Th>
                    <Th>Codes / row</Th>
                    <Th>F1</Th>
                    <Th accent>Per 100k rows</Th>
                    <Th>Latency</Th>
                  </tr>
                </thead>
                <tbody>
                  {costAtScale.map((r) => (
                    <tr key={r.model} className="border-b border-border last:border-0">
                      <td className="p-3 font-tech text-xs text-primary align-top whitespace-nowrap">{r.model}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.codes}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.f1}</td>
                      <td className="p-3 text-sm tabular-nums text-foreground font-medium align-top">{r.cost}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.latency}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="text-base text-muted-foreground leading-relaxed">
                Gold density is 1.92 codes per row. This should not be decided on cost: terra is
                both the cheapest of the two capable models and the fastest, and sol has lower
                precision than terra despite being the top tier.
              </p>

              <blockquote className="font-display text-xl text-foreground leading-snug">
                The adoption question is not whether the multi-agent pipeline is more accurate.
                It is whether zero destroyed labels, verified correlation, and per-row triage are
                worth the premium. For a handful of rows someone can eyeball, no. For a recurring
                pipeline feeding institutional reporting, where one silently overwritten label
                reaches a stakeholder deck and nothing flags it, several times over. The decision
                turns on consequences, not on F1 alone.
              </blockquote>
            </Section>

            <Section eyebrow="08  Agency" title="What agency is worth, layer by layer">
              <p className="text-base text-muted-foreground leading-relaxed">
                Three layers were compared over the same tools: a managed agent harness against
                our own loop at the label stage, a state machine against a local driver over
                both harnesses, and three orchestrations of the answering path.
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
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
                    <tr key={r.run} className="border-b border-border last:border-0">
                      <td className="p-3 text-xs text-muted-foreground align-top">{r.run}</td>
                      <td className="p-3 text-xs tabular-nums text-foreground font-medium align-top whitespace-nowrap">{r.rows}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.turns}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.cost}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.time}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.f1}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Answering path, 8 questions</Th>
                    <Th>Answered / traced / charted</Th>
                    <Th>Model calls</Th>
                    <Th>Cost</Th>
                    <Th>Median</Th>
                  </tr>
                </thead>
                <tbody>
                  {answerLoops.map((r) => (
                    <tr key={r.arm} className="border-b border-border last:border-0">
                      <td className={`p-3 text-xs align-top ${r.ours ? "text-primary font-medium" : "text-muted-foreground"}`}>{r.arm}</td>
                      <td className="p-3 text-xs tabular-nums text-foreground align-top whitespace-nowrap">{r.outcomes}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.calls}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.cost}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.time}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={orchestrationNotes} />
            </Section>

            <Section eyebrow="09  Analysis" title="A governed semantic layer - not text to SQL">
              <AnswerPath />
              <Notes items={analysisDecisions} />
              <p className="text-base text-muted-foreground leading-relaxed">
                Scaling is demonstrated with five reproducible proofs rather than slides: 200x
                rows at unchanged ask latency, cross-scope queries over 216 runs in
                milliseconds, replays that call no model at all, namespace and entitlement
                checks, and byte-identical re-execution from a passport.
              </p>
            </Section>

            <Section eyebrow="10  Retrieval" title="The axis nobody scored">
              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Arm, k = 10</Th>
                    <Th>R@1</Th>
                    <Th>R@10</Th>
                    <Th>P@10</Th>
                    <Th>MRR</Th>
                  </tr>
                </thead>
                <tbody>
                  {retrieval.map((r) => (
                    <tr key={r.arm} className="border-b border-border last:border-0">
                      <td className={`p-3 text-xs align-top leading-relaxed ${r.ours ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {r.arm}
                      </td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.r1}</td>
                      <td className="p-3 text-sm tabular-nums text-foreground font-medium align-top">{r.r10}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.p10}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.mrr}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={retrievalNotes} />
            </Section>

            <Section eyebrow="11  The data model" title="Five bands, one narrow fact table, no respondent table">
              <DataModel />
              <p className="text-base text-muted-foreground leading-relaxed">
                There is no respondent table on purpose. Cross-survey is an alignment ladder over{" "}
                <span className="font-tech text-sm text-primary">mapping</span>, never a row-level
                join, because two teams&apos; surveys do not share a respondent.{" "}
                <span className="font-tech text-sm text-primary">run.respondent_fingerprint</span>{" "}
                exists to prevent one: separate runs routinely carry the same respondents, and
                before that field a pooled breakdown double-counted every one of them while
                reporting a denominator that looked perfectly self-consistent.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                Stated as it stands, not as it is drawn: no DDL exists. The model is derived from
                the TypeScript interfaces the pipeline already writes, and facts live today as
                JSON per run plus S3 behind a{" "}
                <span className="font-tech text-sm text-primary">FactStore</span> port. Both
                implementations pass the same ten-test conformance suite, which is what makes the
                Postgres swap a CI run rather than a rewrite.
              </p>
            </Section>

            <Section eyebrow="12  Original mechanisms" title="What the team designed from first principles">
              <p className="text-base text-muted-foreground leading-relaxed">
                Recorded deliberately, so it is clear which parts stand on published work and
                which are ours to get wrong.
              </p>
              <NamedList items={ours} />
            </Section>

            <Section eyebrow="13  Visualization" title="Charts are specs, never images">
              <Notes items={chartFindings} />
            </Section>

            <Section eyebrow="14  Question coverage" title="The page drew well and answered little">
              <p className="text-base text-muted-foreground leading-relaxed">
                Phase 4 replaced the question again. Everything up to here scored the chart.
                Nothing scored whether the page said anything about what the survey actually
                asked, which is how 6 of 32 went unnoticed for a month.
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Questions a survey asked, and what the page did with them</Th>
                    <Th accent>Built-in exports</Th>
                    <Th>Unseen survey</Th>
                  </tr>
                </thead>
                <tbody>
                  {questionCoverage.map((r) => (
                    <tr key={r.stage} className="border-b border-border last:border-0">
                      <td className={`p-3 text-xs align-top leading-relaxed ${r.ours ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {r.stage}
                      </td>
                      <td className="p-3 text-xs tabular-nums text-foreground font-medium align-top whitespace-nowrap">{r.builtin}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top whitespace-nowrap">{r.unseen}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <Notes items={phase4Notes} />
            </Section>

            <Section eyebrow="15  Relationships" title="Telling a real difference from noise">
              <Notes items={relationshipNotes} />
              <p className="text-base text-muted-foreground leading-relaxed">
                The ask bar answers &ldquo;is X related to Y&rdquo; from the same screen, including
                the case where the honest answer is that it was tested and there is no difference.
              </p>
            </Section>

            <Section eyebrow="16  Subtraction" title="The pipeline got cheaper by removing agents">
              <Notes items={removingAgents} />
            </Section>

            <Section eyebrow="17  The analyst" title="The one place agency clearly won">
              <p className="text-base text-muted-foreground leading-relaxed">
                Every earlier comparison on this page had the agent tie or lose: same F1 as a
                single prompt, 0 of 41 chart proposals accepted, identical answering outcomes at
                18x the cost. Phase 5 moved agency to a different job. Instead of executing a
                fixed analysis, the agent decides <em>which analyses a survey deserves</em>, and
                deterministic code compiles, computes and guards. On that job it beat its own
                rule baseline by a wide margin, on surveys it had never been tuned on.
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Headlined claims recovered, three draws each</Th>
                    <Th accent>Dev</Th>
                    <Th>Held out</Th>
                  </tr>
                </thead>
                <tbody>
                  {analystScore.map((r) => (
                    <tr key={r.step} className="border-b border-border last:border-0">
                      <td className={`p-3 text-xs align-top leading-relaxed ${r.ours ? "text-primary font-medium" : "text-muted-foreground"}`}>
                        {r.step}
                      </td>
                      <td className="p-3 text-xs tabular-nums text-foreground font-medium align-top whitespace-nowrap">{r.dev}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top whitespace-nowrap">{r.test}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="text-base text-muted-foreground leading-relaxed">
                Scored by <span className="font-tech text-sm text-primary">eval:page</span>{" "}
                against claims recomputed from each file&apos;s published analysis: headlined,
                shown, or missing. 13 public surveys, 43 dev and 29 held-out claims. Held-out
                files are never tuned on, so their misses are read rather than fitted. Two
                variations on the winning arm were measured and rejected: an analyst loop that
                sees its own results and chases them was worse, and taking the union of three
                draws gained one point against a 12-point spread.
              </p>

              <Notes items={analystNotes} />

              <p className="text-base text-muted-foreground leading-relaxed">
                Then the honest part. A 20-criterion chart review scored our pages head to head
                against seven published FiveThirtyEight charts, one defect losing the pair.
              </p>

              <Table>
                <thead>
                  <tr className="border-b border-border">
                    <Th>Head to head, 7 charts</Th>
                    <Th>Reference wins</Th>
                    <Th accent>Ours</Th>
                    <Th>Ties</Th>
                  </tr>
                </thead>
                <tbody>
                  {referenceCharts.map((r) => (
                    <tr key={r.round} className="border-b border-border last:border-0">
                      <td className="p-3 text-xs text-muted-foreground align-top">{r.round}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.ref}</td>
                      <td className="p-3 text-sm tabular-nums text-foreground font-medium align-top">{r.ours}</td>
                      <td className="p-3 text-xs tabular-nums text-muted-foreground align-top">{r.ties}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <p className="text-base text-muted-foreground leading-relaxed">
                Ours wins character favourability: one diverging chart of every answer, sorted,
                headlined with the top and bottom. The references still win the film ranking,
                because a share that ranked each item first beats an average rank, and they win
                the page: 21 charts against five.
              </p>

              <blockquote className="font-display text-xl text-foreground leading-snug">
                Read against the rest of this page, the result is not that agents work after
                all. It is that agency pays where the space of right answers is large and
                unenumerable, and does not pay where a rule table already covers it. Choosing
                which of a survey&apos;s questions deserve a chart is the first job here with
                that shape. Executing the chart, coding a response against a fixed codebook and
                sequencing a known pipeline are not, and the agent lost all three.
              </blockquote>
            </Section>

            <Section eyebrow="18  Deployment" title="Where each managed service earns its place">
              <Notes items={awsFindings} />
            </Section>

            <Section eyebrow="19  Method" title="Every component must prove its value">
              <Notes items={earningItsPlace} />
            </Section>

            <Section eyebrow="20  Alternatives" title="Every approach tried, and how it scored">
              <p className="text-base text-muted-foreground leading-relaxed">
                Kept as a log rather than a highlight reel, because the rejected rows are the
                ones that cost something to learn.
              </p>

              {alternatives.map((g) => (
                <div key={g.group} className="space-y-3">
                  <p className="font-tech text-[10px] text-primary">{g.group}</p>
                  <Table>
                    <thead>
                      <tr className="border-b border-border">
                        <Th>Approach</Th>
                        <Th>Measured</Th>
                        <Th accent>Verdict</Th>
                      </tr>
                    </thead>
                    <tbody>
                      {g.rows.map((r) => (
                        <tr key={r.approach} className="border-b border-border last:border-0">
                          <td className="p-3 text-xs text-foreground/80 align-top leading-relaxed">{r.approach}</td>
                          <td className="p-3 text-xs text-muted-foreground align-top leading-relaxed">{r.measured}</td>
                          <td className="p-3 text-xs text-primary align-top leading-relaxed whitespace-nowrap">{r.verdict}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ))}
            </Section>

            <Section eyebrow="21  Lessons" title="Thirty-eight rules, ranked by what each cost">
              <p className="text-base text-muted-foreground leading-relaxed">
                Most of these are about tool contracts, measurement discipline and reachability
                rather than about surveys, which is what makes them the part of the project that
                travels.
              </p>
              <Rules items={lessons} />
            </Section>

            <Section eyebrow="22  Prior art" title="Twelve research passes, then a design freeze">
              <p className="text-base text-muted-foreground leading-relaxed">
                Twelve passes were logged before the analysis code was written, and the phase was
                then closed on purpose: new references land in a parked list with a named trigger
                rather than changing direction mid-build.
              </p>
              <NamedList items={priorArt} />
            </Section>

            <Section eyebrow="23  Limits" title="What is still open">
              <p className="text-base text-muted-foreground leading-relaxed">
                Stated here rather than discovered later.
              </p>
              <NamedList items={stillOpen} />
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
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
