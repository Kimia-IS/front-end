import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

export default function LihatTA() {
	const [selectedDate, setSelectedDate] = React.useState(new Date('2020-01-01T21:11:54'));

	const handleDateChange = date => {
	    setSelectedDate(date);
	};

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
            <Typography color="textPrimary">Tugas Akhir [ID]</Typography>
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