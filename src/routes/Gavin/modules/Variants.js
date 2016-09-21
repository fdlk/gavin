// Constants

// export const constants = { };

// Action Creators

// export const actions = { };

// ------------------------------------
// Selectors
// Selector filters data from the state
// that can be used for other componenents
// ------------------------------------
// TODO selector for genes

// ------------------------------------
// Reducer
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

export default function (state = defaultState, action) {
  switch (action.type) {
    default:
      return state
  }
}
