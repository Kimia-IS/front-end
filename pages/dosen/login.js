import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function LoginDosen() {
  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Login sebagai Dosen
	      </Typography>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="nip" label="NIP" variant="outlined" fullWidth />
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
	          Lupa kata sandi? <Link href="/recover">Reset</Link>
	        </Typography>
	        {/*<Typography variant="subtitle1" gutterBottom>
	          Belum terdaftar? <a href="/dosen/register">Daftar</a>
	        </Typography>*/}
        </Grid>
      </Grid>
  	</div>
  );
}