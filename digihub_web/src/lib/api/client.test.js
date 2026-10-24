import { afterEach, describe, expect, it, vi } from 'vitest'
import { apiFetch, ApiRequestError } from './client.js'

function mockFetch(impl) {
  vi.stubGlobal('fetch', vi.fn(impl))
}

afterEach(() => vi.unstubAllGlobals())

describe('apiFetch', () => {
  it('devolve o JSON em respostas 2xx', async () => {
    mockFetch(async () => new Response(JSON.stringify({ ok: true }), { status: 200 }))
    await expect(apiFetch('/x')).resolves.toEqual({ ok: true })
  })

  it('normaliza o erro padrão da API', async () => {
    mockFetch(async () =>
      new Response(JSON.stringify({ code: 'VALIDATION_ERROR', message: 'Dados inválidos.', violations: [{ field: 'q' }] }), {
        status: 400,
      }),
    )
    await expect(apiFetch('/x')).rejects.toMatchObject({
      name: 'ApiRequestError',
      status: 400,
      code: 'VALIDATION_ERROR',
      message: 'Dados inválidos.',
    })
  })

  it('trata 401 como sessão expirada', async () => {
    mockFetch(async () => new Response('', { status: 401 }))
    await expect(apiFetch('/x')).rejects.toMatchObject({ status: 401, code: 'SESSION_EXPIRED' })
  })

  it('trata falha de rede', async () => {
    mockFetch(async () => {
      throw new TypeError('Failed to fetch')
    })
    const error = await apiFetch('/x').catch((e) => e)
    expect(error).toBeInstanceOf(ApiRequestError)
    expect(error).toMatchObject({ status: 0, code: 'NETWORK_ERROR' })
  })
})
