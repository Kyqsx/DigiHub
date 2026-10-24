import { describe, expect, it } from 'vitest'
import { formatBRL } from './format.js'

describe('formatBRL', () => {
  it('formata centavos como reais', () => {
    expect(formatBRL(12990).replace(/\s/g, ' ')).toBe('R$ 129,90')
    expect(formatBRL(0).replace(/\s/g, ' ')).toBe('R$ 0,00')
  })

  it('rejeita valores não inteiros', () => {
    expect(() => formatBRL(10.5)).toThrow(TypeError)
  })
})
