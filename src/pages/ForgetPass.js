import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextFiled from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';

import { Redirect } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail';

import { useFirebase } from '../components/FirebaseProvider'

import AppLoading from '../components/AppLoading'

import { useSnackbar } from 'notistack'

function ForgetPass() {
  const clasess = useStyles()

  const [form, setForm] = useState({
    email: '',
  })

  const { auth, user, loading } = useFirebase()
  const {enqueueSnackbar} = useSnackbar()

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setError({
      ...error,
      [e.target.name]: ''
    })
  }

  const [error, setError] = useState({
    email: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const findErros = validate()

    if (Object.values(findErros).some(err => err !== '')) {
      setError(findErros)
    } else {
      try {
        setIsSubmitting(true)

        const actionCodeSettings = {
          url: `${window.location.origin}/login`
        }

        await auth.sendPasswordResetEmail(form.email, actionCodeSettings)

        enqueueSnackbar(
          `Cek Kotak Masuk Email: ${form.email}, Link Reset Telah di Kirim`,
          {
            variant: 'success',
            autoHideDuration: 3000
          }
        )
        setIsSubmitting(false)
      } catch (error) {
        const newError = {}

        switch (error.code) {
          case 'auth/user-not-found':
            newError.email = 'User Tidak Ada'
            break;

          case 'auth/invalid-email':
            newError.email = 'Email tidak valid'
            break;

          default:
            newError.email = error.code
            break;

        }

        setError(newError)
        setIsSubmitting(false)
      }
    }
  }

  const validate = () => {
    const newError = { ...error }

    if (!form.email) {
      newError.email = 'Email Wajib di Isi'
    } else if (!isEmail(form.email)) {
      newError.email = 'Email Tidak Valid'
    }

    return newError

  }

  if (loading) {
    return <AppLoading />
  }

  if (user) {
    return (
      <Redirect to='/' />
    )
  }

  return (
    <Container maxWidth='xs'>
      <Paper className={clasess.paper}>
        <Typography
          variant='h5'
          component='h1'
          className={clasess.title}
        >
          Forgot Password
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextFiled
            name='email'
            type='email'
            label='Your Email'
            margin='normal'
            value={form.email}
            onChange={handleChange}
            helperText={error.email}
            error={error.email ? true : false}

            fullWidth
            required
          />

          <Grid container className={clasess.buttons}>
            <Grid item xs>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                size="large"
                disabled={isSubmitting}
              >
                Kirim !
              </Button>
            </Grid>
          </Grid>

        </form>


      </Paper>
    </Container>
  )
}

const useStyles = makeStyles(theme => ({
  title: {
    textAlign: 'center',
    marginBottom: theme.spacing(3)
  },
  paper: {
    marginTop: theme.spacing(8),
    padding: theme.spacing(8)
  },
  buttons: {
    marginTop: theme.spacing(6)
  }
})
)

export default ForgetPass
