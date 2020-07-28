import React from 'react'

import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/styles';

function AppPageLoading() {
  const clasess = useStyles()

  return (
    <div className={clasess.loadingBox}>
      <CircularProgress/>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
    loadingBox: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh'
    }
  })
)

export default AppPageLoading
