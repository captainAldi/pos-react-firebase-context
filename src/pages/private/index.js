import React, {useState} from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import SignOutIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home'
import StoreIcon from '@material-ui/icons/Store'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SettingIcon from '@material-ui/icons/Settings'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

import { Switch, Route } from 'react-router-dom'

import Pengaturan from './settings'
import Products from './products'
import Transactions from './Transactions'
import Home from './Home'

import { useFirebase } from '../../components/FirebaseProvider'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Toko
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function CopyrightShort() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {' © '}
    </Typography>
  );
}

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { auth } = useFirebase()

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSignOut = e => {
    auth.signOut()
  }
  

  return (
    <div className={classes.root}>

      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <Switch>
              <Route path='/produk' children='Produk'/>
              <Route path='/pengaturan' children='Pengaturan' />
              <Route path='/transaksi' children='Transaksi' />
              <Route children='Home'/>
            </Switch>
          </Typography>
          <IconButton color="inherit">
            <Badge color="secondary">
              <SignOutIcon onClick={handleOpenDialog} />
            </Badge>
          </IconButton>

          <Dialog
            open={openDialog}
            onClose={handleSignOut}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"Logout"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Do you want to log out ?
          </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                No
          </Button>
              <Button onClick={handleSignOut} color="primary" autoFocus>
                Yes
          </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <Divider />

        <List>
          <Route 
            path='/' 
            exact
            children={({match, history}) => {
              return  (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/')
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>

                  <ListItemText primary='Home' />
                </ListItem>
              )
            }}
          />

          <Route
            path='/produk'
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/produk')
                  }}
                >
                  <ListItemIcon>
                    <StoreIcon />
                  </ListItemIcon>

                  <ListItemText primary='Produk' />
                </ListItem>
              )
            }}
          />

          <Route
            path='/transaksi'
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/transaksi')
                  }}
                >
                  <ListItemIcon>
                    <ShoppingCartIcon />
                  </ListItemIcon>

                  <ListItemText primary='Transaksi' />
                </ListItem>
              )
            }}
          />

          <Route
            path='/pengaturan/pengguna'
            children={({ match, history }) => {
              return (
                <ListItem
                  button
                  selected={match ? true : false}
                  onClick={() => {
                    history.push('/pengaturan/pengguna')
                  }}
                >
                  <ListItemIcon>
                    <SettingIcon />
                  </ListItemIcon>

                  <ListItemText primary='Pengaturan' />
                </ListItem>
              )
            }}
          />

        </List>

        <Divider/>
        {
          open ? <Copyright /> : <CopyrightShort/>
        }

      </Drawer>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/pengaturan" component={Pengaturan} />
            <Route path="/produk" component={Products} />
            <Route path="/transaksi" component={Transactions} />
            <Route component={Home} />
          </Switch>
        </Container>
      </main>

    </div>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));