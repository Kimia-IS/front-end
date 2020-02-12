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
import { getFinalTaskById } from "../../store/actions/tugasAkhirActions";
import { getAllLecturers } from "../../store/actions/usersActions";

const SeeTA = props => {
	const listDosen = props.lecturers;
	const data = props.finalTask.results;
	const namaDosen = listDosen.find(obj => { return obj.user_id == data.lecturer_nip }).name;
	const files = data.file_path.slice(2, -2).split("', '");

	const fieldListFiles = (files) => {
        let field = []
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
			        			{files[i].slice(23)}
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
	            <Link color="inherit" href="/tugas-akhir">
	              Tugas Akhir
	            </Link>
	            <Typography color="textPrimary">Lihat Tugas Akhir</Typography>
	          </Breadcrumbs>
	        </Grid>
	      	<Grid item xs={12}>
	          <Typography variant="h4" gutterBottom>
		        Tugas Akhir - {data.title}
		      </Typography>
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField label="NIM" value={data.student_nim} variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField label="Nama mahasiswa" value={data.student_name} variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={3}>
		      <TextField label="Tipe mahasiswa" value={data.student_type} variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField label="Dosen pembimbing" value={namaDosen} variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={3}>
	          <TextField label="Posisi dosen" value={data.lecturer_position} variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={5}>
	          <TextField label="Judul tugas akhir" value={data.title} variant="outlined" fullWidth disabled />
	        </Grid>
	        <Grid item xs={12} md={8}>
	        	<Grid container spacing={3}>
			        <Grid item xs={12} md={6}>
			        	<TextField label="Tanggal mulai" value={data.starting_date.slice(0, 16)} variant="outlined" fullWidth disabled />
			        </Grid>
			        <Grid item xs={12} md={6}>
			        	<TextField label="Tanggal lulus" value={data.graduation_date.slice(0, 16)} variant="outlined" fullWidth disabled />
			        </Grid>
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
	  			      <Button variant="outlined" color="secondary" fullWidth href="/tugas-akhir">
      					Kembali
    				  </Button>
    				</Grid>
    			</Grid>
			</Grid>
        </Grid>
  	</div>
  );
}

SeeTA.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { finalTask } = await ctx.store.dispatch(getFinalTaskById(id));
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    finalTask: finalTask,
    lecturers: lecturers
  }
  return data;
};

SeeTA.propTypes = {
  finalTask: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  finalTask: state.tugasAkhirReducer.finalTask,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(SeeTA);