export default function PageLoader() {
  return (
    <div className="space-y-4 py-10" role="status" aria-live="polite">
      <span className="sr-only">Carregando…</span>
      <div className="h-8 w-1/3 animate-pulse rounded-lg bg-ink-800" />
      <div className="h-4 w-2/3 animate-pulse rounded bg-ink-800" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="h-48 animate-pulse rounded-[var(--radius-card)] bg-ink-850" />
        ))}
      </div>
    </div>
  )
}
