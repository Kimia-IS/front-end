import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function RegisterDosen() {
  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Daftar sebagai Dosen
	      </Typography>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="name" label="Nama lengkap" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="name" label="NIP" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="email" label="Alamat email" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="password" label="Kata sandi" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="re-password" label="Ulangi kata sandi" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
		      <Button variant="outlined" fullWidth>
				Masuk
			  </Button>
			</Grid>
        </Grid>
        <Grid item xs={12}>
	        <Typography variant="subtitle1" gutterBottom>
	          Sudah punya akun? <a href="/dosen/login">Login</a>
	        </Typography>
        </Grid>
      </Grid>
  	</div>
  );
}