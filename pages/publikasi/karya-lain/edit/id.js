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

export default function EditKaryaLain() {
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
            <Link color="inherit" href="/publikasi">
              Publikasi
            </Link>
            <Link color="inherit" href="/publikasi/karya-lain">
              Karya Lain
            </Link>
            <Typography color="textPrimary">Edit Karya Lain [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Edit Karya Lain [ID]
	      </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField id="judul" value="filled" label="Judul Karya Lain" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField id="nama" value="Handajaya Rusli" label="Nama Pengaju" variant="outlined" fullWidth disabled required />
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={5}>
	          <TextField id="penerbit" value="filled" label="Penerbit" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={3}>
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
			        />
			      </Grid>
			    </MuiPickersUtilsProvider>
	        </Grid>
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
			      <Button variant="outlined" color="secondary" fullWidth href="/publikasi/karya-lain">
					Batal
				  </Button>
				</Grid>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="primary" fullWidth href="/publikasi/karya-lain">
					Simpan
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}