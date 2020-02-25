import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import axios from "axios";
import { API } from "../../config";
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const ChangePassword = props => {
	const classes = useStyles();

  console.log('props in ChangePassword = ', props);
  const user = props.login;

  const [state, setState] = React.useState();

  const handleInputChange = (e) => setState({
      ...state,
      [e.target.name]: e.target.value
  })

  React.useEffect(() => {
     console.log('hehe')
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.password == state.confirm_password) {
      Swal.fire({
        title: 'Ganti password?',
        text: 'Pastikan password sudah terisi dengan benar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ganti',
        cancelButtonText: 'Batal',
      }).then(async (result) => {
        if (result.value) {
          const payload = {
            password: state.password
          }
          await axios.put(`${API}/auth/admin/edit/${user.user_id}`, payload)
                      .then(() => {
                        Swal.fire(
                          'Tersimpan!',
                          'Password berhasil diganti.',
                          'success'
                        );
                      })
                      .catch(error => {
                        Swal.fire(
                          'Gagal!',
                          error,
                          'error'
                        );
                      });
        }
      })
    }
    else {
      Swal.fire(
        'Gagal!',
        'Input password berbeda',
        'error'
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
        	<Grid item xs={12}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Link color="inherit" href="/kelola-akun">
                Profil
              </Link>
              <Typography color="textPrimary">Ganti Password</Typography>
            </Breadcrumbs>
          </Grid>
        	<Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
  	        Ganti Password
  	      </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Masukkan password" name="password" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="Masukkan ulang password" name="confirm_password" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12}>
          	<Grid container spacing={3}>
  		        <Grid item xs={12} md={2}>
    			      <Button variant="outlined" color="secondary" fullWidth href="/profil">
        					Batal
      				  </Button>
      				</Grid>
  		        <Grid item xs={12} md={3}>
    			      <Button variant="outlined" type="submit" color="primary" fullWidth>
        					Ganti
      				  </Button>
      				</Grid>
      			</Grid>
          </Grid>
        </Grid>
      </form>
  	</div>
  );
}

export default ChangePassword;