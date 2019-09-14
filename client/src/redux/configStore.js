import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import ReduxThunk from "redux-thunk"; //async actions

export const configStore = () =>
  createStore(rootReducer, {}, applyMiddleware(ReduxThunk));
