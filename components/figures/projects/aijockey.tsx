"use client";

import { FigureFrame, useParts, type Frame } from "../frame";
import { Box, Disc, clamp, ease, fit, frac, mv, op, path } from "../iso";

/* Two decks with their waveforms, and a crossfader the planner slides between them.
   The outgoing track dims as the incoming one takes over. */
const I = fit(10.5, 4.6, 2.6);
const DECKS = [0, 6.5];
const BARS = Array.from({ length: 15 }, (_, i) => 0.25 + 0.9 * Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43)));

export function AiJockeyFigure({
  label,
  className,
  small,
}: {
  label: string;
  className?: string;
  small?: boolean;
}) {
  const { parts, at } = useParts();

  const tick = ({ t, s }: Frame) => {
    const xf = clamp(0.5 + 0.45 * Math.sin(t * 0.35) + s * 0.2);
    mv(parts.current.knob, I.v((xf - 0.5) * 1.6, 0));
    op(parts.current.wave0, 1 - xf * 0.8);
    op(parts.current.wave1, 0.2 + xf * 0.8);
    DECKS.forEach((_, n) => {
      const a = t * (n ? 1.15 : 1.05);
      mv(parts.current[`mark${n}`], I.v(Math.cos(a) * 1.1, Math.sin(a) * 1.1));
      const ph = frac(t * 0.12 + n * 0.5);
      mv(parts.current[`head${n}`], I.v(ph * 3.4, 0), ease(0, 0.08, ph) * (1 - ease(0.9, 1, ph)));
    });
  };

  return (
    <FigureFrame label={label} tick={tick} className={className} small={small}>
      <g data-depth="0.6">
        {DECKS.map((x0, n) => (
          <g key={n} ref={at(`wave${n}`)}>
            {BARS.map((h, i) => (
              <path
                key={i}
                className={n ? "nf hi" : "nf edge"}
                d={path([I.p(x0 + 0.3 + i * 0.23, 0, 0.5), I.p(x0 + 0.3 + i * 0.23, 0, 0.5 + h * 1.6)])}
              />
            ))}
          </g>
        ))}
        {DECKS.map((x0, n) => (
          <path
            key={n}
            ref={at(`head${n}`)}
            className="nf mid"
            d={path([I.p(x0 + 0.3, 0, 0.4), I.p(x0 + 0.3, 0, 2.4)])}
          />
        ))}
      </g>
      <g data-depth="1">
        {DECKS.map((x0, n) => (
          <g key={n}>
            <Box I={I} x={x0} y={0.2} w={3.9} d={4} h={0.5} />
            <Disc I={I} x={x0 + 1.95} y={2.2} z={0.5} r={1.5} />
            <Disc I={I} x={x0 + 1.95} y={2.2} z={0.5} r={0.25} className="lo" />
            <g ref={at(`mark${n}`)}>
              <Disc I={I} x={x0 + 1.95} y={2.2} z={0.5} r={0.12} className="dot" />
            </g>
          </g>
        ))}
        <Box I={I} x={4.3} y={1} w={1.8} d={2.6} h={0.7} />
        <path className="nf lo" d={path([I.p(4.4, 2.3, 0.7), I.p(6, 2.3, 0.7)])} />
        <g ref={at("knob")}>
          <Box I={I} x={5} y={2} w={0.4} d={0.6} h={0.25} z={0.7} />
        </g>
      </g>
    </FigureFrame>
  );
}
