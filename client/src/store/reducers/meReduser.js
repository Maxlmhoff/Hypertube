const initialState = {
  token: '',
  user: {},
  allUsers: {},
};

function users(state = initialState, action) {
  let nextState;
  switch (action.type) {
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
    case 'GET_USER':
      nextState = {
        ...state,
        user: action.value,
      };
      return nextState || state;
    case 'ALL_USERS':
      nextState = {
        ...state,
        allUsers: action.value,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default users;
