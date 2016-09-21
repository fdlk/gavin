// ------------------------------------
// Constants
// ------------------------------------
export const SCORES_LOADED = 'Gavin.SCORES_LOADED'

export const constants = { SCORES_LOADED }

// ------------------------------------
// Action creators
// ------------------------------------
export function setGeneNetworkScores (scores) {
  return {
    type    : SCORES_LOADED,
    payload : scores
  }
}

export const actions = { setGeneNetworkScores }

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SCORES_LOADED] : (state, action) => {
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
