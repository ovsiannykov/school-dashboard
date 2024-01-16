import { Fragment } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

import { Header } from '@widgets/header'
import { LessonProvider } from '@entities/lesson'
import { PupilProvider } from '@entities/pupil'
import { ApiProvider, ErrorProvider } from '@shared/core'

export function MainLayout(): JSX.Element {
  return (
    <ErrorProvider error={null}>
      <ApiProvider>
        <LessonProvider>
          <PupilProvider>
            <Fragment>
              <Header />
              <ScrollRestoration />
              <Outlet />
            </Fragment>
          </PupilProvider>
        </LessonProvider>
      </ApiProvider>
    </ErrorProvider>
  )
}
