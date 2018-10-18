import { combineReducers } from "redux";

import mapConstants from "../_constants/map.constants";


function opted(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === 'Opted');

        default:
            return state;
    }

}

function scheduled(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === "Scheduled");

        default:
            return state;
    }

}

function completed(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === 'Completed');

        default:
            return state;
    }

}

function cancelled(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === 'Cancelled');

        default:
            return state;
    }

}

const tripsReducer = combineReducers({
    opted,
    scheduled,
    completed,
    cancelled
});

export default tripsReducer;
