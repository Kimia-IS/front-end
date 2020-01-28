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
      { title: 'Judul TA', field: 'judul_ta' },
      { title: 'Nama Mahasiswa', field: 'nama_mahasiswa' },
      { title: 'Nama Dosen Pembimbing', field: 'nama_dosbing' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        judul_ta: 'Pengaruh CO2 terhadap NO2',
        nama_mahasiswa: 'Feby Eliana',
        nama_dosbing: 'Handajaya Rusli'
      },
      {
        id: 2,
        no: 2,
        judul_ta: 'Pengaruh NaOH terhadap CO2',
        nama_mahasiswa: 'Vincent Siauw',
        nama_dosbing: 'Handajaya Rusli'
      },
      {
        id: 3,
        no: 3,
        judul_ta: 'Pengaruh H2O terhadap O2',
        nama_mahasiswa: 'Alfian Maulana',
        nama_dosbing: 'Handajaya Rusli'
      },
    ],
  });

  const router = useRouter();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={12} md={9}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="textPrimary">Tugas Akhir</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={3}>
          <Button variant="outlined" fullWidth href='/tugas-akhir/create'>
            Buat Tugas Akhir Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Tugas Akhir"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/tugas-akhir/' + 'id'); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/tugas-akhir/edit/' + 'id'); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.judul_ta + " - " + rowData.nama_mahasiswa + "?"); }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}