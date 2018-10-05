import authenticationConstants from "../_constants/authentication.constants";
import authenticationService from "../_services/authentication.service";

function refreshToken(dispatch) {
    function request(freshTokenPromise) {
        return {
            type: authenticationConstants.JWT_REFRESH_REQUEST,
            freshTokenPromise
        };
    }

    function success(response) {
        return {
            type: authenticationConstants.JWT_REFRESH_SUCCESS,
            ...response
        };
    }

    function failure(response) {
        return { type: authenticationConstants.JWT_REFRESH_FAILURE, response };
    }

    const auth = JSON.parse(
        JSON.parse(localStorage.getItem("persist:hitch-a-ride")).authentication
    );

    const freshTokenPromise = authenticationService
        .refreshJWT(auth.refresh)
        .then(response => {
            dispatch(success(response));
            return response;
        })
        .catch(response => dispatch(failure(response)));

    dispatch(request(freshTokenPromise));

    return freshTokenPromise;
}

const authenticationActions = {
    refreshToken
};

export default authenticationActions;
