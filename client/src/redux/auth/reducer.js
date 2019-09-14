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
    case authTypes.LOGIN_REQUEST:
      // Mark the state as "isFetching" so we can show a spinner or something else.
      return {
        isFetching: true,
        isAuthenticated: false,
        ...state
      };
    case authTypes.LOGIN_SUCCESS:
      // Set loading to "false" when fetching has finished.
      // Set the data with the reponse from the (EXTERNAL API)
      return {
        isFetching: false,
        isAuthenticated: true,
        user: action.payload,
        ...state
      };
    case authTypes.LOGIN_FAILURE:
      // If code request has failed we set an empty array to the task state.
      return {
        isFetching: false,
        error: action.payload,
        ...state
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
