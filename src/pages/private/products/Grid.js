import React, {useState} from 'react'

import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { makeStyles } from '@material-ui/core'

import AddDialog from './Add'

function Grid() {
  const clasess = useStyles()
  const [openAddDialog, setOpenAddDialog] = useState(false)

  return (
    <div>
      <h1>Grid Pages</h1>
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
    }
  })
)

export default Grid
