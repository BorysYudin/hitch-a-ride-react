import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import * as fromAuthentication from "./authentication.reducer";
import user from "./user.reducer";
import * as fromUser from "./user.reducer";
import trips from "./trips.reducer";
import * as fromTrips from "./trips.reducer";

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

// Trips
export const getAllIds = state => fromTrips.getAllIds(state.trips);
export const getAllById = state => fromTrips.getAllById(state.trips);

export const getAllOpted = state => fromTrips.getAllOpted(state.trips);
export const getAllScheduled = state => fromTrips.getAllScheduled(state.trips);
export const getAllCompleted = state => fromTrips.getAllCompleted(state.trips);
export const getAllCancelled = state => fromTrips.getAllCancelled(state.trips);
export const getAllTrips = state => fromTrips.getAllTrips(state.trips);

export const getTrip = (state, id) => fromTrips.getTrip(state.trips, id);
