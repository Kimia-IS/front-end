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
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from '@material-ui/core/Box';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const useStyles = makeStyles(theme => ({
  formControl: {
    // margin: theme.spacing(1),
    minWidth: 300,
    fullWidth: true,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

export default function LihatProfil() {
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
            <Typography color="textPrimary">Profil [ID]</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Profil [ID]
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
	        		<Grid container item xs={12}>
	        			<Grid item xs={2}>
		          			<Typography color="inherit">
			          			<Box fontWeight="fontWeightBold">
					              Nama
					            </Box>
				            </Typography>
	        			</Grid>
	        			<Grid item xs={10}>
	        				<Typography color="inherit">: Feby Eliana</Typography>
	        			</Grid>
	          		</Grid>
	          		<Grid container item xs={12}>
	          			<Grid item xs={2}>
		          			<Typography color="inherit">
			          			<Box fontWeight="fontWeightBold">
					              NIP
					            </Box>
				            </Typography>
	        			</Grid>
	        			<Grid item xs={10}>
	        				<Typography color="inherit">: 198609262015051001</Typography>
	        			</Grid>
		          	</Grid>
		          	<Grid container item xs={12}>
		          		<Grid item xs={2}>
		          			<Typography color="inherit">
			          			<Box fontWeight="fontWeightBold">
					              Email
					            </Box>
				            </Typography>
	        			</Grid>
	        			<Grid item xs={10}>
	        				<Typography color="inherit">: feby@chem.itb.ac.id</Typography>
	        			</Grid>
		          	</Grid>
		          	<Grid container item xs={12}>
		          		<Grid item xs={2}>
		          			<Typography color="inherit">
			          			<Box fontWeight="fontWeightBold">
					              Status
					            </Box>
				            </Typography>
	        			</Grid>
	        			<Grid item xs={10}>
	        				<Typography color="inherit">: Dosen</Typography>
	        			</Grid>
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
	          <Typography className={classes.heading}>Tugas Akhir</Typography>
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