import React from 'react';
import { useRouter }  from 'next/router';
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

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
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

	const [role, setRole] = React.useState("");
  const [state, setState] = React.useState({
    id: user.id,
    name: user.name,
    user_id: user.user_id,
    email: user.email,
    role: user.role,
  });

  const handleInputChange = (e) => setState({
    ...state,
    [e.target.name]: e.target.value
  })

  function handleChangeRole(event) {
    setRole(event.target.value);
  }

  React.useEffect(() => {
     console.log('hehe')
  }, [state]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    let payload = {
      user_id: state.user_id,
      email: state.email,
      name: state.name,
      role: role
    }
    if ((state.role == 4) || (state.role == 5) || (state.role == 6)) {
      const result = await axios.post(`${API}/auth/lecturer/edit/${state.user_id}`, payload)
                          .then(response => {
                            console.log(response);
                          })
                          .catch(error => {
                            console.log(error);
                          });
    }
    else if ((state.role == 1) || (state.role == 2) || (state.role == 3)) {
      const result = await axios.post(`${API}/auth/admin/edit/${state.user_id}`, payload)
                          .then(response => {
                            console.log(response);
                          })
                          .catch(error => {
                            console.log(error);
                          });
    }
    else {
      console.log('No role selected!')
    }

    console.log(result);
    //const results = createClass(payload);
    console.log('Submitted! State: ', state);
    //console.log('Results: ', results);
    /*if (results) {
      router.push('/akademik');
    }*/
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
              Edit Akun - {state.id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Nama" name="name" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="NIP / ID" name="user_id" onChange={handleInputChange} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="Email" name="email" onChange={handleInputChange} variant="outlined" fullWidth required />
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
                  Buat
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
  const id = parseInt(ctx.query.id);
  const role = parseInt(ctx.query.role);
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
