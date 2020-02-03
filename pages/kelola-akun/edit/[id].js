import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

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

export default function CreateAkun() {
	const classes = useStyles();

	const [tipeMahasiswa, setTipeMahasiswa] = React.useState('');

	const handleChangeTipeMahasiswa = event => {
		setTipeMahasiswa(event.target.value);
	};

  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/kelola-akun">
              Kelola Akun
            </Link>
            <Typography color="textPrimary">Edit Akun [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
  	        Edit Akun [ID]
  	      </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="kode_matkul" value="filled" label="Nama" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nama_matkul" value="filled" label="NIP / ID" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="kode_matkul" value="filled" label="Email" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl variant="outlined" className={classes.formControl}>
	        <InputLabel id="demo-simple-select-label">Peran</InputLabel>
	        <Select
	          labelId="demo-simple-select-label"
	          id="demo-simple-select"
	          value={tipeMahasiswa}
	          onChange={handleChangeTipeMahasiswa}
	        >
	          <MenuItem value="dalam">Dosen</MenuItem>
	          <MenuItem value="dalam">Admin akademik</MenuItem>
	          <MenuItem value="luar">Admin penelitian</MenuItem>
	          <MenuItem value="luar">Admin pengabdian masyarakat</MenuItem>
	          <MenuItem value="luar">Admin publikasi</MenuItem>
	          <MenuItem value="dalam">Tenaga pendidik</MenuItem>
	          <MenuItem value="dalam">Kepala program studi</MenuItem>
	        </Select>
	      </FormControl>
        </Grid>
        <Grid item xs={12}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={2}>
			      <Button variant="outlined" color="secondary" fullWidth href="/kelola-akun">
					Batal
				  </Button>
				</Grid>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="primary" fullWidth href="/kelola-akun">
					Simpan
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}