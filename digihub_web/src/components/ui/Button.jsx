import { Link } from 'react-router'

const base =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap ' +
  'transition duration-150 ease-snap active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none'

const variants = {
  primary: 'bg-accent-500 text-white hover:bg-accent-600 shadow-glow',
  secondary: 'bg-ink-800 text-fg border border-ink-600 hover:bg-ink-700 hover:border-ink-600',
  ghost: 'text-fg-muted hover:text-fg hover:bg-ink-800',
}

const sizes = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

/** Renderiza <Link> quando recebe `to`, senão <button>. */
export default function Button({ to, variant = 'primary', size = 'md', className = '', children, ...rest }) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  )
}
