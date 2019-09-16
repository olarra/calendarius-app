import agendaTypes from "./types";
import agendaService from "./service";

/* Sync Action Creators */

export const addMeeting = meeting => ({type: agendaTypes.ADD_MEETING, payload: meeting});



// {
//       "selectedDay": "19/09/2019",
//       "labelMeeting": "xw",
//       "startHourMeeting": "12:00 am",
//       "endHourMeeting": "1:30 am"
// },

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
