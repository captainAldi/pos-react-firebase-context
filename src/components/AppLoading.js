import React from 'react'

import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';

function AppLoading() {
  const clasess = useStyles()

  return (
    <Container maxWidth='xs'>
      <div className={clasess.loadingBox}>
        <Typography
          variant='h6'
          component='h2'
          className={clasess.title}
        >
          Aplikasi POS
        </Typography>

        <LinearProgress/>
      </div>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
    title: {
      textAlign: 'center',
      marginBottom: theme.spacing(3),
      color: theme.palette.primary.main
    },
    loadingBox: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      height: '100vh'
    }
  })
)

export default AppLoading
