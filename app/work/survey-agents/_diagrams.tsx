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
    <figure className="my-2">
      <div className="overflow-x-auto lg:-mx-16 xl:-mx-28">
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
      <figcaption className="mt-3 font-tech text-[10px] uppercase tracking-[0.15em] text-muted-foreground/70">
        <span className="lg:hidden text-primary/80">scroll to pan · </span>
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
        className="font-tech"
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
          className="font-tech"
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
    <text x={x} y={y} textAnchor={anchor} className="font-tech" fontSize="11" fill={hot ? C.hot : C.dim}>
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
      <text x={x + 12} y={y + 18} className="font-tech" fontSize="10" letterSpacing="1.6" fill={C.dim}>
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
  { x: 414, id: "label", lines: ["Map · batch 50", "conc 4 · tol 5%", "toolCap 24"], kind: "solid" },
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
      caption="graph/survey-coding-v1.json → generated ASL · 8 nodes · 13 edges · 2 capability gates · 1 repair cycle"
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
        verdict = repairable → relabel flagged rows · maxIterations 2
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

export function ToolBudget() {
  const max = 24;
  return (
    <div className="my-2 border border-border">
      <div className="flex items-baseline justify-between border-b border-border px-4 py-3">
        <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          maxToolCalls per agent
        </p>
        <p className="font-tech text-[10px] text-muted-foreground/70">declared before the loop was written</p>
      </div>

      <ul className="divide-y divide-border/60">
        {TOOL_CAPS.map((t) => (
          <li key={t.agent} className="grid grid-cols-[7.5rem_1fr] sm:grid-cols-[8rem_3rem_1fr] items-center gap-x-3 px-4 py-2.5">
            <span className="font-tech text-[12px] text-foreground/90">{t.agent}</span>
            <span className="hidden sm:block font-tech text-[12px] tabular-nums text-primary">{t.cap}</span>
            <span className="flex items-center gap-3">
              <span className="relative h-1.5 flex-1 bg-border/50" aria-hidden="true">
                <span
                  className="absolute inset-y-0 left-0 bg-primary/70"
                  style={{ width: `${(t.cap / max) * 100}%` }}
                />
              </span>
              <span className="hidden md:inline font-tech text-[10px] text-muted-foreground/80 w-[15rem] shrink-0">
                {t.note}
              </span>
              <span className="sm:hidden font-tech text-[11px] tabular-nums text-primary">{t.cap}</span>
            </span>
          </li>
        ))}
      </ul>

      <div className="border-t border-border px-4 py-3 grid gap-2 sm:grid-cols-3">
        {LOOP_BOUNDS.map((l) => (
          <div key={l.loop}>
            <p className="font-tech text-[11px] text-foreground/90">
              {l.loop} <span className="text-primary">{l.bound}</span>
            </p>
            <p className="font-tech text-[10px] text-muted-foreground/80">then {l.then}</p>
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
      caption="diagrams/answer-flow · 1 paid node of 10 · dashboard panels post the plan the model would have written, ~20 ms, $0"
      viewBox="0 0 1200 660"
      minWidth={1000}
    >
      {/* band 1: semantic layer, written at upload */}
      <BandFrame x={40} y={70} w={1120} h={120} label="SEMANTIC LAYER · WRITTEN AT UPLOAD" />
      <Box x={70} y={105} w={240} h={64} id="survey_index" lines={["dimensions this run carries"]} kind="store" />
      <Box x={330} y={105} w={300} h={64} id="codebook + metric_registry" lines={["kinds, grains, denominators"]} kind="store" />
      <Box x={890} y={105} w={240} h={64} id="facts" lines={["fact_id on every number"]} kind="store" />

      {/* band 2: analysis agent */}
      <BandFrame x={40} y={250} w={1120} h={220} label="ANALYSIS AGENT" />
      <Box x={70} y={300} w={190} h={66} id="catalog" lines={["only what this", "run can answer"]} />
      <Box x={300} y={300} w={190} h={66} id="bind" lines={["LLM → MBQL plan", "1 call · ~$0.0005"]} kind="hot" />
      <Box x={530} y={300} w={190} h={66} id="validate" lines={["seven checks", "grain, denominator"]} />
      <Box x={760} y={300} w={190} h={66} id="answerable?" lines={["hard constraints"]} kind="gate" />
      <Box x={990} y={300} w={150} h={66} id="execute" lines={["facts hit", "DuckDB on miss"]} />
      <Box x={620} y={382} w={300} h={66} id="refusal + remedy" lines={["ladder: substitute → decompose", "→ sample → extend → request"]} kind="gate" />

      {/* band 3: visualization agent */}
      <BandFrame x={40} y={500} w={1120} h={118} label="VISUALIZATION AGENT" />
      <Box x={70} y={536} w={240} h={64} id="fitness_table" lines={["no model call", "mark chosen deterministically"]} />
      <Box x={350} y={536} w={240} h={64} id="ChartSpec" lines={["factId on every point"]} />
      <Box x={630} y={536} w={500} h={64} id="chart · data_table · alt_text · csv · ascii" lines={["one spec, five renderings"]} />

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
      <Label x={642} y={266}>no model call · ~20 ms · $0</Label>

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
    written: "authored by people · versioned in git · published to S3 on merge",
    tables: [
      { t: "concept", cols: "concept_id PK · vocabulary · parent_id FK" },
      { t: "mapping", cols: "source_code · target_concept_id · predicate · confidence" },
      { t: "codelist / codelist_member", cols: "value · status · uploads" },
      { t: "metric", cols: "grain · denominators · accepts_kinds · usage_count" },
      { t: "instrument", cols: "instrument_id PK · question_ids" },
      { t: "codebook", cols: "codebook_hash PK · provenance" },
      { t: "term", cols: "starts_on · ends_on · session" },
    ],
  },
  {
    band: "CATALOG",
    written: "computed per upload · one run = one labeling pass over one file",
    tables: [
      { t: "run", cols: "run_id PK · instrument_id FK · codebook_hash FK · term_id FK · respondent_fingerprint" },
      { t: "dimension", cols: "kind · ordered · scale_min/max · codelist_name FK" },
      { t: "dimension_value", cols: "(run_id, dimension, key) PK · provisional" },
      { t: "unavailable", cols: "panel · reason — which layer refused, and why" },
    ],
  },
  {
    band: "FACTS",
    written: "one table, narrow on purpose",
    tables: [
      {
        t: "fact",
        cols: "fact_id PK · metric_id FK · dimension + key FK · kind (count | share | coverage | crosstab_cell | cooccurrence) · value · denominator",
      },
    ],
  },
  {
    band: "CACHES",
    written: "keyed on content hashes · no foreign key into facts",
    tables: [
      { t: "binding_cache", cols: "question → plan, the only non-deterministic step, so it is cached not re-rolled" },
      { t: "question_passport", cols: "plan_hash · dataset · registry + skill versions" },
    ],
  },
  {
    band: "PAYLOAD",
    written: "not a table · an S3 directory per run, addressed by run_id",
    tables: [
      { t: "runs/RUN_ID/payload.lance", cols: "verbatims · per-row labels · vectors + BM25 index · 14–178 MB against ~150 KB of facts" },
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
      <div className="border border-border divide-y divide-border">
        {BANDS.map((b) => (
          <div key={b.band} className="grid md:grid-cols-[11rem_1fr]">
            <div className="px-4 py-3 border-b md:border-b-0 md:border-r border-border bg-muted/20">
              <p className="font-tech text-[11px] uppercase tracking-[0.18em] text-primary">{b.band}</p>
              <p className="mt-1.5 font-tech text-[10px] leading-relaxed text-muted-foreground/80">{b.written}</p>
            </div>
            <ul className="px-4 py-3 space-y-2">
              {b.tables.map((t) => (
                <li key={t.t} className="grid sm:grid-cols-[13rem_1fr] gap-x-4 gap-y-0.5">
                  <span className="font-tech text-[12px] text-foreground/90">{t.t}</span>
                  <span className="font-tech text-[10.5px] leading-relaxed text-muted-foreground">{t.cols}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div>
        <p className="font-tech text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-4">
          The four keys that carry the model
        </p>
        <ul className="space-y-3">
          {KEYS.map((k) => (
            <li key={k.k} className="grid sm:grid-cols-[15rem_1fr] gap-x-6 gap-y-1">
              <span className="font-tech text-[12px] text-primary">{k.k}</span>
              <span className="text-sm text-muted-foreground leading-relaxed">{k.v}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
