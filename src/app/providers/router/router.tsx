import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { ErrorPageRoute } from '@pages/error-page'
import { MainPageRoute } from '@pages/main-page'
import { MainLayout } from './layouts'

const ErrorPage = lazy(() => import('@pages/error-page'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    ErrorBoundary: () => (
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorPage code={404} />
      </Suspense>
    ),
    children: [
      MainPageRoute,
      ...ErrorPageRoute,
      {
        path: '*',
        element: <ErrorPage code={404} />,
      },
    ],
  },
])

export default function RouterViewer() {
  return <RouterProvider router={router} />
}
