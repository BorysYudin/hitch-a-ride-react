import userConstants from "../_constants/user.constants";
import mapConstants from "../_constants/map.constants";
import mapService from "../_services/map.service";


function selectRoute(data) {
    function request() {
        return { type: mapConstants.SELECT_ROUTE_REQUEST };
    }

    function success() {
        return { type: mapConstants.SELECT_ROUTE_SUCCESS};
    }

    function failure(response) {
        return { type: mapConstants.SELECT_ROUTE_FAILURE, response };
    }

    return dispatch => {
        dispatch(request());

        return mapService.selectRoute(data).then(
            () => dispatch(success()),
            response => {
                dispatch(failure(response));
                return Promise.reject(response);
            }
        );
    };
}

const userActions = {
    selectRoute
};

export default userActions;
