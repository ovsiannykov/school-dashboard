import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { useLesson } from '@entities/lesson'
import { IPupil, IVisitsList, usePupil } from '@entities/pupil'
import { useError } from '@shared/core'
import { StyledTableCell, StyledTableRow } from './components'

export const TableWidget = () => {
  const { fatal } = useError()
  const {
    pupilList,
    getPupilList,
    getVisitsList,
    addVisitPass,
    deleteVisitPass,
  } = usePupil()
  const { lessons, getLessons } = useLesson()
  const [visits, setVisits] = useState<Record<string, IVisitsList[]>>({})

  const getData = async () => {
    await getPupilList()
    await getLessons()
  }

  const fetchVisits = async () => {
    for (const pupil of pupilList) {
      const pupilVisits = await getVisitsList(pupil.Id)
      setVisits((prevVisits) => {
        return {
          ...prevVisits,
          [pupil.Id.toString()]: pupilVisits || [], // Handle the possibility of pupilVisits being undefined
        }
      })
    }
  }

  const updateAllVisits = async (pupilId: number) => {
    const updatedVisits = await getVisitsList(pupilId)
    setVisits(
      (prevVisits) =>
        ({
          ...prevVisits,
          [pupilId.toString()]: updatedVisits,
        }) as Record<string, IVisitsList[]>
    )
  }

  const handleAddVisitPass = async (pupilId: number, columnId: number) => {
    try {
      await addVisitPass(pupilId, columnId)
      updateAllVisits(pupilId)
    } catch (error) {
      fatal('Failed to add visit')
    }
  }

  const handleDeleteVisitPass = async (pupilId: number, columnId: number) => {
    try {
      await deleteVisitPass(pupilId, columnId)
      updateAllVisits(pupilId)
    } catch (error) {
      fatal('Failed to delete visit')
    }
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (pupilList.length) {
      fetchVisits()
    }
  }, [pupilList])

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>Id</StyledTableCell>
            <StyledTableCell>Ученик</StyledTableCell>
            {lessons.map((lesson) => (
              <StyledTableCell key={lesson.Id}>{lesson.Title}</StyledTableCell>
            ))}
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {pupilList.map((pupil: IPupil) => (
            <StyledTableRow key={pupil.Id}>
              <StyledTableCell>{pupil.Id}</StyledTableCell>
              <StyledTableCell>{`${pupil.LastName || ''} ${pupil.FirstName || ''} ${pupil.SecondName || ''}`}</StyledTableCell>
              {lessons.map((lesson) => {
                const visit = (
                  (visits[pupil.Id.toString()] || []) as IVisitsList[]
                ).find((v) => v.ColumnId.toString() === lesson.Id.toString())

                return (
                  <StyledTableCell
                    key={lesson.Id}
                    onClick={() =>
                      visit
                        ? handleDeleteVisitPass(pupil.Id, lesson.Id)
                        : handleAddVisitPass(pupil.Id, lesson.Id)
                    }
                  >
                    <div>
                      <p>{visit ? visit.Title : '    '}</p>
                    </div>
                  </StyledTableCell>
                )
              })}
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
