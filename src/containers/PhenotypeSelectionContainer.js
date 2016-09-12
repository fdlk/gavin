import React, {Component, PropTypes} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import ReactSelect from "react-select";
import "react-select/dist/react-select.css";
import fetch from "isomorphic-fetch";

const propTypes = {
  getOptions: React.PropTypes.func
};

var options = [
  {value: 'one', label: 'One'},
  {value: 'two', label: 'Two'}
];

function logChange(val) {
  console.log("Selected: " + val);
}

class PhenotypeSelectionContainer extends Component {
  render() {
    const {getOptions} = this.props
    return (
      <div>
        Select phenotypes: <ReactSelect.Async name="form-field-name"
                                              value="one"
                                              loadOptions={getOptions}
                                              cache={null}
                                              onChange={logChange}/>
      </div>
    );
  }
}

const mapStateToProps = ({session: {apiUrl, token}}) => {
  var headers = {"x-molgenis-token": token};

  const hpOntologyId = 'AAAACVY72VDQRXVFFHRQFRAAAE'; //TODO: fetch from server
  const getOptions = (input) => {
    let url = `${apiUrl}/v2/sys_ont_OntologyTerm?q=ontology==${hpOntologyId}`
    if (input) {
      const termQuery = input.split(/\s+/).map(term => `ontologyTermName=q="${term.trim()}"`).join(',')
      url = url + `;(${termQuery})`
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
  return {getOptions};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

PhenotypeSelectionContainer.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PhenotypeSelectionContainer)

