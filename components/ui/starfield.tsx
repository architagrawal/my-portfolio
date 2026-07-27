"use client";

import { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  depth: number;
  baseAlpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  vx: number;
  vy: number;
  saffron: boolean;
};

type ShootingStar = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
};

/**
 * Ambient starfield: drifting, twinkling stars with mouse parallax and the
 * occasional saffron shooting star. Renders a single static frame when the
 * user prefers reduced motion, and pauses entirely while off-screen.
 */
export default function Starfield({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = false;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const mouse = { x: 0.5, y: 0.5 };
    const parallax = { x: 0, y: 0 };
    let shooting: ShootingStar | null = null;
    let nextShootAt = performance.now() + 4000 + Math.random() * 6000;

    const seed = () => {
      const count = Math.min(180, Math.floor((width * height) / 9000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.4 + Math.random() * 1.4,
        depth: 0.3 + Math.random() * 0.7,
        baseAlpha: 0.25 + Math.random() * 0.55,
        twinkleSpeed: 0.4 + Math.random() * 1.2,
        twinklePhase: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * 0.04,
        vy: (Math.random() - 0.5) * 0.03,
        saffron: Math.random() < 0.18,
      }));
    };

    const draw = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const dark = document.documentElement.classList.contains("dark");
      const dim = dark ? 1 : 0.3;
      const t = now / 1000;

      parallax.x += ((mouse.x - 0.5) * 24 - parallax.x) * 0.04;
      parallax.y += ((mouse.y - 0.5) * 16 - parallax.y) * 0.04;

      for (const s of stars) {
        if (!reduce) {
          s.x += s.vx;
          s.y += s.vy;
          if (s.x < -4) s.x = width + 4;
          else if (s.x > width + 4) s.x = -4;
          if (s.y < -4) s.y = height + 4;
          else if (s.y > height + 4) s.y = -4;
        }
        const twinkle = reduce
          ? 1
          : 0.65 + 0.35 * Math.sin(t * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.baseAlpha * twinkle * dim;
        const px = s.x + parallax.x * s.depth;
        const py = s.y + parallax.y * s.depth;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.saffron
          ? `hsla(28, 95%, 60%, ${alpha})`
          : `hsla(40, 35%, 90%, ${alpha * 0.9})`;
        ctx.fill();
      }

      if (!reduce) {
        if (!shooting && now > nextShootAt) {
          shooting = {
            x: Math.random() < 0.5 ? -20 : width * (0.2 + Math.random() * 0.5),
            y: height * Math.random() * 0.4,
            vx: 7 + Math.random() * 5,
            vy: 2 + Math.random() * 2,
            life: 0,
            max: 40 + Math.random() * 20,
          };
        }
        if (shooting) {
          shooting.x += shooting.vx;
          shooting.y += shooting.vy;
          shooting.life++;
          const fade = 1 - shooting.life / shooting.max;
          if (fade <= 0 || shooting.x > width + 40 || shooting.y > height + 40) {
            shooting = null;
            nextShootAt = now + 5000 + Math.random() * 9000;
          } else {
            const tail = 10;
            const grad = ctx.createLinearGradient(
              shooting.x,
              shooting.y,
              shooting.x - shooting.vx * tail,
              shooting.y - shooting.vy * tail
            );
            grad.addColorStop(0, `hsla(28, 95%, 65%, ${0.8 * fade * dim})`);
            grad.addColorStop(1, "hsla(28, 95%, 65%, 0)");
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(shooting.x, shooting.y);
            ctx.lineTo(
              shooting.x - shooting.vx * tail,
              shooting.y - shooting.vy * tail
            );
            ctx.stroke();
          }
        }
      }
    };

    const loop = (now: number) => {
      if (!running) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      if (reduce) draw(performance.now());
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting ? start() : stop()
    );
    io.observe(canvas);
    window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 78% 18%, hsl(var(--primary) / 0.08), transparent 60%), radial-gradient(ellipse 50% 40% at 12% 78%, hsl(var(--primary) / 0.05), transparent 60%)",
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
