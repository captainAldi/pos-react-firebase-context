import React from 'react'
import {Switch, Route} from 'react-router-dom'

import Pengaturan from './settings'
import Products from './products'
import Transactions from './Transactions'
import Home from './Home'

function Private() {
  return (
    <Switch>
      <Route path="/pengaturan" component={Pengaturan} />
      <Route path="/produk" component={Products} />
      <Route path="/transaksi" component={Transactions} />
      <Route component={Home} />
    </Switch>
  )
}

export default Private
