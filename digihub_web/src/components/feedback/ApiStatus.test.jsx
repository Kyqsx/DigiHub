import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import ApiStatus from './ApiStatus.jsx'

function renderStatus() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  return render(
    <QueryClientProvider client={client}>
      <ApiStatus />
    </QueryClientProvider>,
  )
}

afterEach(() => vi.unstubAllGlobals())

describe('ApiStatus', () => {
  it('mostra "operacional" quando a API responde UP', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ status: 'UP', database: 'UP' }), { status: 200 })))
    renderStatus()
    expect(await screen.findByText('API operacional')).toBeInTheDocument()
  })

  it('mostra "banco indisponível" quando a API responde 503', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => new Response(JSON.stringify({ status: 'DEGRADED', database: 'DOWN' }), { status: 503 })),
    )
    renderStatus()
    expect(await screen.findByText('API com banco indisponível')).toBeInTheDocument()
  })

  it('mostra "indisponível" em falha de rede', async () => {
    vi.stubGlobal('fetch', vi.fn(async () => { throw new TypeError('Failed to fetch') }))
    renderStatus()
    expect(await screen.findByText('API indisponível')).toBeInTheDocument()
  })
})
