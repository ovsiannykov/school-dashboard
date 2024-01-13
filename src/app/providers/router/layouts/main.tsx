import { Fragment } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ErrorProvider } from '@shared/core'

export function MainLayout() {
  return (
    <ErrorProvider error={null}>
      <Fragment>
        <ScrollRestoration />
        <Outlet />
      </Fragment>
    </ErrorProvider>
  )
}
