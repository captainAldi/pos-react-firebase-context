import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Register from './pages/Register';
import Login from './pages/Login';
import ForgetPass from './pages/ForgetPass';
import NotFound from './pages/NotFound';

//Halaman Private
import Private from './pages/private'
import PrivateRoute from './components/PrivateRoute';

//Firebase
import FirebaseProvider from './components/FirebaseProvider';

//Material UI
import CssBaseline from '@material-ui/core/CssBaseline';
import ThemeProvider from '@material-ui/styles/ThemeProvider'

import theme from './config/Theme'

function App() {
  return (
    <>
      <CssBaseline>
        <ThemeProvider theme={theme}>
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
       </ThemeProvider>
      </CssBaseline>
    </>
  );
}

export default App;
