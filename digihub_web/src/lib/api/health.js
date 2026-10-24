import { apiFetch, ApiRequestError } from './client.js'

/**
 * Consulta GET /api/v1/health. A API responde 503 com corpo válido quando o banco está fora do ar;
 * nesse caso devolvemos o corpo para que a interface possa diferenciar "API fora" de "banco fora".
 */
export async function getHealth({ signal } = {}) {
  try {
    return await apiFetch('/api/v1/health', { signal, timeoutMs: 5_000 })
  } catch (error) {
    if (error instanceof ApiRequestError && error.status === 503 && error.body?.status) {
      return error.body
    }
    throw error
  }
}
