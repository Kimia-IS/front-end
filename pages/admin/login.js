import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

export default function LoginAdmin() {
	const [state, setState] = React.useState({
		showPassword: false,
	});

	const handleChange = prop => event => {
	    setState({ ...state, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
	    setState({ ...state, showPassword: !state.showPassword });
	};

	const handleMouseDownPassword = event => {
	    event.preventDefault();
	};

	const handleChangeState = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.id) {
			if (state.password) {
				const formData = new FormData();
				formData.append('id', state.id);
				formData.append('password', state.password);
				axios.post(`${API}/auth/login/alternative/admin`, formData)
						.then((response) => {
							console.log(response);
							if (response.data.results) {
								document.cookie = `id=${response.data.results.id}; path=/`;
								document.cookie = `name=${response.data.results.name}; path=/`;
								document.cookie = `role=${response.data.results.role}; path=/`;
								document.cookie = `user_id=${response.data.results.auth_id}; path=/`;
								document.cookie = `email=${response.data.results.email}; path=/`;
								window.location = '/dashboard'
							}
							else {
								Swal.fire(
			                        'Gagal!',
			                        'ID atau password salah',
			                        'error'
			                    );
							}
						})
						.catch((error) => {
							console.log(error);
							Swal.fire(
		                        'Gagal!',
		                        error,
		                        'error'
		                    );
						})
			}
			else {
				Swal.fire(
					'Oops!',
					'Tolong isi password anda',
					'error'
				)
			}
		}
		else {
			Swal.fire(
				'Oops!',
				'Tolong isi ID anda',
				'error'
			)
		}
	}

  return (
    <div>
	    <form onSubmit={handleSubmit}>
	      <Grid container spacing={3}>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Login sebagai Admin
		      </Typography>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={5}>
		          <TextField name="id" onChange={handleChangeState} label="ID" variant="outlined" required fullWidth />
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={5}>
		        	<FormControl fullWidth required variant="outlined">
			          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
			          <OutlinedInput
			            id="outlined-adornment-password"
			            type={state.showPassword ? 'text' : 'password'}
			            value={state.password}
			            onChange={handleChange('password')}
			            endAdornment={
			              <InputAdornment position="end">
			                <IconButton
			                  aria-label="toggle password visibility"
			                  onClick={handleClickShowPassword}
			                  onMouseDown={handleMouseDownPassword}
			                  edge="end"
			                >
			                  {state.showPassword ? <Visibility /> : <VisibilityOff />}
			                </IconButton>
			              </InputAdornment>
			            }
			            fullWidth
			            labelWidth={70}
			          />
			        </FormControl>
		          	
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={5}>
			      <Button variant="outlined" type="submit" fullWidth>
					Masuk
				  </Button>
				</Grid>
	        </Grid>
	        <Grid item xs={12}>
		        <Typography variant="subtitle1" gutterBottom>
		          Lupa kata sandi? <Link href="/recover">Reset</Link>
		        </Typography>
		        {/*<Typography variant="subtitle1" gutterBottom>
		          Belum terdaftar? <a href="/user/register">Daftar</a>
		        </Typography>*/}
	        </Grid>
	      </Grid>
	    </form>
  	</div>
  );
}