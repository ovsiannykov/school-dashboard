import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from '@mui/material'
import { useEffect, useState } from 'react'

import { useLesson } from '@entities/lesson'
import { IPupil, IVisit, usePupil } from '@entities/pupil'
import { StyledTableCell, StyledTableRow } from './components'

export const TableWidget = () => {
  const {
    pupilList,
    getPupilList,
    getVisitsList,
    addVisitPass,
    deleteVisitPass,
  } = usePupil()
  const { lessons, getLessons } = useLesson()

  const [visits, setVisits] = useState<IVisit[]>([])

  const getData = async () => {
    await getPupilList()
    await getLessons()
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const fetchVisits = async () => {
      for (const pupil of pupilList) {
        const pupilVisits = await getVisitsList(pupil.Id)
        setVisits((prevVisits) => ({
          ...prevVisits,
          [pupil.Id.toString()]: pupilVisits,
        }))
      }
    }

    if (pupilList.length) {
      fetchVisits()
    }
  }, [pupilList])

  const handleAddVisitPass = async (pupilId: number, columnId: number) => {
    await addVisitPass(pupilId, columnId)
    setVisits((prevVisits) => ({
      ...prevVisits,
      [pupilId.toString()]: [
        ...(prevVisits[pupilId.toString()] || []),
        { Id: 0, Title: 'Н', SchoolboyId: pupilId, ColumnId: columnId },
      ],
    }))
  }

  const handleDeleteVisitPass = async (pupilId: number, columnId: number) => {
    await deleteVisitPass(pupilId, columnId)
    setVisits((prevVisits) => ({
      ...prevVisits,
      [pupilId.toString()]: (prevVisits[pupilId.toString()] || []).filter(
        (visit) => visit.ColumnId !== columnId
      ),
    }))
  }

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
                const visit = (visits[pupil.Id.toString()] || []).find(
                  (v) => v.ColumnId === lesson.Id
                )

                return (
                  <StyledTableCell key={lesson.Id}>
                    <span
                      onClick={() =>
                        visit
                          ? handleDeleteVisitPass(pupil.Id, lesson.Id)
                          : handleAddVisitPass(pupil.Id, lesson.Id)
                      }
                    >
                      <p>{visit ? visit.Title : ' '}</p>
                    </span>
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
