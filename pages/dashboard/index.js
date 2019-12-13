import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Kimia ITB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    position: 'relative',
  },
  media: {
    //height: 140,
    height: 0,
    paddingTop: '56.25%', // 16:9
    filter: 'brightness(50%)'
  },
  typography: {
    position: 'absolute',
    //marginLeft: 'auto',
    //marginRight: 'auto',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    //left: '0px',
    //right: '0px',
    color: 'white'
  },
});

export default function Index() {
  const classes = useStyles();

  return (
    <Container>
      <Box my={12}>
        <Grid container spacing={3} alignItems="center" alignContent="center" justify="center">
          <Grid item xs={12}>
            <Typography variant="h5" align="justify" gutterBottom>
              Dashhboard Dosen
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              <Box fontWeight="fontWeightBold">
                Halo, [nama dosen]!
              </Box>
            </Typography>
          </Grid>
        </Grid>
        <hr />
        <br />
        <br />
        <Grid container spacing={3} justify="center">
          <Grid item xs={6} md={3}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link href="/akademik">
                  <CardMedia
                    className={classes.media}
                    image="/static/images/home-dosen.jpg"
                    title="Dosen"
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
                    image="/static/images/home-web.jpg"
                    title="Web"
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
                    image="/static/images/home-admin.jpg"
                    title="Admin"
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
                    image="/static/images/home-dosen.jpg"
                    title="Dosen"
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
                    image="/static/images/home-web.jpg"
                    title="Web"
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
                    image="/static/images/home-admin.jpg"
                    title="Admin"
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
                    image="/static/images/home-dosen.jpg"
                    title="Dosen"
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
                    image="/static/images/home-web.jpg"
                    title="Web"
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
                    image="/static/images/home-admin.jpg"
                    title="Admin"
                  />
                  <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                    Profil
                  </Typography>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
        <br />
        <br />
        <Copyright />
      </Box>
    </Container>
  );
}