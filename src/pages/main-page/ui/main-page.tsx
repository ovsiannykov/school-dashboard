import { Fragment } from 'react'
import { toast } from 'react-toastify'
import { useError } from '@shared/core'

export function MainPage() {
  const { bug } = useError()

  const notify = () => toast('Wow so easy !')

  const getError = () => {
    throw new Error()
  }

  const bugHandler = () => bug('Error')

  return (
    <Fragment>
      <h1>Hello World!</h1>
      <button onClick={getError}>Error</button>
      <button onClick={notify}>Notify!</button>
      <button onClick={bugHandler}>Bug</button>
    </Fragment>
  )
}
