"use client";

/**
 * Diagrams for the survey-agents case study.
 *
 * The agent graph and the answer path are redrawn from the project's own
 * diagram sources (diagrams/label-agent-flow, diagrams/answer-flow, diagrams/db-er)
 * and from graph/survey-coding-v1.json, which is the graph the state machine
 * is generated from. Geometry is fixed so the edges stay orthogonal.
 */

const C = {
  line: "hsl(var(--border))",
  edge: "hsl(var(--muted-foreground) / 0.5)",
  band: "hsl(var(--muted-foreground) / 0.22)",
  box: "hsl(var(--card) / 0.55)",
  txt: "hsl(var(--foreground) / 0.92)",
  dim: "hsl(var(--muted-foreground))",
  hot: "hsl(var(--primary))",
  hotBox: "hsl(var(--primary) / 0.09)",
};

function Frame({
  label,
  caption,
  viewBox,
  minWidth = 900,
  children,
}: {
  label: string;
  caption: string;
  viewBox: string;
  minWidth?: number;
  children: React.ReactNode;
}) {
  return (
    <figure className="my-2 md:-ml-[11rem] xl:-ml-[18rem] xl:-mr-28">
      <div className="overflow-x-auto">
        <svg
          viewBox={viewBox}
          role="img"
          aria-label={label}
          className="w-full h-auto"
          style={{ minWidth }}
        >
          <defs>
            <marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.edge} />
            </marker>
            <marker id="ar-hot" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={C.hot} />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption className="mt-3 text-[13px] text-muted-foreground md:ml-[11rem] xl:ml-[18rem]">
        <span className="lg:hidden text-primary/80">scroll to pan, </span>
        {caption}
      </figcaption>
    </figure>
  );
}

/** A node box: mono id on the first line, mono detail lines under it. */
function Box({
  x,
  y,
  w,
  h,
  id,
  lines = [],
  kind = "solid",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  id: string;
  lines?: string[];
  kind?: "solid" | "gate" | "hot" | "store" | "term";
}) {
  const hot = kind === "hot";
  const dashed = kind === "gate" || kind === "term";
  const cx = x + w / 2;
  const top = y + (lines.length ? 22 : h / 2 + 5);
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        fill={hot ? C.hotBox : kind === "store" ? "hsl(var(--muted-foreground) / 0.07)" : C.box}
        stroke={hot ? C.hot : C.line}
        strokeWidth={hot ? 1.5 : 1}
        strokeDasharray={dashed ? "4 3" : undefined}
      />
      <text
        x={cx}
        y={top}
        textAnchor="middle"
        className="font-semibold"
        fontSize="14"
        fill={hot ? C.hot : C.txt}
      >
        {id}
      </text>
      {lines.map((l, i) => (
        <text
          key={i}
          x={cx}
          y={top + 17 + i * 14}
          textAnchor="middle"
          className="font-semibold"
          fontSize="11"
          fill={hot ? "hsl(var(--primary) / 0.85)" : C.dim}
        >
          {l}
        </text>
      ))}
    </g>
  );
}

function Edge({
  d,
  dashed = false,
  hot = false,
}: {
  d: string;
  dashed?: boolean;
  hot?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={hot ? C.hot : C.edge}
      strokeWidth="1"
      strokeDasharray={dashed ? "5 4" : undefined}
      markerEnd={hot ? "url(#ar-hot)" : "url(#ar)"}
    />
  );
}

function Label({
  x,
  y,
  children,
  anchor = "start",
  hot = false,
}: {
  x: number;
  y: number;
  children: string;
  anchor?: "start" | "middle" | "end";
  hot?: boolean;
}) {
  return (
    <text x={x} y={y} textAnchor={anchor} className="font-semibold" fontSize="11" fill={hot ? C.hot : C.dim}>
      {children}
    </text>
  );
}

function BandFrame({
  x,
  y,
  w,
  h,
  label,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="none" stroke={C.band} strokeWidth="1" strokeDasharray="2 4" />
      <text x={x + 12} y={y + 18} className="font-semibold" fontSize="10" letterSpacing="1.6" fill={C.dim}>
        {label}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 1. The deployed graph: survey-coding v1                             */
/* ------------------------------------------------------------------ */

const GRAPH_NODES: {
  x: number;
  id: string;
  lines: string[];
  kind: "solid" | "gate" | "term";
}[] = [
  { x: 110, id: "read", lines: ["maxAttempts 2", "toolCap 8"], kind: "solid" },
  { x: 262, id: "codebook_gate", lines: ["taxonomy_owner", "autoApprove"], kind: "gate" },
  { x: 414, id: "label", lines: ["Map, batch 50", "conc 4, tol 5%", "toolCap 24"], kind: "solid" },
  { x: 566, id: "check", lines: ["toolCap 14", "→ repairable"], kind: "solid" },
  { x: 718, id: "count", lines: ["toolCap 20"], kind: "solid" },
  { x: 870, id: "report", lines: ["verify_citations", "toolCap 8"], kind: "solid" },
  { x: 1022, id: "publication_gate", lines: ["report_approver", "autoApprove"], kind: "gate" },
  { x: 1174, id: "END", lines: ["Succeed | Fail"], kind: "term" },
];

const NW = 122;
const NY = 150;
const NH = 92;

export function AgentGraph() {
  const cx = (x: number) => x + NW / 2;
  const haltFrom = [110, 414, 566, 718];
  return (
    <Frame
      label="The deployed agent graph: read, codebook gate, label with a distributed map, check with a repair edge, count, report, publication gate"
      caption="graph/survey-coding-v1.json → generated ASL, 8 nodes, 13 edges, 2 capability gates, 1 repair cycle"
      viewBox="0 0 1320 420"
      minWidth={1040}
    >
      {/* halt rail */}
      <Label x={660} y={40} anchor="middle">
        verdict = halt → END, from every stage
      </Label>
      {haltFrom.map((x) => (
        <path key={x} d={`M ${cx(x)} ${NY} V 52`} fill="none" stroke={C.edge} strokeWidth="1" strokeDasharray="5 4" />
      ))}
      <Edge d={`M ${cx(110)} 52 H ${cx(1174) - 3} V ${NY - 2}`} dashed />

      {/* spine */}
      {GRAPH_NODES.slice(0, -1).map((n, i) => (
        <Edge key={n.id} d={`M ${n.x + NW} ${NY + NH / 2} H ${GRAPH_NODES[i + 1].x - 4}`} />
      ))}

      {/* entry */}
      <Label x={20} y={NY + NH / 2 - 10}>csv + codebook</Label>
      <Edge d={`M 20 ${NY + NH / 2} H 106`} />

      {/* repair cycle */}
      <Edge d={`M ${cx(566)} ${NY + NH} V 330 H ${cx(414)} V ${NY + NH + 4}`} hot />
      <Label x={cx(490)} y={352} anchor="middle" hot>
        verdict = repairable → relabel flagged rows, maxIterations 2
      </Label>

      {GRAPH_NODES.map((n) => (
        <Box key={n.id} x={n.x} y={NY} w={n.id === "END" ? 116 : NW} h={NH} id={n.id} lines={n.lines} kind={n.kind} />
      ))}
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Tool budget per agent                                            */
/* ------------------------------------------------------------------ */

const TOOL_CAPS = [
  { agent: "label", cap: 24, note: "codes + sentiment, per row" },
  { agent: "analytics", cap: 20, note: "build the facts" },
  { agent: "analysis", cap: 18, note: "bind, execute, compose, compare" },
  { agent: "qa", cap: 14, note: "coverage, invalid, contradictions" },
  { agent: "adjudicate", cap: 12, note: "re-decide contested rows only" },
  { agent: "viz", cap: 12, note: "propose, check, draw, repair, restyle" },
  { agent: "orchestrator", cap: 10, note: "its tools are the other agents" },
  { agent: "intake", cap: 8, note: "shape, mapping, dispositions" },
  { agent: "curate", cap: 8, note: "repair the codebook itself" },
  { agent: "conclude", cap: 8, note: "draft, every number tied to a fact" },
];

const LOOP_BOUNDS = [
  { loop: "tool loop", bound: "each agent's own cap", then: "graceful exit" },
  { loop: "repair loop", bound: "2 iterations", then: "quarantine" },
  { loop: "verify loop", bound: "2 redrafts", then: "strip the sentence" },
];

/**
 * A unit chart rather than a bar chart: every square is one tool call the agent
 * is allowed before it must exit. Counting them is the point, so they are drawn
 * as countable objects.
 */
export function ToolBudget() {
  return (
    <div className="my-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
        <p className="text-[13px] text-muted-foreground">
          One square = one permitted tool call
        </p>
        <p className="text-[13px] text-muted-foreground">
          declared before the loop was written
        </p>
      </div>

      <div className="">
        {TOOL_CAPS.map((t) => (
          <div
            key={t.agent}
            className="grid grid-cols-[6.5rem_1fr] sm:grid-cols-[6.5rem_1fr_13rem] items-center gap-x-4 gap-y-1.5 py-2.5"
          >
            <span className="text-[14px] font-medium text-foreground/90">{t.agent}</span>
            <span className="flex flex-wrap gap-[3px]" aria-label={`${t.cap} calls`}>
              {Array.from({ length: t.cap }).map((_, i) => (
                <span
                  key={i}
                  className="w-[9px] h-[9px] bg-primary/70"
                  style={{ opacity: 0.35 + (i / t.cap) * 0.65 }}
                />
              ))}
              <span className="ml-2 text-[13px] tabular-nums text-primary">{t.cap}</span>
            </span>
            <span className="hidden sm:block text-[13px] text-muted-foreground">
              {t.note}
            </span>
          </div>
        ))}
      </div>

      <div className="pt-4 grid gap-2 sm:grid-cols-3">
        {LOOP_BOUNDS.map((l) => (
          <div key={l.loop}>
            <p className="text-[13px] text-foreground/90">
              {l.loop} <span className="text-primary">{l.bound}</span>
            </p>
            <p className="text-[13px] text-muted-foreground">then {l.then}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. The answer path                                                  */
/* ------------------------------------------------------------------ */

export function AnswerPath() {
  return (
    <Frame
      label="The answer path: the semantic layer written at upload, a four-step analysis agent with one model call, and a deterministic visualization agent"
      caption="diagrams/answer-flow, 1 paid node of 10, dashboard panels post the plan the model would have written, ~20 ms, $0"
      viewBox="0 0 1200 660"
      minWidth={1000}
    >
      {/* band 1: semantic layer, written at upload */}
      <BandFrame x={40} y={70} w={1120} h={120} label="SEMANTIC LAYER, WRITTEN AT UPLOAD" />
      <Box x={70} y={105} w={240} h={64} id="survey_index" lines={["dimensions this run carries"]} kind="store" />
      <Box x={330} y={105} w={300} h={64} id="codebook + metric_registry" lines={["kinds, grains, denominators"]} kind="store" />
      <Box x={890} y={105} w={240} h={64} id="facts" lines={["fact_id on every number"]} kind="store" />

      {/* band 2: analysis agent */}
      <BandFrame x={40} y={250} w={1120} h={220} label="ANALYSIS AGENT" />
      <Box x={70} y={300} w={190} h={66} id="catalog" lines={["only what this", "run can answer"]} />
      <Box x={300} y={300} w={190} h={66} id="bind" lines={["LLM → MBQL plan", "1 call, ~$0.0005"]} kind="hot" />
      <Box x={530} y={300} w={190} h={66} id="validate" lines={["seven checks", "grain, denominator"]} />
      <Box x={760} y={300} w={190} h={66} id="answerable?" lines={["hard constraints"]} kind="gate" />
      <Box x={990} y={300} w={150} h={66} id="execute" lines={["facts hit", "DuckDB on miss"]} />
      <Box x={620} y={382} w={300} h={66} id="refusal + remedy" lines={["ladder: substitute → decompose", "→ sample → extend → request"]} kind="gate" />

      {/* band 3: visualization agent */}
      <BandFrame x={40} y={500} w={1120} h={118} label="VISUALIZATION AGENT" />
      <Box x={70} y={536} w={240} h={64} id="fitness_table" lines={["no model call", "mark chosen deterministically"]} />
      <Box x={350} y={536} w={240} h={64} id="ChartSpec" lines={["factId on every point"]} />
      <Box x={630} y={536} w={500} h={64} id="chart, data_table, alt_text, csv, ascii" lines={["one spec, five renderings"]} />

      {/* inputs */}
      <Box x={70} y={198} w={190} h={34} id="question (EN)" kind="term" />
      <Edge d="M 165 232 V 296" />
      <Box x={630} y={198} w={240} h={34} id="dashboard_panel" kind="term" />

      {/* semantic layer into the chain */}
      <Edge d="M 190 169 V 296" />
      <Edge d="M 480 169 V 252 H 230 V 296" />
      <Edge d="M 1010 169 V 296" />
      <Edge d="M 1120 300 V 173" dashed />
      <Label x={1128} y={240}>promote</Label>

      {/* the chain */}
      <Edge d="M 260 333 H 296" />
      <Edge d="M 490 333 H 526" hot />
      <Edge d="M 720 333 H 756" />
      <Edge d="M 950 333 H 986" />
      <Label x={968} y={322} anchor="middle">yes</Label>
      <Edge d="M 855 366 V 378" />
      <Label x={866} y={378}>no</Label>

      {/* the bypass */}
      <Edge d="M 750 232 V 272 H 625 V 296" dashed />
      <Label x={642} y={266}>no model call, ~20 ms, $0</Label>

      {/* into the visualization band */}
      <Edge d="M 1065 366 V 485 H 230 V 532" />
      <Label x={640} y={477} anchor="middle">numbers + fact ids</Label>
      <Edge d="M 310 568 H 346" />
      <Edge d="M 590 568 H 626" />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 4. The data model, as five bands                                    */
/* ------------------------------------------------------------------ */

const BANDS = [
  {
    band: "DEFINITIONS",
    written: "authored by people, versioned in git, published to S3 on merge",
    tables: [
      { t: "concept", cols: "concept_id PK, vocabulary, parent_id FK" },
      { t: "mapping", cols: "source_code, target_concept_id, predicate, confidence" },
      { t: "codelist / codelist_member", cols: "value, status, uploads" },
      { t: "metric", cols: "grain, denominators, accepts_kinds, usage_count" },
      { t: "instrument", cols: "instrument_id PK, question_ids" },
      { t: "codebook", cols: "codebook_hash PK, provenance" },
      { t: "term", cols: "starts_on, ends_on, session" },
    ],
  },
  {
    band: "CATALOG",
    written: "computed per upload, one run = one labeling pass over one file",
    tables: [
      { t: "run", cols: "run_id PK, instrument_id FK, codebook_hash FK, term_id FK, respondent_fingerprint" },
      { t: "dimension", cols: "kind, ordered, scale_min/max, codelist_name FK" },
      { t: "dimension_value", cols: "(run_id, dimension, key) PK, provisional" },
      { t: "unavailable", cols: "panel, reason - which layer refused, and why" },
    ],
  },
  {
    band: "FACTS",
    written: "one table, narrow on purpose",
    tables: [
      {
        t: "fact",
        cols: "fact_id PK, metric_id FK, dimension + key FK, kind (count | share | coverage | crosstab_cell | cooccurrence), value, denominator",
      },
    ],
  },
  {
    band: "CACHES",
    written: "keyed on content hashes, no foreign key into facts",
    tables: [
      { t: "binding_cache", cols: "question → plan, the only non-deterministic step, so it is cached not re-rolled" },
      { t: "question_passport", cols: "plan_hash, dataset, registry + skill versions" },
    ],
  },
  {
    band: "PAYLOAD",
    written: "not a table, an S3 directory per run, addressed by run_id",
    tables: [
      { t: "runs/RUN_ID/payload.lance", cols: "verbatims, per-row labels, vectors + BM25 index, 14–178 MB against ~150 KB of facts" },
    ],
  },
];

const KEYS = [
  {
    k: "fact → dimension_value",
    v: "composite on (run_id, dimension, key). This is what keeps a narrow table safe rather than free text: departments and campuses union without a migration and without new SQL.",
  },
  {
    k: "run.instrument_id ≠ run.codebook_hash",
    v: "Comparability keyed on the hash alone is too strict, since one edited code breaks a chain that is obviously the same instrument. The instrument is the spine, the hash is the version.",
  },
  {
    k: "concept.parent_id → concept",
    v: "Two surveys that cannot align at the leaf often align at the parent, so the answer gets coarser instead of refused.",
  },
  {
    k: "dimension.codelist_name → codelist",
    v: "With codelist_member.status, a value first seen in this upload is provisional and held out of cross-survey rollups until a person confirms it.",
  },
];

export function DataModel() {
  return (
    <div className="my-2 space-y-6">
      <div className="">
        {BANDS.map((b) => (
          <div key={b.band} className="grid md:grid-cols-[11rem_1fr]">
            <div className="py-3 md:pr-4">
              <p className="text-[13px] text-primary">{b.band}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{b.written}</p>
            </div>
            <ul className="pb-3 md:py-3 space-y-2">
              {b.tables.map((t) => (
                <li key={t.t} className="grid sm:grid-cols-[13rem_1fr] gap-x-4 gap-y-0.5">
                  <span className="text-[14px] font-medium text-foreground/90">{t.t}</span>
                  <span className="text-[13px] leading-relaxed text-muted-foreground">{t.cols}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <p className="text-[13px] text-muted-foreground mb-4">
          The four keys that carry the model
        </p>
        <ul className="space-y-3">
          {KEYS.map((k) => (
            <li key={k.k} className="grid sm:grid-cols-[15rem_1fr] gap-x-6 gap-y-1">
              <span className="text-[14px] font-medium text-primary">{k.k}</span>
              <span className="t-meta">{k.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. The tool surface: twelve agents, every tool named                */
/* ------------------------------------------------------------------ */

const TOOL_MATRIX: { agent: string; model: string[]; tools: string[] }[] = [
  {
    agent: "intake",
    model: [],
    tools: ["scan_file", "find_headers", "check_columns", "check_codebook", "mark_rows", "list_questions"],
  },
  {
    agent: "curate",
    model: ["explain_codes", "group_codes"],
    tools: ["confusable_clusters", "group_codes", "explain_codes", "distinctions", "find_gaps", "save_notes"],
  },
  {
    agent: "label",
    model: ["label_results", "add_missed", "measure_code_density"],
    tools: ["label_results", "load_codes", "measure_code_density", "check_all_returned", "check_codes", "check_sentiment", "tag_rows", "add_missed", "missed_codes", "concern_counts"],
  },
  {
    agent: "adjudicate",
    model: ["drop_weak_codes"],
    tools: ["find_weak_rows", "drop_weak_codes", "kept_codes"],
  },
  {
    agent: "qa",
    model: [],
    tools: ["count_bad_codes", "count_uncoded", "check_conflicts", "find_outliers", "find_missing", "score_rows", "set_cutoff", "split_rows", "redo_rows", "compare_runs"],
  },
  {
    agent: "analytics",
    model: [],
    tools: ["count_by", "count_pairs", "count_cooccurrence", "count_covered", "count_codebook_use", "bucket_dates"],
  },
  {
    agent: "analysis",
    model: ["bind_question", "choose_rung", "find_comparisons", "propose_followups"],
    tools: ["describe_survey", "bind_question", "validate_plan", "choose_rung", "execute_plan", "compose_answer", "find_comparisons", "compare_runs", "check_citations", "propose_followups"],
  },
  {
    agent: "viz",
    model: ["propose_chart", "repair_chart", "restyle_chart", "shorten_labels"],
    tools: ["propose_chart", "check_readable", "check_traceable", "draw_chart", "repair_chart", "restyle_chart", "describe_chart", "shorten_labels"],
  },
  {
    agent: "conclude",
    model: ["write_summary", "check_claims"],
    tools: ["read_numbers", "write_summary", "check_claims", "check_numbers"],
  },
  {
    agent: "coordinator",
    model: ["inspect_question", "answer_question_part"],
    tools: ["inspect_question", "answer_question_part", "record_capability_gap", "assemble_coordinated_answer"],
  },
  {
    agent: "explore",
    model: ["investigate_question"],
    tools: ["survey_landscape", "investigate_question", "assemble_insight_brief"],
  },
  {
    agent: "semantic",
    model: ["judge_sensitivity"],
    tools: ["judge_sensitivity", "test_codebook_fit", "match_codebooks", "review_profile"],
  },
  {
    agent: "orchestrator",
    model: [],
    tools: ["delegate → the other agents"],
  },
];

export function ToolMatrix() {
  const total = TOOL_MATRIX.reduce((n, a) => n + a.tools.length, 0);
  const modelCount = TOOL_MATRIX.reduce((n, a) => n + a.model.length, 0);

  return (
    <div className="my-2">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
        <p className="text-[13px] text-muted-foreground">
          The whole tool surface
        </p>
        <p className="text-[13px] text-muted-foreground">
          <span className="text-foreground">{total}</span> tools,{" "}
          <span className="text-primary">{modelCount}</span> reach a model,{" "}
          <span className="text-foreground">{total - modelCount}</span> are deterministic
        </p>
      </div>

      <div className="">
        {TOOL_MATRIX.map((a) => (
          <div key={a.agent} className="grid sm:grid-cols-[7.5rem_1fr] gap-x-4 gap-y-2 py-3">
            <div className="flex items-baseline gap-2">
              <span className="text-[14px] font-medium text-foreground/90">{a.agent}</span>
              <span className="text-[13px] tabular-nums text-muted-foreground">
                {a.tools.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {a.tools.map((t) => {
                const isModel = a.model.includes(t);
                return (
                  <span
                    key={t}
                    className={`text-[13px] px-1.5 py-0.5 whitespace-nowrap ${
                      isModel
                        ? "bg-primary/15 text-primary"
                        : "bg-muted/60 text-muted-foreground"
                    }`}
                  >
                    {t}
                  </span>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="pt-3 text-[13px] text-muted-foreground">
        Highlighted tools call a model. Everything else is code, so no figure in a report can
        come from a model.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. System architecture, redrawn from diagrams/system-architecture   */
/* ------------------------------------------------------------------ */

/** A joining line with no arrowhead, for edges that merge into a shared bus. */
function Join({ d }: { d: string }) {
  return <path d={d} fill="none" stroke={C.edge} strokeWidth="1" />;
}

const WRITE_STAGES: { id: string; lines: string[]; kind: "solid" | "gate" | "hot" }[] = [
  { id: "read", lines: ["frame, repair,", "retype, map", "model if unsure"], kind: "hot" },
  { id: "codebook gate", lines: ["taxonomy owner", "auto in the POC"], kind: "gate" },
  { id: "study", lines: ["enrich a thin", "codebook"], kind: "hot" },
  { id: "label", lines: ["Distributed Map", "50 rows a batch", "64 lanes"], kind: "hot" },
  { id: "review", lines: ["drop weak codes,", "queue for a person"], kind: "hot" },
  { id: "check", lines: ["coverage, invalid", "codes, conflicts"], kind: "solid" },
  { id: "count", lines: ["facts, aggregates,", "suggestions"], kind: "solid" },
  { id: "publish gate", lines: ["to the read side"], kind: "gate" },
];

export function SystemArchitecture() {
  const sx = (i: number) => 60 + i * 138;
  const SW = 122;
  return (
    <Frame
      label="System architecture: the web app and API, a write path from upload to facts on Step Functions, a read path from question to cited chart, state on S3, model services, and ports that run the same code on a laptop and on AWS"
      caption="diagrams/system-architecture, highlighted boxes call a model, everything else is deterministic code"
      viewBox="0 0 1200 1010"
      minWidth={1000}
    >
      {/* 1 experience */}
      <BandFrame x={40} y={30} w={1120} h={120} label="EXPERIENCE" />
      <Box x={60} y={66} w={140} h={64} id="browser" lines={["analyst"]} kind="term" />
      <Box x={240} y={66} w={300} h={64} id="web app, Nuxt 4" lines={["upload, dashboard, chart builder,", "review queue, codebooks, exports"]} />
      <Box x={580} y={66} w={330} h={64} id="API, NestJS" lines={["uploads, jobs, analysis, codebooks,", "comparisons, exports, governance"]} />
      <Box x={950} y={66} w={190} h={64} id="CLI and benches" lines={["run, ask, chart,", "eval, bench:free"]} />
      <Edge d="M 200 98 H 236" />
      <Label x={218} y={90} anchor="middle">HTTPS</Label>
      <Edge d="M 540 98 H 576" />
      <Label x={558} y={90} anchor="middle">REST</Label>

      {/* 2 write path */}
      <BandFrame x={40} y={180} w={1120} h={260} label="WRITE PATH: UPLOAD TO FACTS, PER FILE, MINUTES" />
      <Label x={60} y={226}>graph/survey-coding-v1.json → Step Functions ASL, one Lambda per stage</Label>
      {WRITE_STAGES.slice(0, -1).map((s, i) => (
        <Edge key={s.id} d={`M ${sx(i) + SW} 284 H ${sx(i + 1) - 4}`} />
      ))}
      {WRITE_STAGES.map((s, i) => (
        <Box key={s.id} x={sx(i)} y={242} w={SW} h={84} id={s.id} lines={s.lines} kind={s.kind} />
      ))}
      <Edge d={`M ${sx(5) + SW / 2} 326 V 364 H ${sx(3) + SW / 2} V 330`} hot />
      <Label x={(sx(3) + sx(5)) / 2 + SW / 2} y={384} anchor="middle" hot>
        repairable → re-label flagged rows, max 2
      </Label>
      <Box x={60} y={374} w={230} h={40} id="upload: CSV + codebook" kind="term" />
      <Edge d={`M ${sx(0) + SW / 2} 374 V 330`} />
      <Label x={320} y={424}>every stage returns one StageResult: pass | repairable | halt, tool calls, cost, time</Label>

      {/* 3 read path */}
      <BandFrame x={40} y={470} w={1120} h={200} label="READ PATH: QUESTION TO CITED CHART, PER QUESTION, MS TO S" />
      <Box x={60} y={516} w={160} h={40} id="question" kind="term" />
      <Box x={60} y={590} w={160} h={40} id="dashboard panel" kind="term" />
      <Box x={260} y={505} w={160} h={70} id="bind" lines={["question → plan,", "cached by hash"]} kind="hot" />
      <Box x={450} y={505} w={170} h={70} id="validate + scope" lines={["grammar, denominators"]} />
      <Box x={650} y={505} w={160} h={70} id="execute" lines={["facts, else DuckDB"]} />
      <Box x={840} y={505} w={150} h={70} id="visualize" lines={["mark by rule,", "Vega-Lite spec"]} />
      <Box x={1020} y={505} w={120} h={70} id="narrate" lines={["cite or strip"]} kind="hot" />
      <Edge d="M 220 536 H 256" />
      <Edge d="M 420 540 H 446" />
      <Edge d="M 620 540 H 646" />
      <Edge d="M 810 540 H 836" />
      <Edge d="M 990 540 H 1016" />
      <Edge d="M 220 610 H 535 V 579" dashed />
      <Label x={240} y={602}>no model, ~20 ms, $0</Label>
      <Label x={560} y={640}>a plan the data cannot satisfy returns a typed refusal or a question, never a zero</Label>

      {/* 4 state */}
      <BandFrame x={40} y={700} w={1120} h={140} label="STATE" />
      <Box x={60} y={740} w={255} h={78} id="S3 artifacts" lines={["per run: payload 14–178 MB,", "facts ~50 KB, receipts, passport"]} kind="store" />
      <Box x={335} y={740} w={255} h={78} id="FactStore port" lines={["local and S3, one 10-test suite,", "run, dimension, key, value"]} kind="store" />
      <Box x={610} y={740} w={255} h={78} id="caches" lines={["question → plan by hash,", "the one non-deterministic step"]} kind="store" />
      <Box x={885} y={740} w={255} h={78} id="definitions in git" lines={["codebooks, metrics, skills, ADRs,", "CI lints every metric"]} kind="store" />

      {/* 5 model services, 6 ports */}
      <BandFrame x={40} y={870} w={540} h={120} label="MODEL SERVICES" />
      <Box x={60} y={908} w={250} h={64} id="Bedrock Converse" lines={["a model per stage,", "one forced tool call"]} kind="hot" />
      <Box x={325} y={908} w={235} h={64} id="AgentCore Runtime" lines={["orchestrator harness"]} kind="hot" />
      <BandFrame x={600} y={870} w={560} h={120} label="PORTS: SAME CODE, LAPTOP OR AWS" />
      <Box x={614} y={908} w={124} h={64} id="provider" lines={["llama.cpp |", "Bedrock"]} />
      <Box x={748} y={908} w={124} h={64} id="storage" lines={["local | S3"]} />
      <Box x={882} y={908} w={124} h={64} id="runtime" lines={["local graph |", "Step Functions"]} />
      <Box x={1016} y={908} w={124} h={64} id="pipeline" lines={["direct |", "Lambda, AgentCore"]} />
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 7. The AI pipeline: five layers passing typed JSON                  */
/* ------------------------------------------------------------------ */

export function AiPipeline() {
  return (
    <Frame
      label="The AI pipeline: semantics, labelling, analysis, visualization and dashboard layers, each passing typed JSON to the next"
      caption="diagrams/ai-architecture, page 1, a model chooses and words things, code computes, checks and replays"
      viewBox="0 0 1200 470"
      minWidth={960}
    >
      <Box x={60} y={110} w={200} h={96} id="Semantics" lines={["file → survey model", "6 model calls, 3 valves", "Step Functions, Bedrock"]} />
      <Box x={350} y={110} w={200} h={96} id="Labelling" lines={["a code for every response", "fan-out, 1 valve, repair", "Distributed Map, Lance"]} />
      <Box x={640} y={110} w={200} h={96} id="Analysis" lines={["plan → cited facts", "bind, check, correct, split", "8 valves, DuckDB"]} kind="hot" />
      <Box x={930} y={110} w={200} h={96} id="Visualization" lines={["facts → ChartSpec", "rules choose, model judges", "Vega-Lite in Nuxt"]} />
      <Box x={640} y={340} w={200} h={96} id="Dashboard" lines={["candidates → ranked panels", "filtered, deduplicated", "Lambda, S3 facts"]} />

      <Edge d="M 260 158 H 346" />
      <Label x={305} y={150} anchor="middle">SurveyModel</Label>
      <Edge d="M 550 158 H 636" />
      <Label x={595} y={150} anchor="middle">Fact[]</Label>
      <Edge d="M 840 158 H 926" hot />
      <Label x={885} y={136} anchor="middle" hot>Fact[] +</Label>
      <Label x={885} y={150} anchor="middle" hot>passport</Label>

      <Edge d="M 160 110 V 70 H 740 V 106" />
      <Label x={450} y={62} anchor="middle">analyst Plan</Label>
      <Edge d="M 160 206 V 388 H 636" />
      <Label x={400} y={380} anchor="middle">analyst Plans</Label>
      <Edge d="M 715 340 V 210" />
      <Label x={707} y={280} anchor="end">Plan, no model</Label>
      <Edge d="M 765 206 V 336" />
      <Label x={773} y={280}>Fact[]</Label>
      <Edge d="M 840 388 H 1030 V 210" />
      <Label x={935} y={380} anchor="middle">panels</Label>
    </Frame>
  );
}

/* ------------------------------------------------------------------ */
/* 8. The settle path: every typed question, checked before shown     */
/* ------------------------------------------------------------------ */

export function SettlePath() {
  const col = (i: number) => 39 + i * 142;
  const cx = (i: number) => col(i) + 64;
  const W = 128;
  const BUS = 1182;
  return (
    <Frame
      label="The settle path: bind a question to a plan, execute it, read the plan back in words and check that reading; a stopped plan is corrected once, then split, asked of the reader or refused; a plan the grammar cannot express goes to a relational core whose two writers must agree"
      caption="diagrams/ai-architecture, page 5, redrawn and simplified, highlighted boxes call a model"
      viewBox="0 0 1200 770"
      minWidth={1000}
    >
      {/* what every step reads */}
      <Box x={col(1)} y={40} w={W} h={62} id="examples" lines={["verified answers,", "other files only"]} kind="store" />
      <Box x={col(3)} y={40} w={col(5) + W - col(3)} h={62} id="semantic layer" lines={["labels, units, value meanings, trees,", "every fact with its source"]} kind="store" />
      <Edge d={`M ${cx(1)} 102 V 146`} />
      {[3, 4, 5].map((i) => (
        <Edge key={i} d={`M ${cx(i)} 102 V 146`} />
      ))}

      {/* main line */}
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <Edge key={i} d={`M ${col(i) + W} 192 H ${col(i + 1) - 4}`} hot={i === 4} />
      ))}
      <Box x={col(0)} y={150} w={W} h={84} id="question" kind="term" />
      <Box x={col(1)} y={150} w={W} h={84} id="bind" lines={["predict values,", "pick by agreement"]} kind="hot" />
      <Box x={col(2)} y={150} w={W} h={84} id="legal?" lines={["plan valid", "on this file"]} kind="gate" />
      <Box x={col(3)} y={150} w={W} h={84} id="execute" lines={["allow-listed SQL,", "DuckDB, tests,", "causal effects"]} />
      <Box x={col(4)} y={150} w={W} h={84} id="read back" lines={["the plan in words"]} />
      <Box x={col(5)} y={150} w={W} h={84} id="check" lines={["judge the reading,", "never reasons"]} kind="hot" />
      <Box x={col(6)} y={150} w={W} h={84} id="passes?" kind="gate" />
      <Box x={col(7)} y={150} w={W} h={84} id="answer" lines={["numbers cite facts"]} kind="term" />

      {/* a stopped plan */}
      <Edge d={`M ${cx(6)} 234 V 316`} />
      <Label x={cx(6) + 8} y={280}>no</Label>
      <Box x={col(6)} y={320} w={W} h={70} id="objections" lines={["a claim each,", "settled on the file"]} kind="hot" />
      <Box x={col(5)} y={320} w={W} h={70} id="rounds left?" lines={["one correction"]} kind="gate" />
      <Box x={col(4)} y={320} w={W} h={70} id="rebind" lines={["problems named"]} kind="hot" />
      <Edge d={`M ${col(6)} 355 H ${col(5) + W + 4}`} />
      <Edge d={`M ${col(5)} 355 H ${col(4) + W + 4}`} />
      <Edge d={`M ${cx(4)} 320 V 280 H ${cx(5)} V 238`} hot />
      <Label x={(cx(4) + cx(5)) / 2} y={272} anchor="middle" hot>check again</Label>

      {/* when it still fails */}
      <Edge d={`M ${cx(5)} 390 V 456`} />
      <Label x={cx(5) + 8} y={428}>no</Label>
      <Box x={col(3)} y={460} w={W} h={70} id="refuse" lines={["neither: not", "the question asked"]} kind="term" />
      <Box x={col(4)} y={460} w={W} h={70} id="ask the reader" lines={["their choice:", "which column?"]} kind="term" />
      <Box x={col(5)} y={460} w={W} h={70} id="why not?" kind="gate" />
      <Box x={col(6)} y={460} w={W} h={70} id="split" lines={["figures combined:", "one each, then code"]} />
      <Edge d={`M ${col(5) + W} 495 H ${col(6) - 4}`} />
      <Edge d={`M ${col(5)} 495 H ${col(4) + W + 4}`} />
      <Edge d={`M ${cx(5)} 530 V 560 H ${cx(3)} V 534`} />
      <Join d={`M ${col(6) + W} 495 H ${BUS}`} />

      {/* beyond the grammar: the relational core */}
      <Edge d={`M ${cx(2)} 234 V 606`} />
      <Label x={cx(2) + 8} y={420}>no: beyond</Label>
      <Label x={cx(2) + 8} y={434}>the grammar</Label>
      <Box x={col(2)} y={610} w={W} h={70} id="core" lines={["two writers,", "relational steps"]} kind="hot" />
      <Box x={col(3)} y={610} w={W} h={70} id="reconcile" lines={["the two, by", "ingredients"]} />
      <Box x={col(4)} y={610} w={W} h={70} id="agree?" kind="gate" />
      <Box x={col(5)} y={610} w={W} h={70} id="written query" lines={["two SQL writers"]} kind="hot" />
      <Box x={col(6)} y={610} w={W} h={70} id="agree?" kind="gate" />
      <Box x={col(7)} y={610} w={W} h={70} id="refuse" lines={["say what's missing"]} kind="term" />
      {[2, 3, 4, 5, 6].map((i) => (
        <Edge key={i} d={`M ${col(i) + W} 645 H ${col(i + 1) - 4}`} />
      ))}
      <Join d={`M ${cx(4)} 680 V 720 H ${BUS}`} />
      <Label x={cx(4) + 8} y={712}>yes</Label>
      <Join d={`M ${cx(6)} 610 V 590 H ${BUS}`} />
      <Label x={cx(6) + 8} y={582}>yes</Label>

      {/* every success reaches the answer */}
      <Edge d={`M ${BUS} 720 V 192 H ${col(7) + W + 4}`} />
    </Frame>
  );
}
