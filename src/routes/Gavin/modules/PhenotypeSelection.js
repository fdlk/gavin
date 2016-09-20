// Constants
export const SELECT_PHENOTYPE = 'Gavin.SELECT_PHENOTYPE'
export const TOGGLE_PHENOTYPE = 'Gavin.TOGGLE_PHENOTYPE'
export const REMOVE_PHENOTYPE = 'Gavin.REMOVE_PHENOTYPE'

export const constants = { SELECT_PHENOTYPE, TOGGLE_PHENOTYPE }

// Action Creators

// A phenotype was selected and should be added to the selection
export function selectPhenotype (phenotype) {
  return {
    type    : SELECT_PHENOTYPE,
    payload : phenotype
  }
}

export function togglePhenotype (index) {
  return {
    type    : TOGGLE_PHENOTYPE,
    payload : index
  }
}

export function removePhenotype (index) {
  return {
    type    : REMOVE_PHENOTYPE,
    payload : index
  }
}

export const actions = { selectPhenotype, togglePhenotype, removePhenotype }

const ACTION_HANDLERS = {
  [SELECT_PHENOTYPE] : (state, action) => (
    (state.selected.map(item => item.id).indexOf(action.payload.primaryID) === -1) ? {
      ...state,
      selected   : [...state.selected, { id : action.payload.primaryID, active : true }],
      phenotypes : { ...state.phenotypes, [action.payload.primaryID] : action.payload }
    } : state),
  [TOGGLE_PHENOTYPE] : (state, action) => {
    const index = action.payload
    const selectedPheno = state.selected[index]
    return {
      selected : [
        ...state.selected.slice(0, index),
        { ...selectedPheno, active : !selectedPheno.active },
        ...state.selected.slice(index + 1)],
      phenotypes : state.phenotypes
    }
  },
  [REMOVE_PHENOTYPE] : (state, action) => {
    const index = action.payload
    return {
      selected : [
        ...state.selected.slice(0, index),
        ...state.selected.slice(index + 1)],
      phenotypes : state.phenotypes
    }
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
export const getSelectedPhenotypes = (state) =>
  state.selected.map(pheno => ({
    active : pheno.active,
    value  : state.phenotypes[pheno.id]
  }))

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { selected : [], phenotypes : {} }
export default function gavinReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
