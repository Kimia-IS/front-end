import React from 'react';
import Box from "@material-ui/core/Box";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function CreateAkademik() {
	let openDialog = false;
	const [count, setCount] = React.useState(2);
	const [inputDosen2, setInputDosen2] = React.useState(false);
	const [inputDosen3, setInputDosen3] = React.useState(false);

	// PAHAMI LAGI KENAPA COUNT NYA BEGITU

	const handleTambahDosen = () => {
		if (count <= 3) {
			setCount(count => count + 1);
			if (count >= 2) {
				setInputDosen2(true);
				console.log('setInputDosen2 = ' + inputDosen2)
			}
			if (count >= 3) {
				setInputDosen3(true);
				console.log('setInputDosen3 = ' + inputDosen3)
			}
		}
		console.log("set count = " + count);
	};

	const handleKurangDosen = () => {
		if (count > 2) {
			setCount(count => count - 1);
			if (count <= 4) {
				setInputDosen3(false);
				console.log('setInputDosen2 = ' + inputDosen2)
			}
			if (count <= 3) {
				setInputDosen2(false);
				console.log('setInputDosen3 = ' + inputDosen3)
			}
		}
		console.log("set count = " + count);
	};

	/*const addFieldDosen = () => {
		console.log('addFieldDosen')
		console.log('state = ' + count)
	    let field = [];

	    if (count >= 3) {
	    	handleClickOpen;
	    	{() => {setOpen(true); console.log(open);}} // ga dijalanin
	    	console.log('setOpen = ' + open)
	    } else {
		    for (let i = 2; i < count; i++) {
		      field.push(
		      	<Grid item xs={12} md={8}>
		        	<Grid container spacing={3}>
				      	<Grid item xs={12} md={7}>
				          <TextField id={"dosen_" + i} label={"Nama dosen " + i} variant="outlined" required fullWidth />
				        </Grid>
				        <Grid item xs={12} md={5}>
				          <TextField id={"sks_dosen_" + i} label={"SKS dosen " + i} variant="outlined" fullWidth required />
				        </Grid>
			        </Grid>
		        </Grid>
		      );
		    }
	    }

	    return field;
	 }*/

  return (
    <div>
      <Grid container spacing={3}>
      	<Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Link color="inherit" href="/akademik">
              Akademik
            </Link>
            <Typography color="textPrimary">Buat Baru</Typography>
          </Breadcrumbs>
        </Grid>
      	<Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
	        Buat Mata Kuliah Baru
	      </Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <TextField id="kode_matkul" label="Kode mata kuliah" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField id="nama_matkul" label="Nama mata kuliah" variant="outlined" fullWidth required />
        </Grid>
        <Grid item xs={12} md={8}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={7}>
		          <TextField id="dosen_1" label="Nama dosen 1" value="Feby Eliana Tengry" variant="outlined" disabled fullWidth />
		        </Grid>
		        <Grid item xs={12} md={5}>
		          <TextField id="sks_dosen_1" label="SKS dosen 1" variant="outlined" fullWidth required />
		        </Grid>
        	</Grid>
        </Grid>
        <Grid component={Box} item xs={12} md={8} visibility={inputDosen2 ? "visible" : "hidden"}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={7}>
		          <TextField id="dosen_2" label="Nama dosen 2" variant="outlined" fullWidth />
		        </Grid>
		        <Grid item xs={12} md={5}>
		          <TextField id="sks_dosen_2" label="SKS dosen 2" variant="outlined" fullWidth required />
		        </Grid>
        	</Grid>
        </Grid>
        <Grid component={Box} item xs={12} md={8} visibility={inputDosen3 ? "visible" : "hidden"}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={7}>
		          <TextField id="dosen_3" label="Nama dosen 3" variant="outlined" fullWidth />
		        </Grid>
		        <Grid item xs={12} md={5}>
		          <TextField id="sks_dosen_3" label="SKS dosen 3" variant="outlined" fullWidth required />
		        </Grid>
        	</Grid>
        </Grid>
        
        <Grid item xs={12} md={5}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={6}>
		        	<Button onClick={handleTambahDosen}>
			          + Tambah dosen pengajar
		        	</Button>
		        </Grid>
		        <Grid item xs={12} md={6}>
		        	<Button onClick={handleKurangDosen}>
			          - Kurangi dosen pengajar
		        	</Button>
		        </Grid>
	        </Grid>
        </Grid>
        <Grid item xs={12}>
	        <Grid item xs={12} md={4}>
	          <TextField id="sks" label="Total SKS" value="3" variant="outlined" disabled fullWidth />
	        </Grid>
        </Grid>
        <Grid item xs={12}>
        	<Grid container spacing={3}>
		        <Grid item xs={12} md={2}>
			      <Button variant="outlined" color="secondary" fullWidth href="/akademik">
					Batal
				  </Button>
				</Grid>
		        <Grid item xs={12} md={3}>
			      <Button variant="outlined" color="primary" fullWidth href="/akademik">
					Simpan
				  </Button>
				</Grid>
			</Grid>
        </Grid>
      </Grid>
  	</div>
  );
}