import React from 'react';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { API } from "../../config";
import { getProfileById } from "../../store/actions/usersActions";

const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  table: {
    minWidth: 650,
    //margin: 30
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const SeePrestasi = props => {
	const data = props.profile;
	console.log('finalTask  = ', data.finalTask.message)
	const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/profil">
              Profil
            </Link>
            <Typography color="textPrimary">Lihat Profil</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Profil - {data.profile.results.nip}
	      </Typography>
        </Grid>
        <Grid item xs={12}>
          <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel1a-content"
	          id="panel1a-header"
	        >
	          <Typography variant="h6" className={classes.heading}>Info Umum</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
		        <Grid container spacing={3} xs={12}>
		        	<Grid item xs={12} md={6}>
		        		<TextField value={data.profile.results.name} label="Nama" variant="outlined" fullWidth disabled />
		        	</Grid>
		        	<Grid item xs={12} md={6}>
		        		<TextField value={data.profile.results.nip} label="NIP" variant="outlined" fullWidth disabled />
		        	</Grid>
		        	<Grid item xs={12} md={6}>
		        		<TextField value={data.profile.results.email} label="Email" variant="outlined" fullWidth disabled />
		        	</Grid>
		        	<Grid item xs={12} md={6}>
		        		<TextField value={data.profile.results.role} label="Role" variant="outlined" fullWidth disabled />
		        	</Grid>
		        </Grid>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Akademik</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Mata Kuliah</TableCell>
		            <TableCell>Kelas</TableCell>
		            <TableCell>Dosen</TableCell>
		            <TableCell>SKS Dosen</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {data.academic.results ? data.academic.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.course_id} - {value.course_name}</TableCell>
		              <TableCell>{value.class}</TableCell>
		              <TableCell>{value['lecturer(s)']}</TableCell>
		              <TableCell>{value.lecturer_credit}</TableCell>
		            </TableRow>
		          )) : <TableCell>Tidak ada data</TableCell>}
		        </TableBody>
		      </Table>
		    </TableContainer>
	      </ExpansionPanel>
	      {/*<TableCell>
          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/akademik/${value.id}`}>
          		Lihat
          	</Button>
          </TableCell>*/}
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Tugas Akhir</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul Tugas Akhir</TableCell>
		            <TableCell>Nama Mahasiswa</TableCell>
		            <TableCell>NIP Dosen Pembimbing</TableCell>
		            <TableCell>Tanggal Mulai</TableCell>
		            <TableCell>Tanggal Lulus</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {data.finalTask.results ? data.finalTask.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.student_name}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.starting_date}</TableCell>
		              <TableCell>{value.graduation_date}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/tugas-akhir/${value.id}`}>
			          		Lihat
			          	</Button>
			          </TableCell>
		            </TableRow>
		          )) : <TableCell>Tidak ada data</TableCell>}
		        </TableBody>
		      </Table>
		    </TableContainer>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Penelitian</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
	          <Typography>
	            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
	            sit amet blandit leo lobortis eget.
	          </Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Publikasi</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
	          <Typography>
	            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
	            sit amet blandit leo lobortis eget.
	          </Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Pengabdian Masyarakat</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
	          <Typography>
	            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
	            sit amet blandit leo lobortis eget.
	          </Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Prestasi</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
	          <Typography>
	            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
	            sit amet blandit leo lobortis eget.
	          </Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Organisasi</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
	          <Typography>
	            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
	            sit amet blandit leo lobortis eget.
	          </Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
	          id="panel2a-header"
	        >
	          <Typography className={classes.heading}>Riwayat Kerja</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
	          <Typography>
	            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
	            sit amet blandit leo lobortis eget.
	          </Typography>
	        </ExpansionPanelDetails>
	      </ExpansionPanel>
        </Grid>
        <Grid item xs={12}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="secondary" fullWidth href="/profil">
					Kembali
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}

SeePrestasi.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { profile } = await ctx.store.dispatch(getProfileById(id));
  return { profile };
};

SeePrestasi.propTypes = {
  profile: PropTypes.any
};

const mapStateToProps = state => ({
  profile: state.usersReducer.profile
});

export default connect(mapStateToProps)(SeePrestasi);