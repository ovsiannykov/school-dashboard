import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material'
import { Theme } from '@mui/system'
import { useCallback, useEffect } from 'react'

import { useLesson } from '@entities/lesson'
import { IPupil, usePupil } from '@entities/pupil'

const StyledTableCell = styled(TableCell)(({ theme }: { theme: Theme }) => ({
  //backgroundColor: theme.palette.primary.main,
  //color: theme.palette.common.white,
  border: `1px solid ${theme.palette.common.black}`,
  fontSize: 14,
  '&:first-of-type': {
    width: '50px', // Set the width of the first cell if needed
  },
}))

const StyledTableRow = styled(TableRow)({
  '&:nth-of-type(odd)': {
    backgroundColor: '#f3f3f3', // Set the background color for odd rows if needed
  },
})

export const TableWidget = () => {
  const {
    pupilList,
    getPupilList,
    visitsList,
    getVisitsList,
    addVisitPass,
    deleteVisitPass,
    //   getLoading,
    // postLoafing,
  } = usePupil()
  const { lessons, getLessons } = useLesson()

  console.log('lessons', lessons)

  const getData = useCallback(async () => {
    await getPupilList()
    // await getVisitsList(1) // (pupilId: number) => Promise<IVisitsList[] | undefined>
    await getLessons()
  }, [])

  useEffect(() => {
    getData()
  }, [])

  const handleAddVisitPass = async (pupilId: number, columnId: number) => {
    await addVisitPass(pupilId, columnId)
    getVisitsList(pupilId)
  }

  const handleDeleteVisitPass = async (pupilId: number, columnId: number) => {
    await deleteVisitPass(pupilId, columnId)
    getVisitsList(pupilId)
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
                const visit = visitsList.find(
                  (v) =>
                    v.SchoolboyId === pupil.Id &&
                    v.ColumnId === lesson.Id.toString()
                )

                return (
                  <StyledTableCell key={lesson.Id}>
                    {visit ? (
                      <span
                        onClick={() =>
                          handleDeleteVisitPass(pupil.Id, lesson.Id)
                        }
                      >
                        <p>н</p>
                      </span>
                    ) : (
                      <span
                        onClick={() => handleAddVisitPass(pupil.Id, lesson.Id)}
                      >
                        {''}
                      </span>
                    )}
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
