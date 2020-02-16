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
import { getAllExperiences } from "../../store/actions/kerjaActions";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const experiences = props.experiences.results ? props.experiences.results : [];
  console.log(experiences);
  let newExperiences = [];
  experiences.map((item, index) => {
    newExperiences[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newExperiences[index].lecturer_name = namaDosen;
  });

  const [state] = React.useState({
    columns: [
      { title: 'Nama', field: 'lecturer_name' },
      { title: 'Nama Pekerjaan', field: 'job_name' },
      { title: 'Tahun', field: 'year' },
      { title: 'Semester', field: 'term' },
    ],
    data: newExperiences ? newExperiences : experiences,
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
                onClick: (event, rowData) => { router.push('/riwayat-kerja/' + rowData.id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/riwayat-kerja/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Pekerjaan ${rowData.job_name} - ${rowData.lecturer_name}?`,
                    text: 'Pekerjaan akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/experiences?id=${rowData.id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Pekerjaan berhasil dihapus.',
                                      'success'
                                    );
                                    setState({
                                      ...state,
                                      data: state.data.filter((el) => { return el.id != rowData.id })
                                    });
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
  const { experiences } = await ctx.store.dispatch(getAllExperiences());
  console.log('pp = ', experiences)
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    experiences: experiences,
    lecturers: lecturers
  }
  console.log('data = ', data);
  return data;
};

Index.propTypes = {
  experiences: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  experiences: state.kerjaReducer.experiences,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);