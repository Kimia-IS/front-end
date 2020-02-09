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
import { API } from "../../../config";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllLecturers } from "../../../store/actions/usersActions";
import { getSocresById } from "../../../store/actions/pengmasActions";
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

const EditPengmas = props => {
	const classes = useStyles();

	const listDosen = props.lecturers;
	const data = props.socres.results;
	const files = data.filepath.slice(2, -2).split("', '");
	console.log(files)

	const [state, setState] = React.useState({
		title: data.title,
		year: data.year,
		investor: data.investor,
		position: data.position,
		amount: data.amount,
		other_parties: data.other_parties,
	});
	const [nipDosen, setNipDosen] = React.useState(data.lecturer_nip);
	const [socresFiles, setSocresFiles] = React.useState(files);

	const handleChangeState = (e) => setState({
	      ...state,
	      [e.target.name]: e.target.value
	});

	const handleChangeSelectNipDosen = event => {
        setNipDosen(event.target.value);
	};

	const handleFileUpload = (e) => {
	    setSocresFiles(e.target.files);
	};

	const handleSubmit = async (event) => {
	    event.preventDefault();
	    if (socresFiles) {
	      Swal.fire({
	          title: 'Simpan perubahan?',
	          text: 'Pastikan data sudah terisi dengan benar',
	          icon: 'warning',
	          showCancelButton: true,
	          confirmButtonText: 'Simpan',
	          cancelButtonText: 'Batal',
	        }).then(async (result) => {
	          if (result.value) {
	            // Create form data
	            const formData = new FormData();
	            /*for (let i = 0; i < socresFiles.length; i++) {
		          formData.append('socres_files', socresFiles[i]);
		        }*/
		        formData.append('lecturer_nip', nipDosen);
		        formData.append('title', state.title);
		        formData.append('year', state.year);
		        formData.append('position', state.position);
		        formData.append('investor', state.investor);
		        formData.append('amount', state.amount);
		        formData.append('other_parties', state.other_parties);
		        console.log('formData = ', formData);
		        // Uploading
	            await axios.put(`${API}/socres?id=${data.id}`, formData, {
	                            headers: {
	                              'Content-Type': 'multipart/form-data'
	                            }
	                        })
	                        .then((response) => {
	                        	console.log(response);
	                          Swal.fire(
	                            'Tersimpan!',
	                            'Pengmas berhasil disimpan.',
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
        if (socresFiles) {
          for (let i = 0; i < socresFiles.length; i++) {
            field.push(<span key={i}>{i + 1}. {socresFiles[i].slice(32)}<br /></span>);
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
	            <Link color="inherit" href="/pengabdian-masyarakat">
	              Pengabdian Masyarakat
	            </Link>
	            <Typography color="textPrimary">Edit Pengabdian Masyarakat</Typography>
	          </Breadcrumbs>
	        </Grid>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Edit Pengabdian Mayarakat - {data.title}
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
	                  Pilih Pengaju
	                </MenuItem>
	                {listDosen.map((value, index) => {
	                  return <MenuItem key={index} value={value.user_id}>{value.user_id} - {value.name}</MenuItem>;
	                })}
	              </Select>
	            </FormControl>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField name="year" type="number" value={state.year} onChange={handleChangeState} label="Tahun" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={8}>
		    	<TextField name="title" value={state.title} onChange={handleChangeState} label="Judul pengabdian masyarakat" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={5}>
		    	<TextField name="investor" value={state.investor} onChange={handleChangeState} label="Pemberi dana" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={3}>
		    	<TextField name="amount" value={state.amount} type="number" onChange={handleChangeState} label="Jumlah (Rp)" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={5}>
	        	<TextField name="position" value={state.position} onChange={handleChangeState} label="Posisi" variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={3}>
	        	<TextField name="other_parties" value={state.other_parties} onChange={handleChangeState} label="Pihak lain" variant="outlined" fullWidth required />
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
		              Note: Jika upload file baru, file lama akan terhapus<br />
	                {fieldListFiles()}
	            </Typography>
	            </Grid>
	          </Grid>
	        </Grid>
	        <Grid item xs={12}>
	          <Grid container spacing={3}>
	            <Grid item xs={12} md={2}>
	                <Button variant="outlined" color="secondary" fullWidth href="/pengabdian-masyarakat">
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

EditPengmas.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { socres } = await ctx.store.dispatch(getSocresById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    socres: socres,
    lecturers: lecturers
  }
  return data;
};

EditPengmas.propTypes = {
  socres: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  socres: state.pengmasReducer.socres,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(EditPengmas);