import { UserX } from 'lucide-react'
import EmptyState from '../components/feedback/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

export default function SellerPage() {
  return (
    <Container className="py-16">
      <EmptyState
        icon={UserX}
        title="Vendedor não encontrado"
        description="Este perfil não existe ou não está disponível."
        action={<Button to="/produtos">Ver catálogo</Button>}
      />
    </Container>
  )
}
