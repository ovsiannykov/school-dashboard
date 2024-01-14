import { Fragment } from 'react'
import { toast } from 'react-toastify'

import { usePupil } from '@entities/pupil'
import { useError } from '@shared/core'

export function MainPage() {
  const { bug } = useError()
  const { getPupilList } = usePupil()

  const notify = () => toast('Wow so easy !')

  const getError = () => {
    throw new Error()
  }

  const bugHandler = () => bug('Error')

  const getData = async () => {
    const pupils = await getPupilList()
    console.log(pupils)
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
