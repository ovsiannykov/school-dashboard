import { Typography } from '@mui/material'
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
    <div
      style={{
        width: '100vw',
        height: '80vh',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography
        noWrap
        component="span"
        sx={{
          fontWeight: 400,
          letterSpacing: '.3rem',
          fontSize: 24,
        }}
      >
        Opps...
      </Typography>

      <Typography
        noWrap
        component="h2"
        sx={{
          fontWeight: 700,
          letterSpacing: '.3rem',
          fontSize: 90,
        }}
      >
        {code}
      </Typography>
    </div>
  )
}
