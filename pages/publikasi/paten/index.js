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
import { getAllPatents } from "../../../store/actions/patenActions";
import { getAllLecturers } from "../../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const patents = props.patents.results ? props.patents.results : [];
  console.log(patents);
  let newPatents = [];
  patents.map((item, index) => {
    newPatents[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newPatents[index].lecturer_name = namaDosen;
  });

  const [state] = React.useState({
    columns: [
      { title: 'Judul', field: 'title' },
      { title: 'Nama Pengaju', field: 'lecturer_name' },
      { title: 'Status', field: 'status' },
      { title: 'Tahun', field: 'year' },
    ],
    data: newPatents ? newPatents : patents,
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
            <Typography color="textPrimary">Paten</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/publikasi/paten/create'>
            Buat Paten Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Paten"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/publikasi/paten/' + rowData.id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/publikasi/paten/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Paten ${rowData.title} - ${rowData.year}?`,
                    text: 'Paten akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/publication/patent?id=${rowData.id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Paten berhasil dihapus.',
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
  const { patents } = await ctx.store.dispatch(getAllPatents());
  console.log('pp = ', patents)
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    patents: patents,
    lecturers: lecturers
  }
  console.log('data = ', data);
  return data;
};

Index.propTypes = {
  patents: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  patents: state.patenReducer.patents,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);