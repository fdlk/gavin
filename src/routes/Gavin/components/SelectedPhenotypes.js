import React, { Component, PropTypes } from 'react'
import { ListGroup } from 'react-bootstrap'
import Phenotype from './Phenotype'

const propTypes = {
  phenotypes : PropTypes.array
}

class SelectedPhenotypes extends Component {
  render () {
    const { phenotypes } = this.props
    return <div>
      Selected phenotypes:
      <ListGroup>
        {phenotypes.map(pheno => (<Phenotype phenotype={pheno} />))}
      </ListGroup>
    </div>
  }
}

SelectedPhenotypes.propTypes = propTypes
export default SelectedPhenotypes
