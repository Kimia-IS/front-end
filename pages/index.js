import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
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
        <Link href="/dosen/login" style={{marginRight: "20px"}}>
          <Button variant="outlined">
            Login sebagai dosen
          </Button>
        </Link>
        <Link href="/admin/login">
          <Button variant="outlined">
            Login sebagai admin
          </Button>
        </Link>
        <br />
        <Copyright />
      </Box>
    </Container>
  );
}