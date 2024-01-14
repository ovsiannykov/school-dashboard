import { Fragment } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

import { LessonProvider } from '@entities/lesson'
import { ApiProvider, ErrorProvider } from '@shared/core'

export function MainLayout(): JSX.Element {
  return (
    <ErrorProvider error={null}>
      <ApiProvider>
        <LessonProvider>
          <Fragment>
            <ScrollRestoration />
            <Outlet />
          </Fragment>
        </LessonProvider>
      </ApiProvider>
    </ErrorProvider>
  )
}
