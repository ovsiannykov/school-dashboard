import to from 'await-to-js'
import { ReactNode, createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'

import { IRequestError, useApi, useError } from '@shared/core'
import {
  IPupil,
  IPupilResponse,
  IVisitsList,
  IVisitsResponse,
} from './pupil.types'

interface IPupilContext {
  pupilList: IPupil[]
  getPupilList: () => Promise<void | IPupil[]>
  getVisitsList: (pupilId: number) => Promise<IVisitsList[] | undefined>
  addVisitPass: (pupilId: number, columnId: number) => Promise<void>
  deleteVisitPass: (pupilId: number, columnId: number) => Promise<void>
  getLoading: boolean
  postLoading: boolean
}

interface iProps {
  children: ReactNode
}

const GET_VISITS_ERROR_MSG = 'Упсс... Не удалось получить список посещений'
const ADD_PASS_ERROR_MSG = 'Упсс, не удалось зафиксировать пропуск'
const DELETE_PASS_ERROR_MSG = 'Упсс, не удалось удалить пропуск'
const VISIT_UPDATED = 'Посещение обновленно'
const FILED_TO_GET_PUPILS = 'Упсс... Не удалось получить список учеников'

const pupilContext = createContext<IPupilContext>(undefined!)

export const PupilProvider = ({ children }: iProps) => {
  const { bug } = useError()
  const { api } = useApi()
  const [pupilList, setPupilList] = useState<IPupil[]>([])
  const [getLoading, setGetLoading] = useState(false)
  const [postLoading, setPostLoading] = useState(false)

  const getPupilList = async () => {
    setGetLoading(true)

    try {
      const [pupilListError, pupilList] = await to(
        api<IPupilResponse>('Schoolboy')
      )

      if (pupilListError && 'payload' in pupilListError) {
        const payload = pupilListError.payload as IRequestError

        if (payload.code !== 200) {
          bug(FILED_TO_GET_PUPILS)

          return undefined
        }
      }

      if (!pupilList) {
        return bug(FILED_TO_GET_PUPILS)
      }

      setPupilList(pupilList.Items)

      return pupilList?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setGetLoading(false)
    }
  }

  const getVisitsList = async (pupilId: number) => {
    if (!pupilId) {
      bug(GET_VISITS_ERROR_MSG)

      return undefined
    }

    setGetLoading(true)

    try {
      const [visitsListError, visitsList] = await to(
        api<IVisitsResponse>(`Rate?SchoolboyId=${pupilId}`)
      )

      if (visitsListError && 'payload' in visitsListError) {
        const payload = visitsListError.payload as IRequestError

        if (payload.code !== 200) {
          bug(DELETE_PASS_ERROR_MSG)

          return undefined
        }
      }

      return visitsList?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setGetLoading(false)
    }
  }

  const addVisitPass = async (pupilId: number, columnId: number) => {
    if (!pupilId || !columnId) {
      return bug(ADD_PASS_ERROR_MSG)
    }

    setPostLoading(true)

    const body = {
      SchoolboyId: pupilId,
      ColumnId: columnId,
      Title: 'Н',
    }

    try {
      const [rateError] = await to(
        api('Rate', {
          method: 'POST',
          body,
        })
      )

      if (rateError && 'payload' in rateError) {
        const payload = rateError.payload as IRequestError

        if (payload.code !== 200) {
          return bug(DELETE_PASS_ERROR_MSG)
        }

        toast.success(VISIT_UPDATED)

        return
      }

      toast.success(VISIT_UPDATED)
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setPostLoading(false)
    }
  }

  const deleteVisitPass = async (pupilId: number, columnId: number) => {
    if (!pupilId || !columnId) {
      return bug(DELETE_PASS_ERROR_MSG)
    }

    setPostLoading(true)

    const body = {
      SchoolboyId: pupilId,
      ColumnId: columnId,
    }

    try {
      const [unRateError] = await to(
        api('UnRate', {
          method: 'POST',
          body,
        })
      )

      if (unRateError && 'payload' in unRateError) {
        const payload = unRateError.payload as IRequestError

        if (payload.code !== 200) {
          return bug(DELETE_PASS_ERROR_MSG)
        }

        toast.success(VISIT_UPDATED)

        return
      }

      toast.success(VISIT_UPDATED)
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setPostLoading(false)
    }
  }

  const contextValue: IPupilContext = {
    pupilList,
    getPupilList,
    getVisitsList,
    addVisitPass,
    deleteVisitPass,
    getLoading,
    postLoading,
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
