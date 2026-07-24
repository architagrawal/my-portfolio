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
  featuredAchievementIndexes?: number[];
  technologies: string[];
  color: string;
}

interface ExperienceCardProps {
  exp: ExperienceItem;
  expIndex: number;
}

function achievementText(achievement: string | Achievement) {
  return typeof achievement === "string" ? achievement : achievement.text;
}

export function ExperienceCard({ exp, expIndex }: ExperienceCardProps) {
  const featuredIndexes =
    exp.featuredAchievementIndexes ??
    exp.achievements.slice(0, 3).map((_, index) => index);
  const detailedIndexes = exp.achievements
    .map((_, index) => index)
    .filter((index) => !featuredIndexes.includes(index));

  return (
    <article className="grid gap-6 border-b border-border py-10 lg:grid-cols-[12rem_minmax(0,1fr)] lg:gap-12">
      <div>
        <p className="font-tech text-xs text-primary">
          {String(expIndex + 1).padStart(2, "0")}
        </p>
        <p className="mt-3 text-sm text-foreground">{exp.period}</p>
        <p className="mt-1 text-sm text-muted-foreground">{exp.location}</p>
      </div>

      <div>
        <h3 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          {exp.company}
        </h3>
        <p className="mt-2 text-base text-primary">{exp.role}</p>

        <ul className="mt-7 max-w-4xl space-y-4">
          {featuredIndexes.map((index) => (
            <li
              key={index}
              className="grid grid-cols-[0.8rem_1fr] gap-3 text-sm leading-relaxed text-foreground/90 sm:text-base"
            >
              <span className="mt-[0.65rem] h-1 w-1 bg-primary" />
              <span>{achievementText(exp.achievements[index])}</span>
            </li>
          ))}
        </ul>

        {detailedIndexes.length > 0 && (
          <details className="mt-7 max-w-4xl border-t border-border pt-5">
            <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground">
              Technical notes ({detailedIndexes.length})
            </summary>
            <ul className="mt-5 space-y-4">
              {detailedIndexes.map((index) => (
                <li
                  key={index}
                  className="grid grid-cols-[0.8rem_1fr] gap-3 text-sm leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[0.55rem] h-px w-2 bg-border" />
                  <span>{achievementText(exp.achievements[index])}</span>
                </li>
              ))}
            </ul>
          </details>
        )}

        <p className="mt-7 max-w-4xl text-xs leading-relaxed text-muted-foreground">
          {exp.technologies.join(" · ")}
        </p>
      </div>
    </article>
  );
}
