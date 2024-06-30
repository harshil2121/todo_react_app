import auth from "./auth/reducer";
import navigation from "./navigation/reducer";
import { combineReducers } from "redux";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    navigation,
    ...asyncReducers,
  });

export default createReducer;
