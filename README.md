# my-portfolio

Source of [agrawal-archit.vercel.app](https://agrawal-archit.vercel.app): case studies, project write-ups, a lab notebook of measured results, and the resume, all built from one set of content files.

## What is in it

- **Case studies**: long-form write-ups with redrawn architecture diagrams, starting with [Survey Agents](https://agrawal-archit.vercel.app/work/survey-agents), a 12-agent analytics platform that checks every answer before showing it.
- **Work and projects**: every role and project, from `lib/data/experience.ts` and `lib/data/projects.ts`.
- **Lab**: the hardest problems, each with the number that says it is solved, from `lib/data/lab.ts`.
- **Resume**: `resume/content.mjs` is the single source for every resume variant. `node resume/build.mjs` renders the PDF and Word files, sizing type to fill each page; `node resume/build.mjs roles/<role>` builds a role-targeted version.

## Stack

Next.js 13 (static export), React 18, TypeScript, Tailwind CSS and Framer Motion, deployed on Vercel. Resumes print through headless Chrome.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export to out/
```
