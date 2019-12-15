import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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
        <Grid item xs={4} md={2}>
          <img src="/static/images/logo-itb.png" style={{'width': '90px'}}/>
        </Grid>
        <Grid item xs={8} md={10}>
          <Typography variant="h5" align="justify" gutterBottom>
            <Box letterSpacing={6}>
              SISTEM INFORMASI KIMIA ITB
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            <Box fontWeight="fontWeightBold">
              Selamat datang di website sistem informasi Kimia Institut Teknologi Bandung
            </Box>
          </Typography>
        </Grid>
      </Grid>
      <hr />
      <br />
      <br />
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className={classes.card}>
            <CardActionArea>
              <Link href="/dosen/login">
                <CardMedia
                  className={classes.media}
                  image="/static/images/home-dosen.jpg"
                  title="Dosen"
                />
                <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                  Login sebagai Dosen
                </Typography>
              </Link>
            </CardActionArea>
          </Card>
        </Grid>
        <Box clone order={{ xs: 3, sm: 2 }}>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link href="http://www.chem.itb.ac.id/" target="_blank">
                  <CardMedia
                    className={classes.media}
                    image="/static/images/home-web.jpg"
                    title="Web"
                  />
                  <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                    Website Kimia ITB
                  </Typography>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </Box>
        <Box clone order={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <Link href="/admin/login">
                  <CardMedia
                    className={classes.media}
                    image="/static/images/home-admin.jpg"
                    title="Admin"
                  />
                  <Typography variant="h6" className={classes.typography} align="center" gutterBottom>
                    Login sebagai Admin
                  </Typography>
                </Link>
              </CardActionArea>
            </Card>
          </Grid>
        </Box>
      </Grid>
    </div>
  );
}