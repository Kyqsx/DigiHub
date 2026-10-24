import { PackageX } from 'lucide-react'
import EmptyState from '../components/feedback/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

export default function ProductPage() {
  return (
    <Container className="py-16">
      <EmptyState
        icon={PackageX}
        title="Produto não encontrado"
        description="Este produto não existe ou não está disponível."
        action={<Button to="/produtos">Ver catálogo</Button>}
      />
    </Container>
  )
}
