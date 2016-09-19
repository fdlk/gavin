// Constants
export const SELECT_PHENOTYPE = 'Gavin.SELECT_PHENOTYPE'

export const constants = { SELECT_PHENOTYPE }

// Action Creators
export function selectPhenotype (phenotype) {
  return {
    type    : SELECT_PHENOTYPE,
    payload : phenotype
  }
}

export const actions = { selectPhenotype }

const ACTION_HANDLERS = {
  [SELECT_PHENOTYPE] : (state, action) => (
    (state.selected.map(item => item.id).indexOf(action.payload.primaryID) === -1) ? {
      ...state,
      selected   : [...state.selected, { id : action.payload.primaryID, active : true }],
      phenotypes : { ...state.phenotypes, [action.payload.primaryID] : action.payload }
    } : state)
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
