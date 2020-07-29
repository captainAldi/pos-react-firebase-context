import React, {useState, useEffect} from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { Typography, makeStyles } from '@material-ui/core'
import UploadIcon from '@material-ui/icons/CloudUpload'
import SaveIcon from '@material-ui/icons/Save'

import { useFirebase } from '../../../components/FirebaseProvider'
import { useDocument } from 'react-firebase-hooks/firestore'
import AppPageLoading from '../../../components/AppPageLoading'
import { useSnackbar } from 'notistack'

import {Prompt} from 'react-router-dom'


function Edit(props) {
  const clasess = useStyles()

  const {firestore, user, storage} = useFirebase()

  const produkDoc = firestore.doc(`toko/${user.uid}/produk/${props.match.params.produkId}`)
  const produkStorageRef = storage.ref(`toko/${user.uid}/produk`)

  const [snapshot, loading] = useDocument(produkDoc)

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [isSomethingChange, setIsSomethingChange] = useState(false)

  const {enqueueSnackbar} = useSnackbar()

  const [form, setForm] = useState({
    nama: '',
    sku: '',
    harga: 0,
    stok: 0,
    deskripsi: ''
  })

  const [error, setError] = useState({
    nama: '',
    sku: '',
    harga: '',
    stok: '',
    deskripsi: ''
  })

  useEffect(() => {
    if(snapshot){
      setForm(currentForm => ({
          ...currentForm,
          ...snapshot.data()
        })
      )
    }
  }, [snapshot])

  const handleChange = e => {
    setError({
      [e.target.name]: ''
    })

    setForm({
      ...form,
      [e.target.name]: e.target.value
    })

    setIsSomethingChange(true)
  }

  const validate = () => {
    const newError = {...error}

    if(!form.nama){
      newError.nama = 'Nama Produk Wajib di Isi'
    }

    if (!form.harga) {
      newError.harga = 'Harga Produk Wajib di Isi'
    }

    if (!form.stok) {
      newError.stok = 'Stok Produk Wajib di Isi'
    }

    return newError

  }

  const handleSubmit = async e => {
    e.preventDefault()

    const findErrors = validate()

    if(Object.values(findErrors).some(err => err !== '')){
      setError(findErrors)
    }else {
      setIsSubmitting(true)
      try {
        await produkDoc.set(form, {merge: true})
        enqueueSnackbar(
          'Berhasil di Ubah',
          {
            variant: 'success',
            autoHideDuration: 3000
          }
        )
        setIsSomethingChange(false)
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

  const handleUploadFile = async e => {
    const file = e.target.files[0]

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      setError(error => ({
          ...error,
          foto: `Format tidak di dukung: ${file.type}`
        })
      )
    }else if(file.size >= 512000) {
      setError(error => ({
          ...error,
          foto: `Size Terlalu Besar > 500KB`
        })
      )
    }else {
      const reader = new FileReader()

      reader.onabort = () => {
        setError(error => ({
            ...error,
            foto: `Proses Batal`
          })
        )
      }

      reader.onerror = () => {
          setError(error => ({
            ...error,
            foto: `Proses Gagal`
          })
        )
      }

      reader.onload = async () => {
        setError(error => ({
            ...error,
            foto: ``
          })
        )

        setIsSubmitting(true)

        try {
          
          const fileExt       = file.name.substring(file.name.lastIndexOf('.'))
          const fotoRef       = produkStorageRef.child(`${props.match.params.produkId}${fileExt}`)
          const fotoSnapshot  = await fotoRef.putString(reader.result, 'data_url')
          const fotoURL       = await fotoSnapshot.ref.getDownloadURL()

          setForm(currentForm  => ({
            ...currentForm,
            foto: fotoURL
          }))

          setIsSomethingChange(true)

        } catch (error) {
          setError(error => ({
              ...error,
              foto: error.message
            })
          )
        }

        setIsSubmitting(false)
      }

      reader.readAsDataURL(file)

    }
  }

  if(loading){
    return <AppPageLoading/>
  }

  return (
    <div>
      <Typography
        variant='h5'
        component='h1'
      >
        Edit Produk: {form.nama}
      </Typography>

      <Grid
        container
        alignItems='center'
        justify='center'
      >
        <Grid
          item
          xs={12}
          sm={6}
        >
          <form id='produk-form' onSubmit={handleSubmit}>
            <TextField
              id='nama'
              name='nama'
              label='Nama Produk'
              margin='normal'
              fullWidth 
              value={form.nama}
              onChange={handleChange}
              helperText={error.nama}
              error={error.nama ? true : false}
              disabled={isSubmitting}
            />

            <TextField
              id='sku'
              name='sku'
              label='SKU Produk'
              margin='normal'
              fullWidth
              value={form.sku}
              onChange={handleChange}
              helperText={error.sku}
              error={error.sku ? true : false}
              disabled={isSubmitting}
            />

            <TextField
              id='harga'
              name='harga'
              label='Harga Produk'
              margin='normal'
              type='number'
              fullWidth
              value={form.harga}
              onChange={handleChange}
              helperText={error.harga}
              error={error.harga ? true : false}
              disabled={isSubmitting}
            />

            <TextField
              id='stok'
              name='stok'
              label='Stok Produk'
              margin='normal'
              type='number'
              fullWidth
              value={form.stok}
              onChange={handleChange}
              helperText={error.stok}
              error={error.stok ? true : false}
              disabled={isSubmitting}
            />

            <TextField
              id='deskripsi'
              name='deskripsi'
              label='Deskripsi Produk'
              margin='normal'
              fullWidth
              multiline
              rowsMax={3}
              value={form.deskripsi}
              onChange={handleChange}
              helperText={error.deskripsi}
              error={error.deskripsi ? true : false}
              disabled={isSubmitting}
            />
            
          </form>
        </Grid>

        <Grid
          item
          xs={12}
          sm={6}
        >
          <div className={clasess.uploadFotoProduk}>
            {
              form.foto &&
              <img
                src={form.foto}
                className={clasess.previewPhotoProduk}
                alt={`Foto Produk ${form.nama}`}
              />
            }
            <input
              className={clasess.hideInputFile}
              type='file'
              id='upload-foto-produk'
              accept='image/jpeg,image/png'
              onChange={handleUploadFile}
            />
            <label htmlFor='upload-foto-produk'>
              <Button
                variant='outlined'
                component='span'
                disabled={isSubmitting}
              >
                Upload Foto Produk 
                <UploadIcon className={clasess.iconRight}/>
            </Button>
            </label>

            {
              error.foto &&
              <Typography color='error'>
                {error.foto}
              </Typography>
            }
          </div>
        </Grid>

        <Grid
          item
          xs={12}
        >
          <div className={clasess.actionButton}>
            <Button
              form='produk-form'
              type='submit'
              color='primary'
              variant='contained'
              disabled={isSubmitting || !isSomethingChange}
            >
              <SaveIcon className={clasess.iconLeft} />
            Simpan
          </Button>
          </div>
        </Grid> 

      </Grid>

      <Prompt
        when={isSomethingChange}
        message='Yakin ingin pindah halaman ?'
      >

      </Prompt>

    </div>
  )
}

const useStyles = makeStyles(theme => ({
    hideInputFile: {
      display: 'none'
    },
    uploadFotoProduk: {
      textAlign: 'center',
      padding: theme.spacing(3)
    },
    previewPhotoProduk: {
      width: '100%',
      height: 'auto'
    },
    iconRight: {
      marginLeft: theme.spacing(1)
    },
    iconLeft: {
      marginRight: theme.spacing(1)
    },
    actionButton: {
      paddingTop: theme.spacing(2)
    }
  })
)

export default Edit
