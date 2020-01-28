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

export default function EditJurnal() {
	const classes = useStyles();

	const [posisiDosen, setPosisiDosen] = React.useState('');

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
            <Link color="inherit" href="/publikasi">
              Publikasi
            </Link>
            <Link color="inherit" href="/publikasi/jurnal">
              Jurnal
            </Link>
            <Typography color="textPrimary">Edit Jurnal [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Edit Jurnal [ID]
	      </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="judul" value="filled" label="Judul jurnal" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="penulis_1" value="Handajaya Rusli" label="Penulis 1" variant="outlined" fullWidth disabled required />
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField id="tahun" value="filled" label="Tahun" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField id="nomor" value="filled" label="Nomor" variant="outlined" fullWidth required />
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField id="issue" value="filled" label="Issue" variant="outlined" fullWidth />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField id="halaman" value="filled" label="Halaman" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={5}>
	          <FormControl variant="outlined" className={classes.formControl} fullWidth>
		        <InputLabel id="asd">Jenis jurnal</InputLabel>
		        <Select
		          labelId="asd"
		          id="asdasd"
		          value={posisiDosen}
		          onChange={handleChangePosisiDosen}
		        >
		          <MenuItem value="pembimbing">Nasional</MenuItem>
		          <MenuItem value="pembimbing">Nasional terakreditasi</MenuItem>
		          <MenuItem value="pembimbing">Internasional</MenuItem>
		          <MenuItem value="pembimbing">Internasional terindeks scopus</MenuItem>
		          <MenuItem value="pembimbing">Internasional terindeks scimago</MenuItem>
		        </Select>
		      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField id="doi" value="filled" label="DOI" variant="outlined" fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="link" value="filled" label="Link" variant="outlined" fullWidth required />
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
			      <Button variant="outlined" color="secondary" fullWidth href="/publikasi/jurnal">
					Batal
				  </Button>
				</Grid>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="primary" fullWidth href="/publikasi/jurnal">
					Simpan
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}