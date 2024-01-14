import to from 'await-to-js'
import { ReactNode, createContext, useContext, useRef } from 'react'

import { useApi, useError } from '@shared/core'
import {
  IPupil,
  IPupilResponse,
  IVisitsList,
  IVisitsResponse,
} from './pupil.types'

interface IPupilContext {
  pupilList: IPupil[]
  getPupilList: () => Promise<IPupil[] | undefined>
  visitsList: IVisitsList[]
  getVisitsList: (pupilId: number) => Promise<IVisitsList[] | undefined>
  addVisitPass: (pupilId: number, columnId: number) => Promise<void>
  deleteVisitPass: (pupilId: number, columnId: number) => Promise<void>
  getLoading: boolean
  postLoafing: boolean
}

interface iProps {
  children: ReactNode
}

const GET_VISITS_ERROR_MSG = 'Упсс... Не удалось получить список посещений'
const ADD_PASS_ERROR_MSG = 'Упсс, не удалось зафиксировать пропуск'
const DELETE_PASS_ERROR_MSG = 'Упсс, не удалось удалить пропуск'

const pupilContext = createContext<IPupilContext>(undefined!)

export const PupilProvider = ({ children }: iProps) => {
  const { bug } = useError()
  const { api } = useApi()
  const pupilListRef = useRef<IPupil[]>([])
  const visitsListRef = useRef<IVisitsList[]>([])
  const getLoadingRef = useRef<boolean>(false)
  const postLoadingRef = useRef<boolean>(false)

  const getPupilList = async () => {
    getLoadingRef.current = true

    try {
      const [pupilListError, pupilList] = await to(
        api<IPupilResponse>('Schoolboy')
      )

      if (pupilListError || !pupilList) {
        bug('Упсс... Не удалось получить список учеников')

        return undefined
      }

      return pupilList?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      getLoadingRef.current = false
    }
  }

  const getVisitsList = async (pupilId: number) => {
    if (!pupilId) {
      bug(GET_VISITS_ERROR_MSG)

      return undefined
    }

    getLoadingRef.current = true

    try {
      const [visitsListError, visitsList] = await to(
        api<IVisitsResponse>(`Rate?SchoolboyId=${pupilId}`)
      )

      if (visitsListError || !visitsList) {
        bug(GET_VISITS_ERROR_MSG)

        return undefined
      }

      return visitsList?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      getLoadingRef.current = false
    }
  }

  const addVisitPass = async (pupilId: number, columnId: number) => {
    if (!pupilId || !columnId) {
      return bug(ADD_PASS_ERROR_MSG)
    }

    postLoadingRef.current = true

    const body = {
      SchoolboyId: pupilId,
      ColumnId: columnId,
      Title: 'Н',
    }

    try {
      const [error] = await to(
        api('Rate', {
          method: 'POST',
          body,
        })
      )

      if (error) {
        return bug(ADD_PASS_ERROR_MSG)
      }
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      postLoadingRef.current = false
    }
  }

  const deleteVisitPass = async (pupilId: number, columnId: number) => {
    if (!pupilId || !columnId) {
      return bug(DELETE_PASS_ERROR_MSG)
    }

    postLoadingRef.current = true

    const body = {
      SchoolboyId: pupilId,
      ColumnId: columnId,
    }

    try {
      const [error] = await to(
        api('UnRate', {
          method: 'POST',
          body,
        })
      )

      if (error) {
        return bug(DELETE_PASS_ERROR_MSG)
      }
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      postLoadingRef.current = false
    }
  }

  const contextValue: IPupilContext = {
    pupilList: pupilListRef.current,
    getPupilList,
    visitsList: visitsListRef.current,
    getVisitsList,
    addVisitPass,
    deleteVisitPass,
    getLoading: getLoadingRef.current,
    postLoafing: postLoadingRef.current,
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
