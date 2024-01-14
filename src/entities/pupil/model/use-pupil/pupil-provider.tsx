import to from 'await-to-js'
import { ReactNode, createContext, useContext, useRef } from 'react'

import { useApi, useError } from '@shared/core'
import { IPupil, IPupilResponse } from './pupil.types'

interface IPupilContext {
  pupilList: IPupil[]
  getPupilList: () => Promise<void | IPupil[]>
  getPupilLoading: boolean
}

interface iProps {
  children: ReactNode
}

const pupilContext = createContext<IPupilContext>(undefined!)

export const PupilProvider = ({ children }: iProps) => {
  const { bug } = useError()
  const { api } = useApi()
  const pupilListRef = useRef<IPupil[]>([])
  const getPupilLoadingRef = useRef<boolean>(false)

  const getPupilList = async () => {
    getPupilLoadingRef.current = true

    try {
      const [pupilListError, pupilList] = await to(
        api<IPupilResponse>('Schoolboy')
      )

      if (pupilListError || !pupilList) {
        bug('Упсс... Не удалось получить список учеников')
      }

      return pupilList?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      getPupilLoadingRef.current = false
    }
  }

  const contextValue: IPupilContext = {
    pupilList: pupilListRef.current,
    getPupilList,
    getPupilLoading: getPupilLoadingRef.current,
  }

  return (
    <pupilContext.Provider value={contextValue}>
      {children}
    </pupilContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const usePupil = () => {
  const context = useContext(pupilContext)

  return context
}
