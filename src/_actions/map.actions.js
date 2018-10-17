import mapConstants from "../_constants/map.constants";
import mapService from "../_services/map.service";


function createTrip(data) {
    function request() {
        return { type: mapConstants.SELECT_ROUTE_REQUEST };
    }

    function success(response) {
        return { type: mapConstants.SELECT_ROUTE_SUCCESS};
    }

    function failure(response) {
        return { type: mapConstants.SELECT_ROUTE_FAILURE, response };
    }

    return dispatch => {
        dispatch(request());

        return mapService.createTrip(data).then(
            () => dispatch(success()),
            response => {
                dispatch(failure(response));
                return Promise.reject(response);
            }
        );
    };
}

function getUserTrips() {
    function request() {
        return { type: mapConstants.GET_USER_TRIPS_REQUEST };
    }

    function success(response) {
        return { type: mapConstants.GET_USER_TRIPS_SUCCESS, data: response.data};
    }

    function failure(response) {
        return { type: mapConstants.GET_USER_TRIPS_FAILURE, response };
    }

    return dispatch => {
        dispatch(request());

        return mapService.getUserTrips().then(
            response => dispatch(success(response)),
            response => {
                dispatch(failure(response));
                return Promise.reject(response);
            }
        );
    };
}

const mapActions = {
    createTrip,
    getUserTrips
};

export default mapActions;
