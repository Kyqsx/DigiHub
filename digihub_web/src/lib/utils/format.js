const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })

/** Formata um valor em centavos (inteiro) como moeda brasileira. */
export function formatBRL(cents) {
  if (!Number.isInteger(cents)) {
    throw new TypeError('formatBRL espera um inteiro em centavos')
  }
  return brl.format(cents / 100)
}
