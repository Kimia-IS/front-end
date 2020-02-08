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
import { getResearchById } from "../../store/actions/penelitianActions";
import { getAllLecturers } from "../../store/actions/usersActions";

const SeePenelitian = props => {
  console.log(props);
  const listDosen = props.lecturers;
  const data = props.research.results;
  console.log(data)
  const namaDosen = listDosen.find(obj => { return obj.user_id == data.lecturer_nip }).name;
  console.log(namaDosen)
  const files = data.filepath.slice(2, -2).split("', '");

  const fieldListFiles = (files) => {
        let field = []
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
                    {files[i].slice(21)}
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
            <Link color="inherit" href="/penelitian">
              Penelitian
            </Link>
            <Typography color="textPrimary">Lihat Penelitian</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
  	        Penelitian - {data.title}
  	      </Typography>
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField label="Nama dosen" value={namaDosen} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Tahun" value={data.year} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={8}>
          <TextField label="Judul penelitian" value={data.title} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField label="Pemberi dana" value={data.investor} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField label="Jumlah" value={`Rp ${data.amount}`} variant="outlined" fullWidth disabled />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField label="Posisi" value={data.position} variant="outlined" fullWidth disabled />
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
              <Button variant="outlined" color="secondary" fullWidth href="/penelitian">
                Kembali
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
  	</div>
  );
}

SeePenelitian.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { research } = await ctx.store.dispatch(getResearchById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    research: research,
    lecturers: lecturers
  }
  return data;
};

SeePenelitian.propTypes = {
  research: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  research: state.penelitianReducer.research,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(SeePenelitian);