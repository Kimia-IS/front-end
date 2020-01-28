import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function LihatPaten() {
  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/publikasi">
              Publikasi
            </Link>
            <Link color="inherit" href="/publikasi/paten">
              Paten
            </Link>
            <Typography color="textPrimary">Paten [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Paten [ID]
	      </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="judul" value="filled" label="Judul Paten" variant="outlined" fullWidth disabled required />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="penulis_1" value="filled" label="Nama Pengaju" variant="outlined" fullWidth disabled required />
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField id="tahun" value="filled" label="Tahun" variant="outlined" fullWidth disabled required />
	        </Grid>
	        <Grid item xs={12} md={5}>
	        	<TextField id="tahun" value="filled" label="Status Paten" variant="outlined" fullWidth disabled required />
	        </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={4}>
					  <Button variant="outlined" fullWidth>
					    Lihat file
					  </Button>
		        </Grid>
		        <Grid item xs={12} md={3}>
		        	nama_file.extension
		        </Grid>
	        </Grid>
        </Grid>
        <Grid item xs={12}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={6}>
			      <Button variant="outlined" color="secondary" fullWidth href="/publikasi/paten">
					Kembali
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}