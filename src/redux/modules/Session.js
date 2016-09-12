// Constants

// export const constants = { };

// Action Creators

// export const actions = { };

// Reducer
export const defaultState = {
  apiUrl: 'http://localhost:8080/api',
  token: 'd5715e53454945e58ad2ef46ccc4a33c',
  username: 'admin'
};

export default function (state = defaultState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
