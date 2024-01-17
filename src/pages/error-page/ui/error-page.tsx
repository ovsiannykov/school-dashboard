import { useEffect } from 'react'

import { AnimationViewer } from '@features/animation-viewer'
import { useError } from '@shared/core'
import { errorContainerStyles } from './error-page.styles'

export function ErrorPage() {
  const { setError } = useError()

  useEffect(() => {
    return () => {
      setError(null)
    }
  }, [setError])

  return (
    <div style={errorContainerStyles}>
      <AnimationViewer />
    </div>
  )
}
