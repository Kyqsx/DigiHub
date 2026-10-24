import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { NavLink } from 'react-router'
import SearchForm from '../../features/catalog/SearchForm.jsx'
import Button from '../ui/Button.jsx'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'

const links = [
  { to: '/produtos', label: 'Catálogo' },
  { to: '/vender', label: 'Vender' },
]

const linkClass = ({ isActive }) =>
  `rounded-lg px-3 py-2 text-sm font-medium transition ${
    isActive ? 'text-fg bg-ink-800' : 'text-fg-muted hover:text-fg hover:bg-ink-850'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-ink-700/70 bg-ink-950/80 backdrop-blur-xl">
      <Container className="flex h-16 items-center gap-4">
        <Logo />

        <nav className="ml-2 hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <SearchForm className="mx-auto hidden w-full max-w-md lg:block" />

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <Button to="/entrar" variant="ghost">
            Entrar
          </Button>
          <Button to="/cadastro">Criar conta</Button>
        </div>

        <button
          type="button"
          className="ml-auto grid size-10 place-items-center rounded-lg text-fg-muted transition hover:bg-ink-800 hover:text-fg md:hidden"
          aria-label={open ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={open}
          aria-controls="menu-mobile"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </Container>

      {open && (
        <div id="menu-mobile" className="border-t border-ink-700/70 bg-ink-950 md:hidden">
          <Container className="space-y-4 py-4">
            <SearchForm onSubmitted={close} />
            <nav className="flex flex-col gap-1" aria-label="Principal (mobile)">
              {links.map((l) => (
                <NavLink key={l.to} to={l.to} className={linkClass} onClick={close}>
                  {l.label}
                </NavLink>
              ))}
            </nav>
            <div className="grid grid-cols-2 gap-2">
              <Button to="/entrar" variant="secondary" onClick={close}>
                Entrar
              </Button>
              <Button to="/cadastro" onClick={close}>
                Criar conta
              </Button>
            </div>
          </Container>
        </div>
      )}
    </header>
  )
}
