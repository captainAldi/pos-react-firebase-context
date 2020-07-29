import React, {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { useFirebase } from '../../../components/FirebaseProvider'
import { useSnackbar } from 'notistack'

import isURL from 'validator/lib/isURL'

import {useDocument} from 'react-firebase-hooks/firestore'

import AppPageLoading from '../../../components/AppPageLoading'

import {Prompt} from 'react-router-dom'


function Store() {
  const clasess = useStyles()
  const { firestore, user } = useFirebase() 
  const { enqueueSnackbar } = useSnackbar()

  const tokoDoc = firestore.doc(`toko/${user.uid}`)
  const [snapshot, loading] = useDocument(tokoDoc)
  const [somethingChange, setSomethingChange] = useState(false)

  const [form, setForm] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    website: ''
  })

  const [error, setError] = useState({
    nama: '',
    alamat: '',
    telepon: '',
    website: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (snapshot) {
      setForm(snapshot.data())
    }
  }, [snapshot])

  const handlerChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setError({
      [e.target.name]: ''
    })

    setSomethingChange(true)
  }

  const validate = () => {
    const newError = {...error}

    if(!form.nama){
      newError.nama = 'Nama Wajib di Isi'
    }

    if (!form.telepon) {
      newError.telepon = 'Telepon Wajib di Isi'
    }

    if (!form.alamat) {
      newError.alamat = 'Alamat Wajib di Isi'
    }

    if (!form.website) {
      newError.website = 'Website Wajib di Isi'
    }else if(!isURL(form.website)){
      newError.website = 'URL Tidak Valid'
    }

    return newError
  }

  const handleSubmit = async e => {
    e.preventDefault()

    const findErrors = validate()

    if (Object.values(findErrors).some(err => err !== '')) {
      setError(findErrors)
    } else {

      setIsSubmitting(true)

      try {
        await tokoDoc.set(form, {
          merge: true
        })

        setSomethingChange(false)

        enqueueSnackbar(
          'Data Berhasil di Simpan',
          {
            variant: 'success',
            autoHideDuration: 3000
          }
        )
      } catch (error) {
        enqueueSnackbar(
          error.message,
          {
            variant: 'error',
            autoHideDuration: 3000
          }
        )
      }

      setIsSubmitting(false)

    }

  }

  if(loading){
    return <AppPageLoading/>
  }

  return (
    <div className={clasess.pengaturanToko}>
      <form onSubmit={handleSubmit}>
        <TextField
          id='nama'
          name='nama'
          label='Nama Toko'
          margin='normal'
          value={form.nama}
          fullWidth
          onChange={handlerChange}
          error={error.nama ? true : false}
          helperText={error.nama}
          disabled={isSubmitting}
        />

        <TextField
          id='alamat'
          name='alamat'
          label='Alamat Toko'
          margin='normal'
          value={form.alamat}
          fullWidth
          multiline
          rowsMax={3}
          onChange={handlerChange}
          error={error.alamat ? true : false}
          helperText={error.alamat}
          disabled={isSubmitting}
        />

        <TextField
          id='telepon'
          name='telepon'
          label='No Telepon Toko'
          margin='normal'
          value={form.telepon}
          fullWidth
          onChange={handlerChange}
          error={error.telepon ? true : false}
          helperText={error.telepon}
          disabled={isSubmitting}
        />

        <TextField
          id='website'
          name='website'
          label='Website Toko'
          margin='normal'
          value={form.website}
          fullWidth
          onChange={handlerChange}
          error={error.website ? true : false}
          helperText={error.website}
          disabled={isSubmitting}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
          disabled={isSubmitting || !somethingChange} 
          className={clasess.actionButton}
        >
          Simpan
        </Button>
      </form>

      <Prompt
        when={somethingChange}
        message='Anda yakin ingin pindah halaman ?'
      />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
    pengaturanToko: {
      display: 'flex',
      flexDirection: 'column',
      width: 300
    },
    actionButton: {
      marginTop: theme.spacing(2)
    }
  })
)

export default Store
