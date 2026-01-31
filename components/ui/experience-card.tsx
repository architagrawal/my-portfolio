import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, MapPin, Calendar } from "lucide-react";
import { useState } from "react";

interface Achievement {
  text: string;
  relatedTechs?: string[];
}

interface ExperienceItem {
  company: string;
  role: string;
  location: string;
  period: string;
  achievements: (string | Achievement)[];
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
    pillActive: "bg-primary/20 border-primary text-primary shadow-[0_0_10px_-2px_rgb(var(--primary))]",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  },
  teal: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary shadow-[0_0_10px_-2px_rgb(var(--primary))]",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  },
  purple: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary shadow-[0_0_10px_-2px_rgb(var(--primary))]",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  },
  orange: {
    primary: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    pillActive: "bg-primary/20 border-primary text-primary shadow-[0_0_10px_-2px_rgb(var(--primary))]",
    pillInactive: "bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/10 hover:text-primary",
    bullet: "bg-primary/50 group-hover/item:bg-primary"
  }
};

export function ExperienceCard({ exp, expIndex }: ExperienceCardProps) {
  const [hoveredAchIndex, setHoveredAchIndex] = useState<number | null>(null);
  const theme = colorMap[exp.color as keyof typeof colorMap] || colorMap.blue;

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
            relative overflow-hidden transition-all duration-500 
            bg-background/40 backdrop-blur-md border border-white/5 
            hover:border-white/10 hover:shadow-2xl hover:bg-background/60
            group-hover:translate-x-1
        `}
        >
        {/* REMOVED: Internal decorative left-border div to fix "extra blue line" issue */}
        
        <CardHeader className="pb-2">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
                <CardTitle className="text-2xl mb-1 flex items-center gap-3 text-foreground tracking-tight">
                <span className={theme.primary}>
                    <Building className="w-5 h-5 md:w-6 md:h-6" />
                </span>
                {exp.company}
                </CardTitle>
                <p className="text-xl font-medium text-foreground/80 mb-2">
                {exp.role}
                </p>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-mono">
                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${theme.badge} transition-colors`}>
                    <MapPin className="w-3.5 h-3.5" />
                    {exp.location}
                </span>
                <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded ${theme.badge} transition-colors`}>
                    <Calendar className="w-3.5 h-3.5" />
                    {exp.period}
                </span>
                </div>
            </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-6 pt-4">
            <div className="space-y-4">
            <ul className="space-y-3">
                {exp.achievements.map((achievement, achIndex) => {
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
                    {/* Bullet */}
                    <div className={`mt-2 w-1.5 h-1.5 rounded-full ${theme.bullet} group-hover/item:scale-125 transition-all`} />
                    
                    <span className="text-muted-foreground/90 leading-relaxed transition-colors duration-300 group-hover/item:text-foreground">
                        {achievementData.text}
                    </span>
                    </li>
                );
                })}
            </ul>
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
                            px-2.5 py-1 rounded-full text-xs font-medium border transition-all duration-300
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
