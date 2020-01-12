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

export default function LihatTA() {
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
			)
		}
	}

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
			)
		}
	}

  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/tugas-akhir">
              Tugas Akhir
            </Link>
            <Typography color="textPrimary">TA [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Tugas Akhir [ID]
	      </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="nim" label="NIM" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nama_mahasiswa" label="Nama mahasiswa" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={8}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={5}>
		          <TextField id="tipe" label="Tipe mahasiswa" variant="outlined" fullWidth required disabled />
		        </Grid>
		        <Grid item xs={12} md={7}>
		          <TextField id="dosen_1" label="Nama dosen pembimbing" value="Handajaya Rusli" variant="outlined" disabled fullWidth />
		        </Grid>
        	</Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="posisi" label="Posisi dosen" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="judul_ta" label="Judul tugas akhir" variant="outlined" fullWidth required disabled />
        </Grid>
        <Grid item xs={12} md={8}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={6}>
		          	<MuiPickersUtilsProvider utils={DateFnsUtils}>
				      <Grid container justify="space-around">
				        <KeyboardDatePicker
				          disableToolbar
				          variant="inline"
				          format="MM/dd/yyyy"
				          margin="normal"
				          id="date-picker-inline"
				          label="Tanggal masuk"
				          value={selectedDate}
				          onChange={handleDateChange}
				          KeyboardButtonProps={{
				            'aria-label': 'change date',
				          }}
				          fullWidth
				           disabled
				        />
				      </Grid>
				    </MuiPickersUtilsProvider>
		        </Grid>
		        <Grid item xs={12} md={6}>
		          	<MuiPickersUtilsProvider utils={DateFnsUtils}>
				      <Grid container justify="space-around">
				        <KeyboardDatePicker
				          disableToolbar
				          variant="inline"
				          format="MM/dd/yyyy"
				          margin="normal"
				          id="date-picker-inline"
				          label="Tanggal lulus"
				          value={selectedDate}
				          onChange={handleDateChange}
				          KeyboardButtonProps={{
				            'aria-label': 'change date',
				          }}
				          fullWidth
				           disabled
				        />
				      </Grid>
				    </MuiPickersUtilsProvider>
		        </Grid>
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
			      <Button variant="outlined" color="secondary" fullWidth href="/tugas-akhir">
					Kembali
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}