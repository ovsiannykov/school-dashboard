import to from 'await-to-js'
import { ReactNode, createContext, useContext, useRef } from 'react'

import { useApi, useError } from '@shared/core'
import { ILesson, ILessonResponse } from './lesson.types'

interface ILessonContext {
  lessons: ILesson[]
  getLessons: () => Promise<void | ILesson[]>
  lessonsLoading: boolean
}

interface iProps {
  children: ReactNode
}

const lessonContext = createContext<ILessonContext>(undefined!)

export const LessonProvider = ({ children }: iProps) => {
  const { bug } = useError()
  const { api } = useApi()
  const lessonsRef = useRef<ILesson[]>([])
  const getLessonsLoadingRef = useRef<boolean>(false)

  const getLessons = async () => {
    getLessonsLoadingRef.current = true

    try {
      const [lessonsError, lessonsColumn] = await to(
        api<ILessonResponse>('Column')
      )

      if (lessonsError || !lessonsColumn) {
        bug('Упсс... Не удалось получить список уроков')
      }

      return lessonsColumn?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      getLessonsLoadingRef.current = false
    }
  }

  const contextValue: ILessonContext = {
    lessons: lessonsRef.current,
    getLessons,
    lessonsLoading: getLessonsLoadingRef.current,
  }

  return (
    <lessonContext.Provider value={contextValue}>
      {children}
    </lessonContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useLesson = () => {
  const context = useContext(lessonContext)

  return context
}
