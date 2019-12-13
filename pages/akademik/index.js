import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Kimia ITB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Index() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'Kode Mata Kuliah', field: 'kode_matkul' },
      { title: 'Nama Mata Kuliah', field: 'nama_matkul' },
      { title: 'Kelas', field: 'kelas', type: 'numeric' },
      { title: 'Dosen Pengajar', field: 'dosen' }
    ],
    data: [
      {
        kode_matkul: 'KI3121',
        nama_matkul: 'Kimia Murni',
        kelas: 1,
        dosen: 'Handajaya Rusli'
      },
      {
        kode_matkul: 'KI2111',
        nama_matkul: 'Kimia Palsu',
        kelas: 1,
        dosen: 'Feby Eliana, Vincent Siauw'
      },
      {
        kode_matkul: 'KI2111',
        nama_matkul: 'Kimia Palsu',
        kelas: 2,
        dosen: 'Alfian Maulana'
      },
    ],
  });
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={2}>
          <Link href="/dashboard">
            <Typography variant="h6" align="justify" gutterBottom>
              &lt; Kembali
            </Typography>
          </Link>
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h5" align="justify" gutterBottom>
            Akademik
          </Typography>
        </Grid>
      </Grid>
      <hr />
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Mata Kuliah"
            columns={state.columns}
            data={state.data}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.push(newData);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    if (oldData) {
                      setState(prevState => {
                        const data = [...prevState.data];
                        data[data.indexOf(oldData)] = newData;
                        return { ...prevState, data };
                      });
                    }
                  }, 600);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  setTimeout(() => {
                    resolve();
                    setState(prevState => {
                      const data = [...prevState.data];
                      data.splice(data.indexOf(oldData), 1);
                      return { ...prevState, data };
                    });
                  }, 600);
                }),
            }}
          />
        </Grid>
      </Grid>
      <br />
      <br />
      <Copyright />
    </div>
  );
}