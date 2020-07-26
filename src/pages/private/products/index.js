import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Edit from './Edit'
import Grid from './Grid'

function index() {
  return (
    <Switch>
      <Route path='/produk/edit/:produkId' component={Edit} />
      <Route component={Grid} />
    </Switch>
  )
}

export default index
