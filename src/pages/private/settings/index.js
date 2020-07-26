import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import User from './User'
import Store from './Store'


function Settings() {
  return (
    <Switch>
      <Route path='/pengaturan/pengguna' component={User} />
      <Route path='/pengaturan/toko' component={Store} />

      <Redirect to='/pengaturan/pengguna' component={User} />
    </Switch>
  )
}

export default Settings
