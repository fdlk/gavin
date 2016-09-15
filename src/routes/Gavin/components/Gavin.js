import React, { PropTypes } from 'react'
import classes from './Gavin.scss'
import PhenotypeSelectionContainer from '../containers/PhenotypeSelectionContainer'

const propTypes = {
  loggedIn : PropTypes.bool
}

export const Gavin = ({ loggedIn }) => (
  <div className={classes['Gavin']}>
    <h4>Gavin</h4>
    {loggedIn && <PhenotypeSelectionContainer />}
  </div>
)

Gavin.propTypes = propTypes

export default Gavin
