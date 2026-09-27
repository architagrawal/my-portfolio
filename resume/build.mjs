// Renders every resume variant from resume/content.mjs.
//   node resume/build.mjs                        the two generic variants
//   node resume/build.mjs applications/Acme      one tailored application
// PDFs go through headless Chrome so the HTML below is the single layout spec;
// the .docx is emitted from the same content model as flat OOXML.
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync, copyFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { profile, experience, education, projects, ONE_PAGE_ROLES } from "./content.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// Detailed-variant extras per role, indexed like `experience`. Depth belongs on
// the recent work, not spread evenly across a 2021 internship. Tuned to two pages.
const EXTRA_CAP = [4, 2, 2, 1, 1, 1, 1, 1];
const PROJECT_EXTRA = 1;

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* ---------------------------------------------------------------- variants */

function variant(kind) {
  const detailed = kind === "detailed";
  // The detailed variant is capped at two pages, so it takes the best few extras
  // per role rather than everything. Keep `extra` ordered best-first.
  const roles = (detailed ? experience.map((_, i) => i) : ONE_PAGE_ROLES).map((i) => {
    const r = experience[i];
    return { ...r, bullets: detailed ? [...r.core, ...r.extra.slice(0, EXTRA_CAP[i] ?? 1)] : r.core };
  });
  const projs = detailed ? projects.map((p) => ({ ...p, bullets: [p.core, ...p.extra.slice(0, PROJECT_EXTRA)] })) : [];
  return { detailed, roles, projects: projs };
}

/* Resolve one selector against a role's full bullet pool (core then extra).
   A selector is either a substring that must match exactly one pooled bullet,
   or {text} for a genuinely new line. A substring matching nothing throws
   rather than passing through as literal text, so a typo can never invent a
   claim that is not in content.mjs. */
function resolveBullet(pool, sel, where) {
  if (typeof sel === "object" && sel !== null) {
    if (!sel.text) throw new Error(`${where}: object selector needs a \`text\` field`);
    return sel.text;
  }
  const hits = pool.filter((b) => b.includes(sel));
  if (hits.length === 1) return hits[0];
  throw new Error(
    hits.length === 0
      ? `${where}: no bullet contains ${JSON.stringify(sel)}. Use {text: "..."} to add a new one.`
      : `${where}: ${JSON.stringify(sel)} matches ${hits.length} bullets; make it more specific.`,
  );
}

function tailored(cfg) {
  const roleIdx = cfg.roles ?? ONE_PAGE_ROLES;
  const roles = roleIdx.map((i) => {
    const r = experience[i];
    if (!r) throw new Error(`roles: no experience at index ${i}`);
    const pool = [...r.core, ...r.extra];
    const sels = cfg.pick?.[i];
    const bullets = sels
      ? sels.map((sel, n) => resolveBullet(pool, sel, `${r.company} pick[${n}]`))
      : r.core;
    return { ...r, title: cfg.retitle?.[i] ?? r.title, bullets };
  });
  const projs = (cfg.projects ?? []).map((i) => {
    const p = projects[i];
    if (!p) throw new Error(`projects: no project at index ${i}`);
    const pool = [p.core, ...p.extra];
    const sels = cfg.pickProject?.[i];
    return { ...p, bullets: sels ? sels.map((s, n) => resolveBullet(pool, s, `${p.name} pick[${n}]`)) : [p.core] };
  });
  return { detailed: false, roles, projects: projs };
}

/* -------------------------------------------------------------------- HTML */

function contactHtml() {
  return profile.contact
    .map((c) =>
      typeof c === "string"
        ? `<span>${esc(c)}</span>`
        : `<span><a href="${c.href}">${esc(c.text)}</a></span>`,
    )
    .join("");
}

function html({ detailed, roles, projects: projs }) {
  // Slightly tighter type on the denser two-page variant.
  const body = detailed ? 9.5 : 9.3;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>Archit Agrawal - ${detailed ? "Detailed Resume" : "Resume"}</title>
<style>
  @page { size: Letter; margin: ${detailed ? "0.5in" : "0.44in"} 0.62in; }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #111;
    font-family: Arial, Helvetica, sans-serif;
    font-size: ${body}pt; line-height: 1.3;
    -webkit-font-smoothing: antialiased;
  }
  a { color: #111; text-decoration: none; }

  /* Header: the name carries the hierarchy, spacing does the separating. */
  .name {
    margin: 0; text-align: center; font-size: 19.5pt; font-weight: 700;
  }
  .contact { margin: 6px 0 0; text-align: center; font-size: 8.6pt; color: #333; }
  .contact span { white-space: nowrap; }
  .contact span + span { margin-left: 1.35em; }

  /* The only rule on the page, and it marks a section boundary. */
  h2 {
    margin: ${detailed ? 15 : 12}px 0 0; padding-bottom: 2px;
    border-bottom: 0.75pt solid #111;
    font-size: 9.2pt; font-weight: 700;
    text-transform: uppercase;
  }
  h2 + * { margin-top: 6px; }

  .role { margin-top: ${detailed ? 8 : 6.5}px; }
  .role-head { break-after: avoid; }
  li { break-inside: avoid; }
  .role-head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
  .role-title { font-size: ${body + 0.4}pt; font-weight: 700; }
  .role-title em { font-style: normal; font-weight: 400; }
  .role-meta { flex: none; font-size: ${body - 0.5}pt; color: #333; white-space: nowrap; }
  .role-meta b { font-weight: 400; }

  /* Native markers in normal flow. A positioned li paints after all other text,
     so PDF extraction read every title and Education before any bullet. */
  ul { margin: 3px 0 0; padding: 0 0 0 13px; list-style: disc outside; }
  li { margin: 0 0 1.8px; padding-left: 1px; }
  li::marker { color: #555; }

  .line { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; margin-top: 4px; }
  .line span:last-child { flex: none; font-size: ${body - 0.5}pt; color: #333; white-space: nowrap; }

  .project { margin-top: 7px; }
</style></head><body>

<div class="name">${esc(profile.name)}</div>
<div class="contact">${contactHtml()}</div>

<h2>Experience</h2>
${roles
  .map(
    (r) => `<div class="role">
  <div class="role-head">
    <div class="role-title">${esc(r.title)}, <em>${esc(r.company)}</em></div>
    <div class="role-meta">${esc(r.location)}<b>&ensp;&ensp;</b>${esc(r.period)}</div>
  </div>
  <ul>${r.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`,
  )
  .join("\n")}

${projs.length ? "<h2>Projects</h2>" : ""}
${projs
  .map(
    (p) => `<div class="project">
  <div class="role-head">
    <div class="role-title">${esc(p.name)}</div>
    <div class="role-meta">${esc(p.period)}</div>
  </div>
  <ul>${p.bullets.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
</div>`,
  )
  .join("\n")}

<h2>Education</h2>
${education
  .map(
    (e) => `<div class="line">
  <span><strong>${esc(e.degree)}</strong>, ${esc(e.school)}${e.detail ? `, ${esc(e.detail)}` : ""}</span>
  <span>${esc(e.period)}</span>
</div>`,
  )
  .join("\n")}

</body></html>`;
}

/* ---------------------------------------------------------------- Markdown */

function markdown({ roles, projects: projs }) {
  const L = [`# ${profile.name}`, ""];
  L.push(profile.contact.map((c) => (typeof c === "string" ? c : `[${c.text}](${c.href})`)).join(" | "), "");
  L.push("## EXPERIENCE", "");
  for (const r of roles) {
    L.push(`### ${r.title} - ${r.company}`, "", `${r.location} | ${r.period}`, "");
    r.bullets.forEach((b) => L.push(`- ${b}`));
    L.push("");
  }
  if (projs.length) {
    L.push("## PROJECTS", "");
    for (const p of projs) {
      L.push(`### ${p.name}`, "", `${p.period}`, "");
      p.bullets.forEach((b) => L.push(`- ${b}`));
      L.push("");
    }
  }
  L.push("## EDUCATION", "");
  for (const e of education) {
    L.push(`**${e.degree}**, ${e.school}${e.detail ? `, ${e.detail}` : ""} | ${e.period}  `);
  }
  return L.join("\n") + "\n";
}

/* -------------------------------------------------------------------- DOCX */

const TWIP_RIGHT = 10400; // Just inside the right margin (12240 - 2*893 = 10454).
const FONT = `<w:rFonts w:ascii="Arial" w:hAnsi="Arial" w:cs="Arial"/>`;

const run = (text, { sz = 19, bold = false, color = "111111", spacing = 0 } = {}) => {
  const hp = Math.round(sz * 2);
  return `<w:r><w:rPr>${FONT}<w:sz w:val="${hp}"/><w:szCs w:val="${hp}"/>` +
  `${bold ? "<w:b/>" : ""}${spacing ? `<w:spacing w:val="${spacing}"/>` : ""}` +
  `<w:color w:val="${color}"/></w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
};

const para = (runs, { align = "", space = 0, before = 0, indent = 0, hanging = 0, tab = false, border = false } = {}) =>
  `<w:p><w:pPr>` +
  (border
    ? `<w:pBdr><w:bottom w:val="single" w:sz="6" w:space="1" w:color="111111"/></w:pBdr>`
    : "") +
  (tab ? `<w:tabs><w:tab w:val="right" w:pos="${TWIP_RIGHT}"/></w:tabs>` : "") +
  `<w:spacing w:before="${before}" w:after="${space}" w:line="252" w:lineRule="auto"/>` +
  (indent || hanging
    ? `<w:ind w:left="${indent}"${hanging ? ` w:hanging="${hanging}"` : ""}/>`
    : "") +
  (align ? `<w:jc w:val="${align}"/>` : "") +
  `</w:pPr>${runs}</w:p>`;

const TAB = `<w:r><w:tab/></w:r>`;

function docxBody({ detailed, roles, projects: projs }) {
  // Word sets a shade looser than the print CSS, so the docx runs a touch smaller.
  const sz = detailed ? 9.2 : 8.9;
  const out = [];

  out.push(para(run(profile.name, { sz: 21, bold: true }), { align: "center", space: 40 }));
  out.push(
    para(
      run(profile.contact.map((c) => (typeof c === "string" ? c : c.text)).join("    "), {
        sz: 8,
        color: "333333",
      }),
      { align: "center", space: 140 },
    ),
  );

  const heading = (t) =>
    out.push(para(run(t.toUpperCase(), { sz: 9.2, bold: true }), { before: 160, space: 60, border: true }));

  const head = (left, leftPlain, right) =>
    out.push(
      para(
        run(left, { sz: sz + 0.4, bold: true }) +
          (leftPlain ? run(leftPlain, { sz: sz + 0.4 }) : "") +
          TAB +
          run(right, { sz: sz - 0.5, color: "333333" }),
        { before: 100, space: 20, tab: true },
      ),
    );

  const bullet = (text) =>
    out.push(
      para(run("•", { sz, color: "555555" }) + run("  ", { sz }) + run(text, { sz }), {
        indent: 227,
        hanging: 227,
        space: 30,
      }),
    );

  heading("Experience");
  for (const r of roles) {
    head(`${r.title}, `, r.company, `${r.location}    ${r.period}`);
    r.bullets.forEach(bullet);
  }

  if (projs.length) {
    heading("Projects");
    for (const p of projs) {
      head(p.name, "", p.period);
      p.bullets.forEach(bullet);
    }
  }

  heading("Education");
  for (const e of education) {
    out.push(
      para(
        run(e.degree, { sz, bold: true }) +
          run(`, ${e.school}${e.detail ? `, ${e.detail}` : ""}`, { sz }) +
          TAB +
          run(e.period, { sz: sz - 0.5, color: "333333" }),
        { space: 20, tab: true },
      ),
    );
  }

  return out.join("");
}

function writeDocx(v, outPath) {
  const dir = mkdtempSync(join(tmpdir(), "docx-"));
  mkdirSync(join(dir, "_rels"));
  mkdirSync(join(dir, "word"));
  writeFileSync(
    join(dir, "[Content_Types].xml"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>`,
  );
  writeFileSync(
    join(dir, "_rels/.rels"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>`,
  );
  writeFileSync(
    join(dir, "word/document.xml"),
    `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${docxBody(v)}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="720" w:right="893" w:bottom="720" w:left="893" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`,
  );
  execFileSync("zip", ["-q", "-X", "-r", outPath, "[Content_Types].xml", "_rels", "word"], { cwd: dir });
  rmSync(dir, { recursive: true, force: true });
}

/* -------------------------------------------------------------------- main */

function render(v, dir, stem, { toPublic = false } = {}) {
  const htmlPath = join(dir, `${stem}.html`);
  const pdfPath = join(dir, `${stem}.pdf`);
  const docxPath = join(dir, `${stem}.docx`);

  writeFileSync(htmlPath, html(v));
  writeFileSync(join(dir, `${stem}.md`), markdown(v));
  rmSync(pdfPath, { force: true });
  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ], { stdio: "ignore" });

  rmSync(docxPath, { force: true });
  writeDocx(v, docxPath);
  if (toPublic) for (const f of [pdfPath, docxPath]) copyFileSync(f, join(ROOT, "public", f.split("/").pop()));

  // Page count straight from the PDF, so a two-page "one-pager" cannot ship unnoticed.
  const pages = (readFileSync(pdfPath).toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
  console.log(`built ${stem}: ${pages} page(s), ${v.roles.reduce((a, r) => a + r.bullets.length, 0)} role bullets`);
  return pages;
}

const target = process.argv[2];

if (target) {
  const dir = join(HERE, target.replace(/^resume\//, ""));
  const cfgPath = join(dir, "config.mjs");
  if (!existsSync(cfgPath)) throw new Error(`no config.mjs in ${dir}`);
  const cfg = (await import(`file://${cfgPath}`)).default;
  for (const k of ["company", "position"]) {
    if (!cfg[k]) throw new Error(`config.mjs is missing \`${k}\``);
  }
  const stem = `Archit_Agrawal_${cfg.position.replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "")}`;
  const pages = render(tailored(cfg), dir, stem);
  if (pages !== (cfg.pages ?? 1)) {
    console.log(`  WARNING: expected ${cfg.pages ?? 1} page(s). Trim \`pick\` or raise \`pages\`.`);
  }
} else {
  for (const kind of ["one", "detailed"]) {
    render(variant(kind), HERE, kind === "detailed" ? "Archit_Agrawal_Resume_Detailed" : "Archit_Agrawal_Resume", { toPublic: true });
  }
}
