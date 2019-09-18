import agendaTypes from "./types";
import agendaService from "./service";

/* Sync Action Creators */

export const addMeeting = meeting => ({type: agendaTypes.ADD_MEETING, payload: meeting});



export const updateMeeting = meeting => ({type: agendaTypes.UPDATE_MEETING, payload: meeting});


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

export const removeMeeting = (iAgenda,iMeeting) => {
  return {
    type: agendaTypes.REMOVE_MEETING,
    payload: {indexes : {iAgenda,iMeeting}}
  };
};

/* Async Action Creators */

export const fetchAgenda = () => dispatch => {
  agendaService.fetchAgenda().then(data => {
    dispatch(setAgenda(data.state.agenda));
  });
};
