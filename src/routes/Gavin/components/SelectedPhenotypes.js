import React, { Component, PropTypes } from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'

const propTypes = {
  phenotypes : PropTypes.array
}

class SelectedPhenotypes extends Component {
  render () {
    const { phenotypes } = this.props
    return <div>
      Selected phenotypes:
      <form>
        <FormGroup>
          {phenotypes.map(pheno => <Checkbox inline checked={pheno.active}>
            {pheno.value.name}
          </Checkbox>)}
        </FormGroup>
      </form>
    </div>
  }
}

SelectedPhenotypes.propTypes = propTypes
export default SelectedPhenotypes
