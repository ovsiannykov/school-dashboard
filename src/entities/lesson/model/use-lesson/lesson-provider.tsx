import to from 'await-to-js'
import { ReactNode, createContext, useContext, useState } from 'react'

import { useApi, useError } from '@shared/core'
import { ILesson, ILessonResponse } from './lesson.types'

interface ILessonContext {
  lessons: ILesson[]
  getLessons: () => Promise<ILesson[] | undefined>
  lessonsLoading: boolean
}

interface iProps {
  children: ReactNode
}

const lessonContext = createContext<ILessonContext>(undefined!)

export const LessonProvider = ({ children }: iProps) => {
  const { bug } = useError()
  const { api } = useApi()
  const [lessons, setLessons] = useState<ILesson[]>([])
  const [lessonsLoading, setLessonsLoading] = useState(false)

  const getLessons = async () => {
    setLessonsLoading(true)

    try {
      const [lessonsError, lessonsColumn] = await to(
        api<ILessonResponse>('Column')
      )

      if (lessonsError || !lessonsColumn) {
        bug('Упсс... Не удалось получить список уроков')

        return undefined
      }

      setLessons(lessonsColumn.Items)

      return lessonsColumn?.Items || []
    } catch (error) {
      throw new Error(`${error}`)
    } finally {
      setLessonsLoading(false)
    }
  }

  const contextValue: ILessonContext = {
    lessons,
    getLessons,
    lessonsLoading,
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
