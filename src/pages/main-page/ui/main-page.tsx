import { Fragment } from 'react'
import { toast } from 'react-toastify'

import { useApi, useError } from '@shared/core'

export function MainPage() {
  const { bug } = useError()
  const { api } = useApi()

  const notify = () => toast('Wow so easy !')

  const getError = () => {
    throw new Error()
  }

  const bugHandler = () => bug('Error')

  const getTodo = async () => {
    try {
      const res = await api('todos/1/')
      console.log(res)
      toast.success('Success')
    } catch (error) {
      throw new Error()
    }
  }

  return (
    <Fragment>
      <h1>Hello World!</h1>
      <button onClick={getError}>Error</button>
      <button onClick={notify}>Notify!</button>
      <button onClick={bugHandler}>Bug</button>
      <button onClick={getTodo}>Get todo</button>
    </Fragment>
  )
}
