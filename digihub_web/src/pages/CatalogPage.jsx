import { PackageSearch, SearchX } from 'lucide-react'
import { useSearchParams } from 'react-router'
import EmptyState from '../components/feedback/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'
import SearchForm from '../features/catalog/SearchForm.jsx'

export default function CatalogPage() {
  const [params] = useSearchParams()
  const q = (params.get('q') ?? '').trim().slice(0, 100)

  return (
    <Container className="py-10">
      <h1 className="text-3xl font-semibold">{q ? `Resultados para “${q}”` : 'Catálogo'}</h1>
      <p className="mt-2 text-sm text-fg-muted">Produtos digitais publicados por vendedores independentes.</p>
      <SearchForm defaultValue={q} className="mt-6 max-w-2xl" />

      <div className="mt-10">
        {q ? (
          <EmptyState
            icon={SearchX}
            title="Nenhum produto encontrado"
            description="Não há produtos publicados que correspondam à sua busca."
            action={<Button to="/produtos" variant="secondary">Limpar busca</Button>}
          />
        ) : (
          <EmptyState
            icon={PackageSearch}
            title="O catálogo ainda está vazio"
            description="Ainda não há produtos publicados. Volte em breve."
          />
        )}
      </div>
    </Container>
  )
}
