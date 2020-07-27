import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextFiled from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';

import { Link, Redirect } from 'react-router-dom'

import isEmail from 'validator/lib/isEmail';

import { useFirebase } from '../components/FirebaseProvider'

import AppLoading from '../components/AppLoading'

function Login(props) {
  const { location } = props

  const clasess = useStyles()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const { auth, user, loading } = useFirebase()

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
    password: '',
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
        await auth.signInWithEmailAndPassword(form.email, form.password)
      } catch (error) {
        const newError = {}

        switch (error.code) {
          case 'auth/invalid-email':
            newError.email = 'Email Tidak Terdaftar'
            break;

          case 'auth/user-disabled':
            newError.email = 'User Tidak Aktif'
            break;

          case 'auth/user-not-found':
            newError.email = 'User Tidak Ada'
            break;

          case 'auth/wrong-password':
            newError.password = 'Salah Password'
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

    if (!form.password) {
      newError.password = 'Password Wajib di isi'
    }

    return newError

  }

  if (loading) {
    return <AppLoading />
  }

  if (user) {
    const redirectTo = (
      location.state && 
      location.state.from && 
      location.state.from.pathname
    ) ? location.state.from.pathname : '/'

    console.log(redirectTo)

    return (
      <Redirect to={redirectTo} />
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
          Login
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

          <TextFiled
            name='password'
            type='password'
            label='Password'
            margin='normal'
            value={form.password}
            onChange={handleChange}
            helperText={error.password}
            error={error.password ? true : false}

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
                Login !
              </Button>
            </Grid>

            <Grid item>
              <Button
                color="primary"
                variant="contained"
                size="large"
                component={Link}
                to='/register'
                disabled={isSubmitting}
              >
                Daftar !
              </Button>
            </Grid>
          </Grid>

          <div className={clasess.forgotPassword}>
            <Typography component={Link} to='/lupa-pass'>
              Lupa Passoword ?
            </Typography>
          </div>

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
  },
  forgotPassword: {
    marginTop: theme.spacing(3)
  }
})
)

export default Login
