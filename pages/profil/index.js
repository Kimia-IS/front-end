import React from 'react';
import { useRouter }  from 'next/router';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import MaterialTable from 'material-table';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { getAllUsers } from "../../store/actions/usersActions";

const Index = props => {
  const { users } = props;

  const [state] = React.useState({
    columns: [
      { title: 'NIP / ID', field: 'user_id' },
      { title: 'Nama', field: 'name' },
      { title: 'Email', field: 'email' },
      { title: 'Peran', field: 'role' }
    ],
    data: users,
  });

  const router = useRouter();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={12} md={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="textPrimary">Profil</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <MaterialTable
            title="Daftar Profil"
            columns={state.columns}
            data={state.data}
            actions={[
              {
                icon: 'visibility',
                tooltip: 'See More',
                onClick: (event, rowData) => { router.push('/profil/' + rowData.user_id); }
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