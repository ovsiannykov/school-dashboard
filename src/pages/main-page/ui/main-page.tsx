import { Fragment } from 'react'
import { toast } from 'react-toastify'

import { useLesson } from '@entities/lesson'
import { useError } from '@shared/core'

export function MainPage() {
  const { bug } = useError()
  const { getLessons } = useLesson()

  const notify = () => toast('Wow so easy !')

  const getError = () => {
    throw new Error()
  }

  const bugHandler = () => bug('Error')

  const getData = async () => {
    const res = await getLessons()
    console.log('res', res)
  }

  return (
    <Fragment>
      <h1>Hello World!</h1>
      <button onClick={getError}>Error</button>
      <button onClick={notify}>Notify!</button>
      <button onClick={bugHandler}>Bug</button>
      <button onClick={getData}>getData</button>
    </Fragment>
  )
}
