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
import { API } from "../../../../config";
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllLecturers } from "../../../../store/actions/usersActions";
import { getJournalById } from "../../../../store/actions/jurnalActions";
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

const EditJurnal = props => {
	const classes = useStyles();

	const data = props.journal.results;
	const files = data.filepath.slice(2, -2).split("', '");
	console.log(files)
	const nameList = data.names ? data.names.split(",") : [];
	const listDosen = props.lecturers;

	/*const [count, setCount] = React.useState(2 + nameList.length);*/
	const [count, setCount] = React.useState(2);
	const [type, setType] = React.useState(data.type);
	const [nipDosen, setNipDosen] = React.useState(data.lecturer_nip);
	/*const [names, setNames] = React.useState(nameList.map((value, id) => {
		setNames({
			...names,
			[id]: value
		})
	}));*/ // Set Names failed
	const [names, setNames] = React.useState();
	const [publicationFiles, setPublicationFiles] = React.useState(files);
	const [state, setState] = React.useState({
		title: data.title,
		year: data.year,
		number: data.number,
		issue: data.issue,
		doi: data.doi,
		link: data.link,
		total_page: data.total_page,
	});

	const handleChangeState = (e) => setState({
	      ...state,
	      [e.target.name]: e.target.value
	});

	const handleChangeSelectNipDosen = event => {
        setNipDosen(event.target.value);
	};

	const handleChangeAuthor = (i, value) => {
		setNames({
			...names,
			[i]: value
		});
	};

	const handleFileUpload = (e) => {
	    setPublicationFiles(e.target.files);
	};

	const handleChangeType = event => {
		setType(event.target.value);
	};

	const handleSubmit = async (event) => {
    event.preventDefault();
    if (publicationFiles) {
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
            /*for (let i = 0; i < publicationFiles.length; i++) {
	          formData.append('publication_files', publicationFiles[i]);
	        }*/
	        let authors = []
	        if (names) {
		        for (let j = 0; j <= count - 2; j++) {
		        	authors[j] = names[j];
		        }
	        }
	        else {
	        	authors = nameList
	        }
	        console.log(authors);
	        formData.append('lecturer_nip', nipDosen);
	        formData.append('title', state.title);
	        formData.append('year', state.year);
	        formData.append('number', state.number);
	        formData.append('issue', state.issue);
	        formData.append('total_page', state.total_page);
	        formData.append('type', type);
	        formData.append('doi', state.doi);
	        formData.append('link', state.link);
	        formData.append('names', authors);
	        console.log('formData = ', formData);
	        // Uploading
            await axios.put(`${API}/publication/journal?id=${data.id}`, formData, {
                            headers: {
                              'Content-Type': 'multipart/form-data'
                            }
                        })
                        .then((response) => {
                        	console.log(response);
                          Swal.fire(
                            'Tersimpan!',
                            'Jurnal berhasil disimpan.',
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

  const handleTambahAuthor = () => {
		setCount(count => count + 1);
	};

	const handleKurangAuthor = () => {
		setCount(count => count - 1);
	};

  const addFieldAuthor = () => {
      let field = [];
      if (count >= 0) {
        for (let i = 2; i < count; i++) {
          field.push(
            <Grid item xs={12} md={8}>
              <TextField key={i} label={`Penulis ${i}`} onChange={(e) => handleChangeAuthor(i - 2, e.target.value)} variant="outlined" fullWidth required />
            </Grid>
          );
        }
      }
      return field;
  }

  const fieldListFiles = () => {
        let fieldFiles = []
        if (publicationFiles) {
          for (let p = 0; p < publicationFiles.length; p++) {
            fieldFiles.push(<span key={p}>{p + 1}. {publicationFiles[p].slice(33)}<br /></span>);
          }
        }
        return fieldFiles;
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
	            <Link color="inherit" href="/publikasi">
	              Publikasi
	            </Link>
	            <Link color="inherit" href="/publikasi/jurnal">
	              Jurnal
	            </Link>
	            <Typography color="textPrimary">Edit Jurnal</Typography>
	          </Breadcrumbs>
	        </Grid>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Edit Jurnal - {data.title}
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={8}>
		    	<TextField label="Judul jurnal" name="title" value={state.title} onChange={handleChangeState} variant="outlined" fullWidth required />
	        </Grid>
	        <Grid item xs={12} md={8}>
	          <FormControl variant="outlined" fullWidth required className={classes.formControl}>
	              <InputLabel id="demo-simple-select-label1">Penulis</InputLabel>
	              <Select
	                labelId="demo-simple-select-label1"
	                value={nipDosen}
	                onChange={handleChangeSelectNipDosen}
	              >
	                <MenuItem value="" disabled>
	                  Pilih Penulis
	                </MenuItem>
	                {listDosen.map((value, index) => {
	                  return <MenuItem key={index} value={value.user_id}>{value.user_id} - {value.name}</MenuItem>;
	                })}
	              </Select>
	            </FormControl>
	        </Grid>
	        {addFieldAuthor()}
	        <Grid item xs={12} md={5}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={6}>
			        	<Button onClick={handleTambahAuthor}>
				          + Tambah penulis
			        	</Button>
			        </Grid>
			        <Grid item xs={12} md={6}>
			        	<Button onClick={handleKurangAuthor}>
				          - Kurangi penulis
			        	</Button>
			        </Grid>
		        </Grid>
	        </Grid>
	        <Grid container item spacing={3} xs={12}>
		        <Grid item xs={12} md={3}>
		          <TextField label="Tahun" type="number" value={state.year} name="year" onChange={handleChangeState} variant="outlined" fullWidth required />
		        </Grid>
		        <Grid item xs={12} md={5}>
		          <TextField label="Nomor" name="number" value={state.number} onChange={handleChangeState} variant="outlined" fullWidth required />
		        </Grid>
	        </Grid>
	        <Grid container item spacing={3} xs={12}>
		        <Grid item xs={12} md={3}>
		          <TextField label="Issue" name="issue" value={state.issue} onChange={handleChangeState} required variant="outlined" fullWidth />
		        </Grid>
		        <Grid item xs={12} md={5}>
		          <TextField label="Halaman" type="number" value={state.total_page} name="total_page" onChange={handleChangeState} required variant="outlined" fullWidth />
		        </Grid>
	        </Grid>
	        <Grid container item spacing={3} xs={12}>
		        <Grid item xs={12} md={5}>
		          <FormControl variant="outlined" required className={classes.formControl} fullWidth>
			        <InputLabel id="asd">Jenis jurnal</InputLabel>
			        <Select
			          labelId="asd"
			          id="asdasd"
			          value={type}
			          onChange={handleChangeType}
			        >
			          <MenuItem value="Nasional">Nasional</MenuItem>
			          <MenuItem value="Nasional terakreditasi">Nasional terakreditasi</MenuItem>
			          <MenuItem value="Internasional">Internasional</MenuItem>
			          <MenuItem value="Internasional terindeks scopus">Internasional terindeks scopus</MenuItem>
			          <MenuItem value="Internasional terindeks scimago">Internasional terindeks scimago</MenuItem>
			        </Select>
			      </FormControl>
		        </Grid>
		        <Grid item xs={12} md={3}>
		          <TextField label="DOI" name="doi" value={state.doi} onChange={handleChangeState} variant="outlined" fullWidth required />
		        </Grid>
	        </Grid>
	        <Grid item xs={12} md={8}>
		    	<TextField label="Link" name="link" value={state.link} onChange={handleChangeState} variant="outlined" fullWidth required />
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
	                    <Button variant="outlined" color="secondary" fullWidth href="/publikasi/jurnal">
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

EditJurnal.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { journal } = await ctx.store.dispatch(getJournalById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    journal: journal,
    lecturers: lecturers
  }
  return data;
};

EditJurnal.propTypes = {
  journal: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  journal: state.jurnalReducer.journal,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(EditJurnal);