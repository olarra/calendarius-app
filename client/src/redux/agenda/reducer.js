import agendaTypes from "./types";

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
// Auth Reducer
const initialState = {
  agenda: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case agendaTypes.SET_AGENDA:
      return { agenda: [...payload] };
    case agendaTypes.ADD_MEETING:
      return {
        agenda: addMeeting(state,payload)
      };
      case agendaTypes.REMOVE_MEETING:
      // Remove task from the current state
      return {
        agenda: removeMeeting(state,payload)
      };
    default:
      return state;
  }
};

const addMeeting = (state, payload) => {
  console.log("state",state)
  const {date,label,startHour, endHour} = payload;
  let copyagenda = [...state.agenda]
  if(!copyagenda.length) {
    return [...state.agenda,{
      date : payload.date,
      meetings : [{label,startHour,endHour}]
    }]
  }
  else {
    const checkDate= obj => obj.date === date;
    const dateAlreadyExists = copyagenda.some(checkDate);
    if(dateAlreadyExists){
      // if the date exist we must append a meeting to the object
       return copyagenda.map(day => {
        if(day.date === payload.date ) {
          return {
            date : day.date,
            meetings : [...day.meetings, ({label,startHour,endHour}) ]
          }
        }
        else {
          return day;
        }
      })
    }
    else {
      return [...state.agenda,{
        date : payload.date,
        meetings : [{label,startHour,endHour}]
      }]
    }
  }
}
//https://stackoverflow.com/questions/44566193/delete-array-from-nested-object-array-in-javascript-on-more-than-one-conditions
const removeMeeting = ({agenda},indexes) => {
  return {
    agenda : agenda.forEach((days,index) =>{
      if(indexes.iAgenda === index) {
        days.meetings = days.meetings.filter((meeting,index) => indexes.iMeeting !== index);
      }
    })
  }

}
