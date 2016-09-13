import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReactSelect from "react-select";
import "react-select/dist/react-select.css";
import fetch from "isomorphic-fetch";

const propTypes = {
  getOptions: React.PropTypes.func
};

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
                           filterOptions={false}
        />
      </div>
    );
  }
}
PhenotypeSelection.propTypes = propTypes;

// these two methods are used to wrap a container component around the presentation component above
const mapStateToProps = ({session: {apiUrl, token}}) => {
  var headers = {"x-molgenis-token": token};

  const hpOntologyId = 'AAAACVZFGQYSUVXJESE2BPAAAE'; //TODO: fetch from server
  const getOptions = (input) => {
    let url = `${apiUrl}/v2/sys_ont_OntologyTerm?num=10&q=ontology==${hpOntologyId}`
    if (input) {
      const termQuery = input.split(/\s+/).filter(term => term.length).map(term => `ontologyTermName=q="${term.trim()}"`).join(';')
      url = url + `;${termQuery}`
    }
    url = url + `&attrs=id,ontologyTermIRI,ontologyTermName,ontologyTermSynonym`
    console.log(url)
    return fetch(url, {headers})
      .then((response) => {
        return response.json();
      }).then((json) => {
        console.log(json);
        return {
          options: json.items.map(item => ({label: item.ontologyTermName, value: item})),
          complete: false
        };
      });
  }

  const onSelect = (pheno) => {
    console.log("Selected pheno:", pheno)
  };
  return {getOptions, onSelect};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhenotypeSelection)

