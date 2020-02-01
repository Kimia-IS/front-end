import React from 'react';
import { useRouter } from 'next/router';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function EditAkademik() {
  const router = useRouter();
  const { id } = router.query;

  const [count, setCount] = React.useState(2);  // Pahami lagi perilaku 'count' (lifecycle)
  const [inputDosen2, setInputDosen2] = React.useState(false);
  const [inputDosen3, setInputDosen3] = React.useState(false);
  const [totalSKS, setTotalSKS] = React.useState(0);
  const [state, setState] = React.useState({
    kodeMataKuliah: 'KI1234',
    namaMataKuliah: 'Kimia Murni',
    namaDosen1: 'Feby Eliana Tengry',
    namaDosen2: 'Vincent',
    namaDosen3: 'Siauw',
    sksDosen1: 1,
    sksDosen2: 2,
    sksDosen3: 3
  });

  const handleInputChange = (e) => setState({
      ...state,
      [e.currentTarget.name]: e.currentTarget.value
  })

  React.useEffect(() => {
     setTotalSKS(parseInt(state.sksDosen1) + parseInt(state.sksDosen2) + parseInt(state.sksDosen3))
  }, [state]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted! State: ', state);
  }

  const handleTambahDosen = () => {
    if (count <= 3) {
      setCount(count => count + 1);
      if (count >= 2) {
        setInputDosen2(true);
      }
      if (count >= 3) {
        setInputDosen3(true);
      }
    }
  };

  const handleKurangDosen = () => {
    if (count >= 3) {
      setCount(count => count - 1);
      if (count <= 4) {
        setInputDosen3(false);
      }
      if (count <= 3) {
        setInputDosen2(false);
      }
    }
  };

  const addFieldDosen2 = () => {
    if (inputDosen2) {
      return (
        <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <TextField label="Nama dosen 2" name="namaDosen2" onChange={handleInputChange} value={state.namaDosen2} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField label="SKS dosen 2" type="number" name="sksDosen2" onChange={handleInputChange} value={state.sksDosen2} variant="outlined" fullWidth required />
                </Grid>
              </Grid>
            </Grid>
      );
    }
  };

  const addFieldDosen3 = () => {
    if (inputDosen3) {
      return (
        <Grid item xs={12} md={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                  <TextField label="Nama dosen 3" name="namaDosen3" onChange={handleInputChange} value={state.namaDosen3} variant="outlined" fullWidth required />
                </Grid>
                <Grid item xs={12} md={5}>
                  <TextField label="SKS dosen 3" type="number" name="sksDosen3" onChange={handleInputChange} value={state.sksDosen3} variant="outlined" fullWidth required />
                </Grid>
              </Grid>
            </Grid>
      );
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
              <Link color="inherit" href="/dashboard">
                Dashboard
              </Link>
              <Link color="inherit" href="/akademik">
                Akademik
              </Link>
              <Typography color="textPrimary">Edit Kelas {id}</Typography>
            </Breadcrumbs>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h4" gutterBottom>
              Edit Kelas {id}
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField label="Kode mata kuliah" name="kodeMataKuliah" onChange={handleInputChange} value={state.kodeMataKuliah} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={5}>
            <TextField label="Nama mata kuliah" name="namaMataKuliah" onChange={handleInputChange} value={state.namaMataKuliah} variant="outlined" fullWidth required />
          </Grid>
          <Grid item xs={12} md={8}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={7}>
                <TextField label="Nama dosen 1" name="namaDosen1" value={state.namaDosen1} variant="outlined" disabled fullWidth />
              </Grid>
              <Grid item xs={12} md={5}>
                <TextField label="SKS dosen 1" type="number" name="sksDosen1" onChange={handleInputChange} value={state.sksDosen1} variant="outlined" fullWidth required />
              </Grid>
            </Grid>
          </Grid>
          {addFieldDosen2()}
          {addFieldDosen3()}
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
              <TextField label="Total SKS" value={totalSKS} variant="outlined" disabled fullWidth />
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