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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

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

	const [count, setCount] = React.useState(2);	// Pahami lagi perilaku 'count' (lifecycle)
	const [inputDosen2, setInputDosen2] = React.useState(false);
	const [inputDosen3, setInputDosen3] = React.useState(false);
	const [tipeMahasiswa, setTipeMahasiswa] = React.useState('');
	const [posisiDosen, setPosisiDosen] = React.useState('');
	const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T21:11:54'));

	const handleDateChange = date => {
	    setSelectedDate(date);
	};

	const handleChangeTipeMahasiswa = event => {
		setTipeMahasiswa(event.target.value);
	};

	const handleChangePosisiDosen = event => {
		setPosisiDosen(event.target.value);
	};

	const handleTambahDosen = () => {
		if (count <= 3) {
			setCount(count => count + 1);
			if (count >= 2) {
				setInputDosen2(true);
			}
			if (count >= 3) {
				setInputDosen3(true);
			}
		}
	};

	const handleKurangDosen = () => {
		if (count >= 3) {
			setCount(count => count - 1);
			if (count <= 4) {
				setInputDosen3(false);
			}
			if (count <= 3) {
				setInputDosen2(false);
			}
		}
	};

	const addFieldDosen2 = () => {
		if (inputDosen2) {
			return (
				<Grid item xs={12} md={8}>
		        	<Grid container spacing={3}>
				        <Grid item xs={12} md={7}>
				          <TextField id="dosen_2" label="Nama dosen 2" variant="outlined" fullWidth />
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField id="sks_dosen_2" label="SKS dosen 2" variant="outlined" fullWidth required />
				        </Grid>
		        	</Grid>
		        </Grid>
			);
		}
	};

	const addFieldDosen3 = () => {
		if (inputDosen3) {
			return (
				<Grid item xs={12} md={8}>
		        	<Grid container spacing={3}>
				        <Grid item xs={12} md={7}>
				          <TextField id="dosen_3" label="Nama dosen 3" variant="outlined" fullWidth />
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField id="sks_dosen_3" label="SKS dosen 3" variant="outlined" fullWidth required />
				        </Grid>
		        	</Grid>
		        </Grid>
			);
		}
	};

  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/pengabdian-masyarakat">
              Pengabdian Masyarakat
            </Link>
            <Typography color="textPrimary">Buat Pengabdian Masyarakat Baru</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Buat Pengabdian Masyarakat Baru
	      </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nim" label="Nama dosen" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="nama_mahasiswa" label="Tahun" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="judul" label="Judul pengabdian masyarakat" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
	    	<TextField id="dana" label="Pemberi dana" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={3}>
	    	<TextField id="jml" label="Jumlah" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
          <FormControl variant="outlined" className={classes.formControl}>
	        <InputLabel id="asd">Posisi</InputLabel>
	        <Select
	          labelId="asd"
	          id="asdasd"
	          value={posisiDosen}
	          onChange={handleChangePosisiDosen}
	        >
	          <MenuItem value="pembimbing">Ketua tim</MenuItem>
	          <MenuItem value="co-pembimbing">Anggota tim</MenuItem>
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
			      <Button variant="outlined" color="secondary" fullWidth href="/pengabdian-masyarakat">
					Batal
				  </Button>
				</Grid>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="primary" fullWidth href="/pengabdian-masyarakat">
					Simpan
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}