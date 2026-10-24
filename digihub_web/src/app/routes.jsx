import { LogIn, Store, UserPlus } from 'lucide-react'
import Layout from '../components/layout/Layout.jsx'
import HomePage from '../pages/HomePage.jsx'
import NotFoundPage from '../pages/NotFoundPage.jsx'

import { CatalogPage, ComingSoonPage, ProductPage, SellerPage } from './lazyPages.js'

export const routes = [
  {
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'produtos', element: <CatalogPage /> },
      { path: 'produtos/:slug', element: <ProductPage /> },
      { path: 'vendedores/:slug', element: <SellerPage /> },
      {
        path: 'entrar',
        element: (
          <ComingSoonPage
            icon={LogIn}
            title="Entrar"
            description="O acesso à sua conta estará disponível em breve."
          />
        ),
      },
      {
        path: 'cadastro',
        element: (
          <ComingSoonPage
            icon={UserPlus}
            title="Criar conta"
            description="O cadastro de compradores e vendedores estará disponível em breve."
          />
        ),
      },
      {
        path: 'vender',
        element: (
          <ComingSoonPage
            icon={Store}
            title="Venda no DigiHub"
            description="A habilitação de vendedores estará disponível em breve."
          />
        ),
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]
