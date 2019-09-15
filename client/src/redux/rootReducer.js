import { combineReducers } from "redux";
import authReducer from "./auth/reducer";
import agendaReducer from "./agenda/reducer";


export default combineReducers({
  auth: authReducer,
  agenda: agendaReducer
});
