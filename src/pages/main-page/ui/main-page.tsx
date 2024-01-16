import { Typography } from '@mui/material'
import Container from '@mui/material/Container'
import { TableWidget } from '@widgets/table'

export function MainPage() {
  return (
    <Container maxWidth="xl">
      <Typography
        noWrap
        sx={{
          fontWeight: 700,
          letterSpacing: '.3rem',
          fontSize: 40,
          marginBottom: 1,
        }}
      >
        SCHOOL SYSTEM
      </Typography>
      <TableWidget />
    </Container>
  )
}
