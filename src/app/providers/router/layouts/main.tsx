import { Fragment } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export function MainLayout() {
  return (
    <Fragment>
      <ScrollRestoration />
      <Outlet />
    </Fragment>
  )
}
