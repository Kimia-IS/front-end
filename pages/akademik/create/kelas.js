import React from 'react';
import { useRouter } from 'next/router';
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
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { createClass } from "../../../store/actions/akademikActions";
import axios from "axios";
import { API } from "../../../config";

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

const CreateAkademik = props => {
	const classes = useStyles();
	const router = useRouter();

	const listMataKuliah = [
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
	];

	const jumlahKelas = 3;

	const [count, setCount] = React.useState(2);	// Pahami lagi perilaku 'count' (lifecycle)
	const [inputDosen2, setInputDosen2] = React.useState();
	const [inputDosen3, setInputDosen3] = React.useState();
	const [totalSKS, setTotalSKS] = React.useState(0);
	const [kodeMataKuliah, setKodeMataKuliah] = React.useState("");
	const [kelas, setKelas] = React.useState("");
	const [state, setState] = React.useState({
		nipDosen1: '18217038',
		sksDosen1: 0,
		sksDosen2: 0,
		sksDosen3: 0
	});

	const handleInputChange = (e) => setState({
	    ...state,
	    [e.target.name]: e.target.value
	})

	function handleChangeSelectMataKuliah(event) {
    	setKodeMataKuliah(event.target.value);
  	}

  	function handleChangeSelectKelas(event) {
    	setKelas(event.target.value);
  	}

	React.useEffect(() => {
	   setTotalSKS(parseInt(state.sksDosen1) + parseInt(state.sksDosen2) + parseInt(state.sksDosen3))
	}, [state]);

	const handleSubmit = async (event) => {
		event.preventDefault();
		let payload = {
			course_id: kodeMataKuliah,
			course_class: kelas,
			lecturer: [
				`(${state.nipDosen1},${state.sksDosen1})`
			]
		}
		const result = await axios.post(`${API}/academic/lecturer`, payload)
                        .then(response => {
                          console.log(response);
                        })
                        .catch(error => {
                          console.log(error);
                        });
		  console.log(result)
		const results = createClass(payload);
		console.log('Submitted! State: ', state);
		console.log('Results: ', results);
		/*if (results) {
			router.push('/akademik');
		}*/
	}

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
				          <TextField label="NIP dosen 2" name="nipDosen2" onChange={handleInputChange} variant="outlined" fullWidth required />
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField label="SKS dosen 2" type="number" name="sksDosen2" onChange={handleInputChange} variant="outlined" fullWidth required />
				        </Grid>
		        	</Grid>
		        </Grid>
			);
		}
	};

	const addFieldDosen3 = () => {
		if (inputDosen3) {
			return (
				<Grid item xs={12} md={8}>
		        	<Grid container spacing={3}>
				        <Grid item xs={12} md={7}>
				          <TextField label="NIP dosen 3" name="nipDosen3" onChange={handleInputChange} variant="outlined" fullWidth required />
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField label="SKS dosen 3" type="number" name="sksDosen3" onChange={handleInputChange} variant="outlined" fullWidth required />
				        </Grid>
		        	</Grid>
		        </Grid>
			);
		}
	};

	const fieldKelas = () => {
    	let field = [];
        for (let i = 1; i < jumlahKelas; i++) {
          field.push(<MenuItem key={i} id={i} value={i}>{i}</MenuItem>);
          console.log(field);
        }
        return field;
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
				          <TextField id={"dosen_" + i} label={"NIP dosen " + i} variant="outlined" required fullWidth />
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
			          <TextField label="NIP dosen 1" name="nipDosen1" value={state.nipDosen1} variant="outlined" disabled fullWidth />
			        </Grid>
			        <Grid item xs={12} md={5}>
			          <TextField label="SKS dosen 1" type="number" name="sksDosen1" onChange={handleInputChange} variant="outlined" fullWidth required />
			        </Grid>
	        	</Grid>
	        </Grid>
	        {addFieldDosen2()}
	        {addFieldDosen3()}
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
	      </Grid>
	    </form>
  	</div>
  );
}

CreateAkademik.getInitialProps = ctx => {};

//const mapStateToProps = state => ();

export default connect(null, { createClass })(CreateAkademik);