import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';

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
        <Grid item xs={12} md={10}>
          <Breadcrumbs aria-label="breadcrumb">
            <Typography color="inherit" variant="h6">Dashboard Dosen</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid item xs={12} md={2}>
          <Button variant="outlined" fullWidth href="/kelola-akun">
            Kelola Akun
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            <Box fontWeight="fontWeightBold">
              Halo, [nama dosen]!
            </Box>
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <Box fontWeight="fontWeightBold">
              Silakan pilih menu di bawah ini
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={3} justify="center">
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/akademik">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-akademik.jpg"
                  title="Akademik"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Akademik
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/tugas-akhir">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-tugas-akhir.jpg"
                  title="Tugas Akhir"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Tugas Akhir
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/penelitian">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-penelitian.jpg"
                  title="Penelitian"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Penelitian
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/publikasi">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-publikasi.jpg"
                  title="Publikasi"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Publikasi
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/pengabdian-masyarakat">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-pengabdian-masyarakat.jpg"
                  title="Pengabdian Masyarakat"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Pengabdian Masyarakat
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/prestasi">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-prestasi.jpeg"
                  title="Prestasi"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Prestasi
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/organisasi">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-organisasi.jpg"
                  title="Organisasi"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Organisasi
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/riwayat-kerja">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-riwayat-kerja.jpg"
                  title="Riwayat Kerja"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Riwayat Kerja
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/profil">
                <CardMedia
                  className={classes.media}
                  image="/static/images/dashboard-profil.jpg"
                  title="Profil"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Profil
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}