import React from 'react'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/styles';

import { Link } from 'react-router-dom'

function NotFound() {
  const clasess = useStyles()

  return (
    <Container maxWidth='xs'>
      <Paper className={clasess.paper}>
        <Typography
          variant='subtitle1'
        >
          Not Found
        </Typography>

        <Typography
          variant='h3'
        >
          404
        </Typography>

        <Typography
          component={Link}
          to='/'
        >
          Home
        </Typography>
      </Paper>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
    paper: {
      marginTop: theme.spacing(8),
      padding: theme.spacing(6),
      textAlign: 'center'
    },
  })
)

export default NotFound
