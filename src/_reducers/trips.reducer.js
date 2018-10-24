import {combineReducers} from "redux";

import mapConstants from "../_constants/map.constants";


function allIds(state = {}, action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.map(trip => trip.id);

        default:
            return state;
    }
}

function allById(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const newState = {...state};
            action.data.trips.forEach(trip => newState[trip.id] = trip);

            return newState;
        }

        default:
            return state;
    }
}

function optedIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const {trips, user} = action.data;

            return trips.filter(trip => trip.user_id === user.id && trip.status === 'Opted').map(trip => trip.id);
        }

        default:
            return state;
    }
}

function scheduledIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const {trips, user} = action.data;

            return trips.filter(trip => trip.user_id === user.id && trip.status === "Scheduled").map(trip => trip.id);
        }

        case mapConstants.CANCEL_TRIP_SUCCESS:
            return state.filter(tripId => tripId !== action.tripId);

        default:
            return state;
    }

}

function completedIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const {trips, user} = action.data;

            return trips.filter(trip => trip.user_id === user.id && trip.status === 'Completed').map(trip => trip.id);
        }

        default:
            return state;
    }

}

function cancelledIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const {trips, user} = action.data;

            return trips.filter(trip => trip.user_id === user.id && trip.status === 'Cancelled').map(trip => trip.id);
        }

        case mapConstants.CANCEL_TRIP_SUCCESS:
            return state.slice().concat([action.tripId]);

        default:
            return state;
    }

}


const ids = combineReducers({
    opted: optedIds,
    scheduled: scheduledIds,
    completed: completedIds,
    cancelled: cancelledIds,
    all: allIds
});

const trips = combineReducers({
    ids,
    byId: allById
});

export default trips;

// Selectors
export const getAllIds = state => state.ids.all.slice();

export const getAllById = state => ({...state.byId});

export const getAllOpted = state => state.ids.opted.map(id => state.byId[id]);
export const getAllScheduled = state => state.ids.scheduled.map(id => state.byId[id]);
export const getAllCompleted = state => state.ids.completed.map(id => state.byId[id]);
export const getAllCancelled = state => state.ids.cancelled.map(id => state.byId[id]);
export const getAllUserTrips = state => {
    const allById = getAllById(state);
    return getAllIds(state).map(id => allById[id]);
};

export const getTrip = (state, id) => getAllById(state)[id];
