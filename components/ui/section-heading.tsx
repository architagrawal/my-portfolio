interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 ${className}`}>
      {eyebrow && (
        <p className="mb-3 font-tech text-xs tracking-wide text-primary">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
        {title}
      </h2>
    </div>
  );
}
