import { useEffect } from 'react'
import { useError } from '@shared/core'

interface IErrorPage {
  code?: number
}

export function ErrorPage({ code }: IErrorPage) {
  const { setError } = useError()

  useEffect(() => {
    return () => {
      setError(null)
    }
  }, [setError])

  return (
    <>
      <h1>Error</h1>
      <>{code}</>
    </>
  )
}
