import { TableCell, styled } from '@mui/material'
import { Theme } from '@mui/system'

export const StyledTableCell = styled(TableCell)(
  ({ theme }: { theme: Theme }) => ({
    //backgroundColor: theme.palette.primary.main,
    //color: theme.palette.common.white,
    border: `1px solid ${theme.palette.common.black}`,
    fontSize: 14,
    '&:first-of-type': {
      width: '50px', // Set the width of the first cell if needed
    },
  })
)
