"use client";

export default function Footer() {
  return (
    <footer className="border-t border-border px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Archit Agrawal</p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-fit hover:text-foreground"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}
