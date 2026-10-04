import { CompGraphViz, FanoutViz, FlowViz, GatesViz } from "./diagrams";
import { RatioViz, SlopeViz, WaffleViz } from "./numbers";
import { CadenceViz, QuadrantViz, ReceiptViz, ScalingViz } from "./sketches";
import type { Visual } from "./types";

export type { Visual } from "./types";

function Body({ v }: { v: Visual }) {
  switch (v.kind) {
    case "waffle":
      return <WaffleViz v={v} />;
    case "slope":
      return <SlopeViz v={v} />;
    case "ratio":
      return <RatioViz v={v} />;
    case "flow":
      return <FlowViz v={v} />;
    case "quadrant":
      return <QuadrantViz v={v} />;
    case "cadence":
      return <CadenceViz v={v} />;
    case "fanout":
      return <FanoutViz v={v} />;
    case "receipt":
      return <ReceiptViz v={v} />;
    case "scaling":
      return <ScalingViz v={v} />;
    case "compgraph":
      return <CompGraphViz v={v} />;
    case "gates":
      return <GatesViz v={v} />;
    default: {
      const _exhaustive: never = v;
      return _exhaustive;
    }
  }
}

/* The one visual chosen for a role or project, with its caption */
export function Viz({ v, className = "" }: { v: Visual; className?: string }) {
  return (
    <figure className={className}>
      <Body v={v} />
      <figcaption className="mt-2 text-sm text-muted-foreground">{v.caption}</figcaption>
    </figure>
  );
}
