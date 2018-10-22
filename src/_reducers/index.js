import { combineReducers } from "redux";

import authentication from "./authentication.reducer";
import * as fromAuthentication from "./authentication.reducer";
import user from "./user.reducer";
import * as fromUser from "./user.reducer";
import trips from "./trips.reducer";
import * as fromTrips from "./trips.reducer";
import rides from "./rides.reducer";
import suggestedTrips from "./suggestedTrips.reducer";
import * as fromSuggestedTrips from "./suggestedTrips.reducer";

const rootReducer = combineReducers({
    authentication,
    user,
    trips,
    rides,
    suggestedTrips
});

export default rootReducer;

// Selectors

// Authentication
export const isAuthenticated = state => fromAuthentication.isAuthenticated(state.authentication);

// User
export const getFullName = state => fromUser.getFullName(state.user);

// Trips
export const getAllIds = state => fromTrips.getAllIds(state.trips);
export const getAllUserTripsById = state => fromTrips.getAllById(state.trips);

export const getOptedUserTrips = state => fromTrips.getAllOpted(state.trips);
export const getScheduledUserTrips = state => fromTrips.getAllScheduled(state.trips);
export const getCompletedUserTrips = state => fromTrips.getAllCompleted(state.trips);
export const getCancelledUserTrips = state => fromTrips.getAllCancelled(state.trips);
export const getAllUserTrips = state => fromTrips.getAllUserTrips(state.trips);

export const getUserTrip = (state, id) => fromTrips.getTrip(state.trips, id);

// Suggested trips
export const getSuggestedTrips = state => fromSuggestedTrips.getSuggestedTrips(state.suggestedTrips);
export const getSuggestedTrip = (state, id) => fromSuggestedTrips.getSuggestedTrips(state.suggestedTrips, id);
export const getSuggestedTripsById = (state, id) => fromSuggestedTrips.getSuggestedTripsById(state.suggestedTrips);
