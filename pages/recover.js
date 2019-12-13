import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

export default function Recover() {
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Lupa kata sandi
          </Typography>
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" gutterBottom>
              Jangan khawatir! Masukkan alamat e-mail kamu, nanti kami akan mengirimkan e-mail untuk membuat kata sandi baru.
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={5}>
            <TextField id="email" label="Alamat email" variant="outlined" fullWidth />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12} md={5}>
            <Button variant="outlined" fullWidth>
              Kirim
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}