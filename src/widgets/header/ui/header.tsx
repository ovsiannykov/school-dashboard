import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
import { appBarStyles, logoLinkStyles } from './header.styles'

export const Header = () => {
  return (
    <AppBar position="static" sx={appBarStyles}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={logoLinkStyles}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
              }}
            >
              LOGO
            </Typography>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
