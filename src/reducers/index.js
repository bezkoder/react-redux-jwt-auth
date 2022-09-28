import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import reducer from "../slices/tutorials"
import users from "./users"

export default combineReducers({
  reducer,
  auth,
  message,
  users
});
