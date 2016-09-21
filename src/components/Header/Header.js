import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h1>MOLGENIS Diagnostics</h1>
    <Link to='/gavin' activeClassName={classes.activeRoute} />
  </div>
)

export default Header
