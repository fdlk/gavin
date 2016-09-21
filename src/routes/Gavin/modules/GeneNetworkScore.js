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

// ------------------------------------
// Reducer
// ------------------------------------
export const defaultState = {
  'HP_0100280' : {
    'NOD2'  : 6,
    'BRCA2' : 1
  },
  'HP_0003002' : {
    'NOD2'  : 1,
    'BRCA2' : 6
  }
}

export default function geneNetworkReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
