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
      { title: 'Judul', field: 'kode_matkul' },
      { title: 'Nama Pengaju', field: 'nama_matkul' },
      { title: 'Status', field: 'sks' },
      { title: 'Tahun', field: 'kelas' },
    ],
    data: [
      {
        id: 1,
        no: 1,
        kode_matkul: 'Paten 1',
        nama_matkul: 'Handajaya Rusli',
        sks: 'Granted',
        kelas: 2019
      },
      {
        id: 2,
        no: 2,
        kode_matkul: 'Paten 2',
        nama_matkul: 'Handajaya Rusli',
        sks: 'Granted',
        kelas: 2019
      },
      {
        id: 3,
        no: 3,
        kode_matkul: 'Paten 1',
        nama_matkul: 'Feby Eiana',
        sks: 'Terdaftar',
        kelas: 2020
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
            <Link color="inherit" href="/publikasi">
              Publikasi
            </Link>
            <Typography color="textPrimary">Paten</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/publikasi/paten/create'>
            Buat Paten Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Paten"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/publikasi/paten/' + 'id') }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/publikasi/paten/edit/' + 'id') }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.kode_matkul + " - " + rowData.nama_matkul + "?") }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}