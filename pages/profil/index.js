import React from 'react';
import { useRouter }  from 'next/router';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default function Index() {
  const [state] = React.useState({
    columns: [
      { title: 'No', field: 'no' },
      { title: 'NIP', field: 'judul_ta' },
      { title: 'Nama', field: 'nama_mahasiswa' }
    ],
    data: [
      {
        id: 1,
        no: 1,
        judul_ta: '198609262015051001',
        nama_mahasiswa: 'Feby Eliana'
      },
      {
        id: 2,
        no: 2,
        judul_ta: '198609262015051002',
        nama_mahasiswa: 'Vincent Siauw'
      },
      {
        id: 3,
        no: 3,
        judul_ta: '198609262015051003',
        nama_mahasiswa: 'Alfian Maulana'
      },
    ],
  });

  const router = useRouter();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={12} md={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="textPrimary">Profil</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Profil"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: () => { router.push('/profil/' + 'id'); }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}