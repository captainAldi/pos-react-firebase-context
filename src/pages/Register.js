import React, { useState } from 'react'

import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextFiled from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/styles';

import {Link, Redirect} from 'react-router-dom'

import isEmail from 'validator/lib/isEmail';

import { useFirebase } from '../components/FirebaseProvider'

import AppLoading from '../components/AppLoading'

function Register() {
  const clasess = useStyles()

  const [form, setForm] = useState({
    email: '',
    password: '',
    ulangi_password: ''
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
    ulangi_password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()
    const findErros = validate()

    if(Object.values(findErros).some(err => err !== '')){
      setError(findErros)
    }else{
      try {
        setIsSubmitting(true)
        await auth.createUserWithEmailAndPassword(form.email, form.password)
      } catch (error) {
        const newError = {}

        switch (error.code) {
          case 'auth/email-already-in-use':
            newError.email = 'Email Sudah Terdaftar'
          break;

          case 'auth/invalid-email': 
            newError.email = 'Email tidak valid'
          break;

          case 'auth/weak-password':
            newError.password = 'Password Tidak Bagus'
          break;

          case 'auth/operation-not-allowed':
            newError.email = 'Tidak Di dukung'
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
    const newError = {...error}

    if(!form.email) {
      newError.email = 'Email Wajib di Isi'
    }else if(!isEmail(form.email)) {
      newError.email = 'Email Tidak Valid'
    }

    if(!form.password) {
      newError.password = 'Password Wajib di isi'
    }

    if(!form.ulangi_password) {
      newError.ulangi_password = 'Re type Password Wajib di isi'
    }else if(form.ulangi_password !== form.password) {
      newError.ulangi_password = 'Password Tidak Sama'
    }

    return newError

  }

  if(loading) {
    return <AppLoading/>
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
          Registrasi
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

          <TextFiled
            name='ulangi_password'
            type='password'
            label='Re Type Password'
            margin='normal'
            value={form.ulangi_password}
            onChange={handleChange}
            helperText={error.ulangi_password}
            error={error.ulangi_password ? true : false}

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
                Daftar !
              </Button>
            </Grid>

            <Grid item>
              <Button
                color="primary"
                variant="contained"
                size="large"
                component={Link}
                to='/login'
                disabled={isSubmitting}
              >
                Login !
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

export default Register
