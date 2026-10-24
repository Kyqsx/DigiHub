import { Clock } from 'lucide-react'
import EmptyState from '../components/feedback/EmptyState.jsx'
import Button from '../components/ui/Button.jsx'
import Container from '../components/ui/Container.jsx'

export default function ComingSoonPage({ icon = Clock, title, description }) {
  return (
    <Container className="py-16">
      <h1 className="sr-only">{title}</h1>
      <EmptyState
        icon={icon}
        title={`${title}: em breve`}
        description={description}
        action={<Button to="/" variant="secondary">Voltar ao início</Button>}
      />
    </Container>
  )
}
