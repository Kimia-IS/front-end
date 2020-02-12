import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import axios from "axios";
import { API } from "../../../config";
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllCourses } from "../../../store/actions/akademikActions";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const CreateMataKuliah = props => {
	const classes = useStyles();

	const { courses } = props;
	const listMataKuliah = courses.results;

	const [delMataKuliah, setDelMataKuliah] = React.useState("");
	const [state, setState] = React.useState();
	const [bulkFile, setBulkFile] = React.useState();

	const handleInputChange = (e) => setState({
	    ...state,
	    [e.target.name]: e.target.value
	});

	function handleChangeSelectMataKuliah(event) {
    	setDelMataKuliah(event.target.value);
  	}

  	const handleFileUpload = (e) => {
        setBulkFile(e.target.files);
    };

	const handleSubmit = async (event) => {
		event.preventDefault();
		Swal.fire({
	      title: 'Buat baru?',
	      text: 'Pastikan data sudah terisi dengan benar',
	      icon: 'warning',
	      showCancelButton: true,
	      confirmButtonText: 'Buat',
	      cancelButtonText: 'Batal',
	    }).then(async (result) => {
	      if (result.value) {
	        const payload = {
				course_id: state.kodeMataKuliah.toUpperCase(),
				course_name: state.namaMataKuliah,
				total_classes: state.jumlahKelas
			}
	        await axios.post(`${API}/academic/courses`, payload,{
					    headers: {
					      'Content-Type': 'multipart/form-data'
					    }
					})
	                    .then(() => {
	                      Swal.fire(
	                        'Tersimpan!',
	                        'Mata kuliah berhasil dibuat.',
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

	const handleDelete = async (event) => {
		event.preventDefault();
		Swal.fire({
	        title: `Hapus mata kuliah?`,
	        text: 'Mata kuliah akan dihapus secara permanen',
	        icon: 'warning',
	        showCancelButton: true,
	        confirmButtonText: 'Hapus',
	        cancelButtonText: 'Batal',
	      }).then(async (result) => {
	        if (result.value) {
	          await axios.delete(`${API}/academic/courses?id=${delMataKuliah}`)
	                      .then(() => {
	                        Swal.fire(
	                          'Berhasil!',
	                          'Mata kuliah berhasil dihapus.',
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

  return (
    <div>
	    <form onSubmit={handleSubmit}>
	      <Grid container spacing={3}>
	      	<Grid item xs={12} md={10}>
	          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
	            <Link color="inherit" href="/dashboard">
	              Dashboard
	            </Link>
	            <Link color="inherit" href="/akademik">
	              Akademik
	            </Link>
	            <Typography color="textPrimary">Buat/Hapus Mata Kuliah</Typography>
	          </Breadcrumbs>
	        </Grid>
	        <Grid item xs={12} md={2}>
		      <Button variant="outlined" fullWidth href="/akademik">
				Kembali
			  </Button>
			</Grid>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Buat Mata Kuliah
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={7}>
			          <TextField label="Kode mata kuliah" name="kodeMataKuliah" onChange={handleInputChange} variant="outlined" fullWidth required />
			        </Grid>
			        <Grid item xs={12} md={5}>
			          <TextField label="Nama mata kuliah" name="namaMataKuliah" onChange={handleInputChange} variant="outlined" fullWidth required />
			        </Grid>
	        	</Grid>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={4}>
		          <TextField label="Jumlah kelas maksimal" type="number" name="jumlahKelas" onChange={handleInputChange} variant="outlined" required fullWidth />
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={3}>
				      <Button variant="outlined" type="submit" color="primary" fullWidth>
						Simpan
					  </Button>
					</Grid>
				</Grid>
	        </Grid>
	    
	        <Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Buat Mata Kuliah dari Bulk File (.csv)
		      </Typography>
	        </Grid>
	        <Grid item xs={12}>
	        	<Grid container spacing={3}>
	        		<Grid item xs={12} md={3}>
	        		  <input
		                style={{ display: 'none' }}
		                id="raised-button-file"
		                type="file"
		                onChange={handleFileUpload}
		              />
		              <label htmlFor="raised-button-file">
		                <Button variant="outlined" fullWidth component="span">
		                  Pilih file
		                </Button>
		              </label>
	        		</Grid>
			        <Grid item xs={12} md={4}>
				      <Button variant="outlined" color="primary" fullWidth
				      	onClick={async (e) => {
				      		e.preventDefault();
				      		if (bulkFile) {
					      		const formData = new FormData();
				                formData.append('bulk_file', bulkFile[0]);
				                await axios.post(`${API}/upload/courses`, formData, {
			                              headers: {
			                                'Content-Type': 'multipart/form-data'
			                              }
			                          })
			                          .then((response) => {
			                            console.log(response);
			                            Swal.fire(
			                              'Tersimpan!',
			                              'Mata kuliah berhasil dibuat.',
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
				      		else {
				      			Swal.fire(
		                          'Oops!',
		                          'Pilih file .csv terlebih dahulu.',
		                          'warning'
		                        );
				      		}
				      	}}
				      >
						Buat Mata Kuliah dari Bulk File
					  </Button>
					</Grid>
				</Grid>
	        </Grid>

	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Hapus Mata Kuliah
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<FormControl variant="outlined" fullWidth required className={classes.formControl}>
			        <InputLabel id="demo-simple-select-label">Mata Kuliah</InputLabel>
			        <Select
			          labelId="demo-simple-select-label"
			          value={delMataKuliah}
			          onChange={handleChangeSelectMataKuliah}
			        >
			          <MenuItem value="" disabled>
			            Pilih Mata Kuliah
			          </MenuItem>
			          {listMataKuliah.map((value, index) => {
			            return <MenuItem key={index} value={value.id}>{value.course_id} - {value.course_name}</MenuItem>;
			          })}
			        </Select>
			    </FormControl>
	        </Grid>
	        <Grid item xs={12}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={3}>
				      <Button variant="outlined" onClick={handleDelete} color="secondary" fullWidth>
						Hapus
					  </Button>
					</Grid>
				</Grid>
	        </Grid>
	    
	      </Grid>
	    </form>
  	</div>
  );
}

CreateMataKuliah.getInitialProps = async ctx => {
  const { courses } = await ctx.store.dispatch(getAllCourses());
  return { courses };
};

CreateMataKuliah.propTypes = {
  courses: PropTypes.any
};

const mapStateToProps = state => ({
  courses: state.akademikReducer.courses
});

export default connect(mapStateToProps)(CreateMataKuliah);