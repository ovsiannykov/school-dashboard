import { Fragment } from 'react'
import { ToastContainer } from 'react-toastify'
import { RouterViewer } from './router'

import 'react-toastify/dist/ReactToastify.min.css'

export function RootProvider() {
  return (
    <Fragment>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        style={{ fontSize: 16 }}
      />
      <RouterViewer />
    </Fragment>
  )
}
