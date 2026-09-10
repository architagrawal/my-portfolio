"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/Footer";

const stats = [
  { value: "74k", label: "lines of TypeScript" },
  { value: "1,021", label: "tests" },
  { value: "253", label: "recorded runs" },
  { value: "40", label: "measured experiments" },
];

const agents = [
  { name: "intake", tools: "profile_csv · detect_header_shape · validate_mapping · emit_dispositions · check_codebook_fit", model: "none" },
  { name: "label", tools: "load_codebook · calibrate_density · build_prefix · verify_correlation · validate_enum · check_sentiment_consistency", model: "label_batch" },
  { name: "qa", tools: "join_integrity · invalid_label_rate · abstain_rate · sentiment_contradictions · outlier_detect · calibrate_threshold · route · requeue_rows", model: "none" },
  { name: "analytics", tools: "count_by · crosstab · coverage · top_n", model: "none" },
  { name: "conclude", tools: "read_facts · verify_citations", model: "draft_summary" },
];

const stages = [
  { stage: "frame", decides: "delimiter, header row, transpose", gate: "framing score below 0.65" },
  { stage: "repair", decides: "split a packed column, reshape a wide export", gate: "nothing to group by, or a wide export" },
  { stage: "retype", decides: "a column whose values fail its own predicate", gate: "typing score below 0.90" },
  { stage: "classify", decides: "is this column personal data", gate: "a column in the ambiguous band" },
  { stage: "review", decides: "does the finished profile make sense at all", gate: "nothing, it takes no action" },
];

const intakeNotes = [
  "22 of 32 real CSVs carry their timestamp inside the identifier column, so every survey built on that corpus reported \"no date column survived intake\" while holding dates the whole time. Constant arity is what tells a compound key from prose.",
  "Files that parse cleanly and are still wrong: UTF-16 headers full of null bytes, a duplicate header silently overwriting a whole column, a 0/1 flag typed as a rating scale, a report title sitting in the header row.",
  "A recovered date is usually the export stamp, not when anyone answered. Where one period holds over 90% of responses the tool refuses the time axis rather than drawing a collapse that is an artefact of when somebody ran an export.",
  "The review stage reads the finished profile instead of each decision, because per-decision gates are blind to upstream bugs. It was verified by reintroducing a sampler defect whose stride aliased against alternating data and silently halved a dimension's values on any file over ~200 rows.",
  "Codebook fit is measured before any labelling spend: question scope is embedded and 25 responses are sample-labelled. The right codebook scores mean best match 0.598 at a 4% abstain rate; the wrong one scores 0.316 at 88%, for about $0.001. Thresholds written from a guess before that calibration would have passed the wrong codebook with a warning.",
];

const reliability = [
  { metric: "Invalid labels", ours: "0, unrepresentable by schema", theirs: "9 invented tags" },
  { metric: "Rows carrying a destroyed label", ours: "0", theirs: "13 of 102 (12.7%)" },
  { metric: "Correlation integrity", ours: "100%, joined per response", theirs: "unverifiable, index-keyed" },
  { metric: "Label churn across two runs", ours: "0.0% (114/114 identical)", theirs: "never measured" },
  { metric: "Numbers in the report", ours: "computed by tools, cited, verified", theirs: "computed by the model" },
  { metric: "Codebook mismatch", ours: "named in intake before spending", theirs: "presents later as an abstain spike" },
];

const f1 = [
  { approach: "Benchmark pipeline, re-run on gpt-4o", score: "0.523", range: "0.462 – 0.581", ours: false },
  { approach: "This pipeline, 5 stages, on luna", score: "0.685", range: "0.673 – 0.699", ours: true },
  { approach: "Benchmark pipeline, on luna", score: "0.692", range: "0.663 – 0.706", ours: false },
  { approach: "Benchmark pipeline, on gpt-5.5", score: "0.753", range: "0.735 – 0.770", ours: false },
];

const measurementNotes = [
  "Model choice moves F1 by 0.230 on a fixed prompt. The architecture moves it by −0.007 at fixed model. Any conversation about accuracy should start with the model pin, not the pipeline.",
  "The pipeline costs roughly 4 to 8 times as much and takes about 6 times the wall clock of three plain API calls, for the same F1.",
  "The 0.637 baseline every earlier claim was anchored to turned out not to be reproducible. Fresh runs average 0.523, most likely because the delivered spreadsheet had been human-reviewed before it shipped.",
  "Batch size is a quality parameter, not a throughput knob. Sweeping it leaves F1 flat and moves the precision and recall split, so the escalation ladder is a dial with a known shape rather than a guess.",
  "Reasoning was published as structurally incompatible with constrained decoding, then corrected twice: the cause was an unbounded reasoning budget and a rules block. With that fixed, reasoning wins on F1 and loses on product behaviour.",
];

const analysisDecisions = [
  "The model never computes, never writes SQL and never sees the rows. Rows meet a model once, at labelling.",
  "Questions compile to plans in Metabase's MBQL shape, so one format serves both the agent and a UI query builder.",
  "Metrics bind to column kinds rather than column names, so an unseen survey works on arrival. A metric is minted by usage; a human blessing it is a trust label, never a gate.",
  "Facts are a cache, not a boundary: about ten bounded operators, unlimited composition, roughly 150 KB of facts per run.",
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
  { name: "The negative catalog", changed: "Publish what a scope cannot answer, so the interface greys out the control instead of refusing after the fact." },
  { name: "Deterministic tie-breaking", changed: "When two plans are equally valid a declared rule picks, so the same question cannot answer two ways on two days." },
  { name: "Codelist drift as a signal", changed: "Unmatched values accumulate with counts instead of failing the load, and the accumulation itself becomes the report." },
  { name: "Upload identity is content", changed: "A normalised content hash, so two people uploading the same export get one run rather than two conflicting sets of numbers, and the first sighting wins for the wave's date." },
  { name: "Lineage with four relations", changed: "relabel, recode, wave, wave_recoded. Only a new wave may claim topic movement, so a second labelling pass cannot present itself as a trend." },
  { name: "Extension points, not pluggable guarantees", changed: "Parsers, kinds, metrics, operators, marks and backends extend without touching existing code. The validator, the gate, provenance and grain enforcement do not, so a human review sits on every guarantee change." },
];

const chartFindings = [
  "One spec produces five outputs: the chart, an accessible data table, alt text, a CSV, and an ASCII rendering for the terminal. Repeatability is tested by diffing specs rather than images.",
  "Mark selection is deterministic, and the table is borrowed rather than invented. Accuracy ordering from Cleveland and McGill (1984), visual variables from Bertin (1967), expressiveness and effectiveness as criteria from Mackinlay's APT (1986), constraint shape from Draco (2019), task vocabulary reduced from Brehmer and Munzner (2013).",
  "The agent proposes a mark and an encoding, never data. Four gates accept or discard and the deterministic chart wins ties, so an eagerly invoked agent can cost a call but cannot damage a chart.",
  "Measured over 36 cases: 0 of 36 agent proposals beat the rule table, 1 case had any headroom, and 5 identical runs on that case scored 0.80, 0.40, 0.40, 0.40, 0.64. A single pass over this corpus measures one draw, not the agent.",
  "The gate was initially missing the reader's task: 34 of 36 proposals tied on legibility while 7 charts differed in a way legibility cannot see. Adding a task dimension resolved 4 of 6 disagreements and displaced none.",
  "Running an oracle over the agent's own search space found the scorer's exploits before the agent could. A word cloud sized by a free-text column scored a perfect 1.00, which is where the measure gate came from.",
  "75 chart properties are classified rather than opened up, each carrying a class that says how a refusal is reported. That classification is how three accepted-and-inert bugs were found, where a restyle answered a field no branch ever read.",
  "Capability menus are generated from the registry rather than hand-written, after the same staleness bug appeared three times, and a panel's advertised requirement is the same predicate the validator enforces.",
];

const awsFindings = [
  "Step Functions: four consecutive succeeded executions at 102 of 102 rows, with labelling fanned out through a Distributed Map over three slices and merged.",
  "The first fully succeeded run labelled 100 of 102 while all three slices reported success. Concurrent map iterations wrote the same slot and one overwrote another, so fan-out needed partitioned writes and a real fan-in before green meant anything.",
  "The circuit breaker is the capability nothing else here has. ToleratedFailurePercentage 5 halts the execution once that share of batches fails; a sequential driver grinds through the remaining 190 and pays for every one.",
  "AgentCore earns its place at the stage level, where its harness took labelling from 50 of 102 to 102 of 102 after our own loop failed, and not at the orchestration level, where the one thing the agentic orchestrator was buying, repair, is a Choice state plus a counter.",
  "Eight agent harnesses deployed with per-agent tool sets, one tool withheld at runtime until its precondition exists after it executed 0 times in 19 recorded runs. The graph itself is data with load-time gates rather than a trusted stage list.",
  "Governance is deployed alongside: personal-data classification inside intake, Bedrock guardrails as their own stack, and spend caps on tokens and dollars checked inside a stage rather than only between stages, after an audit found the guard had been doing nothing.",
  "Deployment surfaced defects nothing else did: six in the Step Functions path, seven in the Flows path, none reachable by typecheck, unit tests or cdk synth.",
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
  { name: "Draco · CompassQL · Voyager", changed: "The hard and soft constraint split for tie-breaking, and partial-spec completion as the model for chart editing." },
  { name: "Cleveland & McGill · Bertin · Mackinlay · Brehmer & Munzner", changed: "The mark-effectiveness table and the task vocabulary, so chart choice cites published research rather than taste." },
  { name: "Sato and Sherlock", changed: "Typing reads the header and neighbouring columns, not values alone. F1 0.89 values-only against 0.925 with context." },
  { name: "XLSForm · ODK", changed: "Accepting a form definition turns skip logic, codelists, question text and instrument version from inference into declaration." },
  { name: "GPTCache", changed: "Prior art for the binding cache, and the semantic drift signal that comes with it: falling hit similarity means the corpus moved." },
  { name: "QuickInsights · MetaInsight", changed: "The unprompted \"what stands out\" sweep after an upload, corrected for multiple comparisons, every claim resolving to a fact." },
  { name: "Cortex Analyst", changed: "Its verified query repository is the confirmed-binding tier, productized. Exports ship with a data contract." },
  { name: "LinkML · CEL · W3C reconciliation", changed: "Layer schemas modelled once, policies as versioned expressions, matching over a standard interface so OpenRefine becomes a free bulk-confirmation UI." },
  { name: "SDMX · SKOS", changed: "Dimensions that identify a cell separated from attributes that describe it, and a standard vocabulary for broader and narrower concepts." },
  { name: "CatLLM", changed: "Ensemble voting, tested on runs that were already on disk rather than on new spend." },
  { name: "Agent Skills standard", changed: "Skills authored as SKILL.md, so the same file works in Claude Code and in the pipeline's own loader." },
  { name: "Cube Core · dbt semantic layer", changed: "Deliberately not a dependency. Both model over a warehouse, and there is no warehouse here." },
];

const caveats = [
  "Every accuracy number is self-graded. The gold set was labelled by the author of the pipeline it grades, and a grading pack with two graders is the fix, not a footnote.",
  "Two corpora and two codebooks is a monoculture. A third real codebook is the highest-value test input available.",
  "The local-model era proved plumbing, not quality. A 15B model on llama.cpp is a flow harness, and the synthetic fixture makes the labelling task easier than real verbatims.",
  "Two real codebooks produced zero lexical mapping proposals between them, so cross-survey comparison needs a shared codebook, not a better matcher.",
  "The deployed path's quality is not measured. Two Step Functions runs sat 0.066 apart, wider than the local spread, which cannot separate it from any other shape.",
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-primary mb-4">
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
    <section className="border-t border-border pt-10 md:pt-14">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase tracking-tight leading-[0.95] text-foreground">
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
          <span className="text-sm text-foreground/85 leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NamedList({ items }: { items: { name: string; changed: string }[] }) {
  return (
    <ul className="border-t border-border">
      {items.map((item) => (
        <li
          key={item.name}
          className="border-b border-border py-4 grid sm:grid-cols-[15rem_1fr] gap-x-6 gap-y-1"
        >
          <span className="font-tech text-xs uppercase tracking-[0.12em] text-primary">
            {item.name}
          </span>
          <span className="text-sm text-muted-foreground leading-relaxed">{item.changed}</span>
        </li>
      ))}
    </ul>
  );
}

function Th({ children, accent = false }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <th
      className={`font-tech text-[10px] uppercase tracking-[0.15em] p-3 ${
        accent ? "text-primary" : "text-muted-foreground"
      }`}
    >
      {children}
    </th>
  );
}

export default function SurveyAgentsCaseStudy() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
      <div className="min-h-screen bg-background text-foreground">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            Back to projects
          </Link>

          <header className="mt-10 md:mt-14">
            <p className="font-tech text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
              Case study · 2026 · internal platform POC
            </p>
            <h1 className="mt-4 font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight leading-[0.9] text-foreground">
              Survey Agents
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl">
              A five-agent pipeline that turns a raw survey export into coded responses,
              tool-computed facts and charts, plus a semantic layer that decides what a
              dataset can be asked. Built to answer one question: does an agentic
              architecture beat three API calls, and at what cost.
            </p>

            <dl className="mt-10 grid grid-cols-2 sm:grid-cols-4 border-t border-border">
              {stats.map((s) => (
                <div key={s.label} className="border-b border-r border-border py-5 px-4 first:pl-0">
                  <dt className="font-display text-2xl sm:text-3xl font-bold tabular-nums text-foreground">
                    {s.value}
                  </dt>
                  <dd className="mt-1 font-tech text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </header>

          <div className="mt-16 md:mt-24 space-y-16 md:space-y-24">
            <Section eyebrow="01 // The principle" title="The agent decides, the tool computes">
              <p className="text-base text-muted-foreground leading-relaxed">
                Everything is an agent, and every deterministic operation is a tool. No number
                in a report is produced by a model; it is produced by a tool the model chose to
                call. That makes a system which structurally cannot fabricate a figure, rather
                than one merely forbidden from doing so.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                <span className="font-tech text-sm text-primary">verify_citations</span> is that
                rule made mechanical. Every figure in the drafted prose has to resolve to a fact
                the analytics stage actually computed, or the sentence is redrafted naming the
                offending number, and then removed. The model drafts the sentence; a tool proves
                the number.
              </p>

              <div className="overflow-x-auto border border-border">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border">
                      <Th>Agent</Th>
                      <Th>Deterministic tools</Th>
                      <Th>Model tools</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map((a) => (
                      <tr key={a.name} className="border-b border-border last:border-0">
                        <td className="p-3 font-tech text-xs text-primary whitespace-nowrap align-top">{a.name}</td>
                        <td className="p-3 text-xs font-mono text-muted-foreground/90 leading-relaxed">{a.tools}</td>
                        <td className="p-3 text-xs font-mono text-foreground/80 whitespace-nowrap align-top">{a.model}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Three loops exist and every one declared its exit condition before it was built:
                the tool loop stops at 8 calls, the repair loop at 2 iterations before
                quarantine, the verify loop at 2 redrafts before the sentence is stripped. A
                global spend budget is checked before every stage and inside the long ones, so
                exceeding it halts with partial results instead of truncating in silence.
              </p>
            </Section>

            <Section eyebrow="02 // Intake" title="Five gated stages, one replayable recipe">
              <p className="text-base text-muted-foreground leading-relaxed">
                The orchestrator is ordinary code. A model is consulted only where the rules are
                visibly unsure, and every decision it makes lands in one JSON recipe that
                replays without it.
              </p>

              <div className="overflow-x-auto border border-border">
                <table className="w-full text-left border-collapse">
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
                        <td className="p-3 text-xs text-foreground/85 leading-relaxed">{s.decides}</td>
                        <td className="p-3 text-xs text-muted-foreground leading-relaxed">{s.gate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">
                Over thirty hand-written export shapes: 6 files need a stage at all, 11 model
                calls, $0.0023, and zero divergences between a run and its replay.
              </p>

              <Notes items={intakeNotes} />
            </Section>

            <Section eyebrow="03 // Reliability" title="The axis where the architectures differ">
              <div className="overflow-x-auto border border-border">
                <table className="w-full text-left border-collapse">
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
                failing batch was discarded whole and re-labelled one row at a time, which is
                why correlation integrity is still 100%.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed">
                That check is the most transferable result here. Under a count-only check, a
                batch that returns the right number of results in the wrong order is
                indistinguishable from a correct one: every row silently mislabelled, zero
                discrepancies reported.
              </p>
            </Section>

            <Section eyebrow="04 // The measurement" title="The model pin beat the architecture, thirty to one">
              <div className="overflow-x-auto border border-border">
                <table className="w-full text-left border-collapse">
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

              <blockquote className="border-l-2 border-primary pl-5 text-base text-foreground/90 leading-relaxed">
                So the adoption question is not whether the multi-agent pipeline is more
                accurate. It is whether zero destroyed labels, verified correlation and per-row
                triage are worth 4x. For 102 rows a human can eyeball, they are not. For a
                recurring pipeline where a silently overwritten label reaches a stakeholder
                deck, they plausibly are. That is a judgement about consequences, not about F1.
              </blockquote>
            </Section>

            <Section eyebrow="05 // Analysis" title="A semantic layer, not a text-to-SQL box">
              <Notes items={analysisDecisions} />
              <p className="text-base text-muted-foreground leading-relaxed">
                Scaling is demonstrated with five reproducible proofs rather than slides: 200x
                rows at unchanged ask latency, cross-scope queries over 216 runs in
                milliseconds, replays that call no model at all, namespace and entitlement
                checks, and byte-identical re-execution from a passport.
              </p>
            </Section>

            <Section eyebrow="06 // Ours, not borrowed" title="The mechanisms with no prior art behind them">
              <p className="text-base text-muted-foreground leading-relaxed">
                Recorded deliberately, so it is clear which parts stand on published work and
                which are ours to get wrong.
              </p>
              <NamedList items={ours} />
            </Section>

            <Section eyebrow="07 // Visualization" title="Charts are specs, never images">
              <Notes items={chartFindings} />
            </Section>

            <Section eyebrow="08 // Deployment" title="Where each piece actually earns its place">
              <Notes items={awsFindings} />
            </Section>

            <Section eyebrow="09 // Method" title="A component earns its place only if measured">
              <Notes items={earningItsPlace} />
            </Section>

            <Section eyebrow="10 // Prior art" title="Twelve research passes, then a design freeze">
              <p className="text-base text-muted-foreground leading-relaxed">
                Twelve passes were logged before the analysis code was written, and the phase was
                then closed on purpose: new references land in a parked list with a named trigger
                rather than changing direction mid-build.
              </p>
              <NamedList items={priorArt} />
            </Section>

            <Section eyebrow="11 // Limits" title="What this does not prove">
              <Notes items={caveats} />
              <p className="text-sm text-muted-foreground/80 leading-relaxed">
                Internal work, so there is no public repository. Every figure on this page comes
                from the project&apos;s own findings log, where each one names the run it was
                measured on.
              </p>
            </Section>
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}
