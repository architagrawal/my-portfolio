import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

interface Achievement {
  text: string;
  relatedTechs?: string[];
}

interface AchievementGroup {
  /** Short mono label shown above the cluster, e.g. "The ask path" */
  label: string;
  /** Indexes into `achievements`, in the order they should read */
  indexes: number[];
}

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: (string | Achievement)[];
  featured?: number[];
  /** Optional clustering for the collapsed details; ungrouped items fall to the end */
  groups?: AchievementGroup[];
  technologies: string[];
  color: string;
}

interface ExperienceCardProps {
  exp: ExperienceItem;
  expIndex: number;
}

const colorMap = {
  blue: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  },
  teal: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  },
  purple: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  },
  orange: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  }
};

export function ExperienceCard({ exp, expIndex }: ExperienceCardProps) {
  const [hoveredAchIndex, setHoveredAchIndex] = useState<number | null>(null);
  const theme = colorMap[exp.color as keyof typeof colorMap] || colorMap.blue;

  const featuredIdx = (exp.featured ?? [0, 1, 2]).filter(
    (i) => i < exp.achievements.length
  );
  const noteIdx = exp.achievements
    .map((_, i) => i)
    .filter((i) => !featuredIdx.includes(i));

  // Cluster the details when the role declares groups; anything not claimed by a
  // group keeps its order at the end, so adding a bullet never silently hides it.
  const clusters = (() => {
    if (!exp.groups?.length) return [{ label: "", indexes: noteIdx }];
    const claimed = new Set<number>();
    const named = exp.groups.map((g) => {
      const indexes = g.indexes.filter((i) => noteIdx.includes(i) && !claimed.has(i));
      indexes.forEach((i) => claimed.add(i));
      return { label: g.label, indexes };
    }).filter((g) => g.indexes.length > 0);
    const rest = noteIdx.filter((i) => !claimed.has(i));
    return rest.length ? [...named, { label: "More", indexes: rest }] : named;
  })();

  return (
    <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true, margin: "-100px" }}
        className="relative group"
    >
        <Card
        className={`
            relative overflow-hidden transition-colors duration-200
            bg-background/40 border border-border rounded-none
            hover:border-primary/40
        `}
        >
        {/* REMOVED: Internal decorative left-border div to fix "extra blue line" issue */}
        
        <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <CardTitle className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight mb-1 text-foreground leading-[0.95]">
                {exp.company}
                </CardTitle>
                <p className="text-lg md:text-xl font-medium text-primary mb-2">
                {exp.role}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                <span className={`flex items-center gap-1.5 px-2 py-0.5 ${theme.badge} transition-colors`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                </span>
                <span className={`flex items-center gap-1.5 px-2 py-0.5 ${theme.badge} transition-colors`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                </span>
                </div>
            </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
            <div className="space-y-4">
            <ul className="space-y-4">
                {featuredIdx.map((achIndex) => {
                const achievement = exp.achievements[achIndex];
                const achievementData =
                    typeof achievement === "string"
                    ? { text: achievement, relatedTechs: [] }
                    : achievement;

                return (
                    <li
                    key={achIndex}
                    className="flex items-start gap-4 experience-bullet-item group/item relative pl-2"
                    onMouseEnter={() => setHoveredAchIndex(achIndex)}
                    onMouseLeave={() => setHoveredAchIndex(null)}
                    >
                    <div className={`mt-2.5 w-1.5 h-1.5 ${theme.bullet} group-hover/item:scale-125 transition-all`} />

                    <span className="text-base text-foreground/80 leading-relaxed transition-colors duration-300 group-hover/item:text-foreground">
                        {achievementData.text}
                    </span>
                    </li>
                );
                })}
            </ul>

            {noteIdx.length > 0 && (
              <details className="group/details">
                <summary className="cursor-pointer list-none inline-flex items-center gap-2 font-tech text-xs uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors pl-2">
                  <span className="group-open/details:hidden">+ View {noteIdx.length} engineering details</span>
                  <span className="hidden group-open/details:inline">Hide engineering details</span>
                </summary>
                <div className="mt-5 space-y-7">
                  {clusters.map((cluster, cIndex) => (
                    <div key={cluster.label || cIndex}>
                      {cluster.label && (
                        <div className="flex items-center gap-3 mb-3 pl-2">
                          <span className="font-tech text-[10px] uppercase tracking-[0.22em] text-primary/90 whitespace-nowrap">
                            {cluster.label}
                          </span>
                          <span className="h-px flex-1 bg-border" aria-hidden="true" />
                          <span className="font-tech text-[10px] tabular-nums text-muted-foreground/60">
                            {cluster.indexes.length}
                          </span>
                        </div>
                      )}
                      <ul className="space-y-3">
                        {cluster.indexes.map((achIndex) => {
                          const achievement = exp.achievements[achIndex];
                          const achievementData =
                            typeof achievement === "string"
                              ? { text: achievement, relatedTechs: [] }
                              : achievement;

                          return (
                            <li
                              key={achIndex}
                              className="flex items-start gap-4 experience-bullet-item group/item relative pl-2"
                              onMouseEnter={() => setHoveredAchIndex(achIndex)}
                              onMouseLeave={() => setHoveredAchIndex(null)}
                            >
                              <div className={`mt-2 w-1.5 h-1.5 ${theme.bullet} group-hover/item:scale-125 transition-all`} />

                              <span className="text-sm text-muted-foreground/90 leading-relaxed transition-colors duration-300 group-hover/item:text-foreground">
                                {achievementData.text}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </details>
            )}
            </div>

            <div className="pt-4 border-t border-white/5">
            <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, techIndex) => {
                // Check highlight logic
                const shouldHighlight =
                    hoveredAchIndex !== null &&
                    exp.achievements[hoveredAchIndex] &&
                    typeof exp.achievements[hoveredAchIndex] === "object" &&
                    (exp.achievements[hoveredAchIndex] as Achievement).relatedTechs?.includes(tech);

                return (
                    <span 
                        key={techIndex}
                        className={`
                            px-2.5 py-1 text-xs font-medium border transition-all duration-300
                            ${shouldHighlight ? theme.pillActive : theme.pillInactive}
                        `}
                    >
                        {tech}
                    </span>
                );
                })}
            </div>
            </div>
        </CardContent>
        </Card>
    </motion.div>
  );
}
