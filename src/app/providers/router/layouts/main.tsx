import { Fragment } from 'react'

import { Outlet, ScrollRestoration } from 'react-router-dom'
import { ApiProvider, ErrorProvider } from '@shared/core'

export function MainLayout() {
  return (
    <ErrorProvider error={null}>
      <ApiProvider>
        <Fragment>
          <ScrollRestoration />
          <Outlet />
        </Fragment>
      </ApiProvider>
    </ErrorProvider>
  )
}
