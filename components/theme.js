import { createMuiTheme } from '@material-ui/core/styles';
// import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4caf50', // #1976d2
    },
    secondary: {
      main: '#dc004e',
    },
    error: {
      main: '#f44336',
    },
    warning: {
      main: '#ff9800',
    },
    info: {
      main: '#2196f3',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#fff',
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  },
});

export default theme;