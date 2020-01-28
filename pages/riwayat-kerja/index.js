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
      { title: 'Nama Pekerjaan', field: 'judul' },
      { title: 'Nama', field: 'nama_dosen' },
      { title: 'Tahun', field: 'tahun' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        judul: 'Dosen ITB',
        tahun: 2012,
        nama_dosen: 'Handajaya Rusli'
      },
      {
        id: 2,
        no: 2,
        judul: 'CEO PT. KimiaIndo',
        tahun: 2013,
        nama_dosen: 'Handajaya Rusli'
      },
      {
        id: 3,
        no: 3,
        judul: 'Presiden RI',
        tahun: 2014,
        nama_dosen: 'Handajaya Rusli'
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
            <Typography color="textPrimary">Riwayat Kerja</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={3}>
          <Button variant="outlined" fullWidth href='/riwayat-kerja/create'>
            Buat Riwayat Kerja Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Riwayat Kerja"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/riwayat-kerja/' + 'id'); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/riwayat-kerja/edit/' + 'id'); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.nama_dosen + " - " + rowData.tahun + "?"); }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}