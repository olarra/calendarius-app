import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from "redux-thunk"; //async actions
import AgendaService from './agenda/service'
const selectAgenda = (state) => state.agenda;
let currentValue

const handleChange = (store) => {
  let previousValue = currentValue
  currentValue = selectAgenda(store.getState())

  if (previousValue !== currentValue) {
    console.log(
      'Some deep nested property changed from',
      previousValue,
      'to',
      currentValue
    )
    AgendaService.updateAgenda(currentValue)
    .then(res =>
      console.log("%c reponse update agenda","%color:gold",res)
    )
    .catch(e => console.log("%c error update agenda","%color:coral",e))
  }
}

export const buildSotore = () => {
  const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
  store.subscribe(()=>handleChange(store))
  return store;
}


export const getStore = () => buildSotore();
