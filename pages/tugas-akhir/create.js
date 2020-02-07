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
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import axios from "axios";
import { API } from "../../config";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateTA = props => {
	const classes = useStyles();

	const listDosen = props.lecturers;

	const [tipeMahasiswa, setTipeMahasiswa] = React.useState('');
	const [nipDosen, setNipDosen] = React.useState('');
	const [posisiDosen, setPosisiDosen] = React.useState('');
	const [tanggalMasuk, setTanggalMasuk] = React.useState(new Date());
	const [tanggalLulus, setTanggalLulus] = React.useState(new Date());
	const [finalTaskFiles, setFinalTaskFiles] = React.useState();
	const [state, setState] = React.useState();

	const handleChangeState = (e) => setState({
	    ...state,
	    [e.target.name]: e.target.value
	});

	const handleDateChangeMasuk = date => {
	    setTanggalMasuk(date);
	};

	const handleDateChangeLulus = date => {
	    setTanggalLulus(date);
	};

	const handleChangeTipeMahasiswa = event => {
		setTipeMahasiswa(event.target.value);
	};

	const handleChangeSelectNipDosen = event => {
    	setNipDosen(event.target.value);
  	};

	const handleChangePosisiDosen = event => {
		setPosisiDosen(event.target.value);
	};

	const handleFileUpload = (e) => {
		setFinalTaskFiles(e.target.files);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		if (finalTaskFiles) {
			Swal.fire({
		      title: 'Buat baru?',
		      text: 'Pastikan data sudah terisi dengan benar',
		      icon: 'warning',
		      showCancelButton: true,
		      confirmButtonText: 'Buat',
		      cancelButtonText: 'Batal',
		    }).then(async (result) => {
		      if (result.value) {
		      	// Create form data
		      	const formData = new FormData();
		      	for (let i = 0; i < finalTaskFiles.length; i++) {
					formData.append('final_task_file', finalTaskFiles[i]);
				}
				formData.append('student_name', state.student_name);
				formData.append('student_nim', state.student_nim);
				formData.append('student_type', tipeMahasiswa);
				formData.append('title', state.title);
				formData.append('starting_date', tanggalMasuk.toJSON().slice(0, 10));
				formData.append('graduation_date', tanggalLulus.toJSON().slice(0, 10));
				formData.append('lecturer_nip', nipDosen);
				formData.append('lecturer_position', posisiDosen);
				// Uploading
		        await axios.post(`${API}/finalTask`, formData, {
						    headers: {
						      'Content-Type': 'multipart/form-data'
						    }
						})
	                    .then((response) => {
	                      console.log(response);
	                      Swal.fire(
	                        'Tersimpan!',
	                        'Tugas akhir berhasil dibuat.',
	                        'success'
	                      );
	                    })
	                    .catch(error => {
	                      Swal.fire(
	                        'Gagal!',
	                        error,
	                        'error'
	                      );
	                    });
		      }
		    })
		}
		else {
			Swal.fire(
	            'Oops!',
	            'Wajib upload minimal 1 file.',
	            'warning'
	        );
		}
	}

	const fieldListFiles = () => {
        let field = []
        if (finalTaskFiles) {
        	for (let i = 0; i < finalTaskFiles.length; i++) {
        		field.push(<span key={i}>{i + 1}. {finalTaskFiles[i].name}<br /></span>);
        	}
        }
        return field;
	}

  return (
    <div>
    	<form onSubmit={handleSubmit}>
	      <Grid container spacing={3}>
	      	<Grid item xs={12}>
	          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
	            <Link color="inherit" href="/dashboard">
	              Dashboard
	            </Link>
	            <Link color="inherit" href="/tugas-akhir">
	              Tugas Akhir
	            </Link>
	            <Typography color="textPrimary">Buat Tugas Akhir Baru</Typography>
	          </Breadcrumbs>
	        </Grid>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Buat Tugas Akhir Baru
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField label="NIM" name="student_nim" type="number" onChange={handleChangeState} variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField label="Nama mahasiswa" name="student_name" onChange={handleChangeState} variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <FormControl variant="outlined" required className={classes.formControl}>
		        <InputLabel id="tipe">Tipe mahasiswa</InputLabel>
		        <Select
		          labelId="tipe"
		          value={tipeMahasiswa}
		          onChange={handleChangeTipeMahasiswa}
		        >
			      <MenuItem value="" disabled>
		            Pilih Tipe Mahasiswa
		          </MenuItem>
		          <MenuItem value="Dalam">Dalam</MenuItem>
		          <MenuItem value="Luar">Luar</MenuItem>
		        </Select>
		      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <FormControl variant="outlined" fullWidth required className={classes.formControl}>
		        <InputLabel id="demo-simple-select-label1">Dosen pembimbing</InputLabel>
		        <Select
		          labelId="demo-simple-select-label1"
		          value={nipDosen}
		          onChange={handleChangeSelectNipDosen}
		        >
		          <MenuItem value="" disabled>
		            Pilih Dosen
		          </MenuItem>
		          {listDosen.map((value, index) => {
		            return <MenuItem key={index} value={value.user_id}>{value.user_id} - {value.name}</MenuItem>;
		          })}
		        </Select>
		      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <FormControl variant="outlined" required className={classes.formControl}>
		        <InputLabel id="asd">Posisi dosen</InputLabel>
		        <Select
		          labelId="asd"
		          value={posisiDosen}
		          onChange={handleChangePosisiDosen}
		        >
		          <MenuItem value="" disabled>
		            Pilih Posisi Dosen
		          </MenuItem>
		          <MenuItem value="Pembimbing">Pembimbing</MenuItem>
		          <MenuItem value="Co-pembimbing">Co-pembimbing</MenuItem>
		          <MenuItem value="Penguji">Penguji</MenuItem>
		        </Select>
		      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField label="Judul tugas akhir" name="title" onChange={handleChangeState} variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={6}>
			          	<MuiPickersUtilsProvider utils={DateFnsUtils}>
					      <Grid container justify="space-around">
					        <KeyboardDatePicker
					          variant="inline"
					          inputVariant="outlined"
					          required
					          format="dd/MM/yyyy"
					          margin="normal"
					          id="date-picker-inline1"
					          label="Tanggal mulai"
					          value={tanggalMasuk}
					          onChange={handleDateChangeMasuk}
					          KeyboardButtonProps={{
					            'aria-label': 'change date',
					          }}
					          fullWidth
					        />
					      </Grid>
					    </MuiPickersUtilsProvider>
			        </Grid>
			        <Grid item xs={12} md={6}>
			          	<MuiPickersUtilsProvider utils={DateFnsUtils}>
					      <Grid container justify="space-around">
					        <KeyboardDatePicker
					          variant="inline"
					          inputVariant="outlined"
					          required
					          format="dd/MM/yyyy"
					          margin="normal"
					          id="date-picker-inline2"
					          label="Tanggal lulus"
					          value={tanggalLulus}
					          onChange={handleDateChangeLulus}
					          KeyboardButtonProps={{
					            'aria-label': 'change date',
					          }}
					          fullWidth
					        />
					      </Grid>
					    </MuiPickersUtilsProvider>
			        </Grid>
		        </Grid>
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={4}>
			        	<input
						  style={{ display: 'none' }}
						  id="raised-button-file"
						  multiple
						  type="file"
						  onChange={handleFileUpload}
						/>
						<label htmlFor="raised-button-file">
						  <Button variant="outlined" fullWidth component="span">
						    Upload file
						  </Button>
						</label> 
			        </Grid>
			        <Grid item xs={12} md={8}>
			        	<Typography variant="subtitle1" gutterBottom>
				        	{fieldListFiles()}
					    </Typography>
			        </Grid>
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={2}>
				      <Button variant="outlined" color="secondary" fullWidth href="/tugas-akhir">
						Batal
					  </Button>
					</Grid>
			        <Grid item xs={12} md={3}>
				      <Button variant="outlined" type="submit" color="primary" fullWidth>
						Simpan
					  </Button>
					</Grid>
				</Grid>
	        </Grid>
	      </Grid>
      </form>
  	</div>
  );
}

CreateTA.getInitialProps = async ctx => {
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  return { lecturers };
};

CreateTA.propTypes = {
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(CreateTA);