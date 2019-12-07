import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

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

export default function Index() {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Kimia IS
        </Typography>
        <br />
        <Link href="/dosen/login">
          Login sebagai dosen
        </Link>
        <br />
        <Link href="/admin/login">
          Login sebagai admin
        </Link>
        <br />
        <Copyright />
      </Box>
    </Container>
  );
}