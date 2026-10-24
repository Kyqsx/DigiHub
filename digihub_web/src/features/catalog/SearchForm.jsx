import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { searchSchema } from './searchSchema.js'

export default function SearchForm({ defaultValue = '', size = 'md', className = '', onSubmitted }) {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(searchSchema), values: { q: defaultValue } })

  const onSubmit = ({ q }) => {
    navigate(q ? `/produtos?q=${encodeURIComponent(q)}` : '/produtos')
    onSubmitted?.()
  }

  const height = size === 'lg' ? 'h-14 text-base' : 'h-10 text-sm'

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="search" className={className} noValidate>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-ink-850 pl-3 pr-1.5 transition focus-within:border-accent-500 focus-within:shadow-glow ${height} ${
          errors.q ? 'border-danger' : 'border-ink-600'
        }`}
      >
        <Search className="size-4 shrink-0 text-fg-subtle" aria-hidden="true" />
        <input
          type="search"
          aria-label="Buscar produtos"
          aria-invalid={errors.q ? 'true' : 'false'}
          placeholder="Buscar produtos…"
          autoComplete="off"
          className="min-w-0 flex-1 bg-transparent text-fg outline-none placeholder:text-fg-subtle"
          {...register('q')}
        />
        <button
          type="submit"
          className="rounded-lg bg-accent-500 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-accent-600 active:scale-[0.97]"
        >
          Buscar
        </button>
      </div>
      {errors.q && (
        <p className="mt-1.5 text-xs text-danger" role="alert">
          {errors.q.message}
        </p>
      )}
    </form>
  )
}
