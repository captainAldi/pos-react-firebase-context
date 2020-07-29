import React, { useState } from 'react'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useFirebase } from '../../../components/FirebaseProvider';

import {withRouter} from 'react-router-dom'



function Add(props) {
  const {firestore, user} = useFirebase()

  const produkCol = firestore.collection(`toko/${user.uid}/produk`)

  const [nama, setNama] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSimpan = async e => {
    setIsSubmitting(true)

    try {
      
      if(!nama){
        throw new Error('Nama Wajib di Isi')
      }

      const produkBaru = await produkCol.add({nama})
      setIsSubmitting(false)
      props.history.push(`produk/edit/${produkBaru.id}`)

    } catch (error) {
      setError(error.message)
    }

  }

  return (
    <Dialog
      disableBackdropClick={isSubmitting}
      disableEscapeKeyDown={isSubmitting}
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>Add New Products</DialogTitle>
      <DialogContent dividers>
        <TextField
          id='nama'
          label='Nama Produk'
          value={nama}
          onChange={e => {
            setError('')
            setNama(e.target.value)
          }}
          helperText={error}
          error={error ? true : false}
          disabled={isSubmitting}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleClose}
        >
          Batal
        </Button>
        <Button
          color='primary'
          onClick={handleSimpan}
          disabled={isSubmitting}
        >
          Simpan
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default withRouter(Add)
