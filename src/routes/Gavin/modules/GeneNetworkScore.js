// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_PHENOTYPE = 'Gavin.SELECT_PHENOTYPE'

export const constants = { SELECT_PHENOTYPE }
// export const constants = { };

// Action Creators

// export const actions = { };

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {}

// ------------------------------------
// Selectors
// ------------------------------------

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  'HP_000300280' : {
    'NOD2'  : 5,
    'BRCA2' : 2
  },
  'HP_000102354' : {
    'NOD2'  : 2,
    'BRCA2' : 6
  }
}

export default function gavinReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
