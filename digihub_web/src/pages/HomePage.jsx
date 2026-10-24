import { ArrowRight, Download, PackageSearch, ShieldCheck, Store, Wallet } from 'lucide-react'
import { Link } from 'react-router'
import EmptyState from '../components/feedback/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import { featuredCategories } from '../features/catalog/categories.js'
import SearchForm from '../features/catalog/SearchForm.jsx'

const steps = [
  { icon: PackageSearch, title: 'Encontre', text: 'Busque por categoria, preço e avaliação entre produtos de criadores independentes.' },
  { icon: Wallet, title: 'Compre', text: 'Pague em reais. O pedido só é liberado após a confirmação do pagamento.' },
  { icon: Download, title: 'Baixe', text: 'Receba o acesso ao arquivo na sua área de compras, sempre associado ao seu pedido.' },
]

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-ink-700/60">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-accent-500/20 blur-[120px]"
        />
        <Container className="relative py-20 sm:py-28">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ink-600 bg-ink-850 px-3 py-1 text-xs font-medium text-accent-300">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Plataforma em desenvolvimento
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-[1.05] sm:text-6xl">
            Produtos digitais de criadores <span className="text-accent-400">brasileiros</span>.
          </h1>
          <p className="mt-5 max-w-xl text-base text-fg-muted sm:text-lg">
            E-books, cursos, templates, plugins e muito mais, em um só lugar. Compre com segurança ou venda o que você
            criou.
          </p>
          <SearchForm size="lg" className="mt-8 max-w-2xl" />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button to="/produtos" variant="secondary">
              Explorar catálogo
              <ArrowRight className="size-4" aria-hidden="true" />
            </Button>
            <Button to="/vender" variant="ghost">
              <Store className="size-4" aria-hidden="true" />
              Quero vender
            </Button>
          </div>
        </Container>
      </section>

      <Container className="pt-16">
        <h2 className="text-2xl font-semibold">Categorias</h2>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {featuredCategories.map(({ slug, label, icon: Icon }) => (
            <li key={slug}>
              <Link
                to={`/produtos?categoria=${slug}`}
                className="group flex items-center gap-3 rounded-[var(--radius-card)] border border-ink-700 bg-ink-850 p-4 shadow-card transition duration-150 ease-snap hover:-translate-y-0.5 hover:border-accent-500/60"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-ink-800 text-accent-400 transition group-hover:bg-accent-500 group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pt-16">
        <h2 className="text-2xl font-semibold">Em destaque</h2>
        <div className="mt-6">
          <EmptyState
            icon={PackageSearch}
            title="Ainda não há produtos em destaque"
            description="Assim que os primeiros produtos forem publicados, eles aparecerão aqui."
          />
        </div>
      </Container>

      <Container className="pt-16">
        <h2 className="text-2xl font-semibold">Como funciona</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <li key={title} className="rounded-[var(--radius-card)] border border-ink-700 bg-ink-850 p-6 shadow-card">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-lg bg-ink-800 text-accent-400">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold text-fg-subtle">0{i + 1}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-fg-muted">{text}</p>
            </li>
          ))}
        </ol>
      </Container>

      <Container className="pt-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius-card)] border border-accent-500/30 bg-gradient-to-br from-accent-500/15 to-transparent p-8 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-2xl font-semibold">Crie, publique e venda</h2>
            <p className="mt-2 max-w-lg text-sm text-fg-muted">
              Hospede seus arquivos onde preferir e use o DigiHub para vender, receber avaliações e acompanhar suas vendas.
            </p>
          </div>
          <Button to="/vender" size="lg">
            Seja vendedor
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </>
  )
}
