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
import { getAllClasses } from "../../store/actions/akademikActions";

const Index = props => {
  const { classes } = props;

  const [state] = React.useState({
    columns: [
      { title: 'Kode', field: 'course_id' },
      { title: 'Nama Mata Kuliah', field: 'course_name' },
      { title: 'SKS', field: 'total_credit', type: 'numeric' },
      { title: 'Kelas', field: 'class' },
      { title: 'Dosen', field: 'lecturer(s)' },
      { title: 'SKS Dosen', field: 'lecturer_credit' },
    ],
    data: classes.results
  });

  const router = useRouter();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={12} md={7}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="textPrimary">Akademik</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={8} md={3}>
          <Button variant="outlined" fullWidth href='/akademik/create/mata-kuliah'>
            Buat/Hapus Mata Kuliah
          </Button>
        </Grid>
        <Grid item xs={8} md={2}>
          <Button variant="outlined" fullWidth href='/akademik/create/kelas'>
            Buat Kelas Baru
          </Button>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Mata Kuliah"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit',
                onClick: (event, rowData) => { router.push('/akademik/edit/' + rowData.id); }
              },
              {
                icon: 'delete',
                tooltip: 'Delete',
                onClick: (event, rowData) => { confirm("Apakah Anda yakin ingin menghapus " + rowData.kode_matkul + " - " + rowData.nama_matkul + "?"); }
              }
            ]}
          />
        </Grid>
      </Grid>
    </div>
  );
}

Index.getInitialProps = async ctx => {
  const { classes } = await ctx.store.dispatch(getAllClasses());
  return { classes };
};

Index.propTypes = {
  classes: PropTypes.any
};

const mapStateToProps = state => ({
  classes: state.akademikReducer.classes
});

export default connect(mapStateToProps)(Index);
