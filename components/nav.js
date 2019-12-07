import React from 'react'
import Link from 'next/link'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

const links = [
  { href: 'https://zeit.co/now', label: 'ZEIT' },
  { href: 'https://github.com/zeit/next.js', label: 'GitHub' }
].map(link => {
  link.key = `nav-link-${link.href}-${link.label}`
  return link
})

const Nav = () => (
  <AppBar position="static" color="inherit" style={{marginBottom: "50px"}}>
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu">
        Kimia IS
      </IconButton>
    </Toolbar>
  </AppBar>
)

export default Nav
