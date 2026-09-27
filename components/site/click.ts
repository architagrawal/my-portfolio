/* A soft key click, synthesized so there is no audio file to load */
let ctx: AudioContext | null = null;

export function click(pitch = 1) {
  if (typeof window === "undefined") return;
  try {
    ctx ??= new AudioContext();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(520 * pitch, now);
    osc.frequency.exponentialRampToValueAtTime(180 * pitch, now + 0.05);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  } catch {
    // sound is a nicety; ignore browsers that block it
  }
}
