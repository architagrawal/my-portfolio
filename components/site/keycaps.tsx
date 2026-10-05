"use client";

import { skillCategories } from "@/lib/data/skills";
import { click } from "./click";

/* The stack as pressable chips: press one and it clicks, each at its own pitch */
export function Keycaps() {
  return (
    <div className="space-y-8">
      {skillCategories.map((cat, g) => (
        <div key={cat.title}>
          <h3 className="mb-3 text-[15px] font-semibold text-foreground">{cat.title}</h3>
          <ul className="flex flex-wrap gap-2">
            {cat.skills.map((s, i) => (
              <li key={s}>
                <button type="button" onClick={() => click(0.9 + ((g * 7 + i) % 9) * 0.04)} className="ui-chip ui-key">
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
