import React from 'react'

import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'

import { currency } from '../../utils/formatter'

function TransactionDetail(props) {
  return (
    <Dialog
      open={props.open}
      onClose={props.handleClose}
    >
      <DialogTitle>Transaksi No: {props.transaksi.no}</DialogTitle>
      <DialogContent dividers>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item</TableCell>
              <TableCell>Jumlah</TableCell>
              <TableCell>Harga</TableCell>
              <TableCell>Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              props.transaksi.items &&
              Object.keys(props.transaksi.items).map(k => {
                const item = props.transaksi.items[k]
                return (
                  <TableRow
                    key={k}
                  >
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>
                      {item.jumlah}
                    </TableCell>
                    <TableCell>{currency(item.harga)}</TableCell>
                    <TableCell>{currency(item.subtotal)}</TableCell>
                  </TableRow>
                )
              })
            }

            <TableRow>
              <TableCell colSpan={3}>
                <Typography
                  variant='subtitle2'
                >
                  Total
                  </Typography>
              </TableCell>
              <TableCell>
                <Typography variant='h6'>
                  {currency(props.transaksi.total)}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={props.handleClose}
          variant='contained'
          color='primary'
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TransactionDetail
