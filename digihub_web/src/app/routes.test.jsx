import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryRouter, RouterProvider } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { routes } from './routes.jsx'

function renderAt(path) {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } })
  render(
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
    </QueryClientProvider>,
  )
  return router
}

beforeEach(() => {
  window.scrollTo = vi.fn()
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ status: 'UP' }), { status: 200 })))
})
afterEach(() => vi.unstubAllGlobals())

describe('rotas públicas', () => {
  it('renderiza a página inicial', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { level: 1, name: /Produtos digitais de criadores/ })).toBeInTheDocument()
  })

  it('mostra página 404 para rotas desconhecidas', async () => {
    renderAt('/nao-existe')
    expect(await screen.findByRole('heading', { name: 'Página não encontrada', level: 2 })).toBeInTheDocument()
  })

  it('mostra estado vazio no catálogo', async () => {
    renderAt('/produtos')
    expect(await screen.findByText('O catálogo ainda está vazio')).toBeInTheDocument()
  })

  it('busca navega para o catálogo com o termo e mostra "sem resultados"', async () => {
    const user = userEvent.setup()
    const router = renderAt('/')
    const [input] = screen.getAllByRole('searchbox', { name: 'Buscar produtos' })
    await user.type(input, '  planilha  {enter}')
    await waitFor(() => expect(router.state.location.pathname).toBe('/produtos'))
    expect(router.state.location.search).toBe('?q=planilha')
    expect(await screen.findByText('Nenhum produto encontrado')).toBeInTheDocument()
  })

  it('valida o tamanho máximo da busca', async () => {
    const user = userEvent.setup()
    const router = renderAt('/')
    const [input] = screen.getAllByRole('searchbox', { name: 'Buscar produtos' })
    await user.type(input, 'a'.repeat(101))
    await user.keyboard('{enter}')
    expect(await screen.findByText('Use no máximo 100 caracteres.')).toBeInTheDocument()
    expect(router.state.location.pathname).toBe('/')
  })

  it('abre e fecha o menu mobile', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const toggle = screen.getByRole('button', { name: 'Abrir menu' })
    await user.click(toggle)
    expect(screen.getByRole('navigation', { name: 'Principal (mobile)' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Fechar menu' }))
    expect(screen.queryByRole('navigation', { name: 'Principal (mobile)' })).not.toBeInTheDocument()
  })
})
