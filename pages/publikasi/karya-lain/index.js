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
      { title: 'Penulis', field: 'nama_matkul' },
      { title: 'Tanggal', field: 'sks' },
      { title: 'Penerbit', field: 'kelas' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        kode_matkul: 'Karya Lain 1',
        nama_matkul: 'Handajaya Rusli',
        sks: '1 Januari 2019',
        kelas: 'Penerbit ITB'
      },
      {
        id: 2,
        no: 2,
        kode_matkul: 'Karya Lain 2',
        nama_matkul: 'Handajaya Rusli',
        sks: '19 Februari 2019',
        kelas: 'Penerbit ITB'
      },
      {
        id: 3,
        no: 3,
        kode_matkul: 'Karya Lain 1',
        nama_matkul: 'Feby Eliana',
        sks: '1 Januari 2020',
        kelas: 'Erlangga'
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
            <Typography color="textPrimary">Karya Lain</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/publikasi/karya-lain/create'>
            Buat Karya Lain Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Karya Lain"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/publikasi/karya-lain/' + 'id') }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/publikasi/karya-lain/edit/' + 'id') }
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