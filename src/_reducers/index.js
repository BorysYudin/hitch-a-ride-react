import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import * as fromAuthentication from "./authentication.reducer";
import user from "./user.reducer";
import * as fromUser from "./user.reducer";
import trips from "./trips.reducer";

const rootReducer = combineReducers({
    authentication,
    user,
    trips
});

export default rootReducer;

// Selectors

// Authentication
export const isAuthenticated = state => fromAuthentication.isAuthenticated(state.authentication);

// User
export const getFullName = state => fromUser.getFullName(state.user);
