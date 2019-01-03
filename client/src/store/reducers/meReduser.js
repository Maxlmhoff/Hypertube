const initialState = {
  log: false,
  token: '',
};

function users(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case 'UPDATE_USER':
      nextState = {
        ...state,
        log: action.value,
      };
      return nextState || state;
    case 'NEW_TOKEN':
      nextState = {
        ...state,
        token: action.value,
      };
      return nextState || state;
    case 'DISCONNECT':
      nextState = {
        ...state,
      };
      return initialState;
    default:
      return state;
  }
}

export default users;
