import React from 'react';
import Link from '@material-ui/core/Link';
import Menu from '@material-ui/core/Menu';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Header(props) {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" color="inherit" style={{marginBottom: "50px"}}>
      <Toolbar>
        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href="/">
          <img src="/static/images/logo-itb.png" style={{'width': '45px'}}/>
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Link href="/" color="inherit">
              Kimia IS
          </Link>
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Login
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem><Link color="inherit" href="/dosen/login">Login dosen</Link></MenuItem>
          <MenuItem><Link color="inherit" href="/admin/login">Login admin</Link></MenuItem>
        </Menu>
      </Toolbar>
    </AppBar> 
  );
}
