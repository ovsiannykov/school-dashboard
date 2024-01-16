import { TableCell, styled } from '@mui/material'
import { Theme } from '@mui/system'

export const StyledTableCell = styled(TableCell)(
  ({ theme }: { theme: Theme }) => ({
    border: `1px solid ${theme.palette.common.black}`,
    fontSize: 14,
    '&:first-of-type': {
      width: '50px',
    },
  })
)
