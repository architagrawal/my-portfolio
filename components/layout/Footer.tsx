export default function Footer() {
  return (
    <footer className="border-x border-line">
      <div className="stripe-divider border-b border-line" aria-hidden="true" />
      <div className="screen-line-bottom flex flex-wrap items-center justify-between gap-3 px-4 py-4 font-tech text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Archit Agrawal</span>
        <span>
          Layout inspired by{" "}
          <a href="https://chanhdai.com" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-foreground">
            chanhdai.com
          </a>
          ,{" "}
          <a href="https://github.com/architagrawal/my-portfolio" target="_blank" rel="noopener noreferrer" className="underline decoration-border underline-offset-4 hover:text-foreground">
            source
          </a>
        </span>
      </div>
      <div className="h-16" />
    </footer>
  );
}
