import { RouteObject } from 'react-router-dom'
import { routeNamesPaths } from '@shared/constants'
import { MainPage } from '.'

export const MainPageRoute: RouteObject = {
  path: routeNamesPaths.mainPage,
  element: <MainPage />,
}
