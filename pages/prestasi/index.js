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
import { getAllAchievements } from "../../store/actions/prestasiActions";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const achievements = props.achievements.results ? props.achievements.results : [];
  console.log(achievements);
  let newAchievements = [];
  achievements.map((item, index) => {
    newAchievements[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newAchievements[index].lecturer_name = namaDosen;
  });

  const [state] = React.useState({
    columns: [
      { title: 'Judul', field: 'title' },
      { title: 'Nama', field: 'lecturer_name' },
      { title: 'Tahun', field: 'year' },
      { title: 'Pemberi', field: 'issuer' }
    ],
    data: newAchievements ? newAchievements : achievements,
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
            <Typography color="textPrimary">Prestasi</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/prestasi/create'>
            Buat Prestasi Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Prestasi"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/prestasi/' + rowData.id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/prestasi/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Prestasi ${rowData.title} - ${rowData.year}?`,
                    text: 'Prestasi akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/publication/achievement?id=${rowData.id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Prestasi berhasil dihapus.',
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
  const { achievements } = await ctx.store.dispatch(getAllAchievements());
  console.log('pp = ', achievements)
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    achievements: achievements,
    lecturers: lecturers
  }
  console.log('data = ', data);
  return data;
};

Index.propTypes = {
  achievements: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  achievements: state.prestasiReducer.achievements,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);