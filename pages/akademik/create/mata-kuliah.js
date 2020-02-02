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

const CreateMataKuliah = props => {
	const classes = useStyles();

	const { courses } = props;
	const listMataKuliah = courses.results;

	/*const listMataKuliah = [
		{
			course_id: 'II1234',
			course_name: 'Kimia Asli'
		},
		{
			course_id: 'II4312',
			course_name: 'Rekayasa Kimia'
		},
		{
			course_id: 'II1242',
			course_name: 'Kimia STI'
		},
	];*/



	const [delKodeMataKuliah, setDelKodeMataKuliah] = React.useState("");
	const [state, setState] = React.useState();

	const handleInputChange = (e) => setState({
	    ...state,
	    [e.target.name]: e.target.value
	})

	React.useEffect(() => {
	   console.log('hehe')
	}, [state]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		let payload = {
			course_id: state.kodeMataKuliah.toUpperCase(),
			course_name: state.namaMataKuliah,
			total_classes: state.jumlahKelas,
			total_credit: 3  // DUMMY
		}
		const result = await axios.post(`${API}/academic/courses`, payload)
                        .then(response => {
                          console.log(response);
                        })
                        .catch(error => {
                          console.log(error);
                        });
		console.log(result);
		//const results = createClass(payload);
		console.log('Submitted! State: ', state);
		//console.log('Results: ', results);
		/*if (results) {
			router.push('/akademik');
		}*/
	}

	const handleDelete = async (event) => {
		event.preventDefault();
		console.log(delKodeMataKuliah, ' deleted!');
		const result = await axios.delete(`${API}/academic/courses?${delKodeMataKuliah}`)
                        .then(response => {
                          console.log(response);
                        })
                        .catch(error => {
                          console.log(error);
                        });
		console.log(result);
	}

	function handleChangeSelectMataKuliah(event) {
    	setDelKodeMataKuliah(event.target.value);
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
		      <Button variant="outlined" color="secondary" fullWidth href="/akademik">
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
		        Hapus Mata Kuliah
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<FormControl variant="outlined" fullWidth required className={classes.formControl}>
			        <InputLabel id="demo-simple-select-label">Mata Kuliah</InputLabel>
			        <Select
			          labelId="demo-simple-select-label"
			          value={delKodeMataKuliah}
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
	        <Grid item xs={12}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={3}>
				      <Button variant="outlined" onClick={handleDelete} color="primary" fullWidth>
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
  console.log(courses);
  return { courses };
};

CreateMataKuliah.propTypes = {
  courses: PropTypes.any
};

const mapStateToProps = state => ({
  courses: state.akademikReducer.courses
});

export default connect(mapStateToProps)(CreateMataKuliah);