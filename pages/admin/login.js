import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function LoginAdmin() {
  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Login sebagai Admin
	      </Typography>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="auth_id" label="ID" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="password" label="Kata sandi" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
		      <Button variant="outlined" fullWidth href="/dashboard">
				Masuk
			  </Button>
			</Grid>
        </Grid>
        <Grid item xs={12}>
	        <Typography variant="subtitle1" gutterBottom>
	          Lupa kata sandi? <a href="/recover">Reset</a>
	        </Typography>
	        {/*<Typography variant="subtitle1" gutterBottom>
	          Belum terdaftar? <a href="/admin/register">Daftar</a>
	        </Typography>*/}
        </Grid>
      </Grid>
  	</div>
  );
}