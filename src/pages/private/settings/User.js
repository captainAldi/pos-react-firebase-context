import React, {useRef, useState} from 'react'

import TextField from '@material-ui/core/TextField'
import {makeStyles} from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import {useFirebase} from '../../../components/FirebaseProvider'
import { useSnackbar } from 'notistack'
import isEmail from 'validator/lib/isEmail'



function User() {

  const {user} = useFirebase()
  const clasess = useStyles()

  const displayNameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const [error, setError] = useState({
    displayName: '',
    email: '',
    password: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const {enqueueSnackbar} = useSnackbar()

  const saveDisplayName = async e => {
    const displayName = displayNameRef.current.value
    console.log(displayName)

    if(!displayName){
      setError({
        displayName: 'Nama Wajib di Isi'
      })
    }else if(displayName !== user.displayName) {
      setError({
        displayName: ''
      })

      setIsSubmitting(true)
      await user.updateProfile({
        displayName
      })
      setIsSubmitting(false)
      enqueueSnackbar(
        'Data Pengguna Berhasil di Ubah',
        {
          variant: 'success',
          autoHideDuration: 3000
        }
      )
    }
  }

  const updateEmail = async e => {
    const email = emailRef.current.value

    if(!email) {
      setError({
        email: 'Email Wajib di Isi'
      })
    } else if(!isEmail(email)) {
      setError({
        email: 'Email Tidak Valid'
      })
    } else if(email !== user.email) {
      try {
        setError({
          email: ''
        })

        setIsSubmitting(true)
        await user.updateEmail(email)

        enqueueSnackbar(
          'Email Berhasil di Ubah',
          {
            variant: 'Success',
            autoHideDuration: 3000
          }
        )
      } catch (error) {
        let emailError = ''

        switch (error.code) {
          case 'auth/email-already-in-use':
            emailError = 'Email Tidak Tersedia'
            break;  

          case 'auth/invalid-email':
            emailError = 'Email tidak valid'
            break;

          case 'auth/requires-recent-login':
            emailError = 'Silahkan Re Login Kembali !'
            break;

          default:
            emailError = 'Coba lagi'
            break;
        }

        setError({
          email: emailError
        })
      }

      setIsSubmitting(false)
    }


  }

  const sendEmailVerification = async e => {
    const actionCodeSettings = {
      url: `${window.location.origin}/login`
    }

    setIsSubmitting(true)
    await user.sendEmailVerification(actionCodeSettings)
    enqueueSnackbar(
      `Email Telah di kirim ke ${emailRef.current.value}`,
      {
        variant: 'Success',
        autoHideDuration: 3000
      }
    )

    setIsSubmitting(false)
  }

  const updatePassword = async e => {
    const password = passwordRef.current.value

    if(!password){
      setError({
        password: 'Password Tidak Boleh Kosong'
      })
    } else {
      setIsSubmitting(true)
      try {
        await user.updatePassword(password)
        enqueueSnackbar(
          'Password berhasil diperbarui',
          {
            variant: 'Success',
            autoHideDuration: 3000
          }
        )
      } catch (error) {
        let passwordError = ''

        switch (error.code) {
          case 'auth/weak-password':
            passwordError = 'Password Lemah'
            break;
        
          case 'auth/requires-recent-login':
            passwordError = 'Login Kembali'
            break;

          default:
            passwordError = 'Coba Lagi'
            break;
        }

        setError({
          password: passwordError
        })
      }

      setIsSubmitting(false)
    }
  }

  return (
    <div className={clasess.pengaturanPengguna}>
      <TextField
        id='displayName'
        name='displayName'
        label='Nama'
        margin='normal'
        defaultValue={user.displayName}
        inputProps={{
          ref: displayNameRef,
          onBlur: saveDisplayName
        }}
        disabled={isSubmitting}
        helperText={error.displayName}
        error={error.displayName ? true : false}
      />

      <TextField
        id='email'
        name='email'
        label='E-Mail'
        margin='normal'
        defaultValue={user.email}
        inputProps={{
          ref: emailRef,
          onBlur: updateEmail
        }}
        disabled={isSubmitting}
        helperText={error.email}
        error={error.email ? true : false}
      />

      {
        user.emailVerified ?

        <Typography
          variant='subtitle1'
          color='primary'
        >
          Email Sudah Terverifikasi
        </Typography>
        :
        <Button
          variant='outlined'
          onClick={sendEmailVerification}
          disabled={isSubmitting}
        >
          Kirim Email Verifikasi
        </Button>
      }

      <TextField
        id='password'
        name='password'
        label='Password'
        margin='normal'
        autoComplete='new-password'
        inputProps={{
          ref: passwordRef,
          onBlur: updatePassword
        }}
        disabled={isSubmitting}
        helperText={error.password}
        error={error.password ? true : false}
      />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
    pengaturanPengguna: {
      display: 'flex',
      flexDirection: 'column',
      width: 300
    }
  })
)

export default User
