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
import { getAllOrganizations } from "../../store/actions/organisasiActions";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const organizations = props.organizations.results ? props.organizations.results : [];
  console.log(organizations);
  let newOrganizations = [];
  organizations.map((item, index) => {
    newOrganizations[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newOrganizations[index].lecturer_name = namaDosen;
  });

  const [state] = React.useState({
    columns: [
      { title: 'Nama Organisasi', field: 'organization_name' },
      { title: 'Nama', field: 'lecturer_name' },
      { title: 'Posisi', field: 'position' },
      { title: 'Tahun', field: 'year' }
    ],
    data: newOrganizations ? newOrganizations : organizations,
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
            <Typography color="textPrimary">Organisasi</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/organisasi/create'>
            Buat Organisasi Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Organisasi"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/organisasi/' + rowData.id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/organisasi/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Organisasi ${rowData.organization_name} - ${rowData.year}?`,
                    text: 'Organisasi akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/organizations?id=${rowData.id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Organisasi berhasil dihapus.',
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
  console.log('ke sini')
  const { organizations } = await ctx.store.dispatch(getAllOrganizations());
  console.log('pp = ', organizations)
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    organizations: organizations,
    lecturers: lecturers
  }
  console.log('data = ', data);
  return data;
};

Index.propTypes = {
  organizations: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  organizations: state.organisasiReducer.organizations,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);