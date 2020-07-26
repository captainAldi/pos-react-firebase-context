import React from 'react'

import Button from '@material-ui/core/Button'

import { makeStyles } from '@material-ui/core/styles'

function Register() {
  return (
    <div>
      <h1 style={styles.judul}>Registrasi</h1>
      <Button
        color="primary"
        variant="contained"
      >
        Click !
      </Button>
    </div>
  )
}

const styles = makeStyles(theme => ({
    blue: {
      color: theme.palette.primary.main
    }
  })
)

export default Register
