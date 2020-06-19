import { combineReducers } from "redux";
import data from "./data"
import session from "./sessions";

export default combineReducers({ data, session });