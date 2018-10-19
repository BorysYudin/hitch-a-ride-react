import { combineReducers } from "redux";

import mapConstants from "../_constants/map.constants";


function optedIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === 'Opted').map(trip => trip.id);

        default:
            return state;
    }
}

function optedById(state = {}, action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const newState = {...state};
            action.data.trips.filter(trip => trip.status === 'Opted').forEach(trip => newState[trip.id] = trip);
            return newState;
        }

        default:
            return state;
    }
}

function scheduledIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === "Scheduled").map(trip => trip.id);

        default:
            return state;
    }

}

function scheduledById(state = {}, action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const newState = {...state};
            action.data.trips.filter(trip => trip.status === 'Scheduled').forEach(trip => newState[trip.id] = trip);
            return newState;
        }

        default:
            return state;
    }

}

function completedIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === 'Completed').map(trip => trip.id);

        default:
            return state;
    }

}

function completedById(state = {}, action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const newState = {...state};
            action.data.trips.filter(trip => trip.status === 'Completed').forEach(trip => newState[trip.id] = trip);
            return newState;
        }

        default:
            return state;
    }

}


function cancelledIds(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS:
            return action.data.trips.filter(trip => trip.status === 'Cancelled').map(trip => trip.id);

        default:
            return state;
    }

}

function cancelledById(state = {}, action) {
    switch (action.type) {
        case mapConstants.GET_USER_TRIPS_SUCCESS: {
            const newState = {...state};
            action.data.trips.filter(trip => trip.status === 'Cancelled').forEach(trip => newState[trip.id] = trip);
            return newState;
        }

        default:
            return state;
    }

}

const ids = combineReducers({
    opted: optedIds,
    scheduled: scheduledIds,
    completed: completedIds,
    cancelled: cancelledIds
});

const byId = combineReducers({
    opted: optedById,
    scheduled: scheduledById,
    completed: completedById,
    cancelled: cancelledById
});

const trips = combineReducers({
    ids,
    byId
});

export default trips;

// Selectors
export const getAllIds = state => {
    let ids = [];
    for(let el in state.ids)
        if(state.ids.hasOwnProperty(el))
            ids = ids.concat(state.ids[el]);

    return ids;
};

export const getAllById = state => {
    let byId = {};
    for(let el in state.byId)
        if(state.byId.hasOwnProperty(el))
            byId = {...byId, ...state.byId[el]};

    return byId;
};

export const getAllOpted = state => state.ids.opted.map(id => state.byId.opted[id]);
export const getAllScheduled = state => state.ids.scheduled.map(id => state.byId.scheduled[id]);
export const getAllCompleted = state => state.ids.completed.map(id => state.byId.completed[id]);
export const getAllCancelled = state => state.ids.cancelled.map(id => state.byId.cancelled[id]);
export const getAllTrips = state => {
    const allById = getAllById(state);
    return getAllIds(state).map(id => allById[id]);
};

export const getTrip = (state, id) => getAllById(state)[id];
