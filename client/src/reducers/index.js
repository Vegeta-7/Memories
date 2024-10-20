import { combineReducers } from "redux";   //The combineReducers function allows you to combine multiple reducer functions into a single function that can be passed to the Redux store

import posts from "./posts";
import auth from "./auth";

export default combineReducers({
    posts,
    auth
});