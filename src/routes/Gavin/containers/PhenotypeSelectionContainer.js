import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import EntitySelectBoxContainer from 'containers/EntitySelectBoxContainer'
import { selectPhenotype, togglePhenotype, removePhenotype } from 'routes/Gavin/modules/PhenotypeSelection'
import { getSelectedPhenotypes, getAllGenesPresent, getActivePhenotypes } from 'routes/Gavin/modules/Gavin'
import SelectedPhenotypes from '../components/SelectedPhenotypes'
import { Label } from 'react-bootstrap'

// ------------------------------------
// Presentation components
// ------------------------------------

const propTypes = {
  phenotypes      : PropTypes.array,
  getQuery        : PropTypes.func,
  togglePhenotype : PropTypes.func,
  removePhenotype : PropTypes.func,
  getGnScores     : PropTypes.func
}

class PhenotypeSelection extends Component {
  static getOption (item) {
    const { ontologyTermName, ontologyTermSynonym, ontologyTermIRI } = item
    const primaryID = ontologyTermIRI.substring(ontologyTermIRI.lastIndexOf('/') + 1)
    const value = {
      primaryID,
      name     : ontologyTermName,
      synonyms : ontologyTermSynonym
        .map(synonym => synonym.ontologyTermSynonym)
        .filter(synonym => synonym !== ontologyTermName)
    }
    const label = `${value.name} (${value.primaryID})`
    return { label, value }
  }

  render () {
    const { getQuery, phenotypes } = this.props
    return (
      <div>
        {phenotypes && <SelectedPhenotypes {...this.props} /> }

        <EntitySelectBoxContainer
          entityName={'sys_ont_OntologyTerm'}
          getQuery={getQuery}
          attrs='id,ontologyTermIRI,ontologyTermName,ontologyTermSynonym'
          getOption={PhenotypeSelection.getOption}
          optionRenderer={(pheno) => <span>{pheno.value.name} <Label bsStyle='primary'>{pheno.value.primaryID}</Label>
            {pheno.value.synonyms && <small><br />{ pheno.value.synonyms.join(', ')}</small>}
          </span>}
          {...this.props} />
      </div>
    )
  }
}

PhenotypeSelection.propTypes = propTypes

// ------------------------------------
// Container / Presentation wrapping
// ------------------------------------

const mapStateToProps = (state) => {
  // Define how to retrieve options in view state
  function getQuery (input) {
    const termQueryParts = input
      .split(/\s+/)
      .filter(term => term.length)
      .map(term => `(ontologyTermSynonym.ontologyTermSynonym=q="${term.trim()}",ontologyTermIRI=q="${term.trim()}")`)
    // TODO: filter out items that have already been selected
    return ['ontology=="AAAACV2MZBAUEEG5WHQBVBIAAE"', ...termQueryParts].join(';')
  }

  function getGnScores () {
    const activePhenotypes = getActivePhenotypes(state.gavin)
    const genes = getAllGenesPresent(state.gavin)

    const hpoPartOfQuery = 'HPO_ID=in=(' + activePhenotypes.join() + ')'
    const genePartOfQuery = 'GENE=in=(' + genes.join() + ')'

    const query = 'api/v2/GeneNetworks?q=' + hpoPartOfQuery + ';' + genePartOfQuery
    console.log(query)

    // 1. Get scores via API
    // 1.5 with multiple HPO terms sum the scores
    // 2. Sort table based on scores
  }

  return { getQuery, phenotypes : getSelectedPhenotypes(state.gavin), getGnScores }
}

const onChange = (selectedOption) => selectPhenotype(selectedOption.value)

const mapDispatchToProps = { onChange, togglePhenotype, removePhenotype }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhenotypeSelection)

