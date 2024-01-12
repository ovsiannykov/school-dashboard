import { Fragment } from 'react'
import { toast } from 'react-toastify'

export function MainPage() {
  const notify = () => toast('Wow so easy !')

  return (
    <Fragment>
      <h1>Hello World!</h1>
      <button onClick={notify}>Notify!</button>
    </Fragment>
  )
}
