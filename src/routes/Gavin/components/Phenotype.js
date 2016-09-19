import React, { Component, PropTypes } from 'react'

const propTypes = {
  phenotype : PropTypes.object
}

class Phenotype extends Component {
  render () {
    console.log(this.props)
    const { phenotype: { ontologyTermName, ontologyTermSynonym, ontologyTermIRI } } = this.props
    const iri = ontologyTermIRI
    const hpoId = iri.substring(iri.lastIndexOf('/') + 1)
    return (
      <div>
        <h4>{ontologyTermName} ({hpoId})</h4>
        <p>{ontologyTermSynonym
          .map(synonym => synonym.ontologyTermSynonym)
          .filter(synonym => synonym !== ontologyTermName)
          .join(', ')}</p>
      </div>
    )
  }
}

Phenotype.propTypes = propTypes
export default Phenotype
