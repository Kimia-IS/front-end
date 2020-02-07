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
import { getAllFinalTasks } from "../../store/actions/tugasAkhirActions";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const finalTasks = props.finalTasks.results;
  let newFinalTasks = [];
  finalTasks.map((item, index) => {
    newFinalTasks[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newFinalTasks[index].lecturer_name = namaDosen;
    newFinalTasks[index].starting_date = newFinalTasks[index].starting_date.slice(0, 16);
    newFinalTasks[index].graduation_date = newFinalTasks[index].graduation_date.slice(0, 16);
  });

  const [state] = React.useState({
    columns: [
      { title: 'Judul Tugas Akhir', field: 'title' },
      { title: 'Nama Mahasiswa', field: 'student_name' },
      { title: 'Nama Dosen Pembimbing', field: 'lecturer_name' },
      { title: 'Tanggal Mulai', field: 'starting_date' },
      { title: 'Tanggal Mulai', field: 'graduation_date' }
    ],
    data: newFinalTasks ? newFinalTasks : finalTasks,
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
            <Typography color="textPrimary">Tugas Akhir</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={3}>
          <Button variant="outlined" fullWidth href='/tugas-akhir/create'>
            Buat Tugas Akhir Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Tugas Akhir"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/tugas-akhir/' + rowData.final_task_id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/tugas-akhir/edit/' + rowData.final_task_id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus TA ${rowData.title} - ${rowData.student_name}?`,
                    text: 'Tugas akhir akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/finalTask?id=${rowData.final_task_id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Tugas akhir berhasil dihapus.',
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
  const { finalTasks } = await ctx.store.dispatch(getAllFinalTasks());
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    finalTasks: finalTasks,
    lecturers: lecturers
  }
  return data;
};

Index.propTypes = {
  finalTasks: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  finalTasks: state.tugasAkhirReducer.finalTasks,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);