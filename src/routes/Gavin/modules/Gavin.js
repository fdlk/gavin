// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_PHENOTYPE = 'Gavin.SELECT_PHENOTYPE'

// ------------------------------------
// Actions
// ------------------------------------
export function selectPhenotype(ontologyTerm) {
  return {
    type: SELECT_PHENOTYPE,
    payload: ontologyTerm
  }
}

export const actions = {
  selectPhenotype
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SELECT_PHENOTYPE]: (state, action) => (
    (state.phenotypes.indexOf(action.payload) == -1) ? {
      ...state,
      phenotypes: [...state.phenotypes, action.payload]
    } : state)
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {phenotypes: []}
export default function gavinReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
