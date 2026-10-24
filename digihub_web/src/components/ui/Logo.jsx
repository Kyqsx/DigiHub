import { Link } from 'react-router'

export default function Logo({ className = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center gap-2.5 ${className}`} aria-label="DigiHub — página inicial">
      <span className="grid size-8 place-items-center rounded-[9px] bg-accent-500 shadow-glow" aria-hidden="true">
        <svg viewBox="0 0 32 32" className="size-5">
          <path d="M9 9h7a7 7 0 0 1 0 14H9z" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        Digi<span className="text-accent-400">Hub</span>
      </span>
    </Link>
  )
}
