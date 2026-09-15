/** Decorative motion background: three slow-drifting colour blobs. Purely visual. */
export function Aurora({ className = "" }: { className?: string }) {
  return (
    <div className={`aurora ${className}`} aria-hidden>
      <span />
      <span />
      <span />
    </div>
  );
}
