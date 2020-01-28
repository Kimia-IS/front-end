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
      { title: 'Nama', field: 'nama' },
      { title: 'NIP / ID', field: 'user_id' },
      { title: 'Email', field: 'email' },
      { title: 'Peran', field: 'role' },
      { title: 'Verifikasi', field: 'verified' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        nama: 'Feby Eliana',
        user_id: '1234',
        email: 'feby@chem.itb.ac.id',
        role: 'Super admin',
        verified: 'Sudah'
      },
      {
        id: 2,
        no: 2,
        nama: 'Vincent Siauw',
        user_id: '1235',
        email: 'vincent@chem.itb.ac.id',
        role: 'Admin akademik',
        verified: 'Belum'
      },
      {
        id: 3,
        no: 3,
        nama: 'Handajaya Rusli',
        user_id: '19123884202',
        email: 'hans@chem.itb.ac.id',
        role: 'Dosen',
        verified: 'Sudah'
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
            <Typography color="textPrimary">Kelola Akun</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/kelola-akun/create'>
            Buat Akun Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Akun"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/kelola-akun/edit/' + 'id'); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.nama + " - " + rowData.user_id + "?"); }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}