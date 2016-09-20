import React, { Component, PropTypes } from 'react'
import { FormGroup, Checkbox } from 'react-bootstrap'

const propTypes = {
  phenotypes      : PropTypes.array,
  togglePhenotype : PropTypes.func
}

class SelectedPhenotypes extends Component {
  render () {
    const { phenotypes, togglePhenotype } = this.props
    return <div>
      Selected phenotypes:
      <form>
        <FormGroup>
          {phenotypes.map((pheno, index) => <Checkbox inline checked={pheno.active}
            onClick={() => togglePhenotype(index)}>
            {pheno.value.name}
          </Checkbox>)}
        </FormGroup>
      </form>
    </div>
  }
}

SelectedPhenotypes.propTypes = propTypes
export default SelectedPhenotypes
