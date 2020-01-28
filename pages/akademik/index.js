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
      { title: 'Kode', field: 'kode_matkul' },
      { title: 'Nama Mata Kuliah', field: 'nama_matkul' },
      { title: 'SKS', field: 'sks', type: 'numeric' },
      { title: 'Kelas', field: 'kelas' },
      { title: 'Dosen', field: 'dosen' },
      { title: 'SKS Dosen', field: 'sks_dosen' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        kode_matkul: 'KI3121',
        nama_matkul: 'Kimia Murni',
        sks: 3,
        kelas: '01',
        dosen: 'Handajaya Rusli',
        sks_dosen: 3
      },
      {
        id: 2,
        no: 2,
        kode_matkul: 'KI2111',
        nama_matkul: 'Kimia Palsu',
        sks: 4,
        kelas: '01',
        dosen: 'Feby Eliana, Vincent Siauw',
        sks_dosen: '2, 2'
      },
      {
        id: 3,
        no: 3,
        kode_matkul: 'KI2111',
        nama_matkul: 'Kimia Palsu',
        sks: 4,
        kelas: '02',
        dosen: 'Alfian Maulana',
        sks_dosen: 4
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
            <Typography color="textPrimary">Akademik</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/akademik/create'>
            Buat Kelas Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Mata Kuliah"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: () => { router.push('/akademik/edit/' + 'id'); }
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