import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function LoginDosen() {
  return (
    <Container>
      <Box m={3}>
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
			      <Button variant="outlined" fullWidth>
					Masuk
				  </Button>
				</Grid>
	        </Grid>
	      </Grid>
      </Box>
    </Container>
  );
}