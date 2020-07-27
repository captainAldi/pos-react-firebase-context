import React from 'react'

import Button from '@material-ui/core/Button'
import { useFirebase } from '../../components/FirebaseProvider'

function Home() {
  
  const {auth} = useFirebase()

  return (
    <div>
      <h1>Home transaksi</h1>
      <Button
        onClick={ e => {
          auth.signOut()
        }}
      >
        Log Out
      </Button>
    </div>
  )
}

export default Home
