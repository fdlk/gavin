import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReactSelect from "react-select";
import "react-select/dist/react-select.css";
import MolgenisApi from "redux/modules/MolgenisApi";

function logChange(val) {
  console.log("Selected: ", val);
}

/**
 * This is the dumb presentation component that displays the Phenotype selection form.
 */
class PhenotypeSelection extends Component {
  render() {
    const {getOptions, onSelect} = this.props
    return (
      <div>
        Select phenotypes:
        <ReactSelect.Async name="form-field-name"
                           value="one"
                           loadOptions={getOptions}
                           cache={null}
                           onChange={logChange}
                           filterOptions={false}/>
      </div>
    );
  }
}
PhenotypeSelection.propTypes = {
  getOptions: React.PropTypes.func
}

const attrs = 'id,ontologyTermIRI,ontologyTermName,ontologyTermSynonym'

// these two methods are used to wrap a container component around the presentation component above
const mapStateToProps = ({session: {server, token}}) => {
  function getUrl(input = '') {
    const termQueryParts = input
      .split(/\s+/)
      .filter(term => term.length)
      .map(term => `ontologyTermName=q="${term.trim()}"`)
    const q = ['ontology==AAAACVZFGQYSUVXJESE2BPAAAE', ...termQueryParts].join(';')
    const params = {q, attrs}
    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    return `/v2/sys_ont_OntologyTerm?${query}`;
  }

  const getOptions = (input) => {
    return MolgenisApi.get(server, getUrl(input), token).then((json) => {
      return {
        options: json.items.map(item => ({label: item.ontologyTermName, value: item})),
        complete: false
      }
    })
  }
  return {getOptions};
}

const mapDispatchToProps = (dispatch) => {
  const onSelect = (pheno) => {
    //todo: dispatch action here
    console.log("Selected pheno:", pheno)
  };
  return {onSelect};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhenotypeSelection)

