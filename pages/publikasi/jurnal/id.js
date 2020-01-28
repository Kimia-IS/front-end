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

export default function LihatJurnal() {
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
		          <TextField id="penulis_2" label="Penulis 2" variant="outlined" fullWidth />
		        </Grid>
			);
		}
	};

	const addFieldDosen3 = () => {
		if (inputDosen3) {
			return (
				<Grid item xs={12} md={8}>
		          <TextField id="penulis_3" label="Penulis 3" variant="outlined" fullWidth />
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
            <Link color="inherit" href="/publikasi">
              Publikasi
            </Link>
            <Link color="inherit" href="/publikasi/jurnal">
              Jurnal
            </Link>
            <Typography color="textPrimary">Jurnal [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	      	Jurnal [ID]
	      </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="judul" label="Judul jurnal" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="penulis_1" label="Penulis 1" variant="outlined" fullWidth required />
        </Grid>
        {addFieldDosen2()}
        {addFieldDosen3()}
        <Grid item xs={12} md={5}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={6}>
		        	<Button onClick={handleTambahDosen}>
			          + Tambah penulis
		        	</Button>
		        </Grid>
		        <Grid item xs={12} md={6}>
		        	<Button onClick={handleKurangDosen}>
			          - Kurangi penulis
		        	</Button>
		        </Grid>
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField id="tahun" label="Tahun" variant="outlined" fullWidth disabled required />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField id="nomor" label="Nomor" variant="outlined" fullWidth disabled required />
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField id="issue" label="Issue" variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField id="halaman" label="Halaman" variant="outlined" fullWidth disabled />
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={5}>
	        	<TextField id="jenis" value="filled" label="Jenis Jurnal" variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField id="doi" label="DOI" variant="outlined" fullWidth disabled />
	        </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="link" label="Link" variant="outlined" fullWidth disabled required />
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
			      <Button variant="outlined" color="secondary" fullWidth href="/publikasi/jurnal">
					Kembali
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}