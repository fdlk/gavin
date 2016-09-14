import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import EntitySelectBoxContainer from "containers/EntitySelectBoxContainer";
import {selectPhenotype} from "routes/Gavin/modules/Gavin";

/**
 * This is the dumb presentation component for the Phenotype selection box.
 */
class PhenotypeSelection extends Component {
  function

  getLabel(item) {
    const iri = item.ontologyTermIRI
    console.log(iri)
    const hpoId = iri.substring(iri.lastIndexOf('/') + 1)
    return `${item.ontologyTermName} (${hpoId})`;
  }

  render() {
    const {getQuery, phenotypes} = this.props
    return (
      <div>
        {phenotypes && <div>
          Selected phenotypes:
          <ul>
            {phenotypes.map(pheno => <li>{pheno.ontologyTermName}</li>)}
          </ul>
        </div>
        }

        <EntitySelectBoxContainer entityName={'sys_ont_OntologyTerm'}
                                  getQuery={getQuery}
                                  attrs="id,ontologyTermIRI,ontologyTermName"
                                  getLabel={this.getLabel}
                                  {...this.props}/>
      </div>
    )
  }
}

// these two methods are used to wrap a container component around the presentation component above
const mapStateToProps = (state) => {
  console.log(state)
  // retrieval of options happens in view state, define here how to retrieve them.
  function getQuery(input) {
    const termQueryParts = input
      .split(/\s+/)
      .filter(term => term.length)
      .map(term => `ontologyTermName=q="${term.trim()}"`)
    //TODO: filter out items that have already been selected
    return ['ontology==AAAACVZFGQYSUVXJESE2BPAAAE', ...termQueryParts].join(';')
  }

  return {getQuery, phenotypes: state.gavin.phenotypes};
}

const onChange = (selectedOption) => selectPhenotype(selectedOption.value)

const mapDispatchToProps = {onChange};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhenotypeSelection)

