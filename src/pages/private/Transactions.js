import React, { useState, useEffect } from 'react'

import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import {makeStyles} from '@material-ui/core/styles'

import DeleteIcon from '@material-ui/icons/Delete'
import ViewIcon from '@material-ui/icons/Visibility'

import { useFirebase } from '../../components/FirebaseProvider'

import {useCollection} from 'react-firebase-hooks/firestore'

import {currency} from '../../utils/formatter'
import {format} from 'date-fns'

import AppPageLoading from '../../components/AppPageLoading'
import TransactionsDetail from './TransactionDetail'

function Transactions() {
  const clasess = useStyles()

  const {firestore, user} = useFirebase()

  const transaksiCol = firestore.collection(`toko/${user.uid}/transaksi`) 

  const [snapshot, loading] = useCollection(transaksiCol)

  const [transaksiItems, setTransaksiItems] = useState([])
  const [details, setDetails] = useState({
    open: false,
    transaksi: {}
  })

  useEffect(() => {
    
    if(snapshot){
      setTransaksiItems(snapshot.docs)
    }

  }, [snapshot])

  const handleDelete = transaksiDoc => async e => {
    if(window.confirm('Anda yakin ?')){
      await transaksiDoc.ref.delete()
    }
  }
  
  const handleCloseDetails = e => {
    setDetails({
      open: false,
      transaksi: {}
    })
  }

  const handleOpenDetail = transaksiDoc => e => {
    setDetails({
      open: true,
      transaksi: transaksiDoc.data()
    })
  }

  if(loading) {
    return <AppPageLoading/>
  }

  return (
    <div>
      <Typography
        component='h1'
        variant='h5'
        paragraph
      >
        Daftar Transaksi
      </Typography>

      {
        transaksiItems.length <= 0 &&
        <Typography>
          Belum Ada Transaksi
        </Typography>
      }

      <Grid
        container
        spacing={5}
      >
        {
          transaksiItems.map(transaksiDoc => {
            const transaksiData = transaksiDoc.data()

            return (
              <Grid
                item
                key={transaksiDoc.id}
                xs={12}
                sm={12}
                md={6}
                lg={3}
              >
                <Card className={clasess.card}>
                  <CardContent className={clasess.transaksiSummary}>
                    <Typography
                      variant='h5'
                      noWrap
                    >
                      No: {transaksiData.no}
                    </Typography>

                    <Typography>
                      Total: {currency(transaksiData.total)}
                    </Typography>

                    <Typography>
                      Total: {format(new Date(transaksiData.timestamp), 'dd-MM-yyyy HH:mm')}
                    </Typography>
                  </CardContent>
                  <CardActions className={clasess.transaksiActions}>
                    <IconButton
                      onClick={handleOpenDetail(transaksiDoc)}
                    >
                      <ViewIcon />
                    </IconButton>

                    <IconButton
                      onClick={handleDelete(transaksiDoc)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            )
          })

        }
      </Grid>

      <TransactionsDetail
        open={details.open}
        handleClose={handleCloseDetails}
        transaksi={details.transaksi}
      />

    </div>
  )
}

const useStyles = makeStyles(theme => ({
    card: {
      display: 'flex',
    },
    transaksiSummary: {
      flex: '2 0 auto'
    },
    transaksiActions: {
      flexDirection: 'column'
    }
  })
)

export default Transactions
