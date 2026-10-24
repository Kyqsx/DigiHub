import { useApiHealth } from '../../hooks/useApiHealth.js'

const states = {
  loading: { dot: 'bg-fg-subtle animate-pulse', label: 'Verificando API…' },
  up: { dot: 'bg-success', label: 'API operacional' },
  degraded: { dot: 'bg-warning', label: 'API com banco indisponível' },
  down: { dot: 'bg-danger', label: 'API indisponível' },
}

export default function ApiStatus() {
  const { data, isPending, isError } = useApiHealth()

  let state = 'loading'
  if (!isPending) {
    if (isError) state = 'down'
    else state = data?.status === 'UP' ? 'up' : 'degraded'
  }
  const { dot, label } = states[state]

  return (
    <p className="inline-flex items-center gap-2 text-xs text-fg-subtle" role="status" data-state={state}>
      <span className={`size-2 rounded-full ${dot}`} aria-hidden="true" />
      {label}
    </p>
  )
}
