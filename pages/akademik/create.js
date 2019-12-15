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
            <Typography color="textPrimary">Buat Baru</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Buat Mata Kuliah Baru
	      </Typography>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="kode_matkul" label="Kode mata kuliah" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="nama_matkul" label="Nama mata kuliah" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="sks" label="Total SKS" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="dosen_1" label="Nama dosen 1" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="sks_dosen_1" label="SKS dosen 1" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="dosen_2" label="Nama dosen 1" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="sks_dosen_3" label="SKS dosen 1" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
        	<Grid container spacing={3}>
	        <Grid item xs={12} md={2}>
		      <Button variant="outlined" color="secondary" fullWidth href="/akademik">
				Batal
			  </Button>
			</Grid>
	        <Grid item xs={12} md={3}>
		      <Button variant="outlined" color="primary" fullWidth href="/akademik">
				Simpan
			  </Button>
			</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}