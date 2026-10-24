import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router'
import PageLoader from '../feedback/PageLoader.jsx'
import Container from '../ui/Container.jsx'
import Footer from './Footer.jsx'
import Header from './Header.jsx'

export default function Layout() {
  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-accent-500 focus:px-4 focus:py-2 focus:text-white"
      >
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="flex-1">
        <Suspense
          fallback={
            <Container>
              <PageLoader />
            </Container>
          }
        >
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  )
}
