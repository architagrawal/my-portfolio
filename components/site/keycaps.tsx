"use client";

import { skillCategories } from "@/lib/data/skills";
import { click } from "./click";

/* Each skill group gets one key colour: top face and the darker base it sits on */
const KEY = [
  { top: "bg-muted text-primary", base: "bg-[hsl(var(--primary-deep))]" },
  { top: "bg-muted text-secondary", base: "bg-[hsl(var(--secondary-deep))]" },
  { top: "bg-muted text-foreground", base: "bg-border" },
];

/* The stack as pressable keycaps (after Naresh Khatri's skills keyboard): press one and it clicks */
export function Keycaps() {
  return (
    <div className="space-y-8">
      {skillCategories.map((cat, g) => {
        const k = KEY[g % KEY.length];
        return (
          <div key={cat.title}>
            <h3 className="mb-3 text-[15px] font-extrabold">{cat.title}</h3>
            <ul className="flex flex-wrap gap-x-2.5 gap-y-3.5">
              {cat.skills.map((s, i) => (
                <li key={s}>
                  <button
                    type="button"
                    onClick={() => click(0.9 + ((g * 7 + i) % 9) * 0.04)}
                    className={`group block rounded-lg ${k.base} pb-1 transition-[padding] duration-100 active:pb-0`}
                  >
                    <span
                      className={`block rounded-lg px-3 py-1.5 text-[14px] font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-100 group-hover:-translate-y-px group-active:translate-y-0.5 ${k.top}`}
                    >
                      {s}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
