import agendaTypes from "./types";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
// Auth Reducer
const initialState = {
  meetings: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case agendaTypes.SET_AGENDA:
      return { meetings: [...payload] };
    case agendaTypes.ADD_MEETING:
      return {
        meetings: [...state.meetings, payload]
      };
    default:
      return state;
  }
};
