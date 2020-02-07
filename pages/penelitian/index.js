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
import { getAllResearches } from "../../store/actions/penelitianActions";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const researches = props.researches.results ? props.researches.results : [];
  console.log(researches);
  let newResearches = [];
  researches.map((item, index) => {
    newResearches[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newResearches[index].lecturer_name = namaDosen;
  });

  const [state] = React.useState({
    columns: [
      { title: 'Judul', field: 'title' },
      { title: 'Nama Dosen', field: 'lecturer_name' },
      { title: 'Tahun', field: 'year' },
      { title: 'Investor', field: 'investor' },
    ],
    data: newResearches ? newResearches : researches,
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
            <Typography color="textPrimary">Penelitian</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/penelitian/create'>
            Buat Penelitian Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Penelitian"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/penelitian/' + rowData.research_id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/penelitian/edit/' + rowData.research_id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Penelitian ${rowData.title} - ${rowData.year}?`,
                    text: 'Penelitian akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/research?id=${rowData.research_id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Penelitian berhasil dihapus.',
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
  const { researches } = await ctx.store.dispatch(getAllResearches());
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    researches: researches,
    lecturers: lecturers
  }
  return data;
};

Index.propTypes = {
  researches: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  researches: state.penelitianReducer.researches,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);