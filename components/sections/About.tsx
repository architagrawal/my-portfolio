import { SectionHeading } from "@/components/ui/section-heading";

const areas = [
  {
    title: "Agent systems",
    text: "LangGraph workflows with checkpointing, pause and resume contracts, idempotent task claims, parallel fan-out, and distributed tracing across workers.",
  },
  {
    title: "Retrieval and data",
    text: "RAG systems, entity resolution, vector and knowledge-graph retrieval, embedding services, search infrastructure, and the ingestion pipelines that keep them current.",
  },
  {
    title: "Application engineering",
    text: "React and React Native interfaces, Python and .NET services, Postgres and Firestore data layers, and deployment on GCP, AWS, and Cloudflare.",
  },
  {
    title: "Testing and operations",
    text: "Unit, integration, property-based, load, and end-to-end testing; observability; release checks; and recovery paths for asynchronous systems.",
  },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="About" title="Background" />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div>
            <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
              <p>
                I am a founding AI/ML engineer at MyStage Music. My current work
                covers agent orchestration, data acquisition, entity
                resolution, search, and the operational infrastructure around
                those systems.
              </p>
              <p>
                Before MyStage, I built retrieval and knowledge-graph systems
                at Arizona State University, worked on cloud and backend
                systems at Zeus Learning, and shipped product features at
                EAT.FIT.
              </p>
              <p>
                I completed an MS in Computer Science at Arizona State
                University with a 4.0 GPA. I am based in the New York metro
                area.
              </p>
            </div>

            <dl className="mt-10 border-t border-border text-sm">
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-4">
                <dt className="text-muted-foreground">Current role</dt>
                <dd>Founding AI/ML Engineer, MyStage Music</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-4">
                <dt className="text-muted-foreground">Education</dt>
                <dd>MS Computer Science, Arizona State University</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border py-4">
                <dt className="text-muted-foreground">Location</dt>
                <dd>New York metro area</dd>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="mb-2 text-sm font-medium text-foreground">
              Areas of work
            </h3>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              These are recurring responsibilities across my recent roles and
              projects, rather than a list of tools used once.
            </p>

            <div className="border-t border-border">
              {areas.map((area, index) => (
                <article
                  key={area.title}
                  className="grid gap-3 border-b border-border py-6 sm:grid-cols-[2rem_11rem_1fr] sm:gap-5"
                >
                  <span className="font-tech text-xs text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-medium text-foreground">{area.title}</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {area.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
