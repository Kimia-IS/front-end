import React from 'react'
import Link from '@material-ui/core/Link'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="static" color="inherit" style={{marginBottom: "50px"}}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/">
          <img src="/static/images/logo-itb.png" style={{'width': '45px'}}/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link href="/">
              Kimia IS
          </Link>
        </Typography>
        <Button color="inherit" href="/">Home</Button>|
        <Button color="inherit" href="/dosen/login">Login dosen</Button>|
        <Button color="inherit" href="/admin/login">Login admin</Button>
      </Toolbar>
    </AppBar> 
  );
}
