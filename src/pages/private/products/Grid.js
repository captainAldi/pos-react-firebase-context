import React, {useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core'
import GridM from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'

import ImageIcon from '@material-ui/icons/Image'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import AddDialog from './Add'
import { useFirebase } from '../../../components/FirebaseProvider'
import { useCollection } from 'react-firebase-hooks/firestore'
import AppLoading from '../../../components/AppLoading'

import {currency} from '../../../utils/formatter'

function Grid() {
  const clasess = useStyles()
  const [openAddDialog, setOpenAddDialog] = useState(false)

  const { firestore, user, storage } = useFirebase()

  const produkCol = firestore.collection(`toko/${user.uid}/produk`)

  const [snapshot, loading] = useCollection(produkCol)

  const [produkItems, setProdukItems] = useState([])

  useEffect(() => {
    
    if(snapshot){
      setProdukItems(snapshot.docs)
    }

  }, [snapshot])

  const handleDelete = produkDoc => async e => {
    if(window.confirm('Anda Yakin ?')){
      await produkDoc.ref.delete()

      const fotoURL = await produkDoc.data().foto

      if(produkDoc.data().foto){
        await storage.refFromURL(fotoURL).delete()
      }

    }
  }

  if(loading) {
    return <AppLoading/>
  }

  return (
    <div>
      <Typography
        variant='h5'
        component='h1'
        paragraph
      >
        Halaman Produk
      </Typography>

      {
        produkItems.length <= 0 &&
        <Typography>
          Belum ada Produk
        </Typography>
      }

      <GridM
        container
        spacing={5}
      >
        {
          produkItems.map(produkDoc => {

            const produkData = produkDoc.data()
            return (
              <GridM
                key={produkDoc.id}
                item={true}
                xs={12}
                sm={12}
                md={6}
                lg={4}
              >
                <Card className={clasess.card}>
                  {
                    produkData.foto &&
                    <CardMedia
                      className={clasess.foto}
                      image={produkData.foto}
                      title={produkData.nama}
                    />
                  }

                  {
                    !produkData.foto &&
                    <div className={clasess.fotoPlaceholder}>
                      <ImageIcon
                        size='large'
                        color='disabled'
                      />
                    </div>
                  }
                  <CardContent className={clasess.produkDetails}>
                    <Typography
                      variant='h5'
                      noWrap
                    >
                      {produkData.nama}
                    </Typography>

                    <Typography
                      variant='subtitle1'
                    >
                      Harga: {currency(produkData.harga)}
                    </Typography>

                    <Typography
                      variant='subtitle1'
                    >
                      Stok: {produkData.stok}
                    </Typography>
                  </CardContent>
                  <CardActions className={clasess.produkActions}>
                    <IconButton
                      component={Link}
                      to={`/produk/edit/${produkDoc.id}`}
                    >
                      <EditIcon/>
                    </IconButton>

                    <IconButton
                      onClick={handleDelete(produkDoc)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </CardActions>
                </Card>
              </GridM>
            )
          })
        }
      </GridM>

      <Fab
        className={clasess.fab}
        color='primary'
        onClick={() => {
          setOpenAddDialog(true)
        }}
      >
        <AddIcon/>
      </Fab>

      <AddDialog
        open={openAddDialog}
        handleClose={() => {
          setOpenAddDialog(false)
        }}
      />
    </div>
  )
}

const useStyles = makeStyles(theme => ({
    fab: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(2)
    },
    card: {
      display: 'flex'
    },
    foto: {
      width: 150,
    },
    fotoPlaceholder: {
      width: 150,
      alignSelf: 'center',
      textAlign: 'center'
    },
    produkDetails: {
      flex: '2 0 auto',
    },
    produkActions: {
      flexDirection: 'column'
    }
  })
)

export default Grid
