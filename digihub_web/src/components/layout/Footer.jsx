import { Link } from 'react-router'
import ApiStatus from '../feedback/ApiStatus.jsx'
import Container from '../ui/Container.jsx'
import Logo from '../ui/Logo.jsx'

const currentYear = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-ink-700/70 bg-ink-900/50">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm text-fg-muted">
            Marketplace brasileiro de produtos digitais. Os arquivos são hospedados pelos próprios vendedores.
          </p>
          <ApiStatus />
        </div>

        <nav aria-label="Explorar" className="space-y-3 text-sm">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-fg-subtle">Explorar</h2>
          <ul className="space-y-2 text-fg-muted">
            <li><Link className="hover:text-fg" to="/produtos">Catálogo</Link></li>
            <li><Link className="hover:text-fg" to="/vender">Venda no DigiHub</Link></li>
          </ul>
        </nav>

        <nav aria-label="Conta" className="space-y-3 text-sm">
          <h2 className="font-sans text-xs font-semibold uppercase tracking-wider text-fg-subtle">Conta</h2>
          <ul className="space-y-2 text-fg-muted">
            <li><Link className="hover:text-fg" to="/entrar">Entrar</Link></li>
            <li><Link className="hover:text-fg" to="/cadastro">Criar conta</Link></li>
          </ul>
        </nav>
      </Container>
      <div className="border-t border-ink-700/70 py-5 text-center text-xs text-fg-subtle">
        © {currentYear} DigiHub. Todos os direitos reservados.
      </div>
    </footer>
  )
}
