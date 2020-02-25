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
import { API } from "../../config";
import { getSocresById } from "../../store/actions/pengmasActions";
import { getAllLecturers } from "../../store/actions/usersActions";

const SeePaten = props => {
  const listDosen = props.lecturers;
  const data = props.socres.results;
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
              <Button variant="outlined" fullWidth target="_blank" href={`${API}/download?filepath=${files[i]}`}>
                Lihat file {i + 1}
            </Button>
            </Grid>
            <Grid item xs={8} md={9}>
              <Typography variant="subtitle1" gutterBottom>
                {files[i].slice(19)}
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
            <Link color="inherit" href="/pengabdian-masyarakat">
              Pengabdian Masyarakat
            </Link>
            <Typography color="textPrimary">Lihat Pengabdian Masyarakat</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
  	        Pengabdian Masyarakat - {data.title}
  	      </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField value={namaDosen} label="Nama" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField value={data.year} label="Tahun" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField value={data.title} label="Judul pengabdian masyarakat" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField value={data.investor} label="Pemberi dana" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField value={data.amount} label="Jumlah (Rp)" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField value={data.position} label="Posisi" variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField value={data.other_parties} label="Pihak lain" variant="outlined" fullWidth disabled />
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
              <Button variant="outlined" color="secondary" fullWidth href="/pengabdian-masyarakat">
                Kembali
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  	</div>
  );
}

SeePaten.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { socres } = await ctx.store.dispatch(getSocresById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    socres: socres,
    lecturers: lecturers
  }
  return data;
};

SeePaten.propTypes = {
  socres: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  socres: state.pengmasReducer.socres,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(SeePaten);