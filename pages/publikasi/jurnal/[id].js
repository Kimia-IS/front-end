import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { API } from "../../../config";
import { getJournalById } from "../../../store/actions/jurnalActions";
import { getAllLecturers } from "../../../store/actions/usersActions";

const SeeJurnal = props => {
  const listDosen = props.lecturers;
  const data = props.journal.results;
  console.log(props)
  const namaDosen = listDosen.find(obj => { return obj.user_id == data.lecturer_nip }).name;
  const files = data.filepath.slice(2, -2).split("', '");
  const names = data.names.split(",");

  const fieldListAuthor = (names) => {
  	let field = [];
  	if (names) {
  		for (let i = 0; i < names.length; i++) {
	        field.push(
	            <Grid item xs={12} md={8}>
		          <TextField label={`Penulis ${i + 2}`} value={names[i]} variant="outlined" fullWidth disabled />
		        </Grid>
	        );
	    }
  	}
  	return field;
  }

  const fieldListFiles = (files) => {
    let field = [];
    if (files) {
      for (let i = 0; i < files.length; i++) {
        field.push(
          <Grid container spacing={3} key={i}>
            <Grid item xs={4} md={3}>
              <Button variant="outlined" fullWidth target="_blank" href={`${API}/${files[i]}`}>
                Lihat file {i + 1}
            </Button>
            </Grid>
            <Grid item xs={8} md={9}>
              <Typography variant="subtitle1" gutterBottom>
                {files[i].slice(33)}
              </Typography>
            </Grid>
          </Grid>
        );
      }
    }
    return (
      <Grid item xs={12}>
        {field}
      </Grid>
    );
  }

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
            <Link color="inherit" href="/publikasi/jurnal">
              Jurnal
            </Link>
            <Typography color="textPrimary">Lihat Jurnal</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	      	Jurnal - {data.title}
	      </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField value={data.title} label="Judul jurnal" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField value={namaDosen} label="Penulis 1" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField value={data.year} label="Tahun" variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField value={data.number} label="Nomor" variant="outlined" fullWidth disabled />
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField value={data.issue} label="Issue" variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField value={data.total_page} label="Halaman" variant="outlined" fullWidth disabled />
	        </Grid>
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={5}>
	        	<TextField value={data.type} label="Jenis Jurnal" variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField value={data.doi} label="DOI" variant="outlined" fullWidth disabled />
	        </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
	    	<TextField value={data.link} label="Link" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h5" gutterBottom>
                  List files
              </Typography>
            </Grid>
                {fieldListFiles(files)}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Button variant="outlined" color="secondary" fullWidth href="/publikasi/jurnal">
                Kembali
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  	</div>
  );
}

SeeJurnal.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { journal } = await ctx.store.dispatch(getJournalById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    journal: journal,
    lecturers: lecturers
  }
  return data;
};

SeeJurnal.propTypes = {
  journal: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  journal: state.jurnalReducer.journal,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(SeeJurnal);