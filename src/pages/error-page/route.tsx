import { lazy, Suspense } from 'react'
import { RouteObject } from 'react-router-dom'

const ErrorPage = lazy(() => import('./ui'))

export const ErrorPageRoute: RouteObject[] = [
  {
    path: '/404',
    element: (
      <Suspense>
        <ErrorPage code={404} />
      </Suspense>
    ),
  },
]
