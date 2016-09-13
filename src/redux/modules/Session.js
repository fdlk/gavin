// Constants

// export const constants = { };

// Action Creators

// export const actions = { };

// Reducer
export const defaultState = {
  apiUrl: 'http://localhost:8080/api',
  token: 'a072af013fc04010a1bffddd88e2d257',
  username: 'admin'
};

export default function (state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
