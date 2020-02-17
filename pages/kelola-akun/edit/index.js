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
import { API } from "../../../config";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getUserById } from "../../../store/actions/usersActions";
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

const Edit = props => {
  const { user } = props;

	const classes = useStyles();

	const [role, setRole] = React.useState(user.role);
  const [state, setState] = React.useState({
    id: user.id,
    name: user.name,
    user_id: user.auth_id || user.nip,
    email: user.email,
  });

  const handleInputChange = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })

  function handleChangeRole(event) {
    setRole(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      title: 'Simpan perubahan?',
      text: 'Pastikan data sudah terisi dengan benar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Simpan',
      cancelButtonText: 'Batal',
    }).then(async (result) => {
      if (result.value) {
        if ((role == 4) || (role == 5) || (role == 6)) {
          const payload = {
            nip: state.user_id,
            email: state.email,
            name: state.name,
            role: role
          }
          await axios.put(`${API}/auth/lecturer/edit/${state.user_id}`, payload)
                      .then(() => {
                        Swal.fire(
                          'Tersimpan!',
                          'Data berhasil diubah.',
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
        else if ((role == 1) || (role == 2) || (role == 3)) {
          const payload = {
            nip: state.user_id,
            email: state.email,
            name: state.name,
            role: role
          }
          await axios.put(`${API}/auth/admin/edit/${state.user_id}`, payload)
                      .then(() => {
                        Swal.fire(
                          'Tersimpan!',
                          'Data berhasil diubah.',
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
        else {
          Swal.fire(
            'Gagal!',
            'No role selected.',
            'error'
          );
        }
      }
    })
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
                Kelola Akun
              </Link>
              <Typography color="textPrimary">Edit Akun</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Edit Akun - {user.name}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Nama" name="name" value={state.name} onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="NIP / ID" name="user_id" value={state.user_id} onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="Email" name="email" value={state.email} onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl variant="outlined" required className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Peran</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                value={role}
                onChange={handleChangeRole}
              >
                <MenuItem value="" disabled>
                  Pilih Peran
                </MenuItem>
                <MenuItem value={1}>Super admin</MenuItem>
                <MenuItem value={2}>Admin akademik</MenuItem>
                <MenuItem value={3}>Admin non-akademik</MenuItem>
                <MenuItem value={4}>Tenaga pendidik</MenuItem>
                <MenuItem value={5}>Dosen</MenuItem>
                <MenuItem value={6}>Kepala program studi</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={2}>
                <Button variant="outlined" color="secondary" fullWidth href="/kelola-akun">
                  Batal
                </Button>
              </Grid>
              <Grid item xs={12} md={3}>
                <Button variant="outlined" type="submit" color="primary" fullWidth>
                  Simpan
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

Edit.getInitialProps = async ctx => {
  console.log(ctx.query)
  const id = parseInt(ctx.query.id);
  const role = parseInt(ctx.query.role);
  console.log(role)
  const { user } = await ctx.store.dispatch(getUserById(id, role));
  return { user };
};

Edit.propTypes = {
  user: PropTypes.any
};

const mapStateToProps = state => ({
  user: state.usersReducer.user
});

export default connect(mapStateToProps)(Edit);
