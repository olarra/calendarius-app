import authTypes from "./types";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
// Auth Reducer
const initialState = {
  user: [],
  isFetching: false,
  isAuthenticated: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case authTypes.SET_USER:
      return { ...state, user: {...action.payload} };

    case authTypes.LOGIN_REQUEST:
      // Mark the state as "isFetching" so we can show a spinner or something else.
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case authTypes.LOGIN_SUCCESS:
      // Set loading to "false" when fetching has finished.
      // Set the data with the reponse from the (EXTERNAL API)
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        error: null,
        user:action.payload.user,
      };
    case authTypes.LOGIN_FAILURE:
      // If code request has failed we set an empty array to the task state.
      return {
        ...state,
        isFetching: false,
        error: action.payload,
      };
    case authTypes.LOGOUT:
      return {
        user: [],
        isFetching: false,
        isAuthenticated: false,
        error: null
      };
    default:
      return state;
  }
};
