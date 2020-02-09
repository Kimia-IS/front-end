import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function LihatTA() {
  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/riwayat-kerja">
              Riwayat Kerja
            </Link>
            <Typography color="textPrimary">Riwayat Kerja [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Riwayat Kerja [ID]
	      </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nim" label="Nama" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="nama_mahasiswa" label="Tahun" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="tipe" label="Nama pekerjaan" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="posisi" label="Semester" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="jenis" label="Jenis pekerjaan" variant="outlined" fullWidth required disabled />
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
  			      <Button variant="outlined" color="secondary" fullWidth href="/riwayat-kerja">
      					Kembali
    				  </Button>
    				</Grid>
    			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}