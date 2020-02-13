import React from 'react';
import { useRouter }  from 'next/router';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const { users } = props;

  const [state] = React.useState({
    columns: [
      { title: 'NIP / ID', field: 'user_id' },
      { title: 'Nama', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Peran', field: 'role' }
    ],
    data: users ? users : [],
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
                onClick: (event, rowData) => {
                  let queryRole = 0;
                  if (rowData.role == 'Super Admin') { queryRole = 1 }
                    else if (rowData.role == 'Admin Akademik') { queryRole = 2 }
                    else if (rowData.role == 'Admin Non-Akademik') { queryRole = 3 }
                    else if (rowData.role == 'Tendik') { queryRole = 4 }
                    else if (rowData.role == 'Dosen') { queryRole = 5 }
                    else if (rowData.role == 'Kaprodi') { queryRole = 6 }       
                  router.push('/kelola-akun/edit?id=' + rowData.id + '&role=' + queryRole); 
                }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { 
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus akun ${rowData.name}?`,
                    text: 'Akun akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      if ((rowData.role == 'Dosen') || (rowData.role == 'Tendik') || (rowData.role == 'Kaprodi')) {
                        await axios.delete(`${API}/auth/lecturer/delete/${rowData.user_id}`)
                                    .then(() => {
                                      Swal.fire(
                                        'Berhasil!',
                                        'Akun berhasil dihapus.',
                                        'success'
                                      );
                                    })
                                    .catch(error => {
                                      Swal.fire(
                                        'Gagal!',
                                        error,
                                        'error'
                                      );
                                    });
                      }
                      else if ((rowData.role == 'Super Admin') || (rowData.role == 'Admin Akademik') || (rowData.role == 'Admin Non-Akademik')) {
                        await axios.delete(`${API}/auth/admin/delete/${rowData.user_id}`)
                                    .then(() => {
                                      Swal.fire(
                                        'Berhasil!',
                                        'Akun berhasil dihapus.',
                                        'success'
                                      );
                                    })
                                    .catch(error => {
                                      Swal.fire(
                                        'Gagal!',
                                        error,
                                        'error'
                                      );
                                    });
                      }
                      else {
                        Swal.fire(
                          'Gagal!',
                          'No role selected.',
                          'error'
                        );
                      }
                    }
                  })
                }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Index.getInitialProps = async ctx => {
  const { users } = await ctx.store.dispatch(getAllUsers());
  return { users };
};

Index.propTypes = {
  users: PropTypes.any
};

const mapStateToProps = state => ({
  users: state.usersReducer.users
});

export default connect(mapStateToProps)(Index);
