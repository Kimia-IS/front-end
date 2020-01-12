import React from 'react';
import { useRouter }  from 'next/router';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Index() {
  const [state, setState] = React.useState({
    columns: [
      { title: 'No', field: 'no' },
      { title: 'Judul', field: 'judul' },
      { title: 'Nama Dosen', field: 'nama_dosen' },
      { title: 'Tahun', field: 'tahun' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        judul: 'Pengaruh CO2 terhadap NO2',
        tahun: 2012,
        nama_dosen: 'Handajaya Rusli'
      },
      {
        id: 2,
        no: 2,
        judul: 'Pengaruh NaOH terhadap CO2',
        tahun: 2013,
        nama_dosen: 'Handajaya Rusli'
      },
      {
        id: 3,
        no: 3,
        judul: 'Pengaruh H2O terhadap O2',
        tahun: 2014,
        nama_dosen: 'Handajaya Rusli'
      },
    ],
  });

  const router = useRouter();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={12} md={10}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="textPrimary">Penelitian</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/penelitian/create'>
            Buat Penelitian Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Penelitian"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/penelitian/' + 'id') }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/penelitian/edit/' + 'id') }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.nama_dosen + " - " + rowData.tahun + "?") }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}