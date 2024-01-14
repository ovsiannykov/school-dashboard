/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { IErrorTransfer, unknownToError } from './error'

interface IErrorContext {
  bug: (rawError: unknown, asWarning?: boolean) => void
  fatal: (rawError: unknown) => void
  error?: IErrorTransfer | null
  setError: (error: IErrorTransfer | null) => void
}

interface IErrorProviderProps {
  error: IErrorTransfer | null
  children: React.ReactNode
}

export const errorContext = createContext<IErrorContext>(undefined!)

export const ErrorProvider = ({ children }: IErrorProviderProps) => {
  const navigate = useNavigate()
  const [error, setError] = useState<IErrorTransfer | null>(null)

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setError({
        name: 'Fatal Error',
        message: '404',
        stack: event.error.stack,
      })
      // #Todo: добавить логирование ошибки
    }

    window.addEventListener('error', errorHandler)

    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [navigate])

  useEffect(() => {
    if (error !== null) {
      navigate('/404')
    }
  }, [error, navigate])

  const bug = (rawError: unknown) => {
    const error = unknownToError(rawError)
    toast.error(error.message)
    // #Todo: добавить логирование ошибки
  }

  const fatal = (rawError: unknown) => {
    const error = unknownToError(rawError)
    setError(error)
  }

  return (
    <errorContext.Provider
      value={{
        bug,
        fatal,
        error,
        setError,
      }}
    >
      {children}
    </errorContext.Provider>
  )
}

export const useError = (): IErrorContext => useContext(errorContext)
