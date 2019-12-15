import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function CreateAkademik() {
  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/akademik">
              Akademik
            </Link>
            <Typography color="textPrimary">Create</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Create Akademik
	      </Typography>
        </Grid>

        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
		      <Button variant="outlined" fullWidth href="/dashboard">
				Submit
			  </Button>
			</Grid>
        </Grid>

      </Grid>
  	</div>
  );
}