import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import ForgetPass from './pages/ForgetPass';
import NotFound from './pages/NotFound';

import Private from './pages/private'
import PrivateRoute from './components/PrivateRoute';

import FirebaseProvider from './components/FirebaseProvider';

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Switch>
          <PrivateRoute path='/' exact component={Private} />
          <PrivateRoute path='/pengaturan' component={Private} />
          <PrivateRoute path='/produk' component={Private} />
          <PrivateRoute path='/transaksi' component={Private} />

          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/lupa-pass' component={ForgetPass} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
