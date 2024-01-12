export const routeNamesPaths = {
  mainPage: '/',
} as const

type TKeys = keyof typeof routeNamesPaths
export type TRouteNamesPaths = (typeof routeNamesPaths)[TKeys]
