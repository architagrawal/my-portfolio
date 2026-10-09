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

import { profile, experience, education, projects, skills, ONE_PAGE_ROLES, ONE_PAGE_PROJECTS } from "./content.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");
const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
// Detailed-variant extras per role, indexed like `experience`. Depth belongs on
// the recent work, not spread evenly across a 2021 internship. Tuned to two pages.
const EXTRA_CAP = [5, 2, 2, 1, 1, 1, 1, 1];
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
  const projs = detailed
    ? projects.map((p) => ({ ...p, bullets: [p.core, ...p.extra.slice(0, PROJECT_EXTRA)] }))
    : ONE_PAGE_PROJECTS.map((i) => ({ ...projects[i], bullets: [projects[i].core] }));
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
  return { detailed: (cfg.pages ?? 1) > 1, roles, projects: projs };
}

/* -------------------------------------------------------------------- HTML */

// "May 2026 – Present" -> "05/2026 - Present". Content keeps the readable form.
const MONTHS = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
const fmtDate = (d) => d.trim().replace(/^([A-Z][a-z]{2}) (\d{4})$/, (m, mon, y) => (MONTHS[mon] ? `${String(MONTHS[mon]).padStart(2, "0")}/${y}` : m));
const fmtPeriod = (p) => String(p).split(/\s+[–-]\s+/).map(fmtDate).join(" - ");

const contactText = (c) => (typeof c === "string" ? c : c.label ?? c.text);

function contactHtml() {
  return profile.contact
    .map((c) => (typeof c === "string" ? esc(c) : `<a href="${c.href}">${esc(contactText(c))}</a>`))
    .join(`<span class="sep">|</span>`);
}

const FONT_DIR = `file://${join(HERE, "fonts")}`;

/* Two lines per entry: who and when in bold, what and where in italics. */
const entry = (left, right, sub, subRight, bullets, href) => `<div class="role">
  <div class="row head"><span>${esc(left)}${href ? `<span class="link"> | <a href="${href}">GitHub</a></span>` : ""}</span><span>${esc(right)}</span></div>
  ${sub || subRight ? `<div class="row sub"><span>${esc(sub ?? "")}</span><span>${esc(subRight ?? "")}</span></div>` : ""}
  ${bullets.length ? `<ul>${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>` : ""}
</div>`;

function html({ detailed, roles, projects: projs }, body = detailed ? 9.6 : 9.3) {
  // Spacing scales with the type, so a larger fit keeps the same proportions.
  const k = body / 9.3;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8" />
<title>Archit Agrawal - ${detailed ? "Detailed Resume" : "Resume"}</title>
<style>
  @font-face { font-family: Lato; font-weight: 400; font-style: normal; src: url("${FONT_DIR}/Lato-Regular.ttf"); }
  @font-face { font-family: Lato; font-weight: 700; font-style: normal; src: url("${FONT_DIR}/Lato-Bold.ttf"); }
  @font-face { font-family: Lato; font-weight: 400; font-style: italic; src: url("${FONT_DIR}/Lato-Italic.ttf"); }
  @font-face { font-family: Lato; font-weight: 700; font-style: italic; src: url("${FONT_DIR}/Lato-BoldItalic.ttf"); }
  @page { size: Letter; margin: ${detailed ? "0.45in" : "0.36in"} 0.55in; }
  * { box-sizing: border-box; }
  body {
    margin: 0; color: #111;
    font-family: Lato, Carlito, Calibri, Arial, sans-serif;
    font-size: ${body}pt; line-height: 1.18;
    -webkit-font-smoothing: antialiased;
  }
  a { color: #111; text-decoration: underline; text-underline-offset: 1.5px; text-decoration-thickness: 0.5pt; }

  .name { margin: 0; text-align: center; font-size: 15pt; font-weight: 400; line-height: 1.1; letter-spacing: 0; }
  .contact { margin: 2px 0 0; text-align: center; font-size: ${body - 0.6}pt; }
  .contact .sep { margin: 0 0.55em; }

  h2 {
    margin: ${((detailed ? 10 : 7) * k).toFixed(1)}px 0 0; padding-bottom: 1px;
    border-bottom: 0.6pt solid #999;
    font-size: ${body + 0.6}pt; font-weight: 700; text-transform: uppercase;
  }

  .role { margin-top: ${((detailed ? 5 : 3.5) * k).toFixed(1)}px; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
  .row span:last-child { flex: none; white-space: nowrap; }
  .head { font-weight: 700; break-after: avoid; }
  .sub { font-style: italic; break-after: avoid; }

  /* Native markers in normal flow. A positioned li paints after all other text,
     so PDF extraction read every title and Education before any bullet. */
  ul { margin: 1px 0 0; padding: 0 0 0 12px; list-style: "\\2022\\2002" outside; }
  li { margin: 0 0 0.6px; padding-left: 1px; break-inside: avoid; }
  li b { font-weight: 700; }
  .head .link { font-weight: 400; }
  .skills { margin-top: ${(3 * k).toFixed(1)}px; }
  .skills div { margin-bottom: 0.6px; }
  .skills b { font-weight: 700; }
</style></head><body>

<div class="name">${esc(profile.name)}</div>
<div class="contact">${contactHtml()}</div>

<h2>Professional Experience</h2>
${roles.map((r) => entry(r.company, fmtPeriod(r.period), r.title, r.location, r.bullets.map(esc))).join("\n")}

${projs.length ? "<h2>Projects</h2>" : ""}
${projs.map((p) => entry(p.name, fmtPeriod(p.period), null, null, p.bullets.map(esc), p.href)).join("\n")}

<h2>Technical Skills</h2>
<div class="skills">${skills.map((k) => `<div><b>${esc(k.label)}:</b> ${esc(k.items)}</div>`).join("")}</div>

<h2>Education</h2>
${education
  .map((e) => entry(e.school, fmtPeriod(e.period), e.degree, e.location, e.detail ? [`<b>${esc(e.detail.split(":")[0])}:</b>${esc(e.detail.split(":").slice(1).join(":"))}`] : []))
  .join("\n")}

</body></html>`;
}

/* ---------------------------------------------------------------- Markdown */

function markdown({ roles, projects: projs }) {
  const L = [`# ${profile.name}`, ""];
  L.push(profile.contact.map((c) => (typeof c === "string" ? c : `[${contactText(c)}](${c.href})`)).join(" | "), "");
  L.push("## PROFESSIONAL EXPERIENCE", "");
  for (const r of roles) {
    L.push(`### ${r.company} | ${fmtPeriod(r.period)}`, "", `*${r.title}* | *${r.location}*`, "");
    r.bullets.forEach((b) => L.push(`- ${b}`));
    L.push("");
  }
  if (projs.length) {
    L.push("## PROJECTS", "");
    for (const p of projs) {
      L.push(`### ${p.name}${p.href ? ` | [GitHub](${p.href})` : ""} | ${fmtPeriod(p.period)}`, "");
      p.bullets.forEach((b) => L.push(`- ${b}`));
      L.push("");
    }
  }
  L.push("## TECHNICAL SKILLS", "");
  for (const k of skills) L.push(`**${k.label}:** ${k.items}  `);
  L.push("");
  L.push("## EDUCATION", "");
  for (const e of education) {
    L.push(`### ${e.school} | ${fmtPeriod(e.period)}`, "", `*${e.degree}* | *${e.location ?? ""}*`, "");
    if (e.detail) L.push(`- ${e.detail}`, "");
  }
  return L.join("\n") + "\n";
}

/* -------------------------------------------------------------------- DOCX */

const TWIP_RIGHT = 10520; // Just inside the right margin (12240 - 2*864 = 10512 usable).
const FONT = `<w:rFonts w:ascii="Lato" w:hAnsi="Lato" w:cs="Lato"/>`;

const run = (text, { sz = 19, bold = false, italic = false, color = "111111", underline = false } = {}) => {
  const hp = Math.round(sz * 2);
  return `<w:r><w:rPr>${FONT}<w:sz w:val="${hp}"/><w:szCs w:val="${hp}"/>` +
  `${bold ? "<w:b/>" : ""}${italic ? "<w:i/>" : ""}${underline ? `<w:u w:val="single"/>` : ""}` +
  `<w:color w:val="${color}"/></w:rPr><w:t xml:space="preserve">${esc(text)}</w:t></w:r>`;
};

const para = (runs, { align = "", space = 0, before = 0, indent = 0, hanging = 0, tab = false, border = false } = {}) =>
  `<w:p><w:pPr>` +
  (border
    ? `<w:pBdr><w:bottom w:val="single" w:sz="4" w:space="1" w:color="999999"/></w:pBdr>`
    : "") +
  (tab ? `<w:tabs><w:tab w:val="right" w:pos="${TWIP_RIGHT}"/></w:tabs>` : "") +
  `<w:spacing w:before="${before}" w:after="${space}" w:line="240" w:lineRule="auto"/>` +
  (indent || hanging
    ? `<w:ind w:left="${indent}"${hanging ? ` w:hanging="${hanging}"` : ""}/>`
    : "") +
  (align ? `<w:jc w:val="${align}"/>` : "") +
  `</w:pPr>${runs}</w:p>`;

const TAB = `<w:r><w:tab/></w:r>`;

function docxBody({ detailed, roles, projects: projs }, body = detailed ? 9.6 : 9.3) {
  // Word sets a shade looser than the print CSS, so the docx runs a touch smaller.
  const sz = Math.round((body - 0.3) * 10) / 10;
  const out = [];

  out.push(para(run(profile.name, { sz: 15 }), { align: "center", space: 20 }));
  out.push(
    para(
      profile.contact
        .map((c) => (typeof c === "string" ? run(c, { sz: sz - 0.6 }) : run(contactText(c), { sz: sz - 0.6, underline: true })))
        .join(run("  |  ", { sz: sz - 0.6 })),
      { align: "center", space: 100 },
    ),
  );

  const heading = (t) =>
    out.push(para(run(t.toUpperCase(), { sz: sz + 0.6, bold: true }), { before: 140, space: 40, border: true }));

  const bullet = (text) =>
    out.push(
      para(run("•", { sz }) + run("  ", { sz }) + text, {
        indent: 200,
        hanging: 200,
        space: 10,
      }),
    );

  const entry = (left, right, sub, subRight, bullets) => {
    out.push(para(run(left, { sz, bold: true }) + TAB + run(right, { sz, bold: true }), { before: 80, space: 0, tab: true }));
    if (sub || subRight)
      out.push(para(run(sub ?? "", { sz, italic: true }) + TAB + run(subRight ?? "", { sz, italic: true }), { space: 10, tab: true }));
    bullets.forEach(bullet);
  };

  heading("Professional Experience");
  for (const r of roles) entry(r.company, fmtPeriod(r.period), r.title, r.location, r.bullets.map((b) => run(b, { sz })));

  if (projs.length) {
    heading("Projects");
    for (const p of projs) entry(p.name, fmtPeriod(p.period), null, null, p.bullets.map((b) => run(b, { sz })));
  }

  heading("Technical Skills");
  for (const k of skills) out.push(para(run(`${k.label}: `, { sz, bold: true }) + run(k.items, { sz }), { space: 10 }));

  heading("Education");
  for (const e of education) {
    const [k, ...v] = (e.detail ?? "").split(":");
    entry(e.school, fmtPeriod(e.period), e.degree, e.location, e.detail ? [run(`${k}:`, { sz, bold: true }) + run(v.join(":"), { sz })] : []);
  }

  return out.join("");
}

function writeDocx(v, outPath, body) {
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
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${docxBody(v, body)}<w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="605" w:right="864" w:bottom="605" w:left="864" w:header="0" w:footer="0" w:gutter="0"/></w:sectPr></w:body></w:document>`,
  );
  execFileSync("zip", ["-q", "-X", "-r", outPath, "[Content_Types].xml", "_rels", "word"], { cwd: dir });
  rmSync(dir, { recursive: true, force: true });
}

/* -------------------------------------------------------------------- main */

// Largest body size that still lands on exactly `pages` pages, so a lighter
// variant fills its page instead of leaving a gap at the bottom.
const FIT_MIN = 9.0;
const FIT_MAX = 9.8;

function printPdf(htmlPath, pdfPath) {
  rmSync(pdfPath, { force: true });
  execFileSync(CHROME, [
    "--headless",
    "--disable-gpu",
    "--no-pdf-header-footer",
    `--print-to-pdf=${pdfPath}`,
    `file://${htmlPath}`,
  ], { stdio: "ignore" });
  return (readFileSync(pdfPath).toString("latin1").match(/\/Type\s*\/Page[^s]/g) || []).length;
}

function render(v, dir, stem, { toPublic = false, pages: want = v.detailed ? 2 : 1 } = {}) {
  const htmlPath = join(dir, `${stem}.html`);
  const pdfPath = join(dir, `${stem}.pdf`);
  const docxPath = join(dir, `${stem}.docx`);
  const at = (size) => {
    writeFileSync(htmlPath, html(v, size));
    return printPdf(htmlPath, pdfPath);
  };

  // Page count only grows with size, so binary search in 0.1pt steps.
  let lo = FIT_MIN * 10, hi = FIT_MAX * 10, best = FIT_MIN;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (at(mid / 10) <= want) { best = mid / 10; lo = mid + 1; } else hi = mid - 1;
  }
  const pages = at(best);

  writeFileSync(join(dir, `${stem}.md`), markdown(v));
  rmSync(docxPath, { force: true });
  writeDocx(v, docxPath, best);
  if (toPublic) for (const f of [pdfPath, docxPath]) copyFileSync(f, join(ROOT, "public", f.split("/").pop()));

  console.log(`built ${stem}: ${pages} page(s) at ${best}pt, ${v.roles.reduce((a, r) => a + r.bullets.length, 0)} role bullets`);
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
  // A config may carry a `detailed` block for a two-page version of the same role.
  const builds = [[cfg, stem]];
  if (cfg.detailed) builds.push([{ ...cfg, ...cfg.detailed, pages: cfg.detailed.pages ?? 2 }, `${stem}_Detailed`]);
  for (const [c, name] of builds) {
    const pages = render(tailored(c), dir, name, { pages: c.pages ?? 1 });
    // `publishAs` puts this variant on the site under a stable name.
    if (c.publishAs) for (const ext of ["pdf", "docx"]) copyFileSync(join(dir, `${name}.${ext}`), join(ROOT, "public", `${c.publishAs}.${ext}`));
    if (pages !== (c.pages ?? 1)) {
      console.log(`  WARNING: expected ${c.pages ?? 1} page(s). Trim \`pick\` or raise \`pages\`.`);
    }
  }
} else {
  for (const kind of ["one", "detailed"]) {
    render(variant(kind), HERE, kind === "detailed" ? "Archit_Agrawal_Resume_Detailed" : "Archit_Agrawal_Resume", { toPublic: true });
  }
}
