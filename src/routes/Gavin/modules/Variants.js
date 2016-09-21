// ------------------------------------
// Constants
// ------------------------------------
export const VARIANTS_LOADED = 'Gavin.VARIANTS_LOADED'

export const constants = { VARIANTS_LOADED }

// ------------------------------------
// Action creators
// ------------------------------------
export function setVariants (variants) {
  return {
    type    : VARIANTS_LOADED,
    payload : variants
  }
}

export const actions = { setVariants }

// ------------------------------------
// Action Handlers
//
// Switch that defines what every action
// should do
// ------------------------------------
const ACTION_HANDLERS = {
  [VARIANTS_LOADED] : (state, action) => {
    return {
      variants : action.payload.variants
    }
  }
}

// ------------------------------------
// Selectors
//
// Selector filters data from the state
// that can be used for other componenents
// ------------------------------------
export const getAllGenesPresent = (state) =>
    state.map(function (variant) {
      return variant.gene
    })

// ------------------------------------
// Reducer
//
// Reducer distributes actions to trigger state changes
// ------------------------------------
export const defaultState = {
  'variants' : [{
    'chromosome' : '1',
    'position'   : '100',
    'ref'        : 'A',
    'alt'        : 'T',
    'gene'       : 'NOD2'
  }, {
    'chromosome' : '2',
    'position'   : '200',
    'ref'        : 'C',
    'alt'        : 'G',
    'gene'       : 'BRCA2'
  }]
}

export default function variantReducer (state = defaultState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
