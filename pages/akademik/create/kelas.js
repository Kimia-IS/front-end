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
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllCourses } from "../../../store/actions/akademikActions";
import { getAllLecturers } from "../../../store/actions/usersActions";
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

const CreateKelas = props => {
	const classes = useStyles();

	const listMataKuliah = props.courses.results;
	const listDosen = props.lecturers;

	const [count, setCount] = React.useState(2);
	const [jumlahKelas, setJumlahKelas] = React.useState();
	const [kelas, setKelas] = React.useState("");
	const [totalSKS, setTotalSKS] = React.useState(0);
	const [kodeMataKuliah, setKodeMataKuliah] = React.useState("");
	const [nipDosen, setNipDosen] = React.useState({
		nipDosen1: ''
	});
	const [sksDosen, setSksDosen] = React.useState({
		sksDosen1: 0
	});
	const [bulkFile, setBulkFile] = React.useState();

	const handleFileUpload = (e) => {
        setBulkFile(e.target.files);
    };

	function handleChangeSelectMataKuliah(event) {
    	setKodeMataKuliah(event.target.value);
  	}

  	function handleChangeSelectNipDosen(order, value) {
    	setNipDosen({
    		...nipDosen,
    		[`nipDosen${order}`]: value
    	});
  	}

	const handleChangeSksDosen = (e) => setSksDosen({
	    ...sksDosen,
	    [e.target.name]: e.target.value
	})

  	function handleChangeSelectKelas(event) {
    	setKelas(event.target.value);
  	}

	React.useEffect(() => {
		let sum = 0
		for (let j = 1; j <= Object.keys(sksDosen).length; j++) {
			sum = sum + parseInt(sksDosen[`sksDosen${j}`]);
		}
		setTotalSKS(sum);

		let temp = listMataKuliah.find(obj => { return obj.course_id == kodeMataKuliah });
		if (temp) { setJumlahKelas(temp.total_classes) }
	}, [sksDosen, kodeMataKuliah]);

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
	      	for (let k = 1; k <= Object.keys(sksDosen).length; k++) {
				let lecturer = `(${nipDosen['nipDosen' + k]},${sksDosen['sksDosen' + k]})`
				let payload = {
					course_id: kodeMataKuliah,
					course_class: kelas,
					total_credit: totalSKS,
					lecturer: [lecturer]
				}
		        await axios.post(`${API}/academic/lecturer`, payload)
	                    .then(() => {
	                      Swal.fire(
	                        'Tersimpan!',
	                        'Kelas berhasil dibuat.',
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
	      }
	    })
	}

	const handleTambahDosen = () => {
		setCount(count => count + 1);
	};

	const handleKurangDosen = () => {
		setCount(count => count - 1);
	};

	const fieldKelas = () => {
    	let field = [];
        for (let i = 1; i <= jumlahKelas; i++) {
          field.push(<MenuItem key={i} id={i} value={i}>{i}</MenuItem>);
        }
        return field;
	}

	const addFieldDosen = () => {
	    let field = [];
	    if (count >= 0) {
		    for (let i = 2; i < count; i++) {
		      field.push(
		        <Grid item xs={12} md={8}>
		        	<Grid container spacing={3}>
				        <Grid item xs={12} md={7}>
				          <FormControl variant="outlined" fullWidth required className={classes.formControl}>
					        <InputLabel id={`demo-simple-select-label${i}`}>Dosen {i}</InputLabel>
					        <Select
					          labelId={`demo-simple-select-label${i}`}
					          value={nipDosen[`nipDosen${i}`]}
					          onChange={event => handleChangeSelectNipDosen(i, event.target.value)}
					        >
					          <MenuItem value="" disabled>
					            Pilih Dosen {i}
					          </MenuItem>
					          {listDosen.map((value, index) => {
					            return <MenuItem key={index} value={value.user_id}>{value.user_id} - {value.name}</MenuItem>;
					          })}
					        </Select>
					      </FormControl>
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField label={`SKS dosen ${i}`} type="number" name={`sksDosen${i}`} onChange={handleChangeSksDosen} variant="outlined" fullWidth required />
				        </Grid>
		        	</Grid>
		        </Grid>
		      );
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
	            <Link color="inherit" href="/akademik">
	              Akademik
	            </Link>
	            <Typography color="textPrimary">Buat Kelas Baru</Typography>
	          </Breadcrumbs>
	        </Grid>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Buat Kelas Baru
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <FormControl variant="outlined" fullWidth required className={classes.formControl}>
		        <InputLabel id="demo-simple-select-label">Mata Kuliah</InputLabel>
		        <Select
		          labelId="demo-simple-select-label"
		          value={kodeMataKuliah}
		          onChange={handleChangeSelectMataKuliah}
		        >
		          <MenuItem value="" disabled>
		            Pilih Mata Kuliah
		          </MenuItem>
		          {listMataKuliah.map((value, index) => {
		            return <MenuItem key={index} value={value.course_id}>{value.course_id} - {value.course_name}</MenuItem>;
		          })}
		        </Select>
		      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <FormControl variant="outlined" fullWidth required className={classes.formControl}>
		        <InputLabel id="demo-simple-select-label2">Kelas</InputLabel>
		        <Select
		          labelId="demo-simple-select-label2"
		          value={kelas}
		          onChange={handleChangeSelectKelas}
		        >
		          <MenuItem value="" disabled>
		            Pilih Kelas Keberapa
		          </MenuItem>
			      {fieldKelas()}
		        </Select>
		      </FormControl>
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={7}>
			          <FormControl variant="outlined" fullWidth required className={classes.formControl}>
				        <InputLabel id="demo-simple-select-label1">Dosen 1</InputLabel>
				        <Select
				          labelId="demo-simple-select-label1"
				          value={nipDosen.nipDosen1}
				          onChange={event => handleChangeSelectNipDosen(1, event.target.value)}
				        >
				          <MenuItem value="" disabled>
				            Pilih Dosen 1
				          </MenuItem>
				          {listDosen.map((value, index) => {
				            return <MenuItem key={index} value={value.user_id}>{value.user_id} - {value.name}</MenuItem>;
				          })}
				        </Select>
				      </FormControl>
			        </Grid>
			        <Grid item xs={12} md={5}>
			          <TextField label="SKS dosen 1" type="number" name="sksDosen1" onChange={handleChangeSksDosen} variant="outlined" fullWidth required />
			        </Grid>
	        	</Grid>
	        </Grid>
	        {addFieldDosen()}
	        <Grid item xs={12} md={5}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={6}>
			        	<Button onClick={handleTambahDosen}>
				          + Tambah dosen pengajar
			        	</Button>
			        </Grid>
			        <Grid item xs={12} md={6}>
			        	<Button onClick={handleKurangDosen}>
				          - Kurangi dosen pengajar
			        	</Button>
			        </Grid>
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
		        <Grid item xs={12} md={4}>
		          <TextField label="Total SKS" name="totalSKS" value={totalSKS} variant="outlined" disabled fullWidth />
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={2}>
				      <Button variant="outlined" color="secondary" fullWidth href="/akademik">
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
	    <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Buat Kelas dari Bulk File (.csv)
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
		                              'Kelas berhasil dibuat.',
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
					Buat Kelas dari Bulk File
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
	    </form>
  	</div>
  );
}

CreateKelas.getInitialProps = async ctx => {
  const { courses } = await ctx.store.dispatch(getAllCourses());
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
  	courses: courses,
  	lecturers: lecturers
  }
  return data;
};

CreateKelas.propTypes = {
  courses: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  courses: state.akademikReducer.courses,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(CreateKelas);