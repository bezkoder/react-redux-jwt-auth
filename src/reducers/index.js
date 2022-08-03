import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import reducer from "../slices/tutorials"

export default combineReducers({
  reducer,
  auth,
  message,


});
