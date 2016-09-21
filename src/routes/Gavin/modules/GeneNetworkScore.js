// ------------------------------------
// Constants
// ------------------------------------
export const SET_GN_SCORES = 'Gavin.SET_GN_SCORES'

export const constants = { SET_GN_SCORES }

// ------------------------------------
// Action creators
// ------------------------------------
export function setGeneNetworkScores (scores) {
  return {
    type    : SET_GN_SCORES,
    payload : scores
  }
}

export const actions = { setGeneNetworkScores }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_GN_SCORES] : (state, action) => {
    return {
      'HP_000300280' : action.payload.scores
    }
  }
}

// ------------------------------------
// Selectors
// ------------------------------------
// TODO sort variants in state based on scores

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
