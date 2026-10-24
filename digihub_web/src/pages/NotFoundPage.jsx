import { Compass } from 'lucide-react'
import EmptyState from '../components/feedback/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

export default function NotFoundPage() {
  return (
    <Container className="py-16">
      <h1 className="sr-only">Página não encontrada</h1>
      <EmptyState
        icon={Compass}
        title="Página não encontrada"
        description="O endereço que você acessou não existe."
        action={<Button to="/">Voltar ao início</Button>}
      />
    </Container>
  )
}
