import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core'

import User from './User'
import Store from './Store'


function Settings(props) {
  const {location, history} = props

  const clasess = useStyles()

  const handleChangeTab = (e, value) => {
    history.push(value)
  }

  return (
    <Paper square>
      <Tabs
        value={location.pathname}
        indicatorColor='primary'
        textColor='primary'
        onChange={handleChangeTab}
        className={clasess.tabContent}
      >
          <Tab label='Pengguna' value='/pengaturan/pengguna' />
          <Tab label='Toko' value='/pengaturan/toko' />
      </Tabs>

      <div>
        <Switch>
          <Route path='/pengaturan/pengguna' component={User} />
          <Route path='/pengaturan/toko' component={Store} />

          <Redirect to='/pengaturan/pengguna' component={User} />
        </Switch>
      </div>
    </Paper>
  )
}

const useStyles = makeStyles(theme => ({
    tabContent: {
      padding: theme.spacing(2)
    }
  })
)

export default Settings
