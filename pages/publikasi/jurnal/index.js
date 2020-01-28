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
  const [state] = React.useState({
    columns: [
      { title: 'No', field: 'no' },
      { title: 'Judul', field: 'kode_matkul' },
      { title: 'Penulis', field: 'nama_matkul' },
      { title: 'Tahun', field: 'sks' },
      { title: 'Jenis Jurnal', field: 'kelas' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        kode_matkul: 'Laju Hidrolisis Heroin dalam Air dan Plasma',
        nama_matkul: 'Handajaya Rusli',
        sks: 2017,
        kelas: 'Nasional terakreditasi'
      },
      {
        id: 2,
        no: 2,
        kode_matkul: 'Laju Hidrolisis Heroin dalam Udara dan Plasma',
        nama_matkul: 'Handajaya Rusli',
        sks: 2018,
        kelas: 'Nasional'
      },
      {
        id: 3,
        no: 3,
        kode_matkul: 'Steroids from the Super Red Dragon Fruit (Hylocereus costaricensis)',
        nama_matkul: 'Feby Eliana',
        sks: 2019,
        kelas: 'Internasional terindeks scopus'
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
            <Typography color="textPrimary">Jurnal</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/publikasi/jurnal/create'>
            Buat Jurnal Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Jurnal"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: () => { router.push('/publikasi/jurnal/' + 'id'); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: () => { router.push('/publikasi/jurnal/edit/' + 'id'); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.kode_matkul + " - " + rowData.nama_matkul + "?"); }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}