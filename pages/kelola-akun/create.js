import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import FormHelperText from '@material-ui/core/FormHelperText';
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

	/*const addFieldDosen = () => {
		console.log('addFieldDosen')
		console.log('state = ' + count)
	    let field = [];

	    if (count >= 3) {
	    	handleClickOpen;
	    	{() => {setOpen(true); console.log(open);}} // ga dijalanin
	    	console.log('setOpen = ' + open)
	    } else {
		    for (let i = 2; i < count; i++) {
		      field.push(
		      	<Grid item xs={12} md={8}>
		        	<Grid container spacing={3}>
				      	<Grid item xs={12} md={7}>
				          <TextField id={"dosen_" + i} label={"Nama dosen " + i} variant="outlined" required fullWidth />
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField id={"sks_dosen_" + i} label={"SKS dosen " + i} variant="outlined" fullWidth required />
				        </Grid>
			        </Grid>
		        </Grid>
		      );
		    }
	    }

	    return field;
	 }*/

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
            <Typography color="textPrimary">Buat Akun Baru</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Buat Akun Baru
	      </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="kode_matkul" label="Nama" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nama_matkul" label="NIP / ID" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="kode_matkul" label="Email" variant="outlined" fullWidth required />
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
					Buat
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}