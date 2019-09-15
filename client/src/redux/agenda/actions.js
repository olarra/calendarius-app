import agendaTypes from "./types";
import agendaService from "./service";

/* Sync Action Creators */

export const addMeeting = meeting => ({type: agendaTypes.ADD_MEETING, payload: meeting});

export const setAgenda = agenda => {
  return {
    type: agendaTypes.SET_AGENDA,
    payload: agenda
  };
};

/* Async Action Creators */

export const getAgenda = () => dispatch => {
  agendaService.fetchAgenda().then(agenda => {
    dispatch(setAgenda(agenda));
  });
};
