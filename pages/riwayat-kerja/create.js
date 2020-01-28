import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CreateTA() {
	const classes = useStyles();

	const [tipeMahasiswa, setTipeMahasiswa] = React.useState('');
	const [posisiDosen, setPosisiDosen] = React.useState('');

	const handleChangeTipeMahasiswa = event => {
		setTipeMahasiswa(event.target.value);
	};

	const handleChangePosisiDosen = event => {
		setPosisiDosen(event.target.value);
	};

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
            <Typography color="textPrimary">Buat Riwayat Kerja Baru</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Buat Riwayat Kerja Baru
	      </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nim" label="Nama" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="nama_mahasiswa" label="Tahun" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="judul" label="Nama pekerjaan" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
	    	<FormControl variant="outlined" className={classes.formControl}>
		        <InputLabel id="asd">Semester</InputLabel>
		        <Select
		          labelId="asd"
		          id="asdasd"
		          value={posisiDosen}
		          onChange={handleChangePosisiDosen}
		        >
		          <MenuItem value="pembimbing">1 (Ganjil)</MenuItem>
		          <MenuItem value="co-pembimbing">2 (Genap)</MenuItem>
		        </Select>
		      </FormControl>
        </Grid>
        <Grid item xs={12} md={3}>
	    	<FormControl variant="outlined" className={classes.formControl}>
		        <InputLabel id="asd">Jenis Pekerjaan</InputLabel>
		        <Select
		          labelId="asd"
		          id="asdasd"
		          value={tipeMahasiswa}
		          onChange={handleChangeTipeMahasiswa}
		        >
		          <MenuItem value="pembimbing">Rutin</MenuItem>
		          <MenuItem value="co-pembimbing">Tidak rutin</MenuItem>
		        </Select>
		      </FormControl>
        </Grid>
        <Grid item xs={12} md={8}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={4}>
		        	<input
					  accept="image/*"
					  style={{ display: 'none' }}
					  id="raised-button-file"
					  multiple
					  type="file"
					/>
					<label htmlFor="raised-button-file">
					  <Button variant="outlined" fullWidth component="span">
					    Upload file
					  </Button>
					</label> 
		        </Grid>
		        <Grid item xs={12} md={3}>
		        	<Typography variant="subtitle1" gutterBottom>
				        nama_file.ext
				      </Typography>
		        </Grid>
	        </Grid>
        </Grid>
        <Grid item xs={12}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={2}>
			      <Button variant="outlined" color="secondary" fullWidth href="/riwayat-kerja">
					Batal
				  </Button>
				</Grid>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="primary" fullWidth href="/riwayat-kerja">
					Simpan
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}