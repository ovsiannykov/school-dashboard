import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { MainPageRoute } from '@pages/main-page'
import { MainLayout } from './layouts'

// const ErrorPage = lazy(() => import('@pages/error-page'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    // ErrorBoundary: () => (
    // 	<Suspense>
    // 		<ErrorPage code={404} />
    // 	</Suspense>
    // ),
    children: [
      MainPageRoute,
      //...ErrorPageRoutes,
      {
        path: '*',
        //  element: <ErrorPage code={404} />,
      },
    ],
  },
])

export default function RouterViewer() {
  return <RouterProvider router={router} />
}
