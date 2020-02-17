import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

export default function LoginDosen() {
	const [state, setState] = React.useState();

	const handleChangeState = (e) => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.nip) {
			if (state.password) {
				const formData = new FormData();
				formData.append('id', state.nip);
				formData.append('password', state.password);
				axios.post(`${API}/auth/login/alternative/lecturer`, formData)
						.then((response) => {
							console.log(response);
							if (response.data.results) {
								document.cookie = `user=${response.data.results}; path=/`;
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
				'Tolong isi NIP anda',
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
		        Login sebagai Dosen atau Tendik
		      </Typography>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={5}>
		          <TextField name="nip" onChange={handleChangeState} label="NIP" variant="outlined" required fullWidth />
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={5}>
		          <TextField name="password" onChange={handleChangeState} label="Kata sandi" variant="outlined" required fullWidth />
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