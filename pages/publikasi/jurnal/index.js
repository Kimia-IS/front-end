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
import { getAllJournals } from "../../../store/actions/jurnalActions";
import { getAllLecturers } from "../../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const journals = props.journals.results ? props.journals.results : [];
  console.log(journals);
  let newJournals = [];
  journals.map((item, index) => {
    newJournals[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newJournals[index].lecturer_name = namaDosen;
  });

  const [state] = React.useState({
    columns: [
      { title: 'Judul', field: 'title' },
      { title: 'Penulis', field: 'lecturer_name' },
      { title: 'Tahun', field: 'year' },
      { title: 'Jenis Jurnal', field: 'type' },
      { title: 'Nomor Jurnal', field: 'number' },
    ],
    data: newJournals ? newJournals : journals,
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
            <Typography color="textPrimary">Jurnal</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/publikasi/jurnal/create'>
            Buat Jurnal Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Jurnal"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: () => { router.push('/publikasi/jurnal/' + rowData.id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: () => { router.push('/publikasi/jurnal/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Jurnal ${rowData.title} - ${rowData.year}?`,
                    text: 'Jurnal akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/research?id=${rowData.id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Jurnal berhasil dihapus.',
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
  const { journals } = await ctx.store.dispatch(getAllJournals());
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    journals: journals,
    lecturers: lecturers
  }
  return data;
};

Index.propTypes = {
  journals: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  journals: state.jurnalReducer.journals,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);