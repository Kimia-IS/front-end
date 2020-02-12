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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
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

const SeeProfil = props => {
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
	        >
	          <Typography variant="h6" className={classes.heading}>Info Umum</Typography>
	        </ExpansionPanelSummary>
	        <ExpansionPanelDetails>
		        <Grid container spacing={3}>
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
		          {(data.academic.results && data.academic.results.length > 0) ? data.academic.results.map((value, index) => (
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
	      <ExpansionPanel>
	        <ExpansionPanelSummary
	          expandIcon={<ExpandMoreIcon />}
	          aria-controls="panel2a-content"
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
		          {(data.finalTask.results && data.finalTask.results.length > 0) ? data.finalTask.results.map((value, index) => (
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
	        >
	          <Typography className={classes.heading}>Penelitian</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul</TableCell>
		            <TableCell>NIP</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Investor</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.research.results && data.research.results.length > 0) ? data.research.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>{value.investor}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/penelitian/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Jurnal</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul</TableCell>
		            <TableCell>Penulis</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Jenis Jurnal</TableCell>
		            <TableCell>Nomor Jurnal</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.journal.results && data.journal.results.length > 0) ? data.journal.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>{value.type}</TableCell>
		              <TableCell>{value.number}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/publikasi/jurnal/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Paten</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul</TableCell>
		            <TableCell>Pengaju</TableCell>
		            <TableCell>Status</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.patent.results && data.patent.results.length > 0) ? data.patent.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.status}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/publikasi/patent/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Karya Lain</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul</TableCell>
		            <TableCell>Penulis</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Penerbit</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.otherpub.results && data.otherpub.results.length > 0) ? data.otherpub.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>{value.publisher}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/publikasi/karya-lain/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Pengabdian Masyarakat</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul</TableCell>
		            <TableCell>NIP</TableCell>
		            <TableCell>Posisi</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Pemberi Dana</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.socres.results && data.socres.results.length > 0) ? data.socres.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.position}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>{value.investor}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/pengabdian-masyarakat/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Prestasi</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Judul</TableCell>
		            <TableCell>NIP</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Pemberi</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.achievement.results && data.achievement.results.length > 0) ? data.achievement.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.title}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>{value.issuer}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/prestasi/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Organisasi</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>Nama Organisasi</TableCell>
		            <TableCell>NIP</TableCell>
		            <TableCell>Posisi</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.organization.results && data.organization.results.length > 0) ? data.organization.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.organization_name}</TableCell>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.position}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/organisasi/${value.id}`}>
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
	        >
	          <Typography className={classes.heading}>Riwayat Kerja</Typography>
	        </ExpansionPanelSummary>
	        <TableContainer component={Paper}>
		      <Table className={classes.table} aria-label="simple table">
		        <TableHead>
		          <TableRow>
		            <TableCell>NIP</TableCell>
		            <TableCell>Nama Pekerjaan</TableCell>
		            <TableCell>Tahun</TableCell>
		            <TableCell>Semester</TableCell>
		            <TableCell>Aksi</TableCell>
		          </TableRow>
		        </TableHead>
		        <TableBody>
		          {(data.experience.results && data.experience.results.length > 0) ? data.experience.results.map((value, index) => (
		            <TableRow key={index}>
		              <TableCell>{value.lecturer_nip}</TableCell>
		              <TableCell>{value.job_name}</TableCell>
		              <TableCell>{value.year}</TableCell>
		              <TableCell>{value.term}</TableCell>
		              <TableCell>
			          	<Button variant="outlined" target="_blank" color="primary" fullWidth href={`/riwayat-kerja/${value.id}`}>
			          		Lihat
			          	</Button>
			          </TableCell>
		            </TableRow>
		          )) : <TableCell>Tidak ada data</TableCell>}
		        </TableBody>
		      </Table>
		    </TableContainer>
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

SeeProfil.getInitialProps = async ctx => {
  const id = parseInt(ctx.query.id);
  const { profile } = await ctx.store.dispatch(getProfileById(id));
  return { profile };
};

SeeProfil.propTypes = {
  profile: PropTypes.any
};

const mapStateToProps = state => ({
  profile: state.usersReducer.profile
});

export default connect(mapStateToProps)(SeeProfil);