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

const CreateKerja = props => {
	const classes = useStyles();

	const listDosen = props.lecturers;

	const [term, setTerm] = React.useState('');
	const [jobType, setJobType] = React.useState('');
	const [state, setState] = React.useState();
	const [nipDosen, setNipDosen] = React.useState('');
	const [experienceFiles, setExperienceFiles] = React.useState();

	const handleChangeState = (e) => setState({
	      ...state,
	      [e.target.name]: e.target.value
	});

	const handleChangeSelectNipDosen = event => {
        setNipDosen(event.target.value);
	};

	const handleFileUpload = (e) => {
	    setExperienceFiles(e.target.files);
	};

	const handleChangeTerm = event => {
		setTerm(event.target.value);
	};

	const handleChangeJobType = event => {
		setJobType(event.target.value);
	};

	const handleSubmit = async (event) => {
	    event.preventDefault();
	    if (experienceFiles) {
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
	            for (let i = 0; i < experienceFiles.length; i++) {
		          formData.append('experiences_files', experienceFiles[i]);
		        }
		        formData.append('lecturer_nip', nipDosen);
		        formData.append('job_name', state.job_name);
		        formData.append('job_type', jobType);
		        formData.append('year', state.year);
		        formData.append('term', term);
		        console.log('formData = ', formData);
		        // Uploading
	            await axios.post(`${API}/experiences`, formData, {
	                            headers: {
	                              'Content-Type': 'multipart/form-data'
	                            }
	                        })
	                        .then((response) => {
	                        	console.log(response);
	                          Swal.fire(
	                            'Tersimpan!',
	                            'Pekerjaan berhasil dibuat.',
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
        if (experienceFiles) {
          for (let i = 0; i < experienceFiles.length; i++) {
            field.push(<span key={i}>{i + 1}. {experienceFiles[i].name}<br /></span>);
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
	        	<FormControl variant="outlined" fullWidth required className={classes.formControl}>
	              <InputLabel id="demo-simple-select-label1">Nama</InputLabel>
	              <Select
	                labelId="demo-simple-select-label1"
	                value={nipDosen}
	                onChange={handleChangeSelectNipDosen}
	              >
	                <MenuItem value="" disabled>
	                  Pilih
	                </MenuItem>
	                {listDosen.map((value, index) => {
	                  return <MenuItem key={index} value={value.user_id}>{value.user_id} - {value.name}</MenuItem>;
	                })}
	              </Select>
	            </FormControl>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField name="year" type="number" onChange={handleChangeState} label="Tahun" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={5}>
		    	<TextField name="job_name" onChange={handleChangeState} label="Nama pekerjaan" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={3}>
		    	<FormControl variant="outlined" className={classes.formControl}>
			        <InputLabel id="asd">Semester</InputLabel>
			        <Select
			          labelId="asd"
			          value={term}
			          onChange={handleChangeTerm}
			        >
			          <MenuItem value={1}>1 (Ganjil)</MenuItem>
			          <MenuItem value={2}>2 (Genap)</MenuItem>
			        </Select>
			      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={8}>
		    	<FormControl variant="outlined" fullWidth className={classes.formControl}>
			        <InputLabel id="asd1">Jenis Pekerjaan</InputLabel>
			        <Select
			          labelId="asd1"
			          value={jobType}
			          onChange={handleChangeJobType}
			        >
			          <MenuItem value="Rutin">Rutin</MenuItem>
			          <MenuItem value="Tidak rutin">Tidak rutin</MenuItem>
			        </Select>
			      </FormControl>
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
	                <Button variant="outlined" color="secondary" fullWidth href="/riwayat-kerja">
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

CreateKerja.getInitialProps = async ctx => {
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  return { lecturers };
};

CreateKerja.propTypes = {
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(CreateKerja);