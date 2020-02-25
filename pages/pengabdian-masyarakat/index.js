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
import { getAllSocreses } from "../../store/actions/pengmasActions";
import { getAllLecturers } from "../../store/actions/usersActions";
import Swal from 'sweetalert2';
import axios from "axios";
import { API } from "../../config";

const Index = props => {
  const listDosen = props.lecturers;
  const socreses = props.socreses.results ? props.socreses.results : [];
  console.log(socreses);
  let newSocreses = [];
  socreses.map((item, index) => {
    newSocreses[index] = item;
    let namaDosen = listDosen.find(obj => { return obj.user_id == item.lecturer_nip }).name;
    newSocreses[index].lecturer_name = namaDosen;
  });

  const [state, setState] = React.useState({
    columns: [
      { title: 'Judul', field: 'title' },
      { title: 'Nama Dosen', field: 'lecturer_name' },
      { title: 'Posisi', field: 'position' },
      { title: 'Tahun', field: 'year' },
      { title: 'Pemberi dana', field: 'investor' }
    ],
    data: newSocreses ? newSocreses : socreses,
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
            <Typography color="textPrimary">Pengabdian Masyarakat</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/pengabdian-masyarakat/create'>
            Buat Pengmas Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Pengabdian Masyarakat"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/pengabdian-masyarakat/' + rowData.id); }
              },
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/pengabdian-masyarakat/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => {
                  event.preventDefault();
                  Swal.fire({
                    title: `Hapus Pengmas ${rowData.title} - ${rowData.year}?`,
                    text: 'Pengmas akan dihapus secara permanen',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Hapus',
                    cancelButtonText: 'Batal',
                  }).then(async (result) => {
                    if (result.value) {
                      await axios.delete(`${API}/socres?id=${rowData.id}`)
                                  .then(() => {
                                    Swal.fire(
                                      'Berhasil!',
                                      'Pengmas berhasil dihapus.',
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
  const { socreses } = await ctx.store.dispatch(getAllSocreses());
  console.log('pp = ', socreses)
  const { lecturers } = await ctx.store.dispatch(getAllLecturers());
  const data = {
    socreses: socreses,
    lecturers: lecturers
  }
  console.log('data = ', data);
  return data;
};

Index.propTypes = {
  socreses: PropTypes.any,
  lecturers: PropTypes.any
};

const mapStateToProps = state => ({
  socreses: state.pengmasReducer.socreses,
  lecturers: state.usersReducer.lecturers
});

export default connect(mapStateToProps)(Index);