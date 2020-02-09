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
import { getOtherById } from "../../../store/actions/karyaActions";
import { getAllLecturers } from "../../../store/actions/usersActions";

const SeeKarya = props => {
  const listDosen = props.lecturers;
  const data = props.other.results;
  console.log(props)
  const namaDosen = listDosen.find(obj => { return obj.user_id == data.lecturer_nip }).name;
  const files = data.filepath.slice(2, -2).split("', '");

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
                {files[i].slice(31)}
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
            <Link color="inherit" href="/publikasi/karya-lain">
              Karya Lain
            </Link>
            <Typography color="textPrimary">Lihat Karya Lain</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Karya Lain - {data.title}
	      </Typography>
        </Grid>
        <Grid item xs={12} md={8}>
  	    	<TextField value={data.title} label="Judul Karya Lain" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField value={namaDosen} label="Penulis" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid container item spacing={3} xs={12}>
	        <Grid item xs={12} md={3}>
	          <TextField value={data.year} label="Tahun" variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={5}>
	        	<TextField value={data.publisher} label="Penerbit" variant="outlined" fullWidth disabled />
	        </Grid>
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
              <Button variant="outlined" color="secondary" fullWidth href="/publikasi/karya-lain">
                Kembali
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  	</div>
  );
}

SeeKarya.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { other } = await ctx.store.dispatch(getOtherById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    other: other,
    lecturers: lecturers
  }
  return data;
};

SeeKarya.propTypes = {
  other: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  other: state.karyaReducer.other,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(SeeKarya);