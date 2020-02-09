import React from 'react';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CardActionArea from '@material-ui/core/CardActionArea';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    position: 'relative',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    filter: 'brightness(50%)'
  },
  typography: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white'
  },
});

export default function Index() {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
        <Grid item xs={12}>
          <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
            <Link color="inherit" href="/dashboard">
              Dashboard
            </Link>
            <Typography color="textPrimary">Publikasi</Typography>
          </Breadcrumbs>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3} justify="center">
        <Grid container item xs={12} justify="center">
          <Typography color="textPrimary" variant="h6">Pilih jenis publikasi</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/publikasi/jurnal">
                <CardMedia
                  className={classes.media}
                  image="/static/images/publikasi-jurnal.jpg"
                  title="Jurnal"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Jurnal
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/publikasi/paten">
                <CardMedia
                  className={classes.media}
                  image="/static/images/publikasi-paten.jpg"
                  title="Paten"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Paten
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/publikasi/karya-lain">
                <CardMedia
                  className={classes.media}
                  image="/static/images/publikasi-karya-lain.jpg"
                  title="Karya Lain"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Karya Lain
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}