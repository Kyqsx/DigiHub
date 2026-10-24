const API_URL = (import.meta.env.VITE_API_URL ?? 'http://localhost:8080').replace(/\/+$/, '')
const DEFAULT_TIMEOUT_MS = 10_000

export class ApiRequestError extends Error {
  /**
   * @param {string} message mensagem segura para exibir ao usuário
   * @param {{status: number, code: string, violations?: Array, body?: unknown}} details
   */
  constructor(message, { status, code, violations = [], body = null }) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.code = code
    this.violations = violations
    this.body = body
  }
}

const FALLBACK_MESSAGES = {
  0: 'Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.',
  401: 'Sua sessão expirou. Entre novamente para continuar.',
  403: 'Você não tem permissão para realizar esta ação.',
  404: 'Recurso não encontrado.',
  429: 'Muitas tentativas. Aguarde um instante e tente novamente.',
}

function codeFor(status) {
  if (status === 0) return 'NETWORK_ERROR'
  if (status === 401) return 'SESSION_EXPIRED'
  if (status === 403) return 'FORBIDDEN'
  if (status >= 500) return 'SERVER_ERROR'
  return 'REQUEST_ERROR'
}

async function readJson(response) {
  try {
    return await response.json()
  } catch {
    return null
  }
}

/**
 * Chamada à API do DigiHub. Usa cookies (credentials: include) para a futura autenticação.
 * Sempre rejeita com ApiRequestError, inclusive em falhas de rede e timeout.
 */
export async function apiFetch(path, { method = 'GET', body, signal, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const signals = [AbortSignal.timeout(timeoutMs)]
  if (signal) signals.push(signal)

  let response
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.any(signals),
    })
  } catch (cause) {
    if (signal?.aborted) throw cause
    throw new ApiRequestError(FALLBACK_MESSAGES[0], { status: 0, code: 'NETWORK_ERROR' })
  }

  const data = response.status === 204 ? null : await readJson(response)

  if (!response.ok) {
    throw new ApiRequestError(data?.message ?? FALLBACK_MESSAGES[response.status] ?? 'Erro inesperado no servidor.', {
      status: response.status,
      code: data?.code ?? codeFor(response.status),
      violations: data?.violations ?? [],
      body: data,
    })
  }
  return data
}
