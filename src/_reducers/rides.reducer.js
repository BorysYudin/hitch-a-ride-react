import {combineReducers} from "redux";

import mapConstants from "../_constants/map.constants";


function ids(state = [], action) {
    switch (action.type) {
        case mapConstants.GET_ALL_RIDES_SUCCESS:
            return action.data.trips.map(ride => ride.id);
        default:
            return state;
    }
}

function byId(state = {}, action) {
    switch (action.type) {
        case mapConstants.GET_ALL_RIDES_SUCCESS: {
            const newState = {...state};
            action.data.trips.forEach(ride => newState[ride.id] = ride);
            return newState;
        }

        default:
            return state;
    }
}

const rides = combineReducers({
    ids,
    byId
});

export default rides;

// Selectors
export const getAllIds = state => {
    let ids = [];
    for (let el in state.ids)
        if (state.ids.hasOwnProperty(el))
            ids = ids.concat(state.ids[el]);

    return ids;
};

export const getAllById = state => {
    let byId = {};
    for (let el in state.byId)
        if (state.byId.hasOwnProperty(el))
            byId = {...byId, ...state.byId[el]};

    return byId;
};

export const getAllRides = state => {
    const allById = getAllById(state);
    return getAllIds(state).map(id => allById[id]);
};

export const getRide = (state, id) => getAllById(state)[id];
